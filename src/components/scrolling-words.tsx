
"use client";
import React from 'react';
import { cn } from "@/lib/utils";

const colorPalette = [
    "#d45324",
    "#ffb53a",
    "#f291bc",
    "#419ebf",
    "#f27236",
    "#9c4a79",
];

const words = ["Meet", "Collaborate", "Solve", "Play", "Win"];

type ScrollingWordsProps = {
    colorClasses: {
        text: string;
    };
};

export function ScrollingWords({ colorClasses }: ScrollingWordsProps) {

    const wordColors = words.map((_, index) => {
        return colorPalette[index % colorPalette.length];
    });

    return (
        <section id="scrolling-words-section" className="scrolling-words-section">
            <h2>We Can&nbsp;</h2>
            <ul style={{ '--count': words.length } as React.CSSProperties}>
                {words.map((word, index) => (
                    <li key={word} style={{ '--i': index, color: wordColors[index] } as React.CSSProperties}>
                        {word}
                    </li>
                ))}
            </ul>
        </section>
    );
}
