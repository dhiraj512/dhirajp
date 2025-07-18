"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"

import {
    domAnimation,
    LazyMotion,
    MotionConfig as MotionProvider,
} from 'motion/react'
import useMounted from "@/hooks/use-mounted"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const mounted = useMounted()

    return mounted && (
        <MotionProvider reducedMotion="user">
            <LazyMotion features={domAnimation}>
                <NextThemesProvider {...props}>{children}</NextThemesProvider>
            </LazyMotion>
        </MotionProvider>
    )
}
