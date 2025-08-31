"use client";

import { useState, useEffect } from "react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center py-4 transition-colors duration-300"
    )}>
      <div
        className={cn(
          "transition-all duration-300 ease-in-out text-white",
          isScrolled ? "scale-75" : "scale-100"
        )}
      >
        <Logo />
      </div>
    </header>
  );
}
