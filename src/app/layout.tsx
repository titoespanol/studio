import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ScrollProgressBar } from '@/components/scroll-progress-bar';

export const metadata: Metadata = {
  title: 'Child Lens Landing',
  description: 'A platform for systemic change in children’s health.',
};

const colorPalette = [
  "#d45324",
  "#ffb53a",
  "#f291bc",
  "#419ebf",
  "#f27236",
  "#9c4a79",
];

const sections = [
  'hero-section',
  'features-section',
  'revealing-text-section',
  'science-to-systems-section',
  'who-we-are',
  'mandela-section',
  'contact'
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
        <link href="https://fonts.googleapis.com/css2?family=Sniglet:wght@400;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ScrollProgressBar colors={colorPalette} sections={sections} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
