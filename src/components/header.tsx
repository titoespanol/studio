"use client";

import { useState, useEffect } from "react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [invertLogo, setInvertLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const featuresSection = document.querySelector("#features-section");
    if (!featuresSection) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                setInvertLogo(entry.isIntersecting);
            });
        },
        { threshold: 0.2 } // Adjust threshold as needed
    );

    observer.observe(featuresSection);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (featuresSection) {
        observer.unobserve(featuresSection);
      }
    };
  }, []);

  return (
    <header className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center py-4 transition-colors duration-300"
    )}>
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isScrolled ? "scale-75" : "scale-100",
          invertLogo ? "invert" : ""
        )}
      >
        <Logo />
      </div>
    </header>
  );
}
