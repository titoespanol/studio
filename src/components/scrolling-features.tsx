"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatedText } from "./animated-text";

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

export function ScrollingFeatures() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [textProgress, setTextProgress] = useState(0);
  const [featureProgress, setFeatureProgress] = useState(new Array(features.length).fill(0));

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;
      const rawProgress = -top / scrollableHeight;

      // Text progress for "What we do" section
      const textAnimationStart = window.innerHeight * 0.5;
      const textAnimationEnd = window.innerHeight * 0.2;
      const newTextProgress = Math.max(0, Math.min(1, (textAnimationStart - top) / (textAnimationStart - textAnimationEnd)));
      setTextProgress(newTextProgress);

      // Feature progress calculation
      const featureScrollLength = scrollableHeight / features.length;
      const currentFeatureIndex = Math.min(features.length - 1, Math.floor(-top / featureScrollLength));
      setActiveFeatureIndex(currentFeatureIndex);

      const newFeatureProgress = features.map((_, index) => {
        const featureStart = featureScrollLength * index;
        const featureEnd = featureScrollLength * (index + 1);
        const progressInFeature = (-top - featureStart) / (featureEnd - featureStart);
        return Math.max(0, Math.min(1, progressInFeature));
      });
      setFeatureProgress(newFeatureProgress);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-20 bg-background text-foreground" style={{ height: `${(features.length * 1.5) * 100}vh` }}>
      <div className="sticky top-0 max-w-6xl mx-auto px-4 h-screen flex items-center">
        <div className="flex flex-col md:flex-row gap-12 w-full">
          <div className="md:w-1/3">
            <div className="flex flex-col justify-center h-full">
                <h2 className="text-3xl font-bold font-headline mb-4">
                  <AnimatedText text="What we do" progress={textProgress} />
                </h2>
                <p className="font-body font-light text-lg">
                  <AnimatedText text="We believe that change should be more than a concept; it should effectively improve the health and well-being of every child." progress={textProgress} />
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
                    <AnimatedText text={feature.title} progress={featureProgress[index]} />
                  </h3>
                  <p className="font-body font-light text-lg">
                    <AnimatedText text={feature.description} progress={featureProgress[index]} />
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
