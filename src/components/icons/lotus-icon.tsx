import { cn } from "@/lib/utils";
import React from "react";

export const LotusIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
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
        <path d="M12 2a2.5 2.5 0 0 1 2.5 2.5c0 3.3-2.5 6-2.5 6s-2.5-2.7-2.5-6A2.5 2.5 0 0 1 12 2z" />
        <path d="M21.5 12a2.5 2.5 0 0 1-2.5 2.5c-3.3 0-6-2.5-6-2.5s-2.7 2.5-6 2.5a2.5 2.5 0 0 1-2.5-2.5" />
        <path d="M12 21.5a2.5 2.5 0 0 1-2.5-2.5c0-3.3 2.5-6 2.5-6s2.5 2.7 2.5 6a2.5 2.5 0 0 1-2.5 2.5z" />
        <path d="M2.5 12a2.5 2.5 0 0 1 2.5-2.5c3.3 0 6 2.5 6 2.5s2.7-2.5 6-2.5a2.5 2.5 0 0 1 2.5 2.5" />
    </svg>
);
