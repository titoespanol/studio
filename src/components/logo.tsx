import Image from 'next/image';

export function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Child Lens Logo"
      width={200}
      height={45}
      className="w-full h-auto dark:filter dark:invert"
      priority
    />
  );
}
