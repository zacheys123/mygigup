import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";

type User = Doc<"users">;

export const useCurrentUser = () => {
  const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get user email safely
  const userEmail = clerkUser?.emailAddresses?.[0]?.emailAddress;

  // Use convex query - conditionally skip if no email
  const userData = useQuery(
    api.controllers.user.getUserByEmail,
    userEmail ? { email: userEmail } : "skip"
  );

  useEffect(() => {
    if (!isUserLoaded) {
      setIsLoading(false);
      return;
    }

    // If no clerk user or no email, set loading to false
    if (!clerkUser || !userEmail) {
      setCurrentUser(null);
      setIsLoading(false);
      return;
    }

    try {
      if (userData === undefined) {
        // Still loading from Convex
        setIsLoading(true);
        return;
      }

      if (userData === null) {
        // User doesn't exist in Convex yet
        setCurrentUser(null);
        setError("User not found in database");
      } else {
        // User found
        setCurrentUser(userData);
        setError(null);
      }

      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching user:", err);
      setError("Failed to fetch user data");
      setIsLoading(false);
    }
  }, [isUserLoaded, clerkUser, userEmail, userData]);

  return {
    user: currentUser,
    isLoading: isLoading || !isUserLoaded,
    error,
    isAuthenticated: !!clerkUser && isUserLoaded,
    hasConvexUser: !!currentUser,
  };
};
