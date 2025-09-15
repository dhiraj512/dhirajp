"use client"

import { ResourceCard } from "@/components/ui/card"
import { Resource } from "@/content"
// import { useMasonryGrid } from "@/hooks/use-masonry-grid"
import Link from "next/link"

export default function ResourcesList({ resources }: { resources: Resource[] }) {

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4 flex-1">
                {resources.map((item) => (
                    <Link key={`${item.category}-${item.slug}`} href={`/resources/${item.category}/${item.slug}`}>
                        <ResourceCard resource={item} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
