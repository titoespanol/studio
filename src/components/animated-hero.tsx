"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatedWords } from "./animated-words";

const phrases = [
  { text: "Farther.", weight: "font-light", className: "text-4xl md:text-5xl" },
  { text: "Faster.", weight: "font-normal", className: "text-4xl md:text-5xl" },
  { text: "Forward.", weight: "font-bold", className: "text-4xl md:text-5xl" },
];

export function AnimatedHero() {
  const [step, setStep] = useState(0); // 0: initial, 1: h1 visible, 2: h1 faded, 3: words visible

  useEffect(() => {
    const sequence = [
      () => setStep(1), // Show h1
      () => setStep(2), // Fade out h1
      () => setStep(3), // Show words
    ];
    
    let delay = 500;
    if (step === 1) { // h1 visible
        delay = 3500;
    } else if (step === 2) { // h1 faded
        delay = 700;
    }

    if (step < sequence.length) {
      const timer = setTimeout(sequence[step], delay);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="flex items-center justify-center w-full h-full">
        {step < 3 ? (
            <h1
                className={cn(
                "text-5xl md:text-7xl font-headline font-bold tracking-tight transition-opacity duration-500 text-center",
                step >= 1 && step < 2 ? "opacity-100" : "opacity-0"
                )}
            >
                Children's health.
            </h1>
        ) : (
            <div
                className={cn(
                "transition-opacity duration-500 text-left w-full",
                step === 3 ? "opacity-100" : "opacity-0"
                )}
            >
              <AnimatedWords phrases={phrases} />
              <p 
                className={cn(
                  "text-base md:text-lg max-w-3xl mt-6 leading-relaxed font-light transition-opacity duration-1000 ease-in",
                  step === 3 ? "opacity-100" : "opacity-0"
                )}
                style={{ transitionDelay: '2500ms' }}
              >
                The Child Lens is a platform for systemic change in children’s health. We build ventures from scratch, walk hand-in-hand with startups, and shift the perspectives of those in power — all to unearth the deep roots of systems that fail our children’s health.
              </p>
            </div>
        )}
    </div>
  );
}
