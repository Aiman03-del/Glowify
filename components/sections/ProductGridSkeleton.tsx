import Skeleton from "@/components/ui/Skeleton";

export default function ProductGridSkeleton() {
  const cards = Array.from({ length: 6 });
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="h-8 w-48 mx-auto mb-8">
        <Skeleton className="h-full w-full rounded-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <Skeleton className="w-full h-64" />
            <div className="p-6 space-y-3">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <div className="flex gap-3 pt-2">
                <Skeleton className="h-4 w-24 rounded-full" />
                <Skeleton className="h-4 w-20 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
