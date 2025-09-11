
"use client";

import { cn } from '@/lib/utils';
import { Button } from './ui/button';

type LensToggleButtonProps = {
  isActive: boolean;
  onClick: () => void;
  colorClasses: {
    text: string;
    bg: string;
    border: string;
  };
  isFlashing: boolean;
};

export function LensToggleButton({ isActive, onClick, colorClasses, isFlashing }: LensToggleButtonProps) {
  const buttonText = isActive ? 'Adult lens' : 'Child lens';
  
  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="lg"
      className={cn(
        "font-body font-bold text-lg border-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105",
        isActive 
          ? `${colorClasses.border} ${colorClasses.bg} text-white`
          : "border-primary bg-transparent text-primary hover:bg-primary hover:text-white",
        isFlashing && "pointer-events-none"
      )}
    >
      {buttonText}
    </Button>
  );
}
