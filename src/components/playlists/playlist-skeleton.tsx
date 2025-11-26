'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PlaylistSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="overflow-hidden h-full bg-background/50">
          <div className="relative aspect-square">
            <Skeleton className="w-full h-full shimmer" />
          </div>
          <CardHeader>
            <Skeleton className="h-5 w-3/4 mb-2 shimmer" />
            <Skeleton className="h-4 w-full shimmer" />
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
