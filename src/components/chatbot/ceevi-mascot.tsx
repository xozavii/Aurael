
'use client';

import { Heart } from 'lucide-react';

const CeeviMascot = () => {
    return (
        <div className="relative w-64 h-64 md:w-80 md:h-80">
            <style>
                {`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                }
                .ceevi-mascot {
                    animation: float 4s ease-in-out infinite;
                }
                @keyframes pop-in {
                    0% { transform: scale(0); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .ceevi-mascot-heart {
                    animation: pop-in 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
                }
                `}
            </style>
            <svg
                viewBox="0 0 200 200"
                className="ceevi-mascot drop-shadow-[0_15px_15px_rgba(var(--primary-rgb),0.15)]"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Head */}
                <circle cx="100" cy="90" r="50" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.5)" strokeWidth="2"/>
                
                {/* Ears */}
                <circle cx="65" cy="55" r="20" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.5)" strokeWidth="2"/>
                <circle cx="135" cy="55" r="20" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.5)" strokeWidth="2"/>
                <circle cx="65" cy="55" r="12" fill="hsl(var(--background))"/>
                <circle cx="135" cy="55" r="12" fill="hsl(var(--background))"/>

                {/* Snout */}
                <ellipse cx="100" cy="100" rx="20" ry="15" fill="hsl(var(--background))" opacity="0.8" />

                {/* Eyes */}
                <circle cx="85" cy="85" r="5" fill="hsl(var(--foreground))" />
                <circle cx="115" cy="85" r="5" fill="hsl(var(--foreground))" />
                <circle cx="87" cy="83" r="1.5" fill="hsl(var(--background))" />
                <circle cx="117" cy="83" r="1.5" fill="hsl(var(--background))" />

                {/* Nose */}
                <path d="M 95 98 q 5 -5 10 0" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round"/>
                
                {/* Blushes */}
                <circle cx="70" cy="98" r="7" fill="hsl(var(--primary) / 0.3)" />
                <circle cx="130" cy="98" r="7" fill="hsl(var(--primary) / 0.3)" />

                {/* Body */}
                <path d="M 80 135 a 20 20 0 0 0 40 0 Z" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.5)" strokeWidth="2"/>
            </svg>
            <div 
                className="ceevi-mascot-heart absolute top-[30%] left-[5%]" 
                style={{ animationDelay: '0.5s' }}
            >
                <Heart className="w-8 h-8 text-primary/80" fill="hsl(var(--primary) / 0.2)" />
            </div>
            <div 
                className="ceevi-mascot-heart absolute top-[55%] right-0" 
                style={{ animationDelay: '0.8s' }}
            >
                <Heart className="w-10 h-10 text-primary/80" fill="hsl(var(--primary) / 0.2)" />
            </div>
             <div 
                className="ceevi-mascot-heart absolute top-[75%] left-[15%]" 
                style={{ animationDelay: '1.1s' }}
            >
                <Heart className="w-6 h-6 text-primary/80" fill="hsl(var(--primary) / 0.2)" />
            </div>
        </div>
    );
}

export default CeeviMascot;
