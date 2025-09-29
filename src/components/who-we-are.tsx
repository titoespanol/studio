
"use client";

import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const teamMembers = [
  {
    name: 'Pilar Puig',
    role: 'Founder',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/child-lens-landing.firebasestorage.app/o/PilarAdult.jpg?alt=media&token=27246f22-facd-4a6f-b23f-d8ccf9171703',
    childImageUrl: 'https://firebasestorage.googleapis.com/v0/b/child-lens-landing.firebasestorage.app/o/Pilar%20Child.jpg?alt=media&token=dda46087-5129-4b71-95aa-79ff0a27bc5f',
    dataAiHint: 'portrait woman',
    linkedinUrl: 'https://www.linkedin.com/in/pilar-puig-s%C3%A0rries-phd/',
    bio: {
      title: 'Pilar Puig',
      content: [
        { text: 'Founder at The Child Lens.', bold: true },
        { text: 'Worked with leading children’s hospitals, top-tier universities, and early-stage healthtech teams across Europe and the UK.' },
        { text: 'Company builder:', bold: true, details: ' licensing, business plan, governance, fundraising.' },
        { text: 'Network orchestrator:', bold: true, details: ' VCs, corporates, family offices, clinicians.' },
        { text: 'Fundraiser:', bold: true, details: ' narrative, materials, investor process.' },
        { text: 'Selected collaborations include:', bold: true, details: ' Sant Joan de Déu Hospital, University of Oxford, DIVE Medical, Gate2Brain, WHI Institute, Ship2B Foundation.' },
        { text: 'Venture Partner', bold: true, details: ' at Montana Impact Fund.' },
      ]
    }
  },
  {
    name: 'Marc Ramis',
    role: 'Advisor',
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
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-5 h-5"
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

export function WhoWeAre({ isChildLensActive, colorClasses }: WhoWeAreProps) {
  const borderColorClass = isChildLensActive ? colorClasses.jupiter : "text-primary";

  return (
    <section id="who-we-are" className="bg-background text-foreground py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-7xl font-headline font-bold text-black mb-8">
          Who we are.
        </h2>
        <div className="max-w-3xl mx-auto text-sm md:text-base font-body text-black mb-16">
          <p>
            We’re not just a team — we’re co-pilots, sparring partners, and system shifters.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-16 max-w-4xl mx-auto">
          {teamMembers.map((member) => {
            const imageUrl = isChildLensActive && member.childImageUrl ? member.childImageUrl : member.imageUrl;
            
            if (member.bio) {
              return (
                <Dialog key={member.name}>
                  <DialogTrigger asChild>
                    <div className="flex flex-col items-center cursor-pointer">
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
                        <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary transition-colors" onClick={(e) => e.stopPropagation()}>
                          <ElegantLinkedinIcon />
                        </a>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold mb-4 font-body">{member.bio.title}</DialogTitle>
                      <DialogDescription asChild>
                        <div className="text-base text-foreground space-y-4 font-body">
                          {member.bio.content.map((item, index) => (
                            <p key={index}>
                              {item.bold ? <strong>{item.text}</strong> : item.text}
                              {item.details}
                            </p>
                          ))}
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              );
            }

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
                <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
