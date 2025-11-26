import { cn } from "@/lib/utils";
import React from "react";

// The one from the image
export const MeditationIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
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
      <path d="M12 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Z" />
      <path d="M20.42 16.58a2 2 0 0 0-2.83 0" />
      <path d="M6.41 16.58a2 2 0 0 1-2.83 0" />
      <path d="M12 12v6" />
      <path d="M12 22h.01" />
      <path d="m19 12-5-5" />
      <path d="m5 12 5-5" />
  </svg>
);
