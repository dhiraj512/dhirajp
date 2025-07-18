"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Face } from "../motion/face";

export default function Header() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    const currentPath = pathname.split("/") || pathname.startsWith("/") ? pathname.split("/")[1] : pathname;

    return (
        <AnimatePresence>
            {!isHome && (
                <motion.header
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '100%', opacity: 0 }}
                    transition={{
                        type: "tween",
                        ease: "easeInOut",
                        duration: 0.3
                    }}
                    className="w-full fixed top-0 inset-x-0 bg-background/60 backdrop-blur-xs z-50"
                >
                    <div className="max-w-screen-sm mx-auto px-4 flex gap-2 items-center justify-between py-4 relative border-b border-gray-200 dark:border-gray-800">
                        <div className="inline-flex items-center gap-1">
                            <h1 className="text-lg font-semibold">{currentPath}</h1>
                        </div>
                        <Face />
                    </div>
                </motion.header>
            )}
        </AnimatePresence>
    );
}