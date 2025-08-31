import { AnimatedHero } from '@/components/animated-hero';
import { Header } from '@/components/header';
import { ScrollingFeatures } from '@/components/scrolling-features';

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
