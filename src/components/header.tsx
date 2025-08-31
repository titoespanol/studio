"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_URL = "https://placehold.co/400x100/000000/FFFFFF/?text=Child+Lens";
const BRAND_NAME = "Child Lens";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-center transition-all duration-300 ease-in-out">
          <div
            className={cn(
              "transform transition-transform duration-300 ease-in-out",
              scrolled ? "scale-75" : "scale-100"
            )}
          >
            <Image
              src={LOGO_URL}
              alt={BRAND_NAME}
              width={160}
              height={40}
              priority
              className="h-auto"
              data-ai-hint="monochrome minimalist logo"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
