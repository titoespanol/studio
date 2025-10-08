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
  const [sectionPoints, setSectionPoints] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof document === 'undefined') return;

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      setProgress(totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0);

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

    const calculateSectionPoints = () => {
        if (typeof document === 'undefined') return;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const points = sections.map((id) => {
            const el = document.getElementById(id);
            if (!el || totalHeight <= 0) return 0;
            return (el.offsetTop / totalHeight) * 100;
        });
        setSectionPoints(points);
    }

    const timeoutId = setTimeout(() => {
      handleScroll();
      calculateSectionPoints();
    }, 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateSectionPoints);
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', calculateSectionPoints);
        clearTimeout(timeoutId);
    }
  }, [sections]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1">
      <div className="relative w-full h-full bg-transparent">
        <div 
          className="h-full transition-all duration-100" 
          style={{ 
              width: `${progress}%`,
              backgroundImage: `linear-gradient(to right, ${colors.join(', ')})` 
          }} 
        />
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center px-0">
            {sectionPoints.map((point, index) => (
                <div
                    key={index}
                    className="absolute -translate-x-1/2"
                    style={{ left: `${point}%`}}
                >
                    <div
                    className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        index === activeSection ? colors[index % colors.length] : "bg-gray-300",
                        index === activeSection ? 'scale-150' : 'scale-100'
                    )}
                    />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
