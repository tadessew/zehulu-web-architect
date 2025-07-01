
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export const PortfolioSkeleton = () => {
  return (
    <Card className="group overflow-hidden">
      <div className="relative h-80 overflow-hidden">
        <Skeleton className="w-full h-full" />
        <div className="absolute top-4 left-4">
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Skeleton className="w-20 h-6 rounded-full" />
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
      </div>
      <CardContent className="p-6">
        <Skeleton className="w-3/4 h-6 mb-2" />
        <Skeleton className="w-full h-4" />
      </CardContent>
    </Card>
  );
};

export const PortfolioSkeletonGrid = ({ count = 4 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <PortfolioSkeleton key={index} />
      ))}
    </div>
  );
};
