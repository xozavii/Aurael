'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AiResultSkeleton() {
  return (
    <>
      <div className="my-6 h-px w-full bg-white/20" />
      <Card className="bg-primary/5 border-primary/20 with-left-shadow">
        <CardHeader>
          <Skeleton className="h-6 w-32 shimmer" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full shimmer" />
          <Skeleton className="h-4 w-full shimmer" />
          <Skeleton className="h-4 w-3/4 shimmer" />
        </CardContent>
      </Card>
    </>
  );
}
