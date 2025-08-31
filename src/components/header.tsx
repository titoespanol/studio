"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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
              "transform transition-transform duration-300 ease-in-out text-2xl font-bold",
              scrolled ? "scale-75" : "scale-100"
            )}
          >
            {BRAND_NAME}
          </div>
        </div>
      </div>
    </header>
  );
}
