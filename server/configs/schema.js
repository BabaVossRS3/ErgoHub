// db/schema/index.js
import { timestamp, pgTable, text, varchar, boolean, real, json, integer } from "drizzle-orm/pg-core";
import { createId } from '@paralleldrive/cuid2';

// Base users table for authentication
export const users = pgTable("users", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  role: varchar("role", { length: 20 }).notNull().default('user'), // 'user' or 'professional'
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Regular users table
export const regularUsers = pgTable("regular_users", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  user_id: text("user_id").references(() => users.id).notNull(),
  name: varchar("name", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Professional users table
export const professionals = pgTable("professionals", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  user_id: text("user_id").references(() => users.id).notNull(),
  professional_name: varchar("professional_name", { length: 255 }),
  profession: varchar("profession", { length: 100 }),
  business_address: text("business_address"),
  phone: varchar("phone", { length: 20 }),
  is_verified: boolean("is_verified").default(false),
  bio: text("bio"),
  rating: real("rating").default(0),
  availability: json("availability").default([]), // Array of available days/times
  online: boolean("online").default(false),
  business_email: varchar("business_email", { length: 255 }),
  userPlan: varchar("user_plan", { length: 50 }).default('free'),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  user_id: text("user_id").references(() => users.id).notNull(),
  professional_id: text("professional_id").references(() => professionals.id).notNull(),
  date: timestamp("date").notNull(),
  time_slot: varchar("time_slot", { length: 50 }).notNull(), // e.g., "09:00-10:00"
  status: varchar("status", { length: 20 }).notNull().default('pending'), // pending, confirmed, completed, cancelled
  notes: text("notes"), // Optional notes from the user
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Reviews table
export const reviews = pgTable("reviews", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  user_id: text("user_id").references(() => users.id).notNull(),
  professional_id: text("professional_id").references(() => professionals.id).notNull(),
  booking_id: text("booking_id").references(() => bookings.id), // Optional, link to specific booking
  rating: integer("rating").notNull(), // 1-5 rating
  comment: text("comment"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Services table (for professionals to list their services)
export const services = pgTable("services", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  professional_id: text("professional_id").references(() => professionals.id).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  duration: integer("duration").notNull(), // Duration in minutes
  price: integer("price").notNull(), // Price in cents
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Subscriptions table (for professional plans)
export const subscriptions = pgTable("subscriptions", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  professional_id: text("professional_id").references(() => professionals.id).notNull(),
  plan_type: varchar("plan_type", { length: 50 }).notNull(), // free, basic, premium, etc.
  status: varchar("status", { length: 20 }).notNull(), // active, cancelled, expired
  start_date: timestamp("start_date").notNull(),
  end_date: timestamp("end_date"),
  price: integer("price").notNull(), // Price in cents
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Availability Exceptions table (for handling days off, holidays, etc.)
export const availabilityExceptions = pgTable("availability_exceptions", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  professional_id: text("professional_id").references(() => professionals.id).notNull(),
  date: timestamp("date").notNull(),
  reason: varchar("reason", { length: 255 }), // e.g., "Holiday", "Day Off", "Vacation"
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});