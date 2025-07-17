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
        label: "Labs",
        path: "/labs",
        icon: "flask",
    },
    {
        label: "Resources",
        path: "/resources",
        icon: "bookopen",
    },
]
