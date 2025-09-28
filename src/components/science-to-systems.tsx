
"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

type ScienceToSystemsProps = {
    colorClasses: {
        text: string;
        we1: string;
        we2: string;
        we3: string;
        we4: string;
    };
};

const getSections = ({ colorClasses }: ScienceToSystemsProps) => [
  {
    smallTitle: "The Builder",
    content: (
        <p className="font-body text-base md:text-lg leading-relaxed">
            <span className={cn("font-bold text-lg", colorClasses.we1)}>We</span> sit next to you and turn your science into a paediatric venture, step by step. Together, we define the value proposition, map risks — clinical, regulatory, and product-related — check your IP position, and agree on go/no-go criteria that feel fair and doable. <span className={cn("font-bold text-lg", colorClasses.we2)}>We</span> help you shape endpoints that matter to children and clinicians, design with ethics and privacy from the start, and outline a realistic path to first-in-child data. <span className={cn("font-bold text-lg", colorClasses.we3)}>We</span> craft the essentials — one-pager, deck, pilot brief, budget, and a clear, fundable story. <span className={cn("font-bold text-lg", colorClasses.we4)}>We</span> open doors to investors, hospitals and partners — but you keep the steering wheel.
        </p>
    ),
  },
  {
    smallTitle: "The Right Hand",
    content: (
        <p className="font-body text-base md:text-lg leading-relaxed">
            <span className={cn("font-bold text-lg", colorClasses.text)}>We</span> act as your right hand in paediatric innovation, sitting beside your team to make the path clear and doable. With deep experience across biotech, medtech and digital health — from boardrooms to hands-on execution — we bring clarity on what matters next, focus on the few moves that truly move the needle, and momentum to keep things moving. <span className={cn("font-bold text-lg", colorClasses.we1)}>We</span> don’t just advise from afar — <span className={cn("font-bold text-lg", colorClasses.we2)}>we</span> roll up our sleeves and help make progress real.
        </p>
    ),
  },
  {
    smallTitle: "The Voice",
    content: (
        <p className="font-body text-base md:text-lg leading-relaxed">
            <span className={cn("font-bold text-lg", colorClasses.we1)}>We</span> work to make children’s health impossible to ignore. With clarity and courage, <span className={cn("font-bold text-lg", colorClasses.we2)}>we</span> engage directly with policymakers, hospital leaders, funders and other system actors to shift how decisions are made and whose needs are prioritised. <span className={cn("font-bold text-lg", colorClasses.we3)}>We</span> speak the language of science, but also of policy, equity and long-term impact. Because transforming children’s health requires more than great ventures — it demands structural change, bold voices, and a collective willingness to rethink the rules.
        </p>
    ),
  }
];


export function ScienceToSystems({ colorClasses }: ScienceToSystemsProps) {
  const sections = getSections({ colorClasses });
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
  }, [activeSection, sections.length]);


  return (
    <section ref={containerRef} className="bg-background text-foreground relative" style={{ height: `${sections.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 text-center flex flex-col items-center justify-center h-full">
            <div className="w-full max-w-3xl">
                <div className="mb-12">
                    <h3 className={cn("text-xl font-bold", colorClasses.text)}>
                        {sections[activeSection].smallTitle}
                    </h3>
                    <h1 className="text-6xl font-bold font-headline tracking-tighter">
                        From Science to Systems
                    </h1>
                </div>
                <div className="relative h-48 md:h-56">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className={cn(
                                "absolute inset-0 transition-opacity duration-700 ease-in-out",
                                activeSection === index ? "opacity-100" : "opacity-0"
                            )}
                        >
                          {section.content}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
