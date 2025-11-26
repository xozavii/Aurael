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
           C 20 20, 40 10, 60 25 
           C 70 35, 75 45, 70 55 
           C 65 65, 50 70, 40 60
           L 35 70
           C 30 75, 20 80, 5 70"
           strokeWidth="3"
        />

        <path d="M 45 30 
           C 50 20, 55 20, 60 30 
           C 65 40, 60 45, 55 40" 
        strokeWidth="1.5"/>

        <path d="M 70 65 
           C 75 55, 85 55, 90 65" 
        strokeWidth="2"/>
        
        <path d="M 10 75 
           C 25 80, 40 75, 55 70" 
        strokeWidth="1.5"/>
    </svg>
);
