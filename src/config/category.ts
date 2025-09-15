import Icon from "@/components/ui/icon";

export const activeCategoryColor = (category: string) => {
    switch (category) {
        case "sites":
            return "border-blue-500 text-blue-500"
        case "snippets":
            return "border-green-500 text-green-500"
        case "prompts":
            return "border-purple-500 text-purple-500"
        case "tools":
            return "border-orange-500 text-orange-500"
        default:
            return "border-muted-foreground text-muted-foreground"
    }
}

const hoverEffectColor = (category: string) => {
    switch (category) {
        case "sites":
            return "hover:border-blue-500 group-hover:text-blue-500"
        case "snippets":
            return "hover:border-green-500 group-hover:text-green-500"
        case "prompts":
            return "hover:border-purple-500 group-hover:text-purple-500"
        case "tools":
            return "hover:border-orange-500 group-hover:text-orange-500"
        default:
            return "hover:border-gray-500 group-hover:text-gray-500"
    }
}

export const IconColor = (category: string) => {
    switch (category) {
        case "sites":
            return "text-blue-500"
        case "snippets":
            return "text-green-500"
        case "prompts":
            return "text-purple-500"
        case "tools":
            return "text-orange-500"
        default:
            return "text-gray-500"
    }
}


const categoryConfig = {
    sites: {
        icon: Icon.globe,
        iconColor: IconColor("sites"),
        hover: hoverEffectColor("sites"),
    },
    prompts: {
        icon: Icon.message,
        iconColor: IconColor("prompts"),
        hover: hoverEffectColor("prompts"),
    },
    snippets: {
        icon: Icon.code,
        iconColor: IconColor("snippets"),
        hover: hoverEffectColor("snippets"),
    },
    tools: {
        icon: Icon.wrench,
        iconColor: IconColor("tools"),
        hover: hoverEffectColor("tools"),
    },
    default: {
        icon: Icon.folder,
        iconColor: IconColor("default"),
        hover: hoverEffectColor("default"),
    }
};



export const getCategoryConfig = (category: string) => {
    const key = category.toLowerCase() as keyof typeof categoryConfig;
    return categoryConfig[key] || categoryConfig.default;
}