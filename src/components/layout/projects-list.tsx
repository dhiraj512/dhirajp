"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Project } from '@/content'
import Icon from '../ui/icon'
import { formatDate } from '@/lib/utils'
import { ProjectCard } from '../ui/card'
import { getProjectsByYear } from '@/lib/content'

interface ProjectsListProps {
    projects: Project[]
}

export const ProjectsList = ({ projects }: ProjectsListProps) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const projectsByYear = getProjectsByYear(projects)
    return (
        <>
            <div className="space-y-8">
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">
                        Projects
                    </h2>
                    <p className="text-base text-muted-foreground">
                        Explore my projects various technologies and concepts.
                    </p>
                </div>
                {Object.entries(projectsByYear)
                    .sort(([a], [b]) => Number(b) - Number(a))
                    .map(([year, yearProjects]) => (
                        <div key={year} className="grid grid-cols-12 gap-8">
                            {/* Year column */}
                            <div className="col-span-2">
                                <h2 className="text-2xl font-semibold text-muted-foreground sticky top-8">
                                    {year}
                                </h2>
                            </div>

                            {/* Projects column */}
                            <div className="col-span-10 space-y-4">
                                {yearProjects
                                    .sort((a, b) => new Date(b.displayDate).getTime() - new Date(a.displayDate).getTime())
                                    .map((project, index) => (
                                        <ProjectCard
                                            key={project.title}
                                            project={project}
                                            onSelect={() => setSelectedProject(project)}
                                            className={index === 0 ? "mt-0" : ""}
                                        />
                                    ))}
                            </div>
                        </div>
                    ))}
            </div>
            <ProjectDetails
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
            />
        </>
    )
}

interface ProjectDetailsProps {
    selectedProject: Project | null
    setSelectedProject: (project: Project | null) => void
}

const ProjectDetails = ({ selectedProject, setSelectedProject }: ProjectDetailsProps) => {
    return (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                {selectedProject && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6">
                            {/* Project Image */}
                            <div className="relative aspect-video rounded-lg overflow-hidden">
                                <Image
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Project Info */}
                            <div className="space-y-4">
                                <p className="text-muted-foreground leading-relaxed">
                                    {selectedProject.description}
                                </p>

                                {/* Status and Date */}
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Status:</span>
                                        <Badge
                                            variant={selectedProject.status === 'completed' ? 'default' : 'outline'}
                                        >
                                            {selectedProject.status}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Date:</span>
                                        <span className="text-muted-foreground">
                                            {formatDate(selectedProject.displayDate.toISOString())}
                                        </span>
                                    </div>
                                </div>

                                {/* Technologies */}
                                <div>
                                    <h4 className="font-medium mb-2">Technologies Used</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.technologies.map((tech) => (
                                            <Badge key={tech} variant="outline">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Links */}
                                <div className="flex gap-3 pt-4">
                                    {selectedProject.repository && (
                                        <Button asChild variant="outline">
                                            <a
                                                href={selectedProject.repository}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2"
                                            >
                                                <Icon.github className="w-4 h-4" />
                                                View Code
                                            </a>
                                        </Button>
                                    )}
                                    {selectedProject.liveUrl && (
                                        <Button asChild>
                                            <a
                                                href={selectedProject.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2"
                                            >
                                                <Icon.externalLink className="w-4 h-4" />
                                                Live Demo
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}