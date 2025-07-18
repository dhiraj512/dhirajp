"use client";

import { motion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {

    return (
        <motion.div
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={{
                hidden: { opacity: 0, filter: "blur(10px)" },
                enter: { opacity: 1, filter: "blur(0px)" },
                exit: { opacity: 0, filter: "blur(10px)" }
            }}
            transition={{
                duration: 0.4,   // Smooth transition duration
                ease: [0.42, 0, 0.58, 1],  // Custom easing function for smoothness
            }}
            style={{ willChange: 'opacity, filter' }}   // Optimizing for performance
        >
            {children}
        </motion.div>
    )
}