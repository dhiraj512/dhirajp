"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Icon from "@/components/ui/icon"
import useTheme from '@/hooks/use-theme'
import { cn } from '@/lib/utils'
import { m, useMotionValue, useTransform, AnimatePresence } from 'motion/react'
import { NavItems } from "@/constants"

const duration = 0.7

const moonVariants = {
    checked: { scale: 1 },
    unchecked: { scale: 0 },
}

const sunVariants = {
    checked: { scale: 0 },
    unchecked: { scale: 1 },
}

export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter()
    const { theme, setTheme, mounted } = useTheme()
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
    const [hoverStyle, setHoverStyle] = useState({ left: "0px", width: "0px" })
    const [isScrolled, setIsScrolled] = useState(false)
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
    const isDark = theme === 'dark'

    const scaleMoon = useMotionValue(isDark ? 1 : 0)
    const scaleSun = useMotionValue(isDark ? 0 : 1)
    const pathLengthMoon = useTransform(scaleMoon, [0.6, 1], [0, 1])
    const pathLengthSun = useTransform(scaleSun, [0.6, 1], [0, 1])

    const allItems = [
        ...NavItems.map(item => ({
            ...item,
            type: "nav",
            action: () => router.push(item.path),
        })),
        {
            label: "Theme",
            type: "theme",
            action: () => setTheme(isDark ? 'light' : 'dark'),
        },
        {
            label: "Scroll to top",
            icon: "up",
            type: "scrollToTop",
            action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
        },
    ]

    const getActiveIndex = () => {
        const index = NavItems.findIndex((item) =>
            item.path === pathname ||
            (pathname.startsWith(item.path) && item.path !== '/')
        )
        return index !== -1 ? index : 0
    }

    const activeIndex = getActiveIndex()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const activeElement = tabRefs.current[activeIndex]
        if (activeElement) {
            const { offsetLeft, offsetWidth } = activeElement
            setActiveStyle({
                left: `${offsetLeft}px`,
                width: `${offsetWidth}px`,
            })
        }
    }, [activeIndex, pathname])

    useEffect(() => {
        if (hoveredIndex !== null) {
            const hoveredElement = tabRefs.current[hoveredIndex]
            if (hoveredElement) {
                const { offsetLeft, offsetWidth } = hoveredElement
                setHoverStyle({
                    left: `${offsetLeft}px`,
                    width: `${offsetWidth}px`,
                })
            }
        }
    }, [hoveredIndex])

    return (
        <div className='pointer-events-none fixed bottom-0 inset-x-0'>
            <m.div layout className='z-20 mx-auto mb-8 flex w-fit space-x-2 rounded-xl border pointer-events-auto relative h-full items-center bg-background/80 backdrop-blur-2xl p-1.5 shadow-lg'>
                <div className="relative">
                    <div
                        className="absolute h-10 w-10 rounded-lg bg-muted transition-all duration-300 ease-out"
                        style={{
                            ...activeStyle,
                            opacity: 1,
                            zIndex: 1
                        }}
                    />
                    {hoveredIndex !== null && (
                        <div
                            className="absolute h-10 w-10 rounded-lg bg-muted/80 transition-all duration-300 ease-out"
                            style={{
                                ...hoverStyle,
                                opacity: 0.8,
                                zIndex: 2
                            }}
                        />
                    )}
                    <div className="relative flex items-center gap-0">
                        {allItems.map((item, index) => {
                            if (item.type === "scrollToTop") {
                                return (
                                    <AnimatePresence key={item.label}>
                                        {isScrolled && (
                                            <m.div
                                                initial={{ width: 0 }}
                                                animate={{ width: 'auto' }}
                                                exit={{ width: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <m.button
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    ref={(el) => { tabRefs.current[index] = el }}
                                                    className={cn(
                                                        "h-10 w-10 flex items-center justify-center",
                                                        "cursor-pointer rounded-lg z-10 transition-colors",
                                                        "focus-visible:outline-none",
                                                        "text-foreground"
                                                    )}
                                                    onClick={item.action}
                                                >
                                                    <Icon.arrowUp className="h-5 w-5" />
                                                </m.button>
                                            </m.div>
                                        )}
                                    </AnimatePresence>
                                )
                            }
                            const isActive = item.type === "nav" && index === activeIndex
                            const ThemeIcon = item.icon && Icon[item.icon as keyof typeof Icon]
                            return (
                                <button
                                    key={item.label}
                                    ref={el => { tabRefs.current[index] = el }}
                                    className={cn(
                                        "h-10 w-10 flex items-center justify-center",
                                        "cursor-pointer rounded-lg z-10 transition-colors",
                                        "hover:text-primary focus-visible:outline-none",
                                        isActive ? "text-primary" : "text-foreground"
                                    )}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={item.action}
                                >
                                    {item.type === "theme" ? (
                                        <m.div
                                            initial={true}
                                            animate={isDark ? 'checked' : 'unchecked'}
                                            transition={{ duration }}
                                        >
                                            <m.svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 25 25"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="text-warning"
                                            >
                                                {mounted && (
                                                    <>
                                                        <m.path
                                                            d="M12.4058 17.7625C15.1672 17.7625 17.4058 15.5239 17.4058 12.7625C17.4058 10.0011 15.1672 7.76251 12.4058 7.76251C9.64434 7.76251 7.40576 10.0011 7.40576 12.7625C7.40576 15.5239 9.64434 17.7625 12.4058 17.7625Z"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            variants={sunVariants}
                                                            transition={{ duration }}
                                                            style={{ pathLength: pathLengthSun, scale: scaleSun }}
                                                        />
                                                        <m.path
                                                            d="M12.4058 1.76251V3.76251"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            variants={sunVariants}
                                                            transition={{ duration }}
                                                            style={{ pathLength: pathLengthSun, scale: scaleSun }}
                                                        />
                                                        <m.path
                                                            d="M12.4058 21.7625V23.7625"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            variants={sunVariants}
                                                            transition={{ duration }}
                                                            style={{ pathLength: pathLengthSun, scale: scaleSun }}
                                                        />
                                                        <m.path
                                                            d="M4.62598 4.98248L6.04598 6.40248"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            variants={sunVariants}
                                                            transition={{ duration }}
                                                            style={{ pathLength: pathLengthSun, scale: scaleSun }}
                                                        />
                                                        <m.path
                                                            d="M18.7656 19.1225L20.1856 20.5425"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            variants={sunVariants}
                                                            transition={{ duration }}
                                                            style={{ pathLength: pathLengthSun, scale: scaleSun }}
                                                        />
                                                        <m.path
                                                            d="M1.40576 12.7625H3.40576"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            variants={sunVariants}
                                                            transition={{ duration }}
                                                            style={{ pathLength: pathLengthSun, scale: scaleSun }}
                                                        />
                                                        <m.path
                                                            d="M21.4058 12.7625H23.4058"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            variants={sunVariants}
                                                            transition={{ duration }}
                                                            style={{ pathLength: pathLengthSun, scale: scaleSun }}
                                                        />
                                                        <m.path
                                                            d="M4.62598 20.5425L6.04598 19.1225"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            variants={sunVariants}
                                                            transition={{ duration }}
                                                            style={{ pathLength: pathLengthSun, scale: scaleSun }}
                                                        />
                                                        <m.path
                                                            d="M18.7656 6.40248L20.1856 4.98248"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            variants={sunVariants}
                                                            transition={{ duration }}
                                                            style={{ pathLength: pathLengthSun, scale: scaleSun }}
                                                        />
                                                        <m.path
                                                            d="M21.1918 13.2013C21.0345 14.9035 20.3957 16.5257 19.35 17.8781C18.3044 19.2305 16.8953 20.2571 15.2875 20.8379C13.6797 21.4186 11.9398 21.5294 10.2713 21.1574C8.60281 20.7854 7.07479 19.9459 5.86602 18.7371C4.65725 17.5283 3.81774 16.0003 3.4457 14.3318C3.07367 12.6633 3.18451 10.9234 3.76526 9.31561C4.346 7.70783 5.37263 6.29868 6.72501 5.25307C8.07739 4.20746 9.69959 3.56862 11.4018 3.41132C10.4052 4.75958 9.92564 6.42077 10.0503 8.09273C10.175 9.76469 10.8957 11.3364 12.0812 12.5219C13.2667 13.7075 14.8384 14.4281 16.5104 14.5528C18.1823 14.6775 19.8435 14.1979 21.1918 13.2013Z"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            transition={{ duration }}
                                                            variants={moonVariants}
                                                            style={{ pathLength: pathLengthMoon, scale: scaleMoon }}
                                                        />
                                                    </>
                                                )}
                                            </m.svg>
                                        </m.div>
                                    ) : (
                                        ThemeIcon && <ThemeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </m.div>
        </div>
    )
}