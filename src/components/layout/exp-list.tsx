import React from 'react'
import Link from 'next/link';
import { Experiment } from '@/content';
import { ExperimentCard } from '../ui/card';
import Search from '../ui/search';
import { getFilteredExperiments } from '@/lib/content';

interface ExpListProps {
    experiments: Experiment[]
    query?: string
}

export const ExpList = ({ experiments, query }: ExpListProps) => {
    const filteredExperiments = getFilteredExperiments(query || '');
    return (
        <div className="space-y-8">
            <Search placeholder="Search experiments" />
            <div className="grid gap-4 grid-cols-1">
                {filteredExperiments.length > 0 && (
                    filteredExperiments.map((experiment) => (
                        <Link key={experiment.path} href={experiment.path}>
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
