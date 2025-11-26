import { cn } from "@/lib/utils";
import React from "react";

export const AuraelWaveIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("w-6 h-6", className)}
        {...props}
    >
        <path d="M4 8c4-2 8 2 12 0s8 2 8 2" stroke="#ff4f7b" />
        <path d="M4 13c4-2 8 2 12 0s8 2 8 2" stroke="#ff4f7b" />
        <path d="M4 18c4-2 8 2 12 0s8 2 8 2" stroke="#ff4f7b" />
    </svg>
);
