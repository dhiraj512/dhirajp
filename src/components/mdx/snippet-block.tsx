import { CopyButton } from "@/components/ui/copy-button"
import { highlighter } from "@/config/highlighter"

export default async function SnippetBlock({
    snippet,
    language,
    fileName,
    highlightLines,
    highlightWords,
}: {
    snippet: string
    language: string
    fileName?: string
    highlightLines?: string
    highlightWords?: string[]
}) {
    const html = await highlighter(snippet,
        language,
        fileName,
        highlightLines,
        highlightWords
    )

    return (
        <div className="relative rounded-lg border overflow-hidden">
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <div className="absolute top-1 right-1">
                <CopyButton thingToCopy={snippet} className="text-white" />
            </div>
        </div>
    )
}
