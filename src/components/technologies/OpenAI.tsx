import Image from 'next/image';

export default function OpenAI() {
  return (
    <Image
      src="/skills/openai.png"
      alt="OpenAI"
      width={128}
      height={128}
      className="h-full w-full object-contain"
    />
  );
}
