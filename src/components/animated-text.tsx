"use client";

import { useEffect, useMemo } from 'react';

type AnimatedTextProps = {
  text: string;
  progress?: number; // Optional progress for scroll-based animation
};

export const AnimatedText = ({ text, progress = 1 }: AnimatedTextProps) => {
  const characters = useMemo(() => text.split(''), [text]);
  const charsToShow = Math.floor(progress * characters.length);

  return (
    <span className="inline-block w-full">
      {characters.map((char, i) => {
        const isVisible = i < charsToShow;
        return (
          <span
            key={i}
            className="transition-opacity duration-150"
            style={{ opacity: isVisible ? 1 : 0.2 }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};
