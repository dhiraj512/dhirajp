import { MDX } from '@/components/mdx'
import { siteConfig } from '@/config/site'
import { Experiment } from '@/content'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface ExperimentDetailsProps {
    experiment: Experiment
}

export const ExperimentDetails = ({ experiment }: ExperimentDetailsProps) => {

    return (
        <div className="space-y-8">
            {/* Experiment Header */}
            <header className="space-y-2">
                <h1 className="text-3xl font-bold">{experiment.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Published: {new Date(experiment.publishedDate).toLocaleDateString()}</span>
                    <span>{experiment.readingTime} min read</span>
                </div>
            </header>

            {/* Experiment Content */}
            <article className="">
                <MDX code={experiment.content} />
            </article>

            {/* Experiment Footer */}
            <footer className="flex flex-wrap items-center justify-start gap-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-x-1">
                    <span>
                        Published by:
                    </span>
                    <Image src={siteConfig.author.image} alt={siteConfig.author.name} width={15} height={15} className="rounded-full" />
                    <h4 className="font-medium">{siteConfig.author.name}</h4>
                    <time>
                        on {formatDate(experiment.publishedDate)}
                    </time>
                </div>
            </footer >
        </div>
    )
}