'use client';

import { useState, useEffect } from 'react';
import { incrementViews, getCounts } from '@/lib/actions/stats';
import { getSessionId } from '@/lib/session';
import Icon from './icon';
import { cn } from '@/lib/utils';

interface ViewCounterProps {
    slug: string;
    incrementView?: boolean;
    className?: string;
}

export default function ViewCounter({
    slug,
    incrementView = true,
    className
}: ViewCounterProps) {
    const [views, setViews] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleView = async () => {
            try {
                const sessionId = getSessionId();

                if (incrementView) {
                    // Full blog post view - increment if not already viewed
                    const counts = await getCounts(slug, sessionId);

                    if (!counts.hasViewed) {
                        // User hasn't viewed this post yet, increment view
                        const newViews = await incrementViews(slug, sessionId);
                        if (newViews !== null) {
                            setViews(newViews);
                        } else {
                            setViews(counts.views);
                        }
                    } else {
                        // User has already viewed, just show current count
                        setViews(counts.views);
                    }
                } else {
                    // Post card view - just get current count without incrementing
                    const counts = await getCounts(slug, sessionId);
                    setViews(counts.views);
                }
            } catch (error) {
                console.error('Failed to handle view:', error);
                // Fallback: try to get current counts
                try {
                    const counts = await getCounts(slug);
                    setViews(counts.views);
                } catch (fallbackError) {
                    console.error('Failed to get counts:', fallbackError);
                }
            } finally {
                setIsLoading(false);
            }
        };

        handleView();
    }, [slug, incrementView]);

    if (isLoading) {
        return (
            <div className={cn("flex items-center space-x-2 text-muted-foreground", className)}>
                <Icon.eye className="size-4" />
                <div className="w-8 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            </div>
        );
    }

    return (
        <div className={cn("flex items-center space-x-2 text-muted-foreground", className)}>
            <Icon.eye className="size-4" />
            <span className="text-sm font-medium">{views.toLocaleString()}</span>
        </div>
    );
}