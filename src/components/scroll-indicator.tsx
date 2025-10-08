"use client";

import { cn } from "@/lib/utils";

export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center">
      <div className="mouse" />
      <p className={cn("scroll-indicator-text")}>
        SCROLL
      </p>
    </div>
  );
}
