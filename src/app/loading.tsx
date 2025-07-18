import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex gap-4 items-center relative">
                <Skeleton className="size-16 rounded-full" />
                <div className='space-y-2'>
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="h-3 w-[200px]" />
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                    <Skeleton className="h-6 w-14" />
                    <Skeleton className="h-6 w-14" />
                    <Skeleton className="h-6 w-14" />
                </div>
                <Skeleton className="h-16 w-full" />
            </div>
            <div className='flex flex-col gap-2'>
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-20 w-[320px]" />
            </div>
        </div>
    );
}