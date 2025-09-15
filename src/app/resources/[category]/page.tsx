import { getFilteredResources, resources } from "@/lib/content"
import { notFound } from "next/navigation"
import ResourcesList from "@/components/layout/resources-list"

export async function generateStaticParams() {
    const categories = [...new Set(resources.map((r) => r.category))]
    return categories.map((category) => ({ category }))
}

interface CategoryPageProps {
    params: Promise<{ category: string }>
    searchParams: Promise<{ query?: string }>
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { category } = await params
    const query = (await searchParams)?.query || '';
    const list = resources.filter((r) => r.category === category)

    if (list.length === 0) notFound()

    const filteredResources = getFilteredResources(list, query);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold capitalize">{category}</h1>
            <ResourcesList resources={filteredResources} />
        </div>
    )
}
