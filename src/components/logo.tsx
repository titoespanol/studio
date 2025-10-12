
import Image from 'next/image';

export function Logo() {
  return (
    <div className="relative w-40 h-12 flex items-center justify-center">
      <Image
        src="/logotcl.png"
        alt="The Child Lens Logo"
        width={160}
        height={48}
        priority
      />
    </div>
  );
}
