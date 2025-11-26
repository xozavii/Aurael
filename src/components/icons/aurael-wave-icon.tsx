import { cn } from "@/lib/utils";
import React from "react";

export const AuraelWaveIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 100 50"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("w-6 h-6", className)}
        {...props}
    >
        <path d="M 5 35 
           C 20 15, 30 15, 35 25 
           C 40 35, 45 35, 50 25" 
            strokeWidth="3"/>
        <path d="M 30 35 
           C 35 45, 45 45, 50 35" 
            strokeWidth="3"/>
        <path d="M 0 40 
           C 20 40, 70 40, 100 40" 
            strokeWidth="2"/>
        <path d="M 60 40 
           C 65 30, 75 30, 80 40" 
            strokeWidth="2.5"/>
    </svg>
);
