'use client';

import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { Heart } from 'lucide-react';

interface DashboardCardProps {
    href: string;
    icon: LucideIcon;
    label: string;
    description: string;
    className?: string;
}

export default function DashboardCard({ href, icon: Icon, label, description, className }: DashboardCardProps) {
    return (
        <Link href={href} className={cn("group block", className)}>
            <Card className="relative h-full bg-card/60 backdrop-blur-lg border-white/20 hover:bg-card/80 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl overflow-hidden">
                <Heart 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-primary/80 opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl"
                    style={{ animation: 'heartbeat 1.5s ease-in-out infinite' }}
                />
                <CardHeader className="text-center items-center relative z-10">
                    <div className="p-4 bg-primary/20 rounded-full mb-4 transition-colors duration-300 group-hover:bg-primary/30">
                        <Icon className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <CardTitle className="font-headline text-2xl">{label}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
            </Card>
        </Link>
    );
}
