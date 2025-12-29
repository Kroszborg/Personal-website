import Image from 'next/image';

export default function Supabase() {
  return (
    <Image
      src="/skills/supabase.png"
      alt="Supabase"
      width={128}
      height={128}
      className="h-full w-full object-contain"
    />
  );
}
