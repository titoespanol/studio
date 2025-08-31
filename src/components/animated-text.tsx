"use client";

import { useEffect, useState, useMemo } from 'react';

type AnimatedTextProps = {
  text: string;
  progress?: number; // Optional progress for scroll-based animation
};

export const AnimatedText = ({ text, progress }: AnimatedTextProps) => {
  const [internalProgress, setInternalProgress] = useState(0);

  useEffect(() => {
    if (progress !== undefined) {
      setInternalProgress(progress);
    } else {
      // Fallback to time-based animation if progress is not provided
      let start: number | null = null;
      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const newProgress = Math.min(elapsed / (text.length * 30), 1);
        setInternalProgress(newProgress);
        if (newProgress < 1) {
          requestAnimationFrame(animate);
        }
      };
      const handle = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(handle);
    }
  }, [progress, text.length]);

  const characters = useMemo(() => text.split(''), [text]);
  
  return (
    <span className="inline">
      {characters.map((char, i) => {
        const charsToShow = Math.floor(internalProgress * characters.length);
        const isVisible = i < charsToShow;
        
        return (
          <span
            key={i}
            className="transition-opacity duration-150"
            style={{ opacity: isVisible ? 1 : 0.2 }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </span>
  );
};
