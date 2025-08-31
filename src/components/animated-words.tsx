"use client";

import { useState, useEffect } from "react";

type AnimatedWordsProps = {
  words: string[];
};

export function AnimatedWords({ words }: AnimatedWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (words.length <= 1) return;

    const wordChangeTimeout = setTimeout(() => {
      setOpacity(0); // Start fade out

      const wordSwitchTimeout = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setOpacity(1); // Start fade in
      }, 500); // Must match transition duration

      return () => clearTimeout(wordSwitchTimeout);
    }, 2000); // Time word is visible

    return () => clearTimeout(wordChangeTimeout);
  }, [currentIndex, words.length]);

  return (
    <h2 className="text-5xl md:text-7xl font-headline font-bold tracking-tight text-center w-full">
      <span
        className="transition-opacity duration-500 ease-in-out"
        style={{ opacity }}
      >
        {words[currentIndex]}
      </span>
    </h2>
  );
}
