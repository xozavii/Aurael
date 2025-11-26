'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function JournalSkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(2)].map((_, index) => (
                <Card key={index} className="bg-background/50">
                    <CardHeader className="flex-row items-center justify-between p-4">
                        <div className="space-y-2">
                             <Skeleton className="h-4 w-48 shimmer" />
                             <Skeleton className="h-3 w-32 shimmer" />
                        </div>
                        <div className="flex items-center gap-2">
                             <Skeleton className="w-8 h-8 shimmer" />
                             <Skeleton className="w-8 h-8 shimmer" />
                        </div>
                    </CardHeader>
                    {/* Collapsible content can be left out of skeleton */}
                </Card>
            ))}
        </div>
    );
}
