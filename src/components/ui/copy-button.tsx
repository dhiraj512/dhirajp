"use client"

import { useState } from "react"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import Icon from "./icon"

interface CopyButtonProps {
    thingToCopy: string
    className?: string
    size?: "default" | "sm" | "icon"
    variant?: "default" | "outline" | "ghost" | "secondary"
    showText?: boolean
    successDuration?: number
}

export function CopyButton({
    thingToCopy,
    className,
    size = "sm",
    variant = "ghost",
    showText = false,
    successDuration = 2000,
}: CopyButtonProps) {
    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(thingToCopy)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), successDuration)
        } catch (err) {
            console.error("Failed to copy text: ", err)
        }
    }

    return (
        <Button
            variant={variant}
            size={showText ? "icon" : size}
            onClick={handleCopy}
            className={cn(
                "transition-all duration-200",
                isCopied && "text-green-600 dark:text-green-400",
                className
            )}
            title={isCopied ? "Copied!" : "Copy to clipboard"}
        >
            {isCopied ? <Icon.check className="mr-1 size-3.5" /> : <Icon.copy className="mr-1 size-3.5" />}
            {isCopied ? "Copied" : "Copy"}
        </Button>
    )
}