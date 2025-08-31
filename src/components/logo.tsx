import Image from 'next/image';

export function Logo() {
  const logoSrc = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  return (
    <Image
      src={logoSrc}
      alt="Child Lens Logo"
      width={200}
      height={45}
      className="w-full h-auto dark:filter dark:invert"
      priority
      unoptimized
    />
  );
}
