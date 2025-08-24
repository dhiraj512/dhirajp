import { notFound } from "next/navigation"
import { getProjectBySlug } from "@/lib/content"
import { generateSEO } from "@/config/site"
import ProjectDetails from "@/components/layout/project-details"

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    return generateSEO({
        title: project.title,
        description: project.description,
        url: `/projects/${slug}`,
    })
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    return <ProjectDetails project={project} />
}
