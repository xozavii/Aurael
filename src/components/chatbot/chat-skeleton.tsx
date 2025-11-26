'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ChatSkeletonProps {
  isResponseLoading?: boolean;
}

export function ChatSkeleton({ isResponseLoading = false }: ChatSkeletonProps) {
  if (isResponseLoading) {
    return (
      <div className="flex items-end gap-2">
        <Skeleton className="h-8 w-8 rounded-full shimmer" />
        <Skeleton className="h-10 w-16 shimmer" />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-end gap-2">
        <Skeleton className="h-8 w-8 rounded-full shimmer" />
        <Skeleton className="h-10 w-2/3 shimmer" />
      </div>
      <div className="flex items-end gap-2 justify-end">
        <Skeleton className="h-10 w-1/2 shimmer" />
      </div>
      <div className="flex items-end gap-2">
        <Skeleton className="h-8 w-8 rounded-full shimmer" />
        <Skeleton className="h-10 w-1/3 shimmer" />
      </div>
    </>
  );
}
