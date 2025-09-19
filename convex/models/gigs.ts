import { defineTable } from "convex/server";
import { v } from "convex/values";

export const gigsTable = defineTable({
  postedBy: v.id("users"),
  bookedBy: v.optional(v.id("users")),

  // Basic gig information
  title: v.string(),
  secret: v.string(),
  description: v.optional(v.string()),
  phone: v.optional(v.string()),
  price: v.optional(v.string()),
  category: v.optional(v.string()),
  bandCategory: v.optional(v.array(v.string())),
  bussinesscat: v.string(),
  location: v.optional(v.string()),

  // Date and time
  date: v.optional(v.number()),
  time: v.object({
    from: v.optional(v.string()),
    to: v.string(),
  }),

  // Status flags
  isTaken: v.boolean(),
  isPending: v.boolean(),

  // Tracking arrays
  viewCount: v.array(v.id("users")),
  bookCount: v.array(v.id("users")),

  // Styling
  font: v.optional(v.string()),
  fontColor: v.optional(v.string()),
  backgroundColor: v.optional(v.string()),
  logo: v.string(),

  // Timeline information
  gigtimeline: v.optional(v.string()),
  otherTimeline: v.optional(v.string()),
  day: v.optional(v.string()),

  // Talent-specific fields
  mcType: v.optional(v.string()),
  mcLanguages: v.optional(v.string()),
  djGenre: v.optional(v.string()),
  djEquipment: v.optional(v.string()),
  vocalistGenre: v.optional(v.array(v.string())),

  // Pricing
  pricerange: v.optional(v.string()),
  currency: v.optional(v.string()),
  scheduleDate: v.optional(v.number()),

  // Booking history
  bookingHistory: v.array(
    v.object({
      userId: v.id("users"),
      status: v.union(
        v.literal("pending"),
        v.literal("booked"),
        v.literal("completed"),
        v.literal("cancelled")
      ),
      date: v.optional(v.number()),
      role: v.string(),
      notes: v.optional(v.string()),
    })
  ),

  // Payment status
  paymentStatus: v.union(
    v.literal("pending"),
    v.literal("paid"),
    v.literal("refunded")
  ),
  cancellationReason: v.optional(v.string()),

  // Payment confirmation
  musicianConfirmPayment: v.optional(
    v.object({
      gigId: v.id("gigs"),
      confirmPayment: v.boolean(),
      confirmedAt: v.optional(v.number()),
      code: v.optional(v.string()),
      temporaryConfirm: v.optional(v.boolean()),
    })
  ),
  clientConfirmPayment: v.optional(
    v.object({
      gigId: v.id("gigs"),
      confirmPayment: v.boolean(),
      confirmedAt: v.optional(v.number()),
      code: v.optional(v.string()),
      temporaryConfirm: v.optional(v.boolean()),
    })
  ),

  // Rating
  gigRating: v.optional(v.number()),

  // Timestamps
})
  .index("by_postedBy", ["postedBy"])
  .index("by_bookedBy", ["bookedBy"])
  .index("by_category", ["category"])
  .index("by_bussinesscat", ["bussinesscat"])
  .index("by_location", ["location"])
  .index("by_date", ["date"])
  .index("by_isTaken", ["isTaken"])
  .index("by_isPending", ["isPending"])
  .index("by_paymentStatus", ["paymentStatus"]);
