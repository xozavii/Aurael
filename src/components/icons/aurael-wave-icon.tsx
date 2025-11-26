import { cn } from "@/lib/utils";
import React from "react";

export const AuraelWaveIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 500 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("w-6 h-6", className)}
        {...props}
    >
      <path d="M 0 50 C 100 50, 200 50, 250 50 C 270 50, 280 15, 300 30 C 310 40, 310 60, 320 50 C 350 45, 400 50, 500 50" />
    </svg>
);
