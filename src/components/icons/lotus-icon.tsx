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
        <path d="M8.5 18a3.5 3.5 0 0 1-3.5-3.5C5 12.36 7.69 11 12 11c4.31 0 7-1.36 7-3.5A3.5 3.5 0 0 0 15.5 4" />
        <path d="M15.5 18a3.5 3.5 0 0 0 3.5-3.5c0-2.14-2.69-3.5-7-3.5-4.31 0-7 1.36-7 3.5A3.5 3.5 0 0 0 8.5 18" />
        <path d="M12 21a2 2 0 0 0 2-2" />
        <path d="M12 21a2 2 0 0 1-2-2" />
        <path d="M12 11V2" />
    </svg>
);
