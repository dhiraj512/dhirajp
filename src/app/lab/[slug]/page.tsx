import { ExperimentDetails } from '@/components/layout'
import { generateSEO } from '@/config/site'
import { getExperimentBySlug } from '@/lib/content'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params

    const experiment = getExperimentBySlug(slug)

    return generateSEO({
        title: experiment.title,
        description: experiment.description,
        url: `/lab/${slug}`,
    })
}

export default async function ExperimentPage({ params }: PageProps) {
    const { slug } = await params

    let experiment
    try {
        experiment = getExperimentBySlug(slug)
    } catch {
        notFound()
    }

    return <ExperimentDetails experiment={experiment} />
}