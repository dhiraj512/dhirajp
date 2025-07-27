import React from 'react'
import Link from 'next/link';
import { Experiment } from '@/content';
import { ExperimentCard } from '../ui/card';
import Search from '../ui/search';
import { getFilteredExperiments } from '@/lib/content';

interface LabListProps {
    experiments: Experiment[]
    query?: string
}

export const LabList = ({ experiments, query }: LabListProps) => {
    const filteredExperiments = getFilteredExperiments(query || '');
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
            <Search placeholder="Search experiments" />
            <div className="grid gap-4 grid-cols-1">
                {filteredExperiments.length > 0 && (
                    filteredExperiments.map((experiment) => (
                        <Link key={experiment.slug} href={experiment.slug}>
                            <ExperimentCard experiment={experiment} />
                        </Link>
                    ))
                )}
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
