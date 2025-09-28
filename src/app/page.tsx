
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatedHero } from '@/components/animated-hero';
import { Header } from '@/components/header';
import { ScrollingFeatures } from '@/components/scrolling-features';
import { cn } from '@/lib/utils';
import { ScienceToSystems } from '@/components/science-to-systems';
import { RevealingText } from '@/components/revealing-text';
import { WhoWeAre } from '@/components/who-we-are';
import { ContactUs } from '@/components/contact-us';

const colorPalette = [
  { text: "text-[#d45324]", bg: "bg-[#d45324]", border: "border-[#d45324]" },
  { text: "text-[#ffb53a]", bg: "bg-[#ffb53a]", border: "border-[#ffb53a]" },
  { text: "text-[#f291bc]", bg: "bg-[#f291bc]", border: "border-[#f291bc]" },
  { text: "text-[#419ebf]", bg: "bg-[#419ebf]", border: "border-[#419ebf]" },
  { text: "text-[#f27236]", bg: "bg-[#f27236]", border: "border-[#f27236]" },
  { text: "text-[#9c4a79]", bg: "bg-[#9c4a79]", border: "border-[#9c4a79]" },
];

const getRandomColorClasses = () => {
  const shuffled = [...colorPalette].sort(() => 0.5 - Math.random());
  return {
    text: shuffled[0].text,
    bg: shuffled[0].bg,
    border: shuffled[0].border,
    logo1: shuffled[0].text,
    logo2: shuffled[1].text,
    logo3: shuffled[2].text,
    jupiter: shuffled[3].text,
    pieceOfCake: shuffled[4].text,
    we1: shuffled[0].text,
    we2: shuffled[1].text,
    we3: shuffled[2].text,
    we4: shuffled[3].text,
  };
};

export default function Home() {
  const [isChildLensActive, setIsChildLensActive] = useState(false);
  const [activeColorClasses, setActiveColorClasses] = useState({
    text: colorPalette[0].text,
    bg: colorPalette[0].bg,
    border: colorPalette[0].border,
    logo1: colorPalette[0].text,
    logo2: colorPalette[1].text,
    logo3: colorPalette[2].text,
    jupiter: colorPalette[3].text,
    pieceOfCake: colorPalette[4].text,
    we1: colorPalette[0].text,
    we2: colorPalette[1].text,
    we3: colorPalette[2].text,
    we4: colorPalette[3].text,
  });
  const [isFlashing, setIsFlashing] = useState(true);
  const [heroAnimationFinished, setHeroAnimationFinished] = useState(false);

  useEffect(() => {
    if (!heroAnimationFinished) return;

    setIsFlashing(true);
    const timeouts: NodeJS.Timeout[] = [];
    
    const flashSequence = [
      { active: true, delay: 500 },
      { active: false, delay: 300 },
      { active: true, delay: 500 },
      { active: false, delay: 300 },
      { active: true, delay: 500 },
      { active: false, delay: 300 },
    ];

    let cumulativeDelay = 1000;

    flashSequence.forEach(({ active, delay }) => {
      const timeout = setTimeout(() => {
        setIsChildLensActive(active);
        if (active) {
          setActiveColorClasses(getRandomColorClasses());
        }
      }, cumulativeDelay);
      timeouts.push(timeout);
      cumulativeDelay += delay;
    });

    const finalTimeout = setTimeout(() => {
      setIsFlashing(false);
    }, cumulativeDelay);
    timeouts.push(finalTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [heroAnimationFinished]);
  
  const handleToggleLens = () => {
    if (isFlashing) return;
    setIsChildLensActive(prev => {
      const nextState = !prev;
      if (nextState) {
        setActiveColorClasses(getRandomColorClasses());
      }
      return nextState;
    });
  };

  return (
    <div className={cn("bg-background text-foreground", isChildLensActive && "bg-transparent")}>
      <div className={cn("fixed inset-0 z-[-1] transition-opacity duration-200", isChildLensActive ? "opacity-100" : "opacity-0")}>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/child-lens-landing.firebasestorage.app/o/Boho%20Pattern%207.jpg?alt=media&token=319b2028-afc4-4dd2-8282-5dfcabdafdb4"
          alt="Boho pattern background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <Header 
        isFlashing={isChildLensActive} 
        flashColor={activeColorClasses.text}
        isChildLensActive={isChildLensActive}
        onToggleLens={handleToggleLens}
        colorClasses={activeColorClasses}
        isToggleFlashing={isFlashing}
        heroAnimationFinished={heroAnimationFinished}
      />
      <main>
        <section className="flex flex-col items-center justify-center h-screen px-4">
          <div className="max-w-4xl w-full h-full flex flex-col items-center justify-center">
            <div className="w-full">
              <AnimatedHero 
                onAnimationComplete={() => setHeroAnimationFinished(true)} 
                isFlashActive={isChildLensActive}
                colorClasses={activeColorClasses}
              />
            </div>
          </div>
        </section>
        
        <div className={cn(isChildLensActive && activeColorClasses.text)}>
          <ScrollingFeatures 
            isChildLensActive={isChildLensActive} 
            colorClasses={activeColorClasses} 
          />
        </div>

        <RevealingText colorClasses={activeColorClasses} />

        <ScienceToSystems colorClasses={activeColorClasses} />

        <WhoWeAre />
        
        <section className="relative h-screen w-full flex items-center justify-center text-center px-4 text-[#f2efe8]">
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/child-lens-landing.firebasestorage.app/o/portrait-2025-02-11-15-26-54-utc%20(1).jpg?alt=media&token=70b462e8-f371-4b30-a8a7-5cb2a5c40811"
                    alt="Nelson Mandela"
                    fill
                    className="object-cover"
                    data-ai-hint="portrait man"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>
            <div className="max-w-4xl z-10">
              <p className="text-4xl md:text-6xl font-headline font-light leading-tight">
                "There can be no keener revelation of a society's soul than the way in which it treats its children."
              </p>
              <p className="mt-6 text-xl font-body font-bold">— Nelson Mandela</p>
            </div>
        </section>

        <ContactUs />
      </main>
    </div>
  );
}
