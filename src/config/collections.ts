import { createSlug } from "@/lib/utils";
import { defineCollection, s } from "velite";

const Experiments = defineCollection({
    name: 'Experiment',
    pattern: 'lab/**/*.mdx',
    schema: s
        .object({
            path: s.path(),
            title: s.string().max(99),
            description: s.string().max(999).optional(),
            publishedDate: s.isodate(),
            thumbnail: s.string().optional(),
            isPublished: s.boolean().default(true),
            category: s.string(),
            tags: s.array(s.string()),
            keywords: s.array(s.string()).optional(),
            status: s.enum(['Completed', 'In Progress', 'Planned']),
            content: s.mdx(),
            metadata: s.metadata()
        })
        .transform((data) => {
            return {
                ...data,
                slug: data.path.split("/").slice(1).join("/"),
                readingTime: data.metadata.readingTime,
            }
        }),
});

const Projects = defineCollection({
    name: 'Project',
    pattern: 'projects.yaml',
    schema: s.object({
        title: s.string(),
        description: s.string(),
        image: s.string(),
        technologies: s.array(s.string()),
        repository: s.string().url().optional(),
        liveUrl: s.string().url().optional(),
        status: s.enum(['completed', 'in-progress']).default('completed'),
        featured: s.boolean().default(false),
        startDate: s.string().transform((str) => new Date(str)),
        endDate: s.string().optional().transform((str) => str ? new Date(str) : null)
    })
        .transform((data) => ({
            ...data,
            slug: createSlug(data.title),
            year: data.startDate.getFullYear(),
            displayDate: data.endDate ? data.endDate : data.startDate
        }))
});

const Resources = defineCollection({
    name: 'Resource',
    pattern: 'resources/*.yaml',
    schema: s
        .object({
            path: s.path(),
            title: s.string(),
            description: s.string().optional(),
            tags: s.array(s.string()).optional().default([]),
            url: s.string().url().optional(),
            icon: s.string().optional(),
            screenshot: s.string().optional(),
            code: s.string().optional().transform(val => val?.replace(/\n+$/, '')),
            language: s.string().optional(),
            highlightLines: s.string().optional(),
            highlightWords: s.array(s.string()).optional(),
            fileName: s.string().optional(),
            prompt_type: s.string().optional(),
            model: s.string().optional()
        })
        .transform((data) => ({
            ...data,
            // Auto-set category from filename
            category: data.path.split('/').pop()?.replace('.yaml', '') || 'unknown',
            // Generate slug from title
            slug: createSlug(data.title),
        }))
})

export { Experiments, Projects, Resources };

