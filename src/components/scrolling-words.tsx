
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

const colorPalette = [
    "#d45324",
    "#ffb53a",
    "#f291bc",
    "#419ebf",
    "#f27236",
    "#9c4a79",
];

const words = ["Meet", "Collaborate", "Solve", "Play", "Win?"];

type ScrollingWordsProps = {
    colorClasses: {
        text: string;
    };
};

export function ScrollingWords({ colorClasses }: ScrollingWordsProps) {
    const [titleVisible, setTitleVisible] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTitleVisible(true);
                }
            },
            {
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    const wordColors = words.map((_, index) => {
        return colorPalette[index % colorPalette.length];
    });

    return (
        <section id="scrolling-words-section" ref={containerRef} className="scrolling-words-section">
            <h2 className={cn('transition-opacity duration-1000', titleVisible ? 'opacity-100' : 'opacity-0')}>Why don't we&nbsp;</h2>
            <ul style={{ '--count': words.length } as React.CSSProperties} className={cn('transition-opacity duration-1000', titleVisible ? 'opacity-100' : 'opacity-0')}
            style={{transitionDelay: titleVisible ? '500ms' : '0ms' }}>
                {words.map((word, index) => (
                    <li key={word} style={{ '--i': index, color: wordColors[index] } as React.CSSProperties}>
                        {word}
                    </li>
                ))}
            </ul>
        </section>
    );
}
