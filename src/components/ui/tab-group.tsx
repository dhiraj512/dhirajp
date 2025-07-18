"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

interface Tab {
    title: string
    description: string
}

interface TabGroupProps {
    tabs: Tab[]
    defaultTab?: number
}

export function TabGroup({ tabs, defaultTab = 0 }: TabGroupProps) {
    const [activeTab, setActiveTab] = useState(defaultTab)

    return (
        <div className="overflow-hidden sm:h-32 h-40">
            <div className="flex border-b relative">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={cn(
                            "px-4 py-2 text-xs font-medium transition-colors cursor-pointer relative",
                            activeTab === index
                                ? "text-primary"
                                : "hover:text-primary text-muted-foreground",
                        )}
                    >
                        {tab.title}
                        {activeTab === index && (
                            <motion.span
                                layoutId="underline"
                                className="absolute left-0 -bottom-[1px] h-0.5 w-full bg-primary"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </button>
                ))}
            </div>
            <div className="p-2 text-wrap text-muted-foreground">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm"
                    >
                        {tabs[activeTab].description}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    )
}