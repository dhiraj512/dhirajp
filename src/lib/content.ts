import Fuse from 'fuse.js';
import { Experiment, Experiments, Project, Projects, Resource, Resources } from "@/content";
import { notFound } from "next/navigation";
import { env } from "./env";

const experiments = Experiments.filter((experiment) => experiment.isPublished === true)
const resources = Resources

const getExperimentBySlug = (slug: string): Experiment => {
    const experiment = experiments.find((exp) => exp.slug === slug);

    if (!experiment || (env.NODE_ENV === 'production' && !experiment.isPublished)) {
        notFound();
    }
    if (!experiment) {
        notFound();
    }
    return experiment;
}

// Group projects by year
const getProjectsByYear = (projects: Project[]) => {
    return projects.reduce((acc, project) => {
        if (!acc[project.year]) {
            acc[project.year] = []
        }
        acc[project.year].push(project)
        return acc
    }, {} as Record<number, Project[]>)
}

const getProjectBySlug = (slug: string): Project => {
    const project = Projects.find((project) => project.slug === slug);
    if (!project) {
        notFound();
    }
    return project;
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

// Get all unique categories from resources
const getCategories = (resources: Resource[]): string[] => {
    const categories = resources.map(resource => resource.category);
    return [...new Set(categories)].sort();
};

// Get filtered resources with Fuse.js
const getFilteredResources = (resources: Resource[], query: string = ''): Resource[] => {
    // Create Fuse instance
    const fuse = new Fuse(resources, {
        keys: [
            {
                name: 'title',
                weight: 0.5
            },
            {
                name: 'description',
                weight: 0.4
            },
            {
                name: 'code',
                weight: 0.3
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

    if (!query) return resources;
    const searchTerm = query.toLowerCase();
    const searchResults = fuse.search(searchTerm);

    return searchResults.map(result => result.item);
}

export {
    experiments,
    resources,
    getCategories,
    getFilteredResources,
    getFilteredExperiments,
    getExperimentBySlug,
    getProjectsByYear,
    getProjectBySlug,
}