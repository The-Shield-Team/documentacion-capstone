import { Skeleton } from "@/components/ui/skeleton";

export function HomePageSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Skeleton className="w-full h-[60vh] rounded-lg" />
      <div className="w-full px-6">
        <Skeleton className="w-full h-10 rounded-md" />
      </div>
      <div className="flex justify-center">
        <Skeleton className="w-[300px] h-16 rounded-lg" />
      </div>
    </div>
  );
}
