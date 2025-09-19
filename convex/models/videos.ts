// Add to your convex/schema.ts file
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export const videosTable = defineTable({
  // Reference to user who posted the video
  postedBy: v.id("users"),

  // Video information
  title: v.string(),
  source: v.string(),
  description: v.string(),

  // Optional gig reference
  gigId: v.optional(v.id("gigs")),

  // Privacy settings
  isPublic: v.boolean(),
  isPrivate: v.boolean(),

  // Thumbnail
  thumbnail: v.optional(v.string()),

  // Likes tracking
  likes: v.array(v.id("users")),
})
  .index("by_postedBy", ["postedBy"])
  .index("by_gigId", ["gigId"])
  .index("by_isPublic", ["isPublic"]);
