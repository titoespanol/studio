
import { cn } from "@/lib/utils";

type LogoProps = {
  isChildLensActive?: boolean;
  colorClasses?: {
    logo1: string;
    logo2: string;
    logo3: string;
  };
};

export function Logo({ isChildLensActive, colorClasses }: LogoProps) {
  return (
    <div className="relative w-40 h-12 text-4xl font-logo font-bold flex items-center justify-center space-x-2">
      <span className={cn("transition-colors duration-300", isChildLensActive && colorClasses?.logo1)}>The</span>
      <span className={cn("transition-colors duration-300", isChildLensActive && colorClasses?.logo2)}>Child</span>
      <span className={cn("transition-colors duration-300", isChildLensActive && colorClasses?.logo3)}>Lens</span>
    </div>
  );
}
