import { MDX } from '@/components/mdx'
import { siteConfig } from '@/config/site'
import { Experiment } from '@/content'
import { formatDate } from '@/lib/utils'
import React from 'react'
import ViewCounter from '../ui/view-counter'
import LikeButton from '../ui/like-button'
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
                    <ViewCounter slug={experiment.slug} />
                </div>
            </header>

            {/* Experiment Content */}
            <article className="">
                <MDX code={experiment.content} />
            </article>

            {/* Experiment Footer */}
            <footer className="flex items-center justify-between mx-8 my-2 gap-1.5 text-sm text-muted-foreground">
                <div className="flex items-center flex-wrap gap-x-1">
                    <span>
                        Published by
                    </span>
                    <span className="font-medium">{siteConfig.author.name}</span>
                    <time>
                        on {formatDate(experiment.publishedDate)}
                    </time>
                </div>
                <LikeButton slug={experiment.slug} />
            </footer>
        </div>
    )
}