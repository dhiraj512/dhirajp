export interface NavItem {
    label: string
    description?: string
    path: string
    icon: string
}

export const NavItems: NavItem[] = [
    {
        label: "Home",
        path: "/",
        icon: "home",
    },
    {
        label: "Lab",
        path: "/lab",
        icon: "flask",
    },
    {
        label: "Projects",
        path: "/projects",
        icon: "project",
    },
]
