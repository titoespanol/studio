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

export function ScrollingFeatures() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const containerTop = containerRef.current?.getBoundingClientRect().top ?? 0;
      const scrollPosition = window.innerHeight / 2 - containerTop;
      const featureHeight = window.innerHeight / 2;
      const newIndex = Math.max(0, Math.min(features.length - 1, Math.floor(scrollPosition / featureHeight)));

      if (newIndex !== activeFeatureIndex) {
        setActiveFeatureIndex(newIndex);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeFeatureIndex]);

  return (
    <section ref={containerRef} className="relative w-full py-20 bg-background text-foreground" style={{ height: `${features.length * 50}vh` }}>
      <div className="sticky top-0 max-w-6xl mx-auto px-4 h-screen flex items-center">
        <div className="flex flex-col md:flex-row gap-12 w-full">
          <div className="md:w-1/3">
            <div className="md:sticky md:top-1/2 md:-translate-y-1/2">
                <h2 className="text-3xl font-bold font-headline mb-4">What we do</h2>
                <p className="font-body font-light text-lg">
                  We believe that change should be more than a concept; it should effectively improve the health and well-being of every child. Our goal is to create solutions that resonate and leave a lasting impact.
                </p>
            </div>
          </div>

          <div className="md:w-2/3 h-full flex items-center justify-center">
            <div className="relative w-full" style={{ height: '30vh' }}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 flex flex-col justify-center p-6 rounded-lg transition-opacity duration-500",
                    activeFeatureIndex === index ? "opacity-100" : "opacity-0"
                  )}
                >
                  <span className="text-sm font-light block mb-2">0{index + 1}</span>
                  <h3 className="text-2xl font-bold font-headline mb-2">{feature.title}</h3>
                  <p className="font-body font-light text-lg">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
