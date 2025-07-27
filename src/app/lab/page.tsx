import { LabList } from '@/components/layout'
import { generateSEO } from '@/config/site'
import { experiments } from '@/lib/content'
import React from 'react'

export const metadata = generateSEO({
    title: "Lab",
    description: "Explore the various experiments on Electronics, IoT, web development, and AI.",
    url: "/lab",
})

interface LabPageProps {
    searchParams?: Promise<{
        query?: string;
    }>;
}

export default async function lab(props: LabPageProps) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    return <LabList experiments={experiments} query={query} />
}
