import { cn } from "@/lib/utils";
import React from "react";

export const AuraelWaveIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className={cn("w-6 h-6", className)}
        {...props}
    >
      <path d="M10 50 C30 20, 60 20, 70 40 C80 55, 70 65, 60 60" />
      <path d="M40 60 C50 50, 60 50, 75 55" />
      <path d="M10 75 C20 70, 30 80, 40 75 C50 70, 60 80, 70 75 C80 70, 90 80, 95 75" />
    </svg>
);
