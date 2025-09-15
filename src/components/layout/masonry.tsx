"use client"

import { useState, useEffect } from "react"
import { ResourceCard } from "@/components/ui/card"
import { Resource } from "@/content"
import { resources } from "@/lib/content"

export default function MasonryGrid() {
    const [items] = useState<Resource[]>(resources)
    const [columns, setColumns] = useState(2)

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 640) setColumns(1)
            else setColumns(2)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const distributeItems = () => {
        const columnArrays: Resource[][] = Array.from({ length: columns }, () => [])

        items.forEach((item, index) => {
            const columnIndex = index % columns
            columnArrays[columnIndex].push(item)
        })

        return columnArrays
    }

    const columnArrays = distributeItems()

    return (
        <div className="w-full">
            <div
                className="flex gap-6"
                style={{
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                }}
            >
                {columnArrays.map((column, columnIndex) => (
                    <div key={columnIndex} className="flex flex-col gap-6 flex-1">
                        {column.map((item) => (
                            <ResourceCard key={item.slug} resource={item} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
