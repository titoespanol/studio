
"use client";

import { useState, useEffect } from "react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { LensToggleButton } from "./lens-toggle-button";

type HeaderProps = {
  isFlashing?: boolean;
  flashColor?: string;
  isChildLensActive: boolean;
  onToggleLens: () => void;
  colorClasses: {
    text: string;
    bg: string;
    border: string;
    logo1: string;
    logo2: string;
    logo3: string;
  };
  isToggleFlashing: boolean;
  heroAnimationFinished: boolean;
};

export function Header({ 
  isFlashing, 
  flashColor,
  isChildLensActive,
  onToggleLens,
  colorClasses,
  isToggleFlashing,
  heroAnimationFinished
}: HeaderProps) {
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
        "fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 px-4 md:px-8 transition-colors duration-300"
    )}>
      <div className="flex-1"></div>
      <div className="flex-1 flex justify-center">
        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            isScrolled ? "scale-75" : "scale-100"
          )}
          style={{ filter: (invertLogo && !isFlashing) ? 'invert(1)' : 'invert(0)' }}
        >
          <Logo isChildLensActive={isChildLensActive} colorClasses={colorClasses} />
        </div>
      </div>
      <div className={cn(
        "flex-1 flex justify-end transition-opacity duration-1000 ease-in",
        heroAnimationFinished ? "opacity-100" : "opacity-0"
      )}>
        <LensToggleButton
          isActive={isChildLensActive}
          onClick={onToggleLens}
          colorClasses={colorClasses}
          isFlashing={isToggleFlashing}
        />
      </div>
    </header>
  );
}
