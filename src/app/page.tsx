import { AnimatedHero } from '@/components/animated-hero';
import { Header } from '@/components/header';
import Image from 'next/image';

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
        <section className="relative h-screen w-full flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://picsum.photos/1200/800"
              alt="A child's face with dotted light patterns"
              fill
              className="object-cover filter grayscale brightness-50"
              data-ai-hint="child face"
            />
          </div>
          <div className="relative z-10 max-w-4xl w-full px-4 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {features.map((feature, index) => (
                <div key={index} className="p-4 rounded-lg bg-black bg-opacity-20">
                  <h3 className="text-2xl font-bold font-headline mb-2">{feature.title}</h3>
                  <p className="font-body font-light text-lg">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
