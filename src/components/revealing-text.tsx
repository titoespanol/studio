
"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const paragraphs = [
  [
    "We don’t just fix problems.",
    "We strengthen the systems that shape children’s lives.",
    "That’s why, when someone brings us a challenge,",
    "we look at it from different angles",
    "and build solutions that last.",
  ],
  [
    "This is the lens we bring.",
    "And it lives through three ways of working:",
  ],
];

export function RevealingText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeParagraph, setActiveParagraph] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;
      
      let currentScroll = -top;
      if (currentScroll < 0) currentScroll = 0;
      if (currentScroll > scrollableHeight) currentScroll = scrollableHeight;

      const progress = scrollableHeight > 0 ? currentScroll / scrollableHeight : 1;
      const currentParagraph = Math.min(paragraphs.length - 1, Math.floor(progress * paragraphs.length));

      setActiveParagraph(currentParagraph);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={containerRef} className="bg-background text-foreground" style={{ height: `${paragraphs.length * 80}vh` }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <div className="w-full md:w-1/2 px-4 font-body text-xl md:text-2xl font-normal leading-relaxed pt-32">
          <div className="relative h-48">
            {paragraphs.map((p, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-in-out",
                  activeParagraph === index ? "opacity-100" : "opacity-0"
                )}
              >
                {p.map((line, lineIndex) => (
                  <p key={lineIndex}>{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
