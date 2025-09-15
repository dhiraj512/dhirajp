import type React from "react"
import { CategoryBar } from "@/components/layout/resources-filter"
import Search from "@/components/ui/search"

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid md:grid-cols-8 grid-cols-1 gap-4 space-y-5">
            <Search className="md:col-span-8 sticky top-15 bg-background h-14 space-y-0" placeholder="Search resources..." />
            <CategoryBar className="md:col-span-2 sticky top-30 h-fit bg-background" />
            <div className="md:col-span-6">
                {children}
            </div>
        </div>
    )
}
