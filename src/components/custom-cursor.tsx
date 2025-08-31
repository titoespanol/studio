"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const followerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById('features-section');
      if (featuresSection) {
        const { top, bottom } = featuresSection.getBoundingClientRect();
        const isIntersecting = top < window.innerHeight && bottom > 0;
        setIsOverDark(isIntersecting);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      mousePos.current = { x: clientX, y: clientY };
      const target = event.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer');
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      if (followerRef.current) {
        const distX = mousePos.current.x - followerPos.current.x;
        const distY = mousePos.current.y - followerPos.current.y;
        
        followerPos.current.x += distX * 0.1;
        followerPos.current.y += distY * 0.1;
        
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
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
        "hidden md:flex items-center justify-center fixed w-8 h-8 rounded-full pointer-events-none z-[9999] transition-all duration-200 bg-transparent border -translate-x-1/2 -translate-y-1/2",
        isPointer ? "scale-125" : "scale-100",
        isOverDark ? "border-white" : "border-black"
      )}
    >
        <div className={cn(
          "w-1 h-1 rounded-full transition-colors duration-200",
          isOverDark ? "bg-white" : "bg-black"
        )}></div>
    </div>
  );
}
