import { cn } from "@/lib/utils";
import React from "react";

export const MindfulHeadIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("w-6 h-6", className)}
        {...props}
    >
        <path d="M14.5 21a8.5 8.5 0 1 0-8-15.1" />
        <path d="M10 13a2.5 2.5 0 0 1-2.5-2.5c0-2.5 2.5-5 2.5-5s2.5 2.5 2.5 5A2.5 2.5 0 0 1 10 13Z" />
        <path d="M14.5 21H19a2 2 0 0 0 2-2v-1" />
        <path d="m16 16-1.5 1.5" />
    </svg>
);
