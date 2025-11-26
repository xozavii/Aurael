import { cn } from "@/lib/utils";
import React from "react";

export const AuraelWaveIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("w-6 h-6", className)}
        {...props}
    >
      {/* Main curling wave */}
      <path d="M10 70 C35 25, 85 25, 95 55 C100 70, 90 82, 75 78 C60 74, 60 55, 75 50" />
      
      {/* Extra small curl detail */}
      <path d="M60 78 C70 70, 80 70, 90 75" />
      
      {/* Bottom wavy water line */}
      <path d="M10 95 C20 90, 30 100, 40 95 C50 90, 60 100, 70 95 C80 90, 90 100, 110 95" />
    </svg>
);
