import { cn } from "@/lib/utils";
import React from "react";

export const AuraelWaveIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 300 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("w-6 h-6", className)}
        {...props}
    >
      <path d="M20 110 C80 40, 170 40, 200 90 C215 115, 190 130, 165 120 C135 110, 140 70, 185 65" />
      <path d="M120 120 C150 110, 180 130, 220 120" />
      <path d="M20 160 C50 150, 80 170, 110 160 C140 150, 170 170, 200 160 C230 150, 260 170, 280 160" />
    </svg>
);
