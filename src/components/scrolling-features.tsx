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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = featureRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setActiveFeatureIndex(index);
            }
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    featureRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      featureRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <section className="relative w-full py-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3 md:sticky md:top-20 h-max">
            <h2 className="text-3xl font-bold font-headline mb-4">What we do</h2>
            <p className="font-body font-light text-lg">
              We believe that change should be more than a concept; it should effectively improve the health and well-being of every child. Our goal is to create solutions that resonate and leave a lasting impact.
            </p>
          </div>

          <div className="md:w-2/3">
            <div className="flex flex-col gap-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  ref={(el) => (featureRefs.current[index] = el)}
                  className={cn(
                    "p-6 rounded-lg transition-opacity duration-300",
                    activeFeatureIndex === index ? "opacity-100" : "opacity-30"
                  )}
                  style={{ minHeight: '30vh' }}
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
