"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export function CustomCursor() {
  const followerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const movementTimeoutRef = useRef<NodeJS.Timeout>();

  const onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    mousePos.current = { x: clientX, y: clientY };
    const target = event.target as HTMLElement;
    setIsPointer(window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer');

    setIsMoving(true);
    if (movementTimeoutRef.current) {
      clearTimeout(movementTimeoutRef.current);
    }
    movementTimeoutRef.current = setTimeout(() => setIsMoving(false), 300);
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (movementTimeoutRef.current) {
        clearTimeout(movementTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      if (followerRef.current) {
        const distX = mousePos.current.x - followerPos.current.x;
        const distY = mousePos.current.y - followerPos.current.y;
        
        followerPos.current.x += distX * 0.1;
        followerPos.current.y += distY * 0.1;
        
        followerRef.current.style.transform = `translate3d(${followerPos.current.x - 12}px, ${followerPos.current.y - 12}px, 0)`;
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
        if(requestRef.current) {
            cancelAnimationFrame(requestRef.current)
        }
    };
  }, []);

  return (
    <div
      ref={followerRef}
      className={cn(
        "hidden md:flex items-center justify-center fixed w-8 h-8 pointer-events-none z-[9999] transition-transform duration-200 text-foreground",
        isPointer ? "scale-150" : "scale-100",
      )}
    >
      {isMoving ? <Eye size={24} /> : <EyeOff size={24} />}
    </div>
  );
}
