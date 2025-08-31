import { AnimatedHero } from '@/components/animated-hero';

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <main>
        <section className="flex flex-col items-center justify-center h-screen px-4">
          <div className="max-w-4xl w-full h-full flex">
            <AnimatedHero />
          </div>
        </section>
      </main>
    </div>
  );
}
