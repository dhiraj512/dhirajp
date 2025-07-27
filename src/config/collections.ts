import { defineCollection, s } from "velite";

const Experiments = defineCollection({
    name: 'Experiment',
    pattern: 'lab/**/*.mdx',
    schema: s
        .object({
            slug: s.path(),
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
                // slug: data.path.split("/").slice(1).join("/"),
                // slugAsParams: data.path.split("/").slice(2).join("/"),
                slugAsParams: data.slug.split("/").slice(1).join("/"),
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
            year: data.startDate.getFullYear(),
            displayDate: data.endDate ? data.endDate : data.startDate
        }))
});

export { Experiments, Projects };
