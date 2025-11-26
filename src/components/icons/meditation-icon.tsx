import { cn } from "@/lib/utils";
import React from "react";

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
      <path d="M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M5 12h14" />
      <path d="M8 22a2 2 0 1 0-4 0" />
      <path d="M20 22a2 2h-4a2 2 0 0 0-4 0" />
      <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 9 9" />
      <path d="M4.5 12a7.5 7.5 0 0 1 15 0" />
      <path d="M9.5 12c0 3.33-2 6-4.5 6" />
      <path d="M14.5 12c0 3.33 2 6 4.5 6" />
      <path d="M18 16c-1 1-4 2-6 2s-5-1-6-2" />
    </svg>
  );
  
  // A more abstract version
  export const MeditationIconV2 = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
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
      <path d="M3.5 16.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M20.5 16.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 11.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M6.5 21.5c0-3.33 2-6 5.5-6s5.5 2.67 5.5 6" />
      <path d="M16.5 13c-1-1-4-2-4.5-2s-3.5 1-4.5 2" />
      <path d="M12 7.5V3" />
      <path d="m9 5.5 2-2" />
      <path d="m15 5.5-2-2" />
    </svg>
  );
  
  // The one from the image
  export const MeditationIconV3 = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("w-6 h-6", className)}
        {...props}
    >
        <path d="M68,18 L72,14" />
        <path d="M80,30 L85,28" />
        <path d="M80,50 L86,50" />
        <path d="M32,18 L28,14" />
        <path d="M20,30 L15,28" />
        <path d="M20,50 L14,50" />
        <circle cx="50" cy="35" r="12" />
        <path d="M32,50 C32,62 40,70 50,70 C60,70 68,62 68,50" />
        <path d="M25,85 C35,75 65,75 75,85" />
        <path d="M35,85 C35,80 40,78 50,78 C60,78 65,80 65,85" />
    </svg>
  );
  