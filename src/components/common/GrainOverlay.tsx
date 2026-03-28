'use client';

import { useEffect, useState } from 'react';

export const GrainOverlay = () => {
  const [dynamicNoise, setDynamicNoise] = useState<string>('');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    const img = ctx.createImageData(128, 128);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      img.data[i] = v;
      img.data[i + 1] = v;
      img.data[i + 2] = v;
      img.data[i + 3] = 10;
    }
    ctx.putImageData(img, 0, 0);
    setDynamicNoise(canvas.toDataURL());
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: 'url("/noise.webp")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          filter: 'blur(30px)',
        }}
        className="shader-bg opacity-[0.05] mix-blend-soft-light dark:opacity-[0.08]"
      />
      <div
        style={{
          backgroundImage: `url("${dynamicNoise}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
        className="shader-bg opacity-[0.03] mix-blend-multiply dark:opacity-[0.05]"
      />
    </>
  );
};
