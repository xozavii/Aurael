import { cn } from "@/lib/utils";
import React from "react";

export const AuraelWaveIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("w-6 h-6", className)}
        {...props}
    >
        <path d="M 5 50 
           C 15 20, 35 10, 50 25 
           C 60 35, 65 45, 60 55 
           C 55 65, 40 70, 25 60
           L 15 70
           C 10 75, 5 80, 0 70"
           strokeWidth="4"
        />

        <path d="M 40 35 
           C 45 25, 50 25, 55 35 
           C 60 45, 55 50, 50 45"
           strokeWidth="2.5"
        />

        <path d="M 65 65 
           C 75 55, 85 55, 95 65"
           strokeWidth="3"
        />
        
        <path d="M 0 85 
           C 30 90, 70 80, 100 85"
           strokeWidth="2.5"
        />
    </svg>
);
