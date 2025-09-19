import { Id } from "../convex/_generated/dataModel";

export default interface UserData {
  // Required fields from schema
  email: string;
  phone: string;
  isMusician: boolean;
  isClient: boolean;
  onboardingComplete: boolean;

  // Optional fields
  clerkId?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  picture?: string;
  city?: string;
  address?: string;
  date?: string;
  month?: string;
  year?: string;
  instrument?: string;
  experience?: string;
  verification?: string;
  organization?: string;
  handles?: string;
  talentbio?: string;
  djGenre?: string;
  djEquipment?: string;
  mcType?: string;
  mcLanguages?: string;
  vocalistgenres?: string;
  musiciangenres?: string[];
  roleType?: "musician" | "client" | "both";
  talentType?: "instrumentalist" | "vocalist" | "deejay" | "emcee";
  isAdmin?: boolean;
  isBanned?: boolean;
  firstLogin?: boolean;
  firstTimeInProfile?: boolean;
  isBoth?: boolean;

  earnings?: number;
  totalSpent?: number;
  monthlyGigsPosted?: number;
  monthlyMessages?: number;
  monthlyGigsBooked?: number;
  cancelgigCount?: number;
  completedGigsCount?: number;
  reportsCount?: number;
  renewalAttempts?: number;

  // Fixed: Use Id types instead of string[]
  followers?: Id<"users">[];
  followings?: Id<"users">[];
  refferences?: Id<"users">[];

  allreviews?: any[];
  myreviews?: any[];
  videosProfile?: any[];
  musicianhandles?: any[];

  // Fixed: Use Id types for reference fields
  savedGigs?: Id<"gigs">[];
  favoriteGigs?: Id<"gigs">[];
  likedVideos?: Id<"videos">[];

  bookingHistory?: any[];
  adminPermissions?: string[];
  gigsBookedThisWeek?: { count: number; weekStart: number };
  rate?: { regular: string; function: string; concert: string };
  theme?: "lightMode" | "darkMode" | "system";

  lastAdminAction?: number;
  adminNotes?: string;
  banReason?: string;
  bannedAt?: number;
  banExpiresAt?: number;
  banReference?: string;

  lastActive?: number;
  lastBookingDate?: number;
  lastRenewalAttempt?: number;

  adminRole?: "super" | "content" | "support" | "analytics";
}
