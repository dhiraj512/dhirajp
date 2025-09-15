import { useState, useEffect, useMemo } from "react"

interface UseMasonryGridOptions {
    breakpoints?: { [key: number]: number }
    defaultColumns?: number
}

export function useMasonryGrid<T>(
    items: T[],
    options: UseMasonryGridOptions = {}
) {
    const {
        breakpoints = {
            640: 1,   // sm: 1 column below 640px
            768: 2,   // md: 2 columns from 640px to 767px  
            1024: 3,  // lg: 3 columns from 768px to 1023px
            1280: 4,  // xl: 4 columns from 1024px and up
        },
        defaultColumns = 1 // Default to 1 column for mobile-first
    } = options

    const [columns, setColumns] = useState(defaultColumns)

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth

            // Start with default (mobile) and work up
            let newColumns = defaultColumns

            // Check each breakpoint in ascending order
            Object.entries(breakpoints)
                .sort(([a], [b]) => Number(a) - Number(b))
                .forEach(([breakpoint, cols]) => {
                    if (width >= Number(breakpoint)) {
                        newColumns = cols
                    }
                })

            setColumns(newColumns)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [breakpoints, defaultColumns])

    const columnArrays = useMemo(() => {
        const arrays: T[][] = Array.from({ length: columns }, () => [])

        items.forEach((item, index) => {
            const columnIndex = index % columns
            arrays[columnIndex].push(item)
        })

        return arrays
    }, [items, columns])

    return {
        columns,
        columnArrays,
        setColumns
    }
}