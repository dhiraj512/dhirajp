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

export { Experiments };