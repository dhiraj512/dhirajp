'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import useTheme from '@/hooks/use-theme'

export const Face = () => {
    const [currentFaceIndex, setCurrentFaceIndex] = useState(0)
    const faces = [
        '‿',  // Classic lenny face
        'ᴗ',  // Happy face
        'ᴥ',  // Bear face
        '◕',  // Big eyes
        '◡',  // Smiley curve
        'ᗒ',  // Blushing face
        'ᗨ',  // Wide-eyed face
    ]
    const { theme } = useTheme()

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFaceIndex(prev => (prev + 1) % faces.length)
        }, 2500)

        return () => clearInterval(interval)
    }, [faces.length])

    return (
        <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: '-50%' }}
            transition={{ duration: 0.3 }}
            className="flex items-center absolute top-1/2 right-4 select-none not-sr-only"
            onDoubleClick={e => e.stopPropagation()}
        >
            <div className='flex items-center space-x-1'>
                <Eye />
                <motion.span
                    key={currentFaceIndex}
                    className='mt-3 w-4 text-center inline-block' // Added fixed width and text alignment
                    initial={{ scaleY: 0.8, opacity: 0 }}
                    animate={{
                        scaleY: 1,
                        opacity: 1,
                        color: theme === 'dark' ? '#e5e5e5' : '#525252'
                    }}
                    exit={{ scaleY: 0.8, opacity: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: 'easeInOut'
                    }}
                >
                    {faces[currentFaceIndex]}
                </motion.span>
                <Eye />
            </div>
        </motion.div>
    )
}

const Eye = () => {
    const { theme } = useTheme()
    const themeRef = useRef(theme)
    const rafRef = useRef<number | null>(null)
    const pupilRef = useRef({ x: 50, y: 50 })
    const targetRef = useRef({ x: 50, y: 50 })
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    // Update theme reference when theme changes
    useEffect(() => {
        themeRef.current = theme
    }, [theme])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        const width = 40
        const height = 40
        if (!canvas || !ctx) return

        canvas.width = 40
        canvas.height = 40

        const borderWidth = 2
        const pupilRadius = Math.min(width, height) * 0.15
        const eyeRadius = Math.min(width, height) / 2 - borderWidth

        const drawEye = () => {
            ctx.clearRect(0, 0, width, height)

            // Get current color based on theme
            const eyeColor = themeRef.current === 'dark' ? '#e5e5e5' : '#1A1A1A'

            // Eye border
            ctx.strokeStyle = eyeColor
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.ellipse(width / 2, height / 2, eyeRadius, eyeRadius, 0, 0, Math.PI * 2)
            ctx.stroke()

            // Pupil
            ctx.fillStyle = eyeColor
            const pupilX = (pupilRef.current.x / 100) * width
            const pupilY = (pupilRef.current.y / 100) * height

            ctx.beginPath()
            ctx.ellipse(pupilX, pupilY, pupilRadius, pupilRadius, 0, 0, Math.PI * 2)
            ctx.fill()
        }

        const animate = () => {
            const current = pupilRef.current
            const target = targetRef.current

            current.x += (target.x - current.x) * 0.1
            current.y += (target.y - current.y) * 0.1

            drawEye()
            rafRef.current = requestAnimationFrame(animate)
        }

        rafRef.current = requestAnimationFrame(animate)

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        const { signal } = controller

        const handleMouseMove = (event: MouseEvent) => {
            if (!canvasRef.current) return

            const rect = canvasRef.current.getBoundingClientRect()
            const eyeCenterX = rect.left + rect.width / 2
            const eyeCenterY = rect.top + rect.height / 2

            const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX)
            const maxMovementRadius = rect.width / 4
            const distanceFromCenter = Math.hypot(event.clientX - eyeCenterX, event.clientY - eyeCenterY)
            const clampedDistance = Math.min(distanceFromCenter, maxMovementRadius)

            const x = 50 + ((Math.cos(angle) * clampedDistance) / (rect.width / 2)) * 45
            const y = 50 + ((Math.sin(angle) * clampedDistance) / (rect.height / 2)) * 45

            targetRef.current = { x: Math.max(25, Math.min(75, x)), y: Math.max(25, Math.min(75, y)) }
        }

        const handleMouseLeave = () => (targetRef.current = { x: 50, y: 50 })

        window.addEventListener('mousemove', handleMouseMove, { signal })
        document.addEventListener('mouseleave', handleMouseLeave, { signal })
        return () => controller.abort()
    }, [])

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <canvas ref={canvasRef} className='size-3.5' />
        </motion.div>
    )
}

Eye.displayName = 'Eye'