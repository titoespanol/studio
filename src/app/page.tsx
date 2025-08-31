import { AnimatedWords } from '@/components/animated-words';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 pt-24">
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tight">
              Children's health.
            </h1>
            <div className="relative h-24 md:h-28 w-full">
              <AnimatedWords words={['Farther.', 'Faster.', 'Forward.']} />
            </div>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              The Child Lens is a platform for systemic change in children’s
              health. We build ventures from scratch, walk hand-in-hand with
              startups, and shift the perspectives of those in power — all to
              unearth the deep roots of systems that fail our children’s health.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
