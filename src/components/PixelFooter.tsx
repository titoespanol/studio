
"use client";

import { PixelCanvas } from "./pixel-canvas";
import { useEffect, useState } from "react";

export function PixelFooter() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <footer className="w-full h-40">
      {isClient && <PixelCanvas />}
    </footer>
  );
}
