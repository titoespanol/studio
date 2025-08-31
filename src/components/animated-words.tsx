"use client";

import { useState, useEffect } from "react";

type AnimatedWordsProps = {
  words: string[];
};

export function AnimatedWords({ words }: AnimatedWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (words.length <= 1) return;

    const wordChangeTimeout = setTimeout(() => {
      setIsExiting(true); 

      const wordSwitchTimeout = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsExiting(false);
      }, 500); 

      return () => clearTimeout(wordSwitchTimeout);
    }, 2000); 

    return () => clearTimeout(wordChangeTimeout);
  }, [currentIndex, words.length]);

  return (
    <h2 className="absolute inset-0 flex items-center justify-center text-5xl md:text-7xl font-headline font-bold tracking-tight text-center">
      <span
        className={`transition-all duration-500 ease-in-out ${
          isExiting
            ? 'transform -translate-y-full opacity-0'
            : 'transform translate-y-0 opacity-100'
        }`}
      >
        {words[currentIndex]}
      </span>
    </h2>
  );
}
