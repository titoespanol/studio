
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { AnimatedHero } from '@/components/animated-hero';
import { Header } from '@/components/header';
import { ScrollingFeatures } from '@/components/scrolling-features';
import { cn } from '@/lib/utils';

export default function Home() {
  const [isFlashing, setIsFlashing] = useState(false);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [hasFlashed, setHasFlashed] = useState(false);

  const handleAnimationComplete = () => {
    if (hasFlashed) return;
    setHasFlashed(true);

    setTimeout(() => {
      // First flash
      setIsFlashing(true);
      setIsFlashActive(true);
      setTimeout(() => {
        setIsFlashing(false);
        
        // Pause between flashes
        setTimeout(() => {
            // Second flash
            setIsFlashing(true);
            setTimeout(() => {
                setIsFlashing(false);
                setIsFlashActive(false); // Deactivate after the final flash
            }, 200); // Second flash duration
        }, 300);

      }, 800); // First flash duration (0.8s)
    }, 2000); // 2-second delay after animation
  };

  return (
    <div className={cn("bg-background text-foreground", isFlashing && "text-white")}>
      {isFlashing && (
        <div className="fixed inset-0 z-[-1]">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/child-lens-landing.firebasestorage.app/o/06%20Ocean.jpg?alt=media&token=dee9f107-acea-4825-890f-16fba6d41dc0"
            alt="Ocean background"
            fill
            className="object-cover"
          />
        </div>
      )}
      <Header isFlashing={isFlashing} />
      <main>
        <section className="flex flex-col items-center justify-center h-screen px-4">
          <div className="max-w-4xl w-full h-full flex">
            <AnimatedHero onAnimationComplete={handleAnimationComplete} isFlashActive={isFlashActive}/>
          </div>
        </section>
        
        <ScrollingFeatures />

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
