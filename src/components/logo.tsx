import Image from "next/image";

export function Logo() {
  return (
    <div className="relative w-32 h-10">
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/child-lens-landing.firebasestorage.app/o/TimesBlack.png?alt=media&token=77cbe246-5974-4dfd-ab91-2d4f830f91e2"
        alt="The Child Lens Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
