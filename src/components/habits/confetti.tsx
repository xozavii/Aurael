'use client';

import { useEffect, useState } from "react";

const confettiColors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
    '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
    '#ff5722'
];

const ConfettiPiece = ({ initialX, initialY, initialAngle, color }: { initialX: number, initialY: number, initialAngle: number, color: string }) => {
    const [style, setStyle] = useState({
        transform: `translate(${initialX}px, ${initialY}px) rotate(0deg)`,
        opacity: 1,
        transition: `transform 1s ease-out, opacity 1s ease-out`,
        backgroundColor: color,
    });

    useEffect(() => {
        const finalX = initialX + (Math.random() - 0.5) * 400;
        const finalY = initialY - 100 + (Math.random() - 0.5) * 200;
        const finalAngle = initialAngle + (Math.random() - 0.5) * 720;
        
        const timeout = setTimeout(() => {
            setStyle(s => ({
                ...s,
                transform: `translate(${finalX}px, ${finalY}px) rotate(${finalAngle}deg)`,
                opacity: 0,
            }));
        }, 10);

        return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div 
            className="absolute w-2 h-3"
            style={style}
        />
    );
};

export const Confetti = () => {
    const [pieces, setPieces] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const newPieces = Array.from({ length: 50 }).map((_, i) => (
            <ConfettiPiece
                key={i}
                initialX={0}
                initialY={0}
                initialAngle={(Math.random() * 360)}
                color={confettiColors[Math.floor(Math.random() * confettiColors.length)]}
            />
        ));
        setPieces(newPieces);
    }, []);
    
    return <div className="absolute inset-0 flex items-center justify-center pointer-events-none">{pieces}</div>;
};
