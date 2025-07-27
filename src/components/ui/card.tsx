import * as React from "react"
import { cn, formatDate } from "@/lib/utils"
import { Experiment } from "@/content"

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
    className={cn("block border rounded-lg p-4 space-y-2 hover:shadow-md transition-shadow",
      className)}
    {...props}
  >
    <div className="flex items-center justify-between">
      <span className="text-xs bg-secondary px-2 py-1 rounded">
        {experiment.category}
      </span>
      <span className="text-xs text-muted-foreground">
        {experiment.status}
      </span>
    </div>
    <h3 className="text-lg font-semibold">
      {experiment.title}
    </h3>
    <div className="flex items-center justify-start gap-2 text-xs text-muted-foreground">
      <time dateTime={experiment.publishedDate}>
        {formatDate(experiment.publishedDate)}
      </time>
      <span>{experiment.readingTime} min read</span>
    </div>
  </Card>
))
ExperimentCard.displayName = "ExperimentCard"

export { Card, ExperimentCard }
