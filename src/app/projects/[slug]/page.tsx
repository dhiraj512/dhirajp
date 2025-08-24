import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { getProjectBySlug } from "@/lib/content"
import { generateSEO } from "@/config/site"

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

    return (
        <div className="space-y-8">
            {/* Project Header */}
            <div className="space-y-6 mb-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold">{project.title}</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">{project.description}</p>
                    {/* Technologies */}
                    <div>
                        <h3 className="font-semibold mb-3">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <Badge key={tech} variant="outline">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Project Image */}
                {project.image && (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                        <Image src={project.image} alt={project.title} fill className="object-cover" priority />
                    </div>
                )}
            </div>
            {/* Project Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <h2 className="text-xl font-semibold">About This Project</h2>
                        <p className="leading-relaxed">{project.description}</p>
                    </div>
                </div>
                <div className="space-y-6">

                    {/* Links */}
                    <div className="space-y-3">
                        <h3 className="font-semibold">Links</h3>
                        <div className="space-y-2">
                            {project.repository && (
                                <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                                    <a
                                        href={project.repository}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2"
                                    >
                                        <Icon.github className="w-4 h-4" />
                                        View Source Code
                                    </a>
                                </Button>
                            )}
                            {project.liveUrl && (
                                <Button asChild className="w-full justify-start">
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2"
                                    >
                                        <Icon.externalLink className="w-4 h-4" />
                                        View Live Demo
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
