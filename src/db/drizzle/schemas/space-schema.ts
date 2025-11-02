import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./auth-schema";

// ----------- SPACES -----------
export const space = pgTable("space", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ----------- FOLDERS -----------
export const folder = pgTable("folder", {
    id: uuid("id").defaultRandom().primaryKey(),
    spaceId: uuid("space_id")
        .notNull()
        .references(() => space.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ----------- NOTES -----------
export const notes = pgTable("notes", {
    id: uuid("id").defaultRandom().primaryKey(),
    folderId: uuid("folder_id")
        .notNull()
        .references(() => folder.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    content: text("content"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

//
// ----------- RELATIONS -----------
export const userRelations = relations(user, ({ many }) => ({
    spaces: many(space),
}));

export const spaceRelations = relations(space, ({ one, many }) => ({
    user: one(user, {
        fields: [space.userId],
        references: [user.id],
    }),
    folders: many(folder),
}));

export const folderRelations = relations(folder, ({ one, many }) => ({
    space: one(space, {
        fields: [folder.spaceId],
        references: [space.id],
    }),
    notes: many(notes),
}));

export const noteRelations = relations(notes, ({ one }) => ({
    folder: one(folder, {
        fields: [notes.folderId],
        references: [folder.id],
    }),
}));
