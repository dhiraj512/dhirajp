import React from 'react'
import Link from 'next/link';
import { Experiment } from '@/content';
import { Card } from '../ui/card';
import { formatDate } from '@/lib/utils';

interface LabListProps {
    experiments: Experiment[]
}

export const LabList = ({ experiments }: LabListProps) => {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold">
                    Experiments
                </h2>
                <p className="text-base text-muted-foreground">
                    Explore my experiments various technologies and concepts.
                </p>
            </div>
            <div>
                <div className="grid gap-4 grid-cols-1">
                    {experiments.length > 0 && (
                        experiments.map((experiment) => (
                            <Link key={experiment.slug} href={experiment.slug}>
                                <Card className="block border rounded-lg p-4 space-y-2 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs bg-secondary px-2 py-1 rounded">
                                            {experiment.category}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {experiment.status}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold">
                                        {experiment.title}
                                    </h3>
                                    <div className="flex items-center justify-start gap-2 text-xs text-muted-foreground">
                                        <time dateTime={experiment.publishedDate}>
                                            {formatDate(experiment.publishedDate)}
                                        </time>
                                        <span>{experiment.readingTime} min read</span>
                                    </div>
                                </Card>
                            </Link>
                        ))
                    )}
                </div>
            </div>
            {experiments.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">
                        No experiments published yet.
                    </p>
                </div>
            )}
        </div>
    )
}
