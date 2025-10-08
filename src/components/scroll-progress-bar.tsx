
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type ScrollProgressBarProps = {
  colors: string[];
  sections: string[];
};

export function ScrollProgressBar({ colors, sections }: ScrollProgressBarProps) {
  const [activeSection, setActiveSection] = useState(0);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let currentSection = 0;

    for (let i = 0; i < sections.length; i++) {
      const sectionEl = document.getElementById(sections[i]);
      if (sectionEl) {
        if (sectionEl.offsetTop <= scrollPosition) {
          currentSection = i;
        }
      }
    }
    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial active section
    return () => window.removeEventListener('scroll', handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-4 flex items-center justify-center space-x-2">
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
  );
}
