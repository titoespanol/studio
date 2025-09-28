"use client";

import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

type AnimatedBlockProps = {
  children: React.ReactNode;
  className?: string;
};

const AnimatedBlock = ({ children, className }: AnimatedBlockProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-in-out',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className
      )}
    >
      {children}
    </div>
  );
};

export function VentureBuilding() {
  return (
    <section className="bg-white text-black py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <AnimatedBlock>
          <h2 className="text-center text-4xl font-headline font-bold tracking-tight sm:text-5xl">
            Hands-On Venture Building
          </h2>
        </AnimatedBlock>

        <div className="mt-20 space-y-20">
          {/* Section 1: The Builder */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-16">
            <div className="max-w-2xl mx-auto">
              <AnimatedBlock>
                <h3 className="text-3xl font-headline font-bold tracking-tight">The Builder</h3>
                <p className="mt-4 text-xl font-body italic">
                  We sit next to you, and turn your science into a paediatric venture, step by step.
                </p>
              </AnimatedBlock>

              <div className="mt-10 space-y-8">
                <AnimatedBlock>
                  <h4 className="text-xl font-headline font-bold">Building New Ventures</h4>
                  <p className="mt-2 text-lg font-body font-bold">What we do</p>
                  <ul className="mt-4 space-y-3 text-lg font-body text-gray-700 list-disc pl-5">
                    <li>Together we define the value proposition, map risks (clinical, regulatory, product), check IP position, and agree go/no-go criteria that feel fair and doable.</li>
                    <li>Endpoints that matter to children and clinicians; ethics and privacy by design; a realistic path to first-in-child data.</li>
                    <li>One-pager, deck, pilot brief, budget, and a clean story. We open doors to investors, hospitals and partners; you keep the steering wheel.</li>
                  </ul>
                </AnimatedBlock>
              </div>
            </div>
          </div>

          {/* Section 2: The Right Hand */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-16">
            <div className="max-w-2xl mx-auto">
              <AnimatedBlock>
                <h3 className="text-3xl font-headline font-bold tracking-tight">The Right Hand</h3>
                <p className="mt-4 text-xl font-body">Your right hand for paediatric startups.</p>
                <p className="mt-2 text-xl font-body">We sit beside your team to make the path clear and doable.</p>
              </AnimatedBlock>

              <div className="mt-10 space-y-8">
                <AnimatedBlock>
                  <h4 className="text-xl font-headline font-bold">Consulting for Impact</h4>
                  <p className="mt-2 text-lg font-body">We’ve been inside biotech, med-device and digital health — from boardrooms to the build.</p>
                  <p className="mt-4 text-lg font-body font-bold">What we bring</p>
                  <ul className="mt-4 space-y-3 text-lg font-body text-gray-700 list-disc pl-5">
                    <li>Clarity on what matters next.</li>
                    <li>Focus on the few moves that move the needle.</li>
                    <li>Momentum — we help do the work, not just advise.</li>
                  </ul>
                </AnimatedBlock>
              </div>
            </div>
          </div>
          
          {/* Section 3: The Voice */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-16">
            <div className="max-w-2xl mx-auto">
              <AnimatedBlock>
                <h3 className="text-3xl font-headline font-bold tracking-tight">The Voice</h3>
                <p className="mt-4 text-xl font-body">Make children’s health impossible to ignore.</p>
              </AnimatedBlock>
              
              <div className="mt-10 space-y-8">
                <AnimatedBlock>
                  <h4 className="text-xl font-headline font-bold">Influencing the System</h4>
                  <p className="mt-2 text-lg font-body">With clarity and courage, we engage with policymakers and system leaders to shift perspectives and advocate for systemic change.</p>
                </AnimatedBlock>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
