'use client';

import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { Link } from 'next-view-transitions';
import { useEffect, useRef } from 'react';

function MatrixRain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = '404NOTFOUNDABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#22c55e';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.98 ? '#fff' : '#22c55e';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 h-full w-full ${className}`}
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Full-viewport matrix rain */}
      <MatrixRain className="opacity-30 dark:opacity-40" />

      <div className="relative z-10 px-4 text-center">
        <h1 className="text-[8rem] leading-none font-black tracking-tighter text-green-500 sm:text-[12rem]">
          404
        </h1>
        <p className="text-muted-foreground mt-2 font-mono text-lg">
          Lost in the matrix...
        </p>
        <p className="text-muted-foreground mx-auto mt-4 max-w-md text-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Maybe it was just a glitch in the simulation.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="size-4" />
              Back to Reality
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
