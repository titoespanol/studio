import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ScrollProgressBar } from '@/components/scroll-progress-bar';

export const metadata: Metadata = {
  title: 'Child Lens Landing',
  description: 'A platform for systemic change in children’s health.',
};

const colorPalette = [
  { text: "text-[#d45324]", bg: "bg-[#d45324]", border: "border-[#d45324]" },
  { text: "text-[#ffb53a]", bg: "bg-[#ffb53a]", border: "border-[#ffb53a]" },
  { text: "text-[#f291bc]", bg: "bg-[#f291bc]", border: "border-[#f291bc]" },
  { text: "text-[#419ebf]", bg: "bg-[#419ebf]", border: "border-[#419ebf]" },
  { text: "text-[#f27236]", bg: "bg-[#f27236]", border: "border-[#f27236]" },
  { text: "text-[#9c4a79]", bg: "bg-[#9c4a79]", border: "border-[#9c4a79]" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">
        <ScrollProgressBar colors={colorPalette.map(c => c.bg)} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
