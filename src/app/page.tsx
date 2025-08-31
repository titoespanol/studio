
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { AnimatedHero } from '@/components/animated-hero';
import { Header } from '@/components/header';
import { ScrollingFeatures } from '@/components/scrolling-features';
import { ExpandingBoxes } from '@/components/expanding-boxes';
import { cn } from '@/lib/utils';

const flashColors = [
  "text-[#d45324]",
  "text-[#ffb53a]",
  "text-[#f291bc]",
  "text-[#419ebf]",
  "text-[#f27236]",
];

export default function Home() {
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [hasFlashed, setHasFlashed] = useState(false);
  const [activeFlashColor, setActiveFlashColor] = useState("text-white");

  const getRandomColor = () => {
    return flashColors[Math.floor(Math.random() * flashColors.length)];
  }

  const handleAnimationComplete = () => {
    if (hasFlashed) return;
    setHasFlashed(true);

    setTimeout(() => {
      // First flash
      setActiveFlashColor(getRandomColor());
      setIsFlashActive(true);
      setTimeout(() => {
        setIsFlashActive(false);
        
        // Pause between flashes
        setTimeout(() => {
            // Second flash
            setActiveFlashColor(getRandomColor());
            setIsFlashActive(true);
            setTimeout(() => {
                setIsFlashActive(false);

                // Pause between flashes
                setTimeout(() => {
                    // Third flash
                    setActiveFlashColor(getRandomColor());
                    setIsFlashActive(true);
                    setTimeout(() => {
                        setIsFlashActive(false);
                    }, 400); // Third flash duration
                }, 300);

            }, 200); // Second flash duration
        }, 300);

      }, 500); // First flash duration
    }, 2000); // 2-second delay after animation
  };

  return (
    <div className={cn("bg-background text-foreground", isFlashActive && "bg-transparent", isFlashActive && activeFlashColor)}>
      <div className={cn("fixed inset-0 z-[-1] transition-opacity duration-200", isFlashActive ? "opacity-100" : "opacity-0")}>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/child-lens-landing.firebasestorage.app/o/Boho%20Pattern%207.jpg?alt=media&token=319b2028-afc4-4dd2-8282-5dfcabdafdb4"
          alt="Boho pattern background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <Header isFlashing={isFlashActive} flashColor={activeFlashColor} />
      <main>
        <section className="flex flex-col items-center justify-center h-screen px-4">
          <div className="max-w-4xl w-full h-full flex">
            <AnimatedHero onAnimationComplete={handleAnimationComplete} isFlashActive={isFlashActive}/>
          </div>
        </section>
        
        <ScrollingFeatures />

        <ExpandingBoxes />

        <section className="h-screen w-full flex items-center justify-center text-center px-4 bg-background">
            <div className="max-w-4xl">
              <p className="text-4xl md:text-6xl font-headline font-light leading-tight">
                "There can be no keener revelation of a society's soul than the way in which it treats its children."
              </p>
              <p className="mt-6 text-xl font-body font-bold">— Nelson Mandela</p>
            </div>
        </section>
      </main>
    </div>
  );
}
