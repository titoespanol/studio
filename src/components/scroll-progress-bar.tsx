"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type ScrollProgressBarProps = {
  colors: string[];
};

export function ScrollProgressBar({ colors }: ScrollProgressBarProps) {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [activeColor, setActiveColor] = useState(colors[0] || "bg-primary");

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollHeight > clientHeight) {
      const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollPercentage(percentage);

      const colorIndex = Math.floor((percentage / 100) * (colors.length));
      setActiveColor(colors[colorIndex] || colors[0]);

    } else {
      setScrollPercentage(0);
      setActiveColor(colors[0] || "bg-primary");
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1">
        <div className={cn("h-full", activeColor)} style={{ width: `${scrollPercentage}%` }}/>
    </div>
  );
}
