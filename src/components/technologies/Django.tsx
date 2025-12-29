import Image from 'next/image';

export default function Django() {
  return (
    <Image
      src="/skills/django.png"
      alt="Django"
      width={128}
      height={128}
      className="h-full w-full object-contain"
    />
  );
}
