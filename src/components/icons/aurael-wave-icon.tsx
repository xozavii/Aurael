import { cn } from "@/lib/utils";
import React from "react";

export const AuraelWaveIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("w-6 h-6", className)}
        {...props}
    >
        <path d="M4 16c8-4 16 4 24 0s16 4 16 4" stroke="#ff4f7b" />
        <path d="M4 26c8-4 16 4 24 0s16 4 16 4" stroke="#ff4f7b" />
        <path d="M4 36c8-4 16 4 24 0s16 4 16 4" stroke="#ff4f7b" />
    </svg>
);
