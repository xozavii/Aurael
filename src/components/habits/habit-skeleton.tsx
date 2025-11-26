'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface HabitSkeletonProps {
    count?: number;
}

export function HabitSkeleton({ count = 3 }: HabitSkeletonProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <Card key={index} className="bg-background/50">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Skeleton className="w-6 h-6 rounded-full shimmer" />
                            <div>
                                <Skeleton className="h-4 w-32 mb-2 shimmer" />
                                <Skeleton className="h-3 w-24 shimmer" />
                            </div>
                        </div>
                        <Skeleton className="w-12 h-12 rounded-full shimmer" />
                    </CardContent>
                </Card>
            ))}
        </>
    );
}
