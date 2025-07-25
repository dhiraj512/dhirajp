import { LabList } from '@/components/layout'
import { generateSEO } from '@/config/site'
import { experiments } from '@/lib/content'
import React from 'react'

export const metadata = generateSEO({
    title: "Lab",
    description: "Explore the various experiments on Electronics, IoT, web development, and AI.",
    url: "/lab",
})

export default function lab() {
    return <LabList experiments={experiments} />
}
