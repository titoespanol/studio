
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type AnimatedWordsProps = {
  phrases: { text: string; weight: string; className: string; colorClass?: string }[];
  onComplete: () => void;
};

export function AnimatedWords({ phrases, onComplete }: AnimatedWordsProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (currentPhraseIndex < phrases.length) {
      const currentPhrase = phrases[currentPhraseIndex].text;
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(currentPhrase.substring(0, i + 1));
        i++;
        if (i >= currentPhrase.length) {
          clearInterval(intervalId);
          setTimeout(() => {
            setCurrentPhraseIndex(prevIndex => prevIndex + 1);
          }, 500); // Wait before starting next phrase
        }
      }, 100); // Typing speed

      return () => clearInterval(intervalId);
    } else {
        if(isAnimating) {
            setIsAnimating(false);
            onComplete();
        }
    }
  }, [currentPhraseIndex, phrases, onComplete, isAnimating]);

  return (
    <div className="flex flex-col items-start font-headline tracking-tight">
      {phrases.map((phrase, index) => (
        <div key={index} className={cn("h-[48px] md:h-[60px]", phrase.className)}>
            <span className={cn(phrase.weight, phrase.colorClass)}>
            {currentPhraseIndex > index ? phrase.text : (currentPhraseIndex === index ? displayedText : "")}
            </span>
        </div>
      ))}
    </div>
  );
}
