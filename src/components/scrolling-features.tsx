
"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatedText } from "./animated-text";
import Image from "next/image";

const paragraphs = [
  'You can improve a product. Train a team. Change a policy. But if the system stays the same, it keeps breaking children.',
  'At The Child Lens, we don’t just treat the symptoms. We dig deep into the tangled roots — where funding gaps, power dynamics and cultural blind spots quietly shape outcomes.',
  'Because real impact in children’s health takes more than a brilliant idea. It takes bold ventures, brave voices, and a systemic lens.',
];

type ScrollingFeaturesProps = {
  isChildLensActive?: boolean;
  colorClasses?: {
    whyWePlay: string;
  };
};

export function ScrollingFeatures({ isChildLensActive, colorClasses }: ScrollingFeaturesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  
  const [activeParagraph, setActiveParagraph] = useState(0);
  const [paragraphProgress, setParagraphProgress] = useState(new Array(paragraphs.length).fill(0));
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!textContainerRef.current) return;
      
      const { top, height } = textContainerRef.current.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;

      let currentScroll = -top;
      if (currentScroll < 0) currentScroll = 0;
      if (currentScroll > scrollableHeight) currentScroll = scrollableHeight;
      
      const overallProgress = scrollableHeight > 0 ? currentScroll / scrollableHeight : 0;
      setScrollProgress(overallProgress);

      const paragraphScrollLength = scrollableHeight / paragraphs.length;
      const currentParagraphIndex = Math.min(paragraphs.length - 1, Math.floor(currentScroll / paragraphScrollLength));
      setActiveParagraph(currentParagraphIndex);

      const newParagraphProgress = paragraphs.map((_, index) => {
        const paragraphStart = paragraphScrollLength * index;
        const progressInParagraph = (currentScroll - paragraphStart) / paragraphScrollLength;
        return Math.max(0, Math.min(1, progressInParagraph));
      });
      setParagraphProgress(newParagraphProgress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const maxBlur = 16;
  const blurAmount = maxBlur * (1 - scrollProgress);
  const darknessAmount = 0.5 * (1 - scrollProgress);
  
  const titleText = isChildLensActive ? "Why we play" : "Solving one problem isn’t enough.";
  const titleColorClass = isChildLensActive ? colorClasses?.whyWePlay : "text-white";

  return (
    <section id="features-section" ref={containerRef} className="relative w-full py-20 bg-background text-foreground" style={{ height: `${paragraphs.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full">
        <div 
          className="absolute inset-0 z-0" 
          style={{ filter: `blur(${blurAmount}px)` }}
        >
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/child-lens-landing.firebasestorage.app/o/portrait-2025-02-11-15-26-54-utc%20(1).jpg?alt=media&token=70b462e8-f371-4b30-a8a7-5cb2a5c40811"
            alt="A child's face with dotted light patterns"
            fill
            className="object-cover"
            data-ai-hint="child face"
          />
        </div>
        <div 
            className="absolute inset-0 z-0 bg-black"
            style={{ opacity: darknessAmount }}
        ></div>
      </div>
      <div ref={textContainerRef} className="absolute top-0 left-0 w-full" style={{ height: `${paragraphs.length * 100}vh` }}>
        <div className="sticky top-0 max-w-6xl mx-auto px-4 h-screen flex items-center z-10 text-white">
          <div className="md:w-2/5">
              <div className="flex flex-col justify-center h-full space-y-8">
                  <h2 className={cn("text-3xl font-bold font-headline", titleColorClass)}>
                    {titleText}
                  </h2>
                  <div className="relative font-body font-normal text-xl space-y-6">
                    {paragraphs.map((p, index) => (
                       <p
                         key={index}
                         className={cn(
                           "transition-opacity duration-300 ease-in-out",
                           activeParagraph === index ? "opacity-100" : "opacity-50"
                         )}
                       >
                         <AnimatedText text={p} progress={paragraphProgress[index]} />
                       </p>
                    ))}
                  </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
