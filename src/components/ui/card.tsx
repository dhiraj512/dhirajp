import * as React from "react"
import { cn, formatDate } from "@/lib/utils"
import { Experiment, Project } from "@/content"
import { Badge } from "./badge"
import ViewCounter from "./view-counter"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const ExperimentCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    experiment: Experiment
  }
>(({ className, experiment, ...props }, ref) => (
  <Card ref={ref}
    className={cn("group cursor-pointer border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-primary/20",
      className)}
    {...props}
  >
    <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
      <time dateTime={experiment.publishedDate}>
        {formatDate(experiment.publishedDate)}
      </time>
      <ViewCounter slug={experiment.slug} incrementView={false} />
    </div>
    <h2 className="text-xl group-hover:text-primary transition-colors md:text-2xl font-semibold">
      {experiment.title}
    </h2>
  </Card>
))
ExperimentCard.displayName = "ExperimentCard"

const ProjectCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    project: Project
    onSelect: (project: Project) => void
  }
>(({ className, project, onSelect, ...props }, ref) => (
  <Card
    ref={ref}
    onClick={() => onSelect(project)}
    className={cn(
      "group cursor-pointer border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-primary/20",
      className
    )}
    {...props}
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
      <div className="text-sm text-muted-foreground ml-6">
        {formatDate(project.displayDate.toString())}
      </div>
    </div>
  </Card>
))
ProjectCard.displayName = "ProjectCard"

export { Card, ExperimentCard, ProjectCard }
