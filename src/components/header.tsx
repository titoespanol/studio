"use client";

import { useState, useEffect } from "react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const featuresSection = document.getElementById('features-section');
      if (featuresSection) {
        const { top, bottom } = featuresSection.getBoundingClientRect();
        const isIntersecting = top < window.innerHeight && bottom > 0;
        setIsOverDark(isIntersecting);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center py-4 transition-colors duration-300",
        isOverDark ? "text-white" : "text-black"
    )}>
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isScrolled ? "scale-75" : "scale-100"
        )}
      >
        <Logo />
      </div>
    </header>
  );
}
