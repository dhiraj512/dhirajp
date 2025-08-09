"use client"

import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"
import { getLanguageIcon } from "../ui/icon"

type CodeBlockProps = HTMLAttributes<HTMLElement> & {
    ["data-language"]?: string
}

export default function CodeBlockHeader({
    // title,
    className,
    children,
    ...props
}: Readonly<CodeBlockProps>) {
    const language = props["data-language"]

    return (
        <figcaption
            className={cn("not-prose text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70",
                className,
            )}
            {...props}
        >
            {language && getLanguageIcon(language)}
            {children}
        </figcaption>
    )
}