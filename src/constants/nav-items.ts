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
    {
        label: "Resources",
        path: "/resources",
        icon: "bookopen",
    },
]


export const getPageTitle = (pathname: string) => {

    const segment = pathname.split("/").filter(Boolean)[0] || "";

    const titleMap: Record<string, string> = {
        'lab': 'Experiments',
        'projects': 'Projects',
        'resources': 'Resources',
    };

    return titleMap[segment] || segment;
};