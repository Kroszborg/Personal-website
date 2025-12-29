import Image from 'next/image';

export default function Strapi() {
  return (
    <Image
      src="/skills/strapi.png"
      alt="Strapi"
      width={128}
      height={128}
      className="h-full w-full object-contain"
    />
  );
}
