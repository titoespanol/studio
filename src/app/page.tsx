import { AnimatedHero } from '@/components/animated-hero';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <section className="flex flex-col items-center justify-center min-h-screen px-4 pt-24">
          <div className="max-w-4xl w-full">
            <AnimatedHero />
          </div>
        </section>
      </main>
    </div>
  );
}
