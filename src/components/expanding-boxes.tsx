
"use client";

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedText } from './animated-text';

const boxes = [
  {
    name: 'The builder',
    content: 'We bring together scientists, clinicians, and entrepreneurs to construct new ventures from the ground up, laying the foundation for a healthier future.',
  },
  {
    name: 'The influencer',
    content: 'With clarity and courage, we engage with policymakers and system leaders to shift perspectives and advocate for systemic change.',
  },
  {
    name: 'The consultant',
    content: 'We rigorously test new ideas and models, connecting hospitals, innovators, and families to validate solutions that can truly bend the system.',
  },
];

export function ExpandingBoxes() {
  const [activeBox, setActiveBox] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;
      let currentScroll = -top;

      if (currentScroll < 0) currentScroll = 0;
      if (currentScroll > scrollableHeight) currentScroll = scrollableHeight;

      const overallProgress = scrollableHeight > 0 ? currentScroll / scrollableHeight : 0;
      const currentBox = Math.min(boxes.length - 1, Math.floor(overallProgress * boxes.length));
      
      setActiveBox(currentBox);

      const boxScrollLength = scrollableHeight / boxes.length;
      const boxStart = boxScrollLength * currentBox;
      const progressInBox = (currentScroll - boxStart) / boxScrollLength;
      setProgress(Math.max(0, Math.min(1, progressInBox)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-background text-foreground" style={{ height: `${boxes.length * 125}vh` }}>
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-4">
        <div className="w-full md:w-1/3 h-full flex flex-col justify-center space-y-4 pr-8">
          {boxes.map((box, index) => (
            <div
              key={index}
              className={cn(
                'p-6 rounded-lg border transition-all duration-500 ease-in-out',
                activeBox === index
                  ? 'bg-card flex-grow-[2] shadow-2xl'
                  : 'bg-accent flex-grow'
              )}
            >
              <h3 className={cn("text-xl font-headline font-normal", activeBox === index ? 'text-primary' : 'text-muted-foreground')}>
                {box.name}
              </h3>
            </div>
          ))}
        </div>
        <div className="w-full md:w-2/3 h-full flex items-center justify-center">
            <div className="relative w-full h-64">
                {boxes.map((box, index) => (
                    <div
                        key={index}
                        className={cn(
                            "absolute inset-0 transition-opacity duration-500 ease-in-out",
                            activeBox === index ? "opacity-100" : "opacity-0 pointer-events-none"
                        )}
                    >
                        <p className="text-2xl font-body leading-relaxed">
                            <AnimatedText text={box.content} progress={progress} />
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
