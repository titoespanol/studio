
import Image from 'next/image';

export function Logo() {
  return (
    <div className="relative w-40 h-12 flex items-center justify-center">
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/child-lens-landing.firebasestorage.app/o/The%20Child%20Lens%20Logo.png?alt=media&token=0eb31b19-03b9-4539-a922-5700a17281dd"
        alt="The Child Lens Logo"
        width={160}
        height={48}
        priority
      />
    </div>
  );
}
