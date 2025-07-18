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
        label: "Resources",
        path: "/resources",
        icon: "bookopen",
    },
]
