import { getFilteredResources, resources } from "@/lib/content"
import ResourcesList from "@/components/layout/resources-list"


interface ResourcesPageProps {
    searchParams?: Promise<{
        query?: string;
    }>;
}

export default async function ResourcesPage(props: ResourcesPageProps) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    const filteredResources = getFilteredResources(resources, query);

    return (
        <ResourcesList resources={filteredResources} />
    )
}
