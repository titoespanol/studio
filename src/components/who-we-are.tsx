
"use client";

import Image from 'next/image';
import { cn } from '@/lib/utils';

const teamMembers = [
  {
    name: 'Pilar Puig',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/child-lens-landing.firebasestorage.app/o/PilarAdult.jpg?alt=media&token=27246f22-facd-4a6f-b23f-d8ccf9171703',
    childImageUrl: 'https://firebasestorage.googleapis.com/v0/b/child-lens-landing.firebasestorage.app/o/Pilar%20Child.jpg?alt=media&token=dda46087-5129-4b71-95aa-79ff0a27bc5f',
    dataAiHint: 'portrait woman',
    linkedinUrl: 'https://www.linkedin.com/in/pilar-puig-s%C3%A0rries-phd/',
  },
  {
    name: 'Marc Ramis',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/child-lens-landing.firebasestorage.app/o/Marc%20Adult.jpg?alt=media&token=3339e3af-4813-4560-97ce-f1f0069c866d',
    childImageUrl: 'https://firebasestorage.googleapis.com/v0/b/child-lens-landing.firebasestorage.app/o/marc%20child.jpg?alt=media&token=55ff189e-36f9-4dfe-ba53-4f287100bb3e',
    dataAiHint: 'portrait man',
    linkedinUrl: 'https://www.linkedin.com/in/markramis/',
  },
];

type WhoWeAreProps = {
  isChildLensActive?: boolean;
  colorClasses: {
    jupiter: string;
  };
};

const ElegantLinkedinIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="w-5 h-5"
    >
      <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.25 6.5 1.75 1.75 0 0 1 6.5 8.25ZM19 19h-3v-4.75c0-1.4-1.1-2.5-2.5-2.5S11 12.85 11 14.25V19h-3v-9h2.9v1.35c.7-1.2 2-1.85 3.35-1.85A3.75 3.75 0 0 1 19 12.25z"></path>
    </svg>
);

export function WhoWeAre({ isChildLensActive, colorClasses }: WhoWeAreProps) {
  const borderColorClass = isChildLensActive ? colorClasses.jupiter : "text-primary";

  return (
    <section className="bg-background text-foreground py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-7xl font-headline font-bold text-black mb-16">
          Who we are.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-16 max-w-4xl mx-auto">
          {teamMembers.map((member) => {
            const imageUrl = isChildLensActive && member.childImageUrl ? member.childImageUrl : member.imageUrl;
            return (
              <div key={member.name} className="flex flex-col items-center">
                <div className={cn("relative w-40 h-40 md:w-48 md:h-48 rounded-full p-1 border-2 border-dotted", borderColorClass)}>
                  <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg">
                    <Image
                      src={imageUrl}
                      alt={`Portrait of ${member.name}`}
                      fill
                      className="object-cover"
                      data-ai-hint={member.dataAiHint}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <h3 className="text-xl font-bold font-body">{member.name}</h3>
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary transition-colors">
                    <ElegantLinkedinIcon />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
