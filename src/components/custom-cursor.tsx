"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const OpenEyeIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

const ClosedEyeIcon = ({ size = 24 }: { size?: number }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 32 18" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M2.14999 6.00977C-0.780008 10.3298 2.58999 15.6598 8.84999 16.4998" />
        <path d="M29.85 6.00977C32.78 10.3298 29.41 15.6598 23.15 16.4998" />
        <path d="M3.29999 3.44995L1.09999 1.24995" />
        <path d="M28.7 3.44995L30.9 1.24995" />
        <path d="M9 10.2L8.25 8.1" />
        <path d="M23 10.2L23.75 8.1" />
        <path d="M16 11.55V9.45" />
    </svg>
);


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
      {isMoving ? <OpenEyeIcon size={24} /> : <ClosedEyeIcon size={24} />}
    </div>
  );
}
