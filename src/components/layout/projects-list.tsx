import { Project } from '@/content'
import { ProjectCard } from '../ui/card'
import { getProjectsByYear } from '@/lib/content'
import Link from 'next/link'

interface ProjectsListProps {
    projects: Project[]
}

export const ProjectsList = ({ projects }: ProjectsListProps) => {
    const projectsByYear = getProjectsByYear(projects)
    return (
        <div className="space-y-8">
            {Object.entries(projectsByYear)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([year, yearProjects]) => (
                    <div key={year} className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        {/* Year column */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold text-muted-foreground lg:sticky lg:top-8">{year}</h2>
                        </div>

                        {/* Projects column */}
                        <div className="lg:col-span-10 flex flex-col gap-4">
                            {yearProjects
                                .sort((a, b) => new Date(b.displayDate).getTime() - new Date(a.displayDate).getTime())
                                .map((project) => (
                                    <Link key={project.slug} href={`/projects/${project.slug}`}>
                                        <ProjectCard key={project.slug} project={project} />
                                    </Link>
                                ))}
                        </div>
                    </div>
                ))}
        </div>
    )
}
