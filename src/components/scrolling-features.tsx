"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatedText } from "./animated-text";
import Image from "next/image";

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
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [textProgress, setTextProgress] = useState(0);
  const [featureProgress, setFeatureProgress] = useState(new Array(features.length).fill(0));

  useEffect(() => {
    const handleScroll = () => {
      if (!textContainerRef.current) return;
      
      const { top, height } = textContainerRef.current.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;

      // Text progress for "What we do" section
      const textAnimationStart = window.innerHeight * 0.5;
      const textAnimationEnd = window.innerHeight * 0.2;
      const newTextProgress = Math.max(0, Math.min(1, (textAnimationStart - top) / (textAnimationStart - textAnimationEnd)));
      setTextProgress(newTextProgress);

      // Feature progress calculation
      const featureScrollLength = scrollableHeight / features.length;
      let currentScroll = -top;
      
      if (currentScroll < 0) currentScroll = 0;
      if (currentScroll > scrollableHeight) currentScroll = scrollableHeight;

      const currentFeatureIndex = Math.min(features.length - 1, Math.floor(currentScroll / featureScrollLength));
      setActiveFeatureIndex(currentFeatureIndex);

      const newFeatureProgress = features.map((_, index) => {
        const featureStart = featureScrollLength * index;
        const progressInFeature = (currentScroll - featureStart) / featureScrollLength;
        return Math.max(0, Math.min(1, progressInFeature));
      });
      setFeatureProgress(newFeatureProgress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="features-section" ref={containerRef} className="relative w-full py-20 bg-background text-foreground" style={{ height: `${features.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full">
        <div className="absolute inset-0 z-0">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/child-lens-landing.firebasestorage.app/o/portrait-2025-02-11-15-26-54-utc%20(1).jpg?alt=media&token=70b462e8-f371-4b30-a8a7-5cb2a5c40811"
              alt="A child's face with dotted light patterns"
              fill
              className="object-cover"
              data-ai-hint="child face"
            />
          </div>
        <div className="absolute inset-0 z-0 bg-black opacity-50"></div>
      </div>
      <div ref={textContainerRef} className="absolute top-0 left-0 w-full" style={{ height: `${features.length * 100}vh` }}>
        <div className="sticky top-0 max-w-6xl mx-auto px-4 h-screen flex items-center z-10 text-white">
          <div className="flex flex-col md:flex-row gap-12 w-full">
            <div className="md:w-1/3">
              <div className="flex flex-col justify-center h-full">
                  <h2 className="text-3xl font-bold font-headline mb-4">
                    <AnimatedText text="What we do" progress={textProgress} />
                  </h2>
                  <p className="font-body font-light text-xl">
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
                    <p className="font-body font-light text-xl">
                      <AnimatedText text={feature.description} progress={featureProgress[index]} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
