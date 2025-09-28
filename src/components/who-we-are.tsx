
"use client";

import Image from 'next/image';

const teamMembers = [
  {
    name: 'Pilar Puig',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/child-lens-landing.firebasestorage.app/o/PilarAdult.jpg?alt=media&token=27246f22-facd-4a6f-b23f-d8ccf9171703',
    dataAiHint: 'portrait woman',
  },
  {
    name: 'Marc Ramis',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/child-lens-landing.firebasestorage.app/o/Marc%20Adult.jpg?alt=media&token=3339e3af-4813-4560-97ce-f1f0069c866d',
    dataAiHint: 'portrait man',
  },
];

export function WhoWeAre() {
  return (
    <section className="bg-background text-foreground py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-7xl font-headline font-bold text-black mb-16">
          Who we are.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-16 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg mb-4">
                <Image
                  src={member.imageUrl}
                  alt={`Portrait of ${member.name}`}
                  fill
                  className="object-cover"
                  data-ai-hint={member.dataAiHint}
                />
              </div>
              <h3 className="text-xl font-bold font-body">{member.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
