"use client"

import { HTMLAttributes, ReactNode } from "react"
import { TerminalIcon } from "lucide-react"
import { AiOutlineFileText, AiOutlineFolderOpen } from "react-icons/ai"
import { BsFileEarmarkCodeFill } from "react-icons/bs"
import { IoLogoJavascript } from "react-icons/io5"
import {
    SiCss3,
    SiHtml5,
    SiMarkdown,
    SiNextdotjs,
    SiPython,
    SiReact,
    SiTypescript,
    SiVercel,
} from "react-icons/si"
import { VscJson } from "react-icons/vsc"

import { cn } from "@/lib/utils"

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

    const getLanguageIcon = (lang: string): ReactNode => {
        switch (lang) {
            case "html":
                return <SiHtml5 className="size-4" />
            case "css":
                return <SiCss3 className="size-4" />
            case "js":
            case "javascript":
                return <IoLogoJavascript className="size-4" />
            case "bash":
            case "sh":
            case "shell":
            case "zsh": {
                return <TerminalIcon className="size-4" />
            }
            case "py":
                return <SiPython className="size-4" />
            case "json":
                return <VscJson className="size-4" />
            case "jsx":
            case "tsx":
                return <SiReact className="size-4" />
            case "text":
                return <AiOutlineFileText className="size-4" />
            case "md":
                return <SiMarkdown className="size-4" />
            case "next":
                return <SiNextdotjs className="size-4" />
            case "directory":
                return <AiOutlineFolderOpen className="size-4" />
            case "vercel":
                return <SiVercel className="size-4" />
            case "ts":
            case "typescript":
                return <SiTypescript className="size-4" />
            default:
                return <BsFileEarmarkCodeFill className="size-4" />
        }
    }

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