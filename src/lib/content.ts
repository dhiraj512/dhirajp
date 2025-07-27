import Fuse from 'fuse.js';
import { Experiment, Experiments } from "@/content";
import { notFound } from "next/navigation";
import { env } from "./env";

const experiments = Experiments.filter((experiment) => experiment.isPublished === true)

const getExperimentBySlug = (slug: string): Experiment => {
    const experiment = experiments.find((exp) => exp.slugAsParams === slug);

    if (!experiment || (env.NODE_ENV === 'production' && !experiment.isPublished)) {
        notFound();
    }
    if (!experiment) {
        notFound();
    }
    return experiment;
}

// Enhanced filter function with Fuse.js
const getFilteredExperiments = (query: string = ''): Experiment[] => {
    // Create Fuse instance
    const fuse = new Fuse(experiments, {
        keys: [
            {
                name: 'title',
                weight: 0.3
            },
            {
                name: 'content',
                weight: 0.2
            },
            {
                name: 'category',
                weight: 0.2
            },
            {
                name: 'tags',
                weight: 0.2
            }
        ],
        // Search configuration
        threshold: 0.2, // 0.0 = perfect match, 1.0 = match anything
        ignoreLocation: true, // Ignore location of match in string

        // Advanced options
        useExtendedSearch: false, // Enable extended search syntax
        findAllMatches: false, // Find all matches (vs just first match)
    });

    if (!query) return experiments;
    const searchTerm = query.toLowerCase();
    const searchResults = fuse.search(searchTerm);

    return searchResults.map(result => result.item);
}

export {
    experiments,
    getFilteredExperiments,
    getExperimentBySlug
}