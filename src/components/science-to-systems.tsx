
"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

const sections = [
  {
    smallTitle: "The Builder",
    mainTitle: "From Science to Systems",
    content: "We sit next to you and turn your science into a paediatric venture, step by step. Together, we define the value proposition, map risks — clinical, regulatory, and product-related — check your IP position, and agree on go/no-go criteria that feel fair and doable. We help you shape endpoints that matter to children and clinicians, design with ethics and privacy from the start, and outline a realistic path to first-in-child data. We craft the essentials — one-pager, deck, pilot brief, budget, and a clear, fundable story. We open doors to investors, hospitals and partners — but you keep the steering wheel.",
    colorClass: "text-[#d45324]", // Example color, will be overridden
  },
  {
    smallTitle: "The Right Hand",
    mainTitle: "From Science to Systems",
    content: "We act as your right hand in paediatric innovation, sitting beside your team to make the path clear and doable. With deep experience across biotech, medtech and digital health — from boardrooms to hands-on execution — we bring clarity on what matters next, focus on the few moves that truly move the needle, and momentum to keep things moving. We don’t just advise from afar — we roll up our sleeves and help make progress real.",
    colorClass: "text-[#ffb53a]",
  },
  // {
  //   smallTitle: "The Voice",
  //   mainTitle: "From Science to Systems",
  //   content: "...",
  // }
];

type ScienceToSystemsProps = {
    colorClasses: {
        text: string;
    };
};

export function ScienceToSystems({ colorClasses }: ScienceToSystemsProps) {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;
      
      let currentScroll = -top;
      if (currentScroll < 0) currentScroll = 0;
      if (currentScroll > scrollableHeight) currentScroll = scrollableHeight;
      
      const sectionScrollLength = scrollableHeight / sections.length;
      const currentSectionIndex = Math.min(sections.length - 1, Math.floor(currentScroll / sectionScrollLength));

      if (currentSectionIndex !== activeSection) {
        setActiveSection(currentSectionIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);


  return (
    <section ref={containerRef} className="bg-background text-foreground relative" style={{ height: `${sections.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 text-center flex flex-col items-center justify-center h-full">
            <div className="relative w-full max-w-3xl">
                {sections.map((section, index) => (
                    <div 
                        key={index}
                        className={cn(
                            "absolute inset-0 transition-opacity duration-700 ease-in-out",
                            activeSection === index ? "opacity-100" : "opacity-0"
                        )}
                    >
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="mb-12">
                                <h3 className={cn("text-xl font-bold", colorClasses.text)}>
                                    {section.smallTitle}
                                </h3>
                                <h1 className="text-6xl font-bold font-headline tracking-tighter">
                                    {section.mainTitle}
                                </h1>
                            </div>
                            <p className="text-base md:text-lg font-body leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}

    