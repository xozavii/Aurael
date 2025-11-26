import { cn } from "@/lib/utils";
import React from "react";

export const AuraelWaveIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 100 45"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("w-6 h-6", className)}
        {...props}
    >
        <path d="M 5 30 
           C 20 10, 30 10, 35 20 
           C 40 30, 45 30, 50 20"
            strokeWidth="3" />
        <path d="M 30 30 
           C 35 40, 45 40, 50 30"
            strokeWidth="3" />
        <path d="M 0 35 
           C 20 35, 70 35, 100 35"
            strokeWidth="2" />
        <path d="M 60 35 
           C 65 25, 75 25, 80 35"
            strokeWidth="2.5" />
    </svg>
);
