import { env } from "@/lib/env";
import { Metadata } from 'next'

export const siteConfig = {
    name: "Dhiraj",
    title: "Dhiraj's Personal Site",
    description: "A personal website and blog by Dhiraj",
    url: "https://dhirajp.vercel.app",
    ogImage: "https://dhirajp.vercel.app/og-image.jpg",
    creator: "@dhiraj",
    keywords: ["nextjs", "react", "typescript", "web development"],
    language: "en",
    locale: "en_US",
    twitter: {
        card: "summary_large_image",
        creator: "@dhiraj_512",
        site: "@dhiraj_512",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: "Your Site Name",
    },
    author: {
        name: "Dhiraj",
        url: env.NEXT_PUBLIC_APP_URL || "https://dhirajp.vercel.app",
        image: "/profile.jpg",
    },
    links: {
        twitter: "https://x.com/dhiraj_512",
        x: "https://x.com/dhiraj_512",
        github: "https://github.com/dhiraj512",
        linkedin: "https://linkedin.com/in/dhiraj512",
    },
} as const

// Default metadata that can be used across pages
export const defaultMetadata: Metadata = {
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [...siteConfig.keywords],
    authors: [siteConfig.author],
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    alternates: {
        canonical: siteConfig.url,
    },
    openGraph: {
        type: siteConfig.openGraph.type,
        locale: siteConfig.openGraph.locale,
        url: siteConfig.url,
        title: siteConfig.title,
        description: siteConfig.description,
        siteName: siteConfig.openGraph.siteName,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.title,
            },
        ],
    },
    twitter: {
        card: siteConfig.twitter.card,
        title: siteConfig.title,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: siteConfig.twitter.creator,
        site: siteConfig.twitter.site,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

// Helper function to generate dynamic metadata
export function generateSEO({
    title,
    description,
    image,
    url,
    noIndex = false,
}: {
    title?: string
    description?: string
    image?: string
    url?: string
    noIndex?: boolean
}): Metadata {
    return {
        title: title ? title : defaultMetadata.title,
        description: description || siteConfig.description,
        alternates: {
            canonical: url ? `${siteConfig.url}${url}` : siteConfig.url,
        },
        openGraph: {
            type: 'website',
            locale: siteConfig.openGraph.locale,
            url: url ? `${siteConfig.url}${url}` : siteConfig.url,
            title: title || siteConfig.title,
            description: description || siteConfig.description,
            siteName: siteConfig.openGraph.siteName,
            images: [
                {
                    url: image || siteConfig.ogImage,
                    width: 1200,
                    height: 630,
                    alt: title || siteConfig.title,
                },
            ],
        },
        twitter: {
            card: siteConfig.twitter.card,
            title: title || siteConfig.title,
            description: description || siteConfig.description,
            images: [image || siteConfig.ogImage],
            creator: siteConfig.twitter.creator,
            site: siteConfig.twitter.site,
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    }
}