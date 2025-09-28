
"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { AnimatedText } from "./animated-text";

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
    rawContent: "We sit next to you and turn your science into a paediatric venture, step by step. Together, we define the value proposition, map risks — clinical, regulatory, and product-related — check your IP position, and agree on go/no-go criteria that feel fair and doable. We help you shape endpoints that matter to children and clinicians, design with ethics and privacy from the start, and outline a realistic path to first-in-child data. We craft the essentials — one-pager, deck, pilot brief, budget, and a clear, fundable story. We open doors to investors, hospitals and partners — but you keep the steering wheel.",
    content: (progress: number) => (
        <p>
            <AnimatedText progress={progress} text="We sit next to you and turn your science into a paediatric venture, step by step. Together, we define the value proposition, map risks — clinical, regulatory, and product-related — check your IP position, and agree on go/no-go criteria that feel fair and doable. We help you shape endpoints that matter to children and clinicians, design with ethics and privacy from the start, and outline a realistic path to first-in-child data. We craft the essentials — one-pager, deck, pilot brief, budget, and a clear, fundable story. We open doors to investors, hospitals and partners — but you keep the steering wheel." />
        </p>
    ),
  },
  {
    smallTitle: "The Right Hand",
    rawContent: "We act as your right hand in paediatric innovation, sitting beside your team to make the path clear and doable. With deep experience across biotech, medtech and digital health — from boardrooms to hands-on execution — we bring clarity on what matters next, focus on the few moves that truly move the needle, and momentum to keep things moving. We don’t just advise from afar — we roll up our sleeves and help make progress real.",
    content: (progress: number) => (
        <p>
            <AnimatedText progress={progress} text="We act as your right hand in paediatric innovation, sitting beside your team to make the path clear and doable. With deep experience across biotech, medtech and digital health — from boardrooms to hands-on execution — we bring clarity on what matters next, focus on the few moves that truly move the needle, and momentum to keep things moving. We don’t just advise from afar — we roll up our sleeves and help make progress real." />
        </p>
    ),
  },
  {
    smallTitle: "The Voice",
    rawContent: "We work to make children’s health impossible to ignore. With clarity and courage, we engage directly with policymakers, hospital leaders, funders and other system actors to shift how decisions are made and whose needs are prioritised. We speak the language of science, but also of policy, equity and long-term impact. Because transforming children’s health requires more than great ventures — it demands structural change, bold voices, and a collective willingness to rethink the rules.",
    content: (progress: number) => (
        <p>
            <AnimatedText progress={progress} text="We work to make children’s health impossible to ignore. With clarity and courage, we engage directly with policymakers, hospital leaders, funders and other system actors to shift how decisions are made and whose needs are prioritised. We speak the language of science, but also of policy, equity and long-term impact. Because transforming children’s health requires more than great ventures — it demands structural change, bold voices, and a collective willingness to rethink the rules." />
        </p>
    ),
  }
];


export function ScienceToSystems({ colorClasses }: ScienceToSystemsProps) {
  const sections = getSections({ colorClasses });
  const [activeSection, setActiveSection] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
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

      const progressInSection = (currentScroll - (currentSectionIndex * sectionScrollLength)) / sectionScrollLength;
      setSectionProgress(Math.max(0, Math.min(1, progressInSection)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection, sections.length]);


  return (
    <section ref={containerRef} className="bg-background text-foreground relative" style={{ height: `${sections.length * 120}vh` }}>
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
                <div className="relative h-48 md:h-56 font-body text-base md:text-lg leading-relaxed">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className={cn(
                                "absolute inset-0 transition-opacity duration-700 ease-in-out",
                                activeSection === index ? "opacity-100" : "opacity-0"
                            )}
                        >
                          {activeSection === index ? section.content(sectionProgress) : section.content(0)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
