import { AnimatedHero } from '@/components/animated-hero';
import { Header } from '@/components/header';
import { ScrollingFeatures } from '@/components/scrolling-features';
import Image from 'next/image';
import { AnimatedText } from '@/components/animated-text';

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

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <section className="flex flex-col items-center justify-center h-screen px-4">
          <div className="max-w-4xl w-full h-full flex">
            <AnimatedHero />
          </div>
        </section>
        
        <ScrollingFeatures />

        <section
          id="features-section"
          className="relative min-h-screen w-full flex items-center justify-center py-20"
        >
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
          <div className="relative z-10 max-w-6xl w-full px-4 text-white mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-1">
                <h2 className="text-3xl font-bold font-headline mb-4">
                  What's important to us
                </h2>
                <p className="font-body font-light text-lg">
                  We believe that change should be more than a concept; it should effectively improve the health and well-being of every child. Our goal is to create solutions that resonate and leave a lasting impact.
                </p>
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {features.map((feature, index) => (
                  <div key={index} className="p-4 rounded-lg">
                    <span className="text-sm font-light block mb-2">0{index + 1}</span>
                    <h3 className="text-2xl font-bold font-headline mb-2">{feature.title}</h3>
                    <p className="font-body font-light text-lg">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="h-screen w-full flex items-center justify-center text-center px-4 bg-background">
            <div className="max-w-4xl">
              <p className="text-4xl md:text-6xl font-headline font-light leading-tight">
                "There can be no keener revelation of a society's soul than the way in which it treats its children."
              </p>
              <p className="mt-6 text-xl font-body font-bold">— Nelson Mandela</p>
            </div>
        </section>
      </main>
    </div>
  );
}
