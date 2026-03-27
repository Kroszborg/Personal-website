'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ShaderMaterial } from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uIsDark;
  varying vec2 vUv;

  // ── Simplex noise ──────────────────────────────────────────────────
  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
     -0.577350269189626, 0.024390243902439
    );
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1  = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy  -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                             + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(
      dot(x0,  x0),
      dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)
    ), 0.0);
    m = m * m;
    m = m * m;
    vec3 x  = 2.0 * fract(p * C.www) - 1.0;
    vec3 h  = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x   + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // ── Fractional Brownian Motion ─────────────────────────────────────
  float fbm(vec2 st) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.866025, 0.5, -0.5, 0.866025);
    for (int i = 0; i < 6; i++) {
      v  += a * snoise(st);
      st  = rot * st * 2.07;
      a  *= 0.46;
    }
    return v;
  }

  // ── Interleaved gradient noise ─────────────────────────────────────
  float ign(vec2 pos) {
    return fract(52.9829189 * fract(dot(pos, vec2(0.06711056, 0.00583715))));
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.12;

    // ── Layer 1: large slow warp ─────────────────────────────
    vec2 q;
    q.x = fbm(uv * 1.8 + vec2(0.00, 0.00) + t * 0.6);
    q.y = fbm(uv * 1.8 + vec2(5.20, 1.30) + t * 0.5);

    // ── Layer 2: medium warp driven by layer 1 ───────────────
    vec2 r;
    r.x = fbm(uv * 2.4 + q * 2.2 + vec2(1.70, 9.20) + t * 0.7);
    r.y = fbm(uv * 2.4 + q * 2.2 + vec2(8.30, 2.80) + t * 0.65);

    // ── Final noise value, deeply warped ────────────────────
    float f = fbm(uv * 3.0 + r * 1.8 + t * 0.5);
    f = f * 0.5 + 0.5;

    if (uIsDark > 0.5) {
      // ── DARK MODE: Black background with subtle lighter swirls ──────────────────────────────
      float bright = smoothstep(0.30, 0.80, f);
      bright = pow(bright, 1.6);
      bright = bright * 0.12 + 0.015;  // Very dark: 0.015 to 0.135

      // ── Ordered dither ──────────────────────────────────────
      vec2 screenPos = uv * uResolution;
      float noise = ign(screenPos);
      float dither = (noise - 0.5) * 0.015 * (1.0 + bright * 2.0);
      bright += dither;
      bright = clamp(bright, 0.0, 1.0);

      // ── Vignette ────────────────────────────────────────────
      vec2 vigUv = uv - 0.5;
      vigUv.x *= 0.85;
      float vignette = 1.0 - dot(vigUv, vigUv) * 2.8;
      vignette = clamp(vignette, 0.0, 1.0);
      vignette = pow(vignette, 0.5);

      bright *= vignette;
      bright = max(bright, 0.012);

      gl_FragColor = vec4(vec3(bright), 1.0);
    } else {
      // ── LIGHT MODE: Warm white background with subtle darker swirls ──────────────────────────────
      float bright = smoothstep(0.20, 0.70, f);
      bright = pow(bright, 1.4);
      // Invert: start from white (0.92), subtract dark swirls
      bright = 0.92 - bright * 0.10;  // Range: ~0.82 to 0.92

      // ── Ordered dither ──────────────────────────────────────
      vec2 screenPos = uv * uResolution;
      float noise = ign(screenPos);
      float dither = (noise - 0.5) * 0.015 * (1.0 - bright * 0.5);
      bright += dither;
      bright = clamp(bright, 0.75, 1.0);

      // ── Soft vignette (much subtler for light mode) ────────────────────────────────────────────
      vec2 vigUv = uv - 0.5;
      vigUv.x *= 0.85;
      float vignette = 1.0 - dot(vigUv, vigUv) * 1.2;
      vignette = clamp(vignette, 0.88, 1.0);

      bright *= vignette;

      gl_FragColor = vec4(vec3(bright), 1.0);
    }
  }
`;

const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

function AnimatedShader({ isDark }: { isDark: boolean }) {
  const materialRef = useRef<ShaderMaterial>(null);
  const resolutionRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth : 1920,
    y: typeof window !== 'undefined' ? window.innerHeight : 1080,
  });
  const { invalidate } = useThree();
  const isDarkRef = useRef(isDark);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: { ...resolutionRef.current } },
      uIsDark: { value: isDarkRef.current ? 1.0 : 0.0 },
    }),
    [],
  );

  useEffect(() => {
    const id = setInterval(() => invalidate(), FRAME_INTERVAL);
    return () => clearInterval(id);
  }, [invalidate]);

  useEffect(() => {
    const onResize = () => {
      resolutionRef.current = { x: window.innerWidth, y: window.innerHeight };
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Update isDark ref when theme changes
  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uResolution.value = resolutionRef.current;
    materialRef.current.uniforms.uIsDark.value = isDarkRef.current ? 1.0 : 0.0;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export function ShaderBackground() {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <div className="shader-bg">
      <Canvas
        camera={{ position: [0, 0, 1], near: 0.1, far: 10 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: false, antialias: false, powerPreference: 'default' }}
        dpr={1}
        frameloop="demand"
      >
        <AnimatedShader isDark={isDark} />
      </Canvas>
    </div>
  );
}
