import { relations } from "drizzle-orm";
import {
  boolean,
  pgSchema,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

const authSchema = pgSchema("auth");
const roleSchema = pgSchema("authorization");

const users = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

export const usersRolesTable = roleSchema.table(
  "users_roles",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    roleId: uuid("role_id")
      .notNull()
      .references(() => rolesTable.id),
  },
  (table) => {
    return {
      uniqueUserRoles: uniqueIndex("unique_user_roles").on(
        table.userId,
        table.roleId,
      ),
    };
  },
);

export const usersRolesRelation = relations(usersRolesTable, ({ one }) => ({
  user: one(users, {
    fields: [usersRolesTable.userId],
    references: [users.id],
  }),

  // Define the relation to the roles table here
  role: one(rolesTable, {
    fields: [usersRolesTable.roleId],
    references: [rolesTable.id],
  }),
}));

export const rolesTable = roleSchema.table("roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const profilesTable = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id),
  displayName: text("display_name"),
  picture: text("picture"),
  birthdate: timestamp("birthdate", { mode: "date" }),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const usersRelations = relations(profilesTable, ({ many }) => ({
  collections: many(collectionsTable),
}));

export const collectionsTable = pgTable("collections", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  creatorId: uuid("owner_id")
    .notNull()
    .references(() => profilesTable.userId, { onDelete: "cascade" }),
  isPublic: boolean("is_public").notNull().default(true),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const collectionsRelations = relations(
  collectionsTable,
  ({ one, many }) => ({
    creator: one(profilesTable, {
      fields: [collectionsTable.creatorId],
      references: [profilesTable.userId],
    }),
    definitionCards: many(definitionCardsTable),
  }),
);

export const definitionCardsTable = pgTable("definition_cards", {
  id: uuid("id").defaultRandom().primaryKey(),
  collectionId: uuid("collection_id")
    .notNull()
    .references(() => collectionsTable.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const definitionCardsRelations = relations(
  definitionCardsTable,
  ({ one }) => ({
    collection: one(collectionsTable, {
      fields: [definitionCardsTable.collectionId],
      references: [collectionsTable.id],
    }),
  }),
);

export const learnedCollectionsTable = pgTable(
  "learning_history",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profilesTable.userId, { onDelete: "cascade" }),
    collectionId: uuid("collection_id")
      .notNull()
      .references(() => collectionsTable.id, { onDelete: "cascade" }),
    learnedAt: timestamp("learned_at", { mode: "date" }).notNull().defaultNow(),

    // Define the composite unique constraint here
  },
  (table) => {
    return {
      uniqueUserCollection: uniqueIndex("unique_user_collection").on(
        table.userId,
        table.collectionId,
      ),
    };
  },
);

export const learnedCollectionsRelations = relations(
  learnedCollectionsTable,
  ({ one }) => ({
    user: one(profilesTable, {
      fields: [learnedCollectionsTable.userId],
      references: [profilesTable.userId],
    }),
    collection: one(collectionsTable, {
      fields: [learnedCollectionsTable.collectionId],
      references: [collectionsTable.id],
    }),
  }),
);
