import { pgTable, text, integer, timestamp, primaryKey } from 'drizzle-orm/pg-core';

export const stats = pgTable('stats', {
    slug: text('slug').primaryKey(),
    likes: integer('likes').default(0).notNull(),
    views: integer('views').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userInteractions = pgTable('user_interactions', {
    sessionId: text('session_id').notNull(),
    slug: text('slug').notNull(),
    likes: integer('likes').default(0).notNull(),
    hasViewed: integer('has_viewed').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
    primaryKey({ columns: [table.sessionId, table.slug] }),
]);

export type Stats = typeof stats.$inferSelect;
export type UserInteraction = typeof userInteractions.$inferSelect;
export type NewStats = typeof stats.$inferInsert;
export type NewUserInteraction = typeof userInteractions.$inferInsert;