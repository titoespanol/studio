"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const words = [
  { text: "Farther.", weight: "font-light" },
  { text: "Faster.", weight: "font-normal" },
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
    
    let delay = 500;
    if (step === 1) { // h1 visible
        delay = 3500; // Increased duration by 2 seconds
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
                "transition-opacity duration-500 text-left",
                "opacity-100"
                )}
            >
                <div className="flex flex-col items-start space-y-1">
                {words.map((word, index) => (
                    <div
                    key={index}
                    className={cn(
                        "overflow-hidden transition-all duration-700",
                        step === 3 ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                    )}
                    style={{ transitionDelay: `${index * 200}ms` }}
                    >
                    <span
                        className={cn(
                        "text-4xl md:text-5xl font-headline tracking-tight",
                        word.weight
                        )}
                    >
                        {word.text}
                    </span>
                    </div>
                ))}
                </div>
                <p className={cn("text-sm md:text-base max-w-3xl mt-6 leading-relaxed font-light transition-opacity duration-700",
                step === 3 ? "opacity-100" : "opacity-0"
                )} style={{ transitionDelay: `${words.length * 200 + 100}ms` }}>
                The Child Lens is a platform for systemic change in children’s health. We build ventures from scratch, walk hand-in-hand with startups, and shift the perspectives of those in power — all to unearth the deep roots of systems that fail our children’s health.
                </p>
            </div>
        )}
    </div>
  );
}
