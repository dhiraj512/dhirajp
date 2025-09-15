import { resources } from "@/lib/content"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Globe } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import SnippetBlock from "@/components/mdx/snippet-block"

export async function generateStaticParams() {
    return resources.map((r) => ({ category: r.category, slug: r.slug }))
}

export default async function ResourcePage({
    params,
}: {
    params: Promise<{ category: string; slug: string }>
}) {
    const { category, slug } = await params
    const resource = resources.find((r) => r.category === category && r.slug === slug)
    if (!resource) notFound()

    return (
        <div>
            <header className="space-y-4">
                <div className="">
                    <h1 className="text-3xl font-bold tracking-tight">{resource.title}</h1>
                    {resource.description ? <p className="text-muted-foreground mt-2">{resource.description}</p> : null}
                </div>
                <div className="flex flex-col gap-2">
                    {resource.tags && resource.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            <span className="font-medium text-sm text-muted-foreground">Tags:</span>
                            {resource.tags.map((t) => (
                                <Badge key={t} variant="secondary" className="capitalize">
                                    {t}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {resource.prompt_type && (
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-muted-foreground">Prompt type:</span>
                            <Badge variant="secondary" className="capitalize">
                                {resource.prompt_type}
                            </Badge>
                            {resource.model && (
                                <>
                                    <span className="font-medium text-sm text-muted-foreground">Model:</span>
                                    <Badge variant="secondary" className="capitalize">
                                        {resource.model}
                                    </Badge>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </header>

            <Separator className="my-6" />

            {/* Website section */}
            {resource.url && (
                <section className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                        <Globe className="size-4 text-emerald-600" />
                        Website
                    </h3>
                    <div className="flex items-center gap-3">
                        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                Visit site
                                <ExternalLink className="ml-2 size-4" />
                            </a>
                        </Button>
                        <span className="text-sm text-muted-foreground truncate">{resource.url}</span>
                    </div>

                    {resource.screenshot && (
                        <div className="mt-2 overflow-hidden rounded-lg border bg-muted/30">
                            <div className="relative aspect-[16/9]">
                                <Image
                                    src={resource.screenshot || "/placeholder.svg"}
                                    alt={`Screenshot of ${resource.title}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 768px"
                                    priority
                                />
                            </div>
                        </div>
                    )}
                </section>
            )}

            {/* Code section */}
            {resource.code && (
                <SnippetBlock
                    snippet={resource.code}
                    fileName={resource.fileName ?? resource.model ?? resource.prompt_type}
                    language={resource.language ?? "txt"}
                    highlightLines={resource.highlightLines}
                    highlightWords={resource.highlightWords}
                />
            )}
        </div>
    )
}
