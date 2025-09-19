import { defineTable } from "convex/server";
import { v } from "convex/values";

export const subscriptions = defineTable({
  // A unique ID for the subscription, useful for external systems like payment gateways
  id: v.string(),

  // The ID of the plan the user is subscribed to
  planId: v.string(),

  // The ID of the user who owns the subscription
  userId: v.id("users"),

  // The status of the subscription (e.g., "active", "canceled", "past_due")
  status: v.optional(
    v.union(
      v.literal("active"),
      v.literal("canceled"),
      v.literal("pending"),
      v.literal("expired")
    )
  ),
  mpesaPhoneNumber: v.optional(v.string()),
  // The date the subscription started
  startDate: v.number(), // Using a timestamp number for easy comparison and storage

  // The date the next payment is due
  nextBillingDate: v.number(),

  // Whether the subscription will automatically renew at the end of the term
  autoRenew: v.boolean(),

  // The tier of the plan (e.g., "starter", "pro", "premium")
  tier: v.string(),
}).index("by_userId", ["userId"]); // Index to quickly find a user's subscriptions
