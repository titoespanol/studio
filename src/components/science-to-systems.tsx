
"use client";

import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

const sections = [
  {
    smallTitle: "The Builder",
    mainTitle: "From Science to Systems",
    content: "We sit next to you and turn your science into a paediatric venture, step by step. Together, we define the value proposition, map risks — clinical, regulatory, and product-related — check your IP position, and agree on go/no-go criteria that feel fair and doable. We help you shape endpoints that matter to children and clinicians, design with ethics and privacy from the start, and outline a realistic path to first-in-child data. We craft the essentials — one-pager, deck, pilot brief, budget, and a clear, fundable story. We open doors to investors, hospitals and partners — but you keep the steering wheel.",
    colorClass: "text-[#d45324]", // Example color, will be overridden
  },
  // {
  //   smallTitle: "The Right Hand",
  //   mainTitle: "From Science to Systems",
  //   content: "...",
  // },
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

const AnimatedContent = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.5,
    });

    return (
        <div
            ref={ref}
            className={cn(
                "transition-all duration-1000 ease-in-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                className
            )}
        >
            {children}
        </div>
    );
};


export function ScienceToSystems({ colorClasses }: ScienceToSystemsProps) {
  const currentSection = sections[0]; // For now, only show the first section

  return (
    <section className="bg-background text-foreground py-24">
      <div className="container mx-auto px-4 text-center flex flex-col items-center">
        
        <AnimatedContent>
            <h3 className={cn("text-xl font-bold mb-4", colorClasses.text)}>
                {currentSection.smallTitle}
            </h3>
        </AnimatedContent>

        <AnimatedContent>
            <h1 className="text-6xl font-bold font-headline tracking-tighter mb-12">
                {currentSection.mainTitle}
            </h1>
        </AnimatedContent>

        <AnimatedContent>
            <p className="max-w-3xl text-base md:text-lg font-body leading-relaxed">
                {currentSection.content}
            </p>
        </AnimatedContent>
        
      </div>
    </section>
  );
}
