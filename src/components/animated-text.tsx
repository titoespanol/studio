"use client";

import { useEffect, useState } from 'react';

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
        const newProgress = Math.min(elapsed / (text.length * 50), 1);
        setInternalProgress(newProgress);
        if (newProgress < 1) {
          requestAnimationFrame(animate);
        }
      };
      const handle = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(handle);
    }
  }, [progress, text.length]);

  return (
    <>
      {text.split('').map((char, i) => {
        const charDelay = i * 0.02; // Stagger the animation of each character
        const charProgress = Math.max(0, Math.min(1, (internalProgress - charDelay) / 0.5));
        
        return (
          <span
            key={i}
            className="transition-opacity duration-200"
            style={{ opacity: charProgress, transitionDelay: `${i * 10}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </>
  );
};
