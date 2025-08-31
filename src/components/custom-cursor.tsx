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
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M17.5 10.5C15.5 12.5 13 13.5 10 13.5" />
        <path d="M6 10.5L3 9" />
        <path d="M10 13.5L8.5 12" />
        <path d="M14 13.5L15.5 12" />
        <path d="M17.5 10.5L21 9" />
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
