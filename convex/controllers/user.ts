// convex/users.ts
import { mutation, query } from "../_generated/server";
import { v } from "convex/values";
import UserData from "../../types/userinterface";
import { Id } from "../_generated/dataModel";

const getDefaultUserValues = (email: string, phone: string): UserData => {
  return {
    // Required fields from schema
    email,
    phone,
    isMusician: false,
    isClient: false,
    onboardingComplete: false,

    // Optional fields with defaults
    city: "",
    address: "",
    date: "",
    month: "",
    year: "",
    instrument: "",
    experience: "",
    verification: "",
    organization: "",
    handles: "",
    talentbio: "",
    djGenre: "",
    djEquipment: "",
    mcType: "",
    mcLanguages: "",
    vocalistgenres: "",
    musiciangenres: [],

    // Boolean fields with defaults
    isAdmin: false,
    isBanned: false,
    firstLogin: true,
    firstTimeInProfile: true,
    isBoth: false,

    // Role and tier fields
    roleType: "client",
    talentType: undefined,

    // Number fields with defaults
    earnings: 0,
    totalSpent: 0,
    monthlyGigsPosted: 0,
    monthlyMessages: 0,
    monthlyGigsBooked: 0,
    cancelgigCount: 0,
    completedGigsCount: 0,
    reportsCount: 0,
    renewalAttempts: 0,

    // Array fields with empty arrays (using proper Id types)
    followers: [],
    followings: [],
    refferences: [],
    allreviews: [],
    myreviews: [],
    videosProfile: [],
    musicianhandles: [],
    savedGigs: [],
    favoriteGigs: [],
    likedVideos: [],
    bookingHistory: [],
    adminPermissions: [],

    // Object fields with defaults
    gigsBookedThisWeek: {
      count: 0,
      weekStart: Date.now(),
    },
    rate: {
      regular: "",
      function: "",
      concert: "",
    },
    // Theme
    theme: "system",
    // Date fields with current time
    lastActive: Date.now(),
    lastBookingDate: undefined,
    lastRenewalAttempt: undefined,
    lastAdminAction: undefined,
    bannedAt: undefined,
    banExpiresAt: undefined,

    // String fields with empty defaults
    banReason: "",
    banReference: "",
    adminNotes: "",
    // Admin fields
    adminRole: undefined,
  };
};

// Create a user mutation
export const createUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    username: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    phone: v.optional(v.string()),
    picture: v.optional(v.string()),
    onboardingComplete: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { email } = args;

    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existingUser) {
      return {
        userId: existingUser._id,
        success: true,
        message: "User already exists",
      };
    }

    // Get default values with required email and phone
    const defaultValues = getDefaultUserValues(
      args.email,
      args.phone || "" // Provide empty string if phone is not provided
    );
    console.log("before adding");
    // Create the user data object with explicit typing
    const userData: UserData = {
      ...defaultValues,
      clerkId: args.clerkId,
      username: args.username,
      firstName: args.firstName,
      lastName: args.lastName,
      picture: args.picture || "",
      onboardingComplete: args.onboardingComplete,
    };
    console.log("adding");

    // Use type assertion to handle the Id type conversion
    const userId = await ctx.db.insert("users", userData as any);

    return {
      userId,
      success: true,
      message: "User created successfully!",
    };
  },
});

// Get user by email query
export const getUserByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Make sure this returns a user document or null
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    return user; // This should be a user object or null
  },
});

// Update user role mutation
export const updateUserRole = mutation({
  args: {
    email: v.string(),
    isMusician: v.boolean(),
    isClient: v.boolean(),
    musicianData: v.optional(v.any()),
    clientData: v.optional(v.any()),
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    const { email, isMusician, isClient, musicianData, clientData, phone } =
      args;

    try {
      // Find existing user
      const existingUser = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", email))
        .first();

      if (!existingUser) {
        return {
          success: false,
          error: "User not found",
          messages: [],
        };
      }

      const updateData: any = {
        isMusician,
        isClient,
        isBoth: isMusician && isClient,
        roleType:
          isMusician && isClient ? "both" : isMusician ? "musician" : "client",
        onboardingComplete: true,
        lastActive: Date.now(),
        updatedAt: Date.now(),
        phone,
      };

      const validationMessages = [];

      // Add musician-specific data if applicable
      if (isMusician && musicianData) {
        const {
          talentType,
          city,
          talentbio,
          instrument,
          experience,
          vocalistgenres,
          djGenre,
          djEquipment,
          mcType,
          mcLanguages,
        } = musicianData;

        // Set common musician fields
        updateData.city = city || "";
        updateData.talentbio = talentbio || "";
        updateData.talentType = talentType;
        updateData.experience = experience || "";

        // Validate required fields for musicians
        if (!talentbio || talentbio.length < 15) {
          validationMessages.push({
            type: "warning",
            message: "Consider adding more details to your bio.",
            field: "talentbio",
          });
        }

        if (!experience) {
          validationMessages.push({
            type: "info",
            message:
              "Adding your experience level helps clients understand your expertise.",
            field: "experience",
          });
        }

        // Set talent-specific fields
        if (talentType === "instrumentalist") {
          updateData.instrument = instrument || "";
          if (!instrument) {
            validationMessages.push({
              type: "warning",
              message: "Please specify your primary instrument.",
              field: "instrument",
            });
          }
        } else if (talentType === "vocalist") {
          updateData.vocalistgenres = vocalistgenres || "";
          if (!vocalistgenres) {
            validationMessages.push({
              type: "warning",
              message:
                "Adding vocal genres helps clients understand your style.",
              field: "vocalistgenres",
            });
          }
        } else if (talentType === "deejay") {
          updateData.djGenre = djGenre || "";
          updateData.djEquipment = djEquipment || "";
          if (!djGenre) {
            validationMessages.push({
              type: "warning",
              message:
                "Specifying your DJ genres helps clients book the right talent.",
              field: "djGenre",
            });
          }
        } else if (talentType === "emcee") {
          updateData.mcType = mcType || "";
          updateData.mcLanguages = mcLanguages || "";
          if (!mcType) {
            validationMessages.push({
              type: "warning",
              message: "Please specify your MC specialties.",
              field: "mcType",
            });
          }
        }
      }

      // Add client-specific data if applicable
      if (isClient && clientData) {
        const { city, talentbio, organization } = clientData;
        updateData.city = city || "";
        updateData.talentbio = talentbio || "";
        updateData.organization = organization || "";

        if (!organization) {
          validationMessages.push({
            type: "info",
            message: "Adding your organization name helps musicians.",
            field: "organization",
          });
        }
        if (!talentbio || talentbio.length < 30) {
          validationMessages.push({
            type: "info",
            message: "Tell musicians more about your events.",
            field: "talentbio",
          });
        }
      }

      // Update user in database
      await ctx.db.patch(existingUser._id, updateData);

      return {
        success: true,
        user: { ...existingUser, ...updateData },
        messages: validationMessages,
      };
    } catch (error) {
      console.error("Error in updateUserRole:", error);
      return {
        success: false,
        error: "Failed to update user role",
        messages: [],
      };
    }
  },
});

// Get user by username query
export const getUserByUsername = query({
  args: {
    username: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();
  },
});

export const getSubscription = query({
  args: { userId: v.string() }, // Accepts a plain string from the client
  handler: async (ctx, args) => {
    // Cast the string to the correct Id type
    const typedUserId = args.userId as Id<"users">;

    // Now you can use the typedUserId in your query
    return await ctx.db
      .query("subscriptions")
      .withIndex("by_userId", (q) => q.eq("userId", typedUserId))
      .first();
  },
});
export const updateTier = mutation({
  args: {
    userId: v.string(), // Assuming you pass the user ID from the client
    planId: v.string(),
    tier: v.string(),
    nextBillingDate: v.number(),
    startDate: v.number(),
    autoRenew: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { userId, planId, tier, autoRenew, startDate, nextBillingDate } =
      args;

    try {
      const typedUserId = userId as Id<"users">;
      // Find the user's current subscription
      const existingSubscription = await ctx.db
        .query("subscriptions") // Assuming a 'subscriptions' table
        .withIndex("by_userId", (q) => q.eq("userId", typedUserId))
        .first();

      // Find the user to ensure they exist
      const user = await ctx.db.get(typedUserId);

      if (!user) {
        return {
          success: false,
          error: "User not found.",
        };
      }

      // If a subscription exists, update it. Otherwise, create a new one.
      if (existingSubscription) {
        // Calculate the next billing date based on the new plan

        await ctx.db.patch(existingSubscription._id, {
          planId,
          tier,
          status: "active",
          startDate,
          autoRenew,
          nextBillingDate,
        });

        return {
          success: true,
          message: "Subscription updated successfully",
        };
      } else {
        // Create a new subscription
        const newSubscriptionId = await ctx.db.insert("subscriptions", {
          id: `sub_${Math.random().toString(36).substr(2, 9)}`,
          planId,
          userId: typedUserId,
          status: "active",
          startDate,
          nextBillingDate,
          autoRenew: autoRenew ?? true,
          tier,
        });

        return {
          success: true,
          message: "New subscription created successfully",
          subscriptionId: newSubscriptionId,
        };
      }
    } catch (error) {
      console.error("Error updating or creating subscription:", error);
      return {
        success: false,
        error: "Internal server error.",
      };
    }
  },
});
