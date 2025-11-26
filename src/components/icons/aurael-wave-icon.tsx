import { cn } from "@/lib/utils";
import React from "react";

export const AuraelWaveIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 500 100"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("w-6 h-6", className)}
        {...props}
    >
        <path 
            d="M 0 60 C 100 60, 150 20, 200 30 C 220 5, 230 10, 240 25 C 245 40, 230 65, 200 65 L 500 65" 
            strokeWidth="2.5"
        />
        <path 
            d="M 160 70 C 180 50, 200 50, 220 70" 
            strokeWidth="1.5"
        />
        <path 
            d="M 350 70 C 370 55, 390 55, 410 70" 
            strokeWidth="1.5"
        />
    </svg>
);