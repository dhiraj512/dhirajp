"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { resources } from "@/lib/content"
import { cn } from "@/lib/utils"
import Icon, { CategoryIcon } from "../ui/icon"

export function CategoryBar({ className }: { className?: string }) {
    const pathname = usePathname()

    const categories = [...new Set(resources.map((r) => r.category))]
    const counts = categories.reduce(
        (acc, c) => {
            acc[c] = resources.filter((r) => r.category === c).length
            return acc
        },
        {} as Record<string, number>,
    )

    const activeCategoryFromPath = (() => {
        const parts = pathname.split("/").filter(Boolean) // ["resources", "..."]
        return parts[0] === "resources" ? parts[1] : undefined
    })()

    const isAllActive = pathname === "/resources" || activeCategoryFromPath === undefined
    return (
        <div className={cn(className)}>
            <ul className="font-medium flex md:block md:space-y-1 gap-x-1 flex-wrap bg-background w-full">
                <li>
                    <Link
                        href="/resources"
                        className={cn("group inline-flex w-full items-center hover:bg-muted justify-between gap-2 rounded-md px-3 py-1.5 text-sm transition-colors",
                            isAllActive && "bg-muted"
                        )}
                    >
                        <Icon.folder className="size-4" />
                        <span>All</span>
                        <span className="flex-grow" />
                        <span className="text-xs">
                            {resources.length}
                        </span>
                    </Link>
                </li>
                {categories.map((c) => {
                    const isActive = activeCategoryFromPath === c
                    const IconComponent = CategoryIcon[c as keyof typeof CategoryIcon] || Icon.folder
                    return (
                        <li key={c}>
                            <Link
                                href={`/resources/${c}`}
                                className={cn("group inline-flex w-full items-center hover:bg-muted justify-between gap-2 rounded-md px-3 py-1.5 text-sm capitalize transition-colors",
                                    isActive && "bg-muted"
                                )}
                            >
                                <IconComponent className="size-4" />
                                <span>{c}</span>
                                <span className="flex-grow" />
                                <span className="text-xs">
                                    {counts[c]}
                                </span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
