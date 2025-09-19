// convex/models/users.ts
import { defineTable } from "convex/server";
import { v } from "convex/values";

export const usersTable = defineTable({
  // Basic Info
  clerkId: v.optional(v.string()),
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
  email: v.string(),
  username: v.optional(v.string()),
  phone: v.string(),
  picture: v.optional(v.string()),

  // Location & Personal Info
  city: v.optional(v.string()),
  address: v.optional(v.string()),
  date: v.optional(v.string()),
  month: v.optional(v.string()),
  year: v.optional(v.string()),

  // Musical Info
  instrument: v.optional(v.string()),
  experience: v.optional(v.string()),
  verification: v.optional(v.string()),
  vocalistgenres: v.optional(v.string()),
  musiciangenres: v.optional(v.array(v.string())),
  roleType: v.optional(
    v.union(v.literal("musician"), v.literal("client"), v.literal("both"))
  ),
  talentType: v.optional(
    v.union(
      v.literal("instrumentalist"),
      v.literal("vocalist"),
      v.literal("deejay"),
      v.literal("emcee")
    )
  ),
  djGenre: v.optional(v.string()),
  djEquipment: v.optional(v.string()),
  mcType: v.optional(v.string()),
  mcLanguages: v.optional(v.string()),
  talentbio: v.optional(v.string()),
  organization: v.optional(v.string()),
  handles: v.optional(v.string()),

  // Social & Relationships
  followers: v.optional(v.array(v.id("users"))),
  followings: v.optional(v.array(v.id("users"))),
  refferences: v.optional(v.array(v.id("users"))),

  // Reviews
  allreviews: v.optional(
    v.array(
      v.object({
        _id: v.string(),
        postedBy: v.id("users"),
        postedTo: v.id("users"),
        rating: v.optional(v.number()),
        comment: v.optional(v.string()),
        gigId: v.optional(v.id("gigs")),
        updatedAt: v.optional(v.number()),
      })
    )
  ),

  myreviews: v.optional(
    v.array(
      v.object({
        _id: v.string(),
        postedBy: v.id("users"),
        postedTo: v.id("users"),
        rating: v.optional(v.number()),
        comment: v.optional(v.string()),
        gigId: v.optional(v.id("gigs")),
        videoId: v.optional(v.array(v.id("videos"))),
        updatedAt: v.optional(v.number()),
      })
    )
  ),

  // Videos
  videosProfile: v.optional(
    v.array(
      v.object({
        _id: v.string(),
        url: v.string(),
      })
    )
  ),

  // Social Media Handles
  musicianhandles: v.optional(
    v.array(
      v.object({
        platform: v.string(),
        handle: v.string(),
      })
    )
  ),

  // User Type & Roles
  isMusician: v.boolean(), // Make optional with default
  isClient: v.boolean(),
  isBoth: v.optional(v.boolean()), // Make optional with default

  isAdmin: v.optional(v.boolean()),
  adminRole: v.optional(
    v.union(
      v.literal("super"),
      v.literal("content"),
      v.literal("support"),
      v.literal("analytics")
    )
  ),

  earnings: v.optional(v.number()),
  totalSpent: v.optional(v.number()),

  // Usage Metrics
  monthlyGigsPosted: v.optional(v.number()),
  monthlyMessages: v.optional(v.number()),
  monthlyGigsBooked: v.optional(v.number()),
  gigsBookedThisWeek: v.optional(
    v.object({
      count: v.number(),
      weekStart: v.number(),
    })
  ),

  // Booking & Gigs
  bookingHistory: v.optional(
    v.array(
      v.object({
        userId: v.optional(v.array(v.id("users"))),
        gigId: v.optional(v.array(v.id("gigs"))),
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
    )
  ),

  // Rates
  rate: v.optional(
    v.object({
      regular: v.optional(v.string()),
      function: v.optional(v.string()),
      concert: v.optional(v.string()),
    })
  ),

  // Counters
  cancelgigCount: v.optional(v.number()),
  completedGigsCount: v.optional(v.number()),
  reportsCount: v.optional(v.number()),
  renewalAttempts: v.optional(v.number()),

  // Preferences & Settings
  theme: v.optional(
    v.union(v.literal("lightMode"), v.literal("darkMode"), v.literal("system"))
  ),

  // Saved Content
  savedGigs: v.optional(v.array(v.id("gigs"))),
  favoriteGigs: v.optional(v.array(v.id("gigs"))),
  likedVideos: v.optional(v.array(v.id("videos"))),

  // Admin & Moderation
  adminPermissions: v.optional(v.array(v.string())),
  lastAdminAction: v.optional(v.number()),
  adminNotes: v.optional(v.string()),
  isBanned: v.optional(v.boolean()),
  banReason: v.optional(v.string()),
  bannedAt: v.optional(v.number()),
  banExpiresAt: v.optional(v.number()),
  banReference: v.optional(v.string()),

  // User State
  firstLogin: v.optional(v.boolean()),
  onboardingComplete: v.boolean(),
  firstTimeInProfile: v.optional(v.boolean()),

  // Timestamps
  lastActive: v.optional(v.number()),
  lastBookingDate: v.optional(v.number()),
  lastRenewalAttempt: v.optional(v.number()),

  updatedAt: v.optional(v.number()),
})
  .index("by_email", ["email"])
  .index("by_username", ["username"])
  .index("by_clerkId", ["clerkId"])
  .index("by_city", ["city"])
  .index("by_isMusician", ["isMusician"])
  .index("by_isClient", ["isClient"])
  .index("by_isAdmin", ["isAdmin"])

  .index("by_isBanned", ["isBanned"])

  .index("by_lastActive", ["lastActive"])
  .index("search_fields", [
    "firstName",
    "lastName",
    "username",
    "email",
    "city",
    "instrument",
  ]);

// Add to your convex/schema.ts file
