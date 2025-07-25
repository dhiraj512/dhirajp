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

export {
    experiments,
    getExperimentBySlug,
}