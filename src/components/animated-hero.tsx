"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const words = [
  { text: "Farther.", weight: "font-normal" },
  { text: "Faster.", weight: "font-medium" },
  { text: "Forward.", weight: "font-bold" },
];

export function AnimatedHero() {
  const [step, setStep] = useState(0); // 0: initial, 1: h1 visible, 2: h1 faded, 3: words visible

  useEffect(() => {
    const sequence = [
      () => setStep(1), // Show h1
      () => setStep(2), // Fade out h1
      () => setStep(3), // Show words
    ];
    
    let delay = 1000;
    if (step === 0) { // initial
        delay = 500;
    } else if (step === 1) { // h1 visible
        delay = 2000;
    } else if (step === 2) { // h1 faded
        delay = 500;
    }

    if (step < sequence.length) {
      const timer = setTimeout(sequence[step], delay);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="space-y-8">
      <h1
        className={cn(
          "text-5xl md:text-7xl font-headline font-bold tracking-tight transition-opacity duration-500",
          step >= 1 && step < 2 ? "opacity-100" : "opacity-0"
        )}
      >
        Children's health.
      </h1>

      <div
        className={cn(
          "transition-opacity duration-500",
          step === 3 ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="flex flex-col items-start space-y-2">
          {words.map((word, index) => (
            <span
              key={index}
              className={cn(
                "text-5xl md:text-7xl font-headline tracking-tight",
                word.weight
              )}
            >
              {word.text}
            </span>
          ))}
        </div>
        <p className="text-base md:text-lg max-w-3xl mt-8 leading-relaxed">
          The Child Lens is a platform for systemic change in children’s health. We build ventures from scratch, walk hand-in-hand with startups, and shift the perspectives of those in power — all to unearth the deep roots of systems that fail our children’s health.
        </p>
      </div>
    </div>
  );
}
