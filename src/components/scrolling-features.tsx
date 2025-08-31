"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: 'We build ventures.',
    description: 'From scratch, with scientists, clinicians, and entrepreneurs.',
  },
  {
    title: 'We scale startups.',
    description: 'Working shoulder to shoulder with startups so their ideas reach farther.',
  },
  {
    title: 'We influence.',
    description: 'Bringing clarity and courage to those shaping policy and systems.',
  },
  {
    title: 'We connect.',
    description: 'Hospitals, innovators, families, and regulators — a chorus strong enough to bend the system.',
  },
];

const AnimatedText = ({ text, progress }: { text: string; progress: number }) => {
  return (
    <>
      {text.split('').map((char, i) => {
        const charProgress = Math.max(0, Math.min(1, (progress - (i * 0.01)) / 0.5));
        return (
          <span
            key={i}
            className="transition-opacity duration-200"
            style={{ opacity: charProgress }}
          >
            {char}
          </span>
        );
      })}
    </>
  );
};

export function ScrollingFeatures() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const featureHeight = height / features.length;
      
      const index = Math.floor(-top / featureHeight);
      const newIndex = Math.max(0, Math.min(features.length - 1, index));
      setActiveFeatureIndex(newIndex);
      
      const featureTop = top + newIndex * featureHeight;
      const featureProgress = Math.max(0, Math.min(1, 1 - (featureTop / window.innerHeight) * 1.5));
      setProgress(featureProgress);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-20 bg-background text-foreground" style={{ height: `${features.length * 75}vh` }}>
      <div className="sticky top-0 max-w-6xl mx-auto px-4 h-screen flex items-center">
        <div className="flex flex-col md:flex-row gap-12 w-full">
          <div className="md:w-1/3">
            <div className="flex flex-col justify-center h-full">
                <h2 className="text-3xl font-bold font-headline mb-4">What we do</h2>
                <p className="font-body font-light text-lg">
                  We believe that change should be more than a concept; it should effectively improve the health and well-being of every child.
                </p>
            </div>
          </div>

          <div className="md:w-2/3 h-full flex items-center justify-center">
            <div className="relative w-full" style={{ height: '30vh' }}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 flex flex-col justify-center p-6 rounded-lg transition-opacity duration-300 ease-in-out",
                    activeFeatureIndex === index ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                >
                  <span className="text-sm font-light block mb-2">0{index + 1}</span>
                  <h3 className="text-2xl font-bold font-headline mb-2">
                    <AnimatedText text={feature.title} progress={activeFeatureIndex === index ? progress : 0} />
                  </h3>
                  <p className="font-body font-light text-lg">
                    <AnimatedText text={feature.description} progress={activeFeatureIndex === index ? progress : 0} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
