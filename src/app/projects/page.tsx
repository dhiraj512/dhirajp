import { ProjectsList } from "@/components/layout"
import { generateSEO } from "@/config/site"
import { Projects } from "@/content"

export const metadata = generateSEO({
    title: "Projects",
    description: "Explore my projects across various technologies and concepts.",
    url: "/projects",
})

export default function projectsPage() {

    const sortedProjects = Projects.sort((a, b) =>
        new Date(b.displayDate).getTime() - new Date(a.displayDate).getTime()
    )

    return <ProjectsList projects={sortedProjects} />
}