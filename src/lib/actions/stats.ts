'use server';

import { db } from '@/lib/db';
import { stats, userInteractions } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { connection } from 'next/server';

export async function incrementViews(slug: string, sessionId: string): Promise<number | null> {
    await connection();

    try {
        // Check if user has already viewed this post
        const existingInteraction = await db
            .select()
            .from(userInteractions)
            .where(and(
                eq(userInteractions.sessionId, sessionId),
                eq(userInteractions.slug, slug)
            ))
            .limit(1);

        // If user has already viewed, return current count without incrementing
        if (existingInteraction.length > 0 && existingInteraction[0].hasViewed === 1) {
            const currentStats = await db
                .select({ views: stats.views })
                .from(stats)
                .where(eq(stats.slug, slug))
                .limit(1);

            return currentStats[0]?.views ?? 0;
        }

        // First, upsert the user interaction to mark as viewed
        await db
            .insert(userInteractions)
            .values({
                sessionId,
                slug,
                hasViewed: 1,
                likes: existingInteraction[0]?.likes ?? 0,
            })
            .onConflictDoUpdate({
                target: [userInteractions.sessionId, userInteractions.slug],
                set: {
                    hasViewed: 1,
                    updatedAt: new Date(),
                },
            });

        // Then increment the view count in stats
        const result = await db
            .insert(stats)
            .values({
                slug,
                views: 1,
                likes: 0,
            })
            .onConflictDoUpdate({
                target: stats.slug,
                set: {
                    views: sql`${stats.views} + 1`,
                    updatedAt: new Date(),
                },
            })
            .returning({ views: stats.views });

        return result[0]?.views ?? null;
    } catch (error) {
        console.error('Failed to increment views:', error);
        return null;
    }
}

export async function incrementLikes(slug: string, sessionId: string): Promise<{ totalLikes: number; userLikes: number } | null> {
    await connection();

    try {
        // Get current user interaction
        const currentInteraction = await db
            .select()
            .from(userInteractions)
            .where(and(
                eq(userInteractions.sessionId, sessionId),
                eq(userInteractions.slug, slug)
            ))
            .limit(1);

        const currentUserLikes = currentInteraction[0]?.likes ?? 0;

        // Check if user has reached the limit (3 likes)
        if (currentUserLikes >= 3) {
            const currentStats = await db
                .select({ likes: stats.likes })
                .from(stats)
                .where(eq(stats.slug, slug))
                .limit(1);

            return {
                totalLikes: currentStats[0]?.likes ?? 0,
                userLikes: currentUserLikes
            };
        }

        // First, increment user's like count
        await db
            .insert(userInteractions)
            .values({
                sessionId,
                slug,
                likes: 1,
                hasViewed: currentInteraction[0]?.hasViewed ?? 0,
            })
            .onConflictDoUpdate({
                target: [userInteractions.sessionId, userInteractions.slug],
                set: {
                    likes: sql`${userInteractions.likes} + 1`,
                    updatedAt: new Date(),
                },
            });

        // Then increment the total like count in stats
        const statsResult = await db
            .insert(stats)
            .values({
                slug,
                likes: 1,
                views: 0,
            })
            .onConflictDoUpdate({
                target: stats.slug,
                set: {
                    likes: sql`${stats.likes} + 1`,
                    updatedAt: new Date(),
                },
            })
            .returning({ likes: stats.likes });

        // Get updated user likes count
        const updatedUserInteraction = await db
            .select({ likes: userInteractions.likes })
            .from(userInteractions)
            .where(and(
                eq(userInteractions.sessionId, sessionId),
                eq(userInteractions.slug, slug)
            ))
            .limit(1);

        // Revalidate the path
        revalidatePath(slug);

        return {
            totalLikes: statsResult[0]?.likes ?? 0,
            userLikes: updatedUserInteraction[0]?.likes ?? 0
        };
    } catch (error) {
        console.error('Failed to increment likes:', error);
        return null;
    }
}

export async function getCounts(slug: string, sessionId?: string): Promise<{
    views: number;
    likes: number;
    userLikes: number;
    hasViewed: boolean
}> {
    await connection();

    try {
        // Get stats
        const statsResult = await db
            .select({
                views: stats.views,
                likes: stats.likes,
            })
            .from(stats)
            .where(eq(stats.slug, slug))
            .limit(1);

        const currentStats = statsResult[0] ?? { views: 0, likes: 0 };

        // Get user interaction if sessionId provided
        let userInteraction = { likes: 0, hasViewed: false };
        if (sessionId) {
            const userResult = await db
                .select({
                    likes: userInteractions.likes,
                    hasViewed: userInteractions.hasViewed,
                })
                .from(userInteractions)
                .where(and(
                    eq(userInteractions.sessionId, sessionId),
                    eq(userInteractions.slug, slug)
                ))
                .limit(1);

            if (userResult[0]) {
                userInteraction = {
                    likes: userResult[0].likes,
                    hasViewed: userResult[0].hasViewed === 1
                };
            }
        }

        return {
            views: currentStats.views,
            likes: currentStats.likes,
            userLikes: userInteraction.likes,
            hasViewed: userInteraction.hasViewed
        };
    } catch (error) {
        console.error('Failed to get counts:', error);
        return { views: 0, likes: 0, userLikes: 0, hasViewed: false };
    }
}

export async function getAllStats(): Promise<{ slug: string; views: number; likes: number }[]> {
    await connection();

    try {
        const result = await db
            .select({
                slug: stats.slug,
                views: stats.views,
                likes: stats.likes,
            })
            .from(stats)
            .orderBy(sql`${stats.views} DESC`);

        return result;
    } catch (error) {
        console.error('Failed to get all stats:', error);
        return [];
    }
}