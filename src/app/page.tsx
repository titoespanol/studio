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
        <section
          id="features-section"
          className="relative h-screen w-full flex items-center justify-center"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAA5AIQDASIAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAAAAECBgQFBwP/xAAyEAACAQMCBAQEBAcAAAAAAAAAAQIDBBEFBhIhMRNBCBQiUTJhcYEUI0KRscFSYnKh/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xABoRAQEBAQEAAwEAAAAAAAAAAAABEQISIQMTUf/aAAwDAQACEQMRAD8A9xAAAAAAAAAAAAAAAAAAAAAAAAAAAH43GCbbSSWbbPF9W6h3vUOpam6rXHSqQeKdGLxCEey8/q5n2D1LrdK8t6lnWjKnUjyyi+Gj5v1DpVfS9VudNuIycoScoyx80Hujyvle+nS8N6d1p/wAjaQoXMoq6oxUFKTx2qXn6npgPlfRr+40nVLa+t21UpzUsc4fNPsfY1XqHRtS6XUr0o9pSp5hUgs5h3z6Hj9fT5zYADQAAAAAAAAAAAI+9tKV5aVbWtBTpVIuMovaUj4j+H2tXmj61bXtvNvLapyh1eEvFH1QfP+rfh5ZazKVzSuZ0LqS3qJxkovzXY5K4+Dut0pNUq2n1V3Tqyj/qifWgeweV0fwn1W6qRdxXtKFPN23Kcmvkjn1PoXTfw80nQpRrJTubtbpVqmWn9EeEerY+s04wADQAAAAAAAAAAAAAAADx/wCOdFqjpdjdxWadC54VHHZSi2/zFHsBw/4h6VDV+kbyk45qUY9vSfdxeP4yY8n4T1AAvQAAAAAAAAAAAAAAH5OUYRcpNKKWW29kjy3WX4jaHoMpUlKV3dJ4VOlvyv+Z9F6l3qfVut3V/Uk3GMuGnDslFeR8r6f0jVeq3CpWFtOcM4dWa4YR83k+j6P8L9Su6kZ6hXp2lHPFxi+Kf/ABH0LTtNstLs4WdjQjSpQ2UUvxe7fmyUdLj1gANAAAAAAAAAAAAAPz2Afh9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/Z"
              alt="A child's face with dotted light patterns"
              fill
              className="object-cover"
              data-ai-hint="child face"
            />
          </div>
          <div className="absolute inset-0 z-0 bg-black opacity-50"></div>
          <div className="relative z-10 max-w-4xl w-full px-4 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {features.map((feature, index) => (
                <div key={index} className="p-4 rounded-lg">
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
