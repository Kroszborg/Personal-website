import Image from 'next/image';

export default function FFmpeg() {
  return (
    <Image
      src="/skills/ffmpeg.png"
      alt="FFmpeg"
      width={128}
      height={128}
      className="h-full w-full object-contain"
    />
  );
}
