"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type ScrollProgressBarProps = {
  colors: string[];
  sections: string[];
};

export function ScrollProgressBar({ colors, sections }: ScrollProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      setProgress((scrollPosition / totalHeight) * 100);

      const sectionPositions = sections.map(id => {
          const el = document.getElementById(id);
          return el ? el.offsetTop : 0;
      });
      
      const scrollCenter = scrollPosition + window.innerHeight / 2;
      let currentSection = 0;
      for (let i = sectionPositions.length - 1; i >= 0; i--) {
          if (scrollCenter >= sectionPositions[i]) {
              currentSection = i;
              break;
          }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const sectionPoints = sections.map((id) => {
    if (typeof document === 'undefined') {
      return 0;
    }
    const el = document.getElementById(id);
    if (!el) return 0;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    return (el.offsetTop / totalHeight) * 100;
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-4 flex items-center">
      <div className="relative w-full h-1 bg-gray-200">
        <div 
          className="h-full transition-all duration-300" 
          style={{ 
              width: `${progress}%`,
              backgroundImage: `linear-gradient(to right, ${colors.join(', ')})` 
          }} 
        />
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2">
            {sections.map((_, index) => (
                <div
                key={index}
                className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === activeSection ? colors[index % colors.length] : "bg-gray-300",
                    index === activeSection ? 'scale-150' : 'scale-100'
                )}
                />
            ))}
        </div>
      </div>
    </div>
  );
}
