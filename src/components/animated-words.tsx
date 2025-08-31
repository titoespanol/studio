"use client";

import { useState, useEffect } from "react";

type AnimatedWordsProps = {
  words: string[];
};

export function AnimatedWords({ words }: AnimatedWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500);

    return () => clearInterval(intervalId);
  }, [words.length]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {words.map((word, index) => (
        <span
          key={index}
          aria-hidden={index !== currentIndex}
          className={`absolute inset-0 flex items-center justify-center text-5xl md:text-7xl font-headline font-bold tracking-tight text-center transition-all duration-700 ease-in-out`}
          style={{
            transform: `translateY(${(index - currentIndex) * 100}%)`,
            opacity: index === currentIndex ? 1 : 0,
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
