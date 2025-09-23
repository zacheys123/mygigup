import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ThemeProvider } from "@/hooks/useTheme";
import {
  Stack,
  useRootNavigationState,
  useSegments,
  router,
} from "expo-router";
import { ActivityIndicator, StatusBar, View } from "react-native";

import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { SafeAreaView } from "react-native-safe-area-context";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <ConvexProvider client={convex}>
        <ThemeProvider>
          <View style={{ flex: 1 }}>
            <RootLayoutNav />
          </View>
        </ThemeProvider>
      </ConvexProvider>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();
  const {
    user: currentUser,
    isLoading: isUserLoading,
    hasConvexUser,
  } = useCurrentUser();
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inOnboarding = segments[1] === "onBoarding";
    const inDashboardGroup = segments[0] === "(dashboard)";

    // User is not signed in - redirect to auth
    if (!isSignedIn && !inAuthGroup) {
      router.replace("/(auth)/home");
      return;
    }

    // User is signed in
    if (isSignedIn) {
      // Still loading user data - wait
      if (isUserLoading) return;

      // User doesn't exist in Convex database
      if (!hasConvexUser) {
        // If not already on onboarding, redirect there
        if (!inOnboarding) {
          router.replace("/(auth)/onBoarding");
        }
        return; // This return is fine - it exits the function
      }

      // User exists in Convex database (this code is reachable now)
      // If user is in auth group (but not onboarding), redirect to dashboard
      if (inAuthGroup && !inOnboarding) {
        router.replace("/(dashboard)/home");
      }
      // If user is not in any protected group, redirect to dashboard
      else if (!inAuthGroup && !inDashboardGroup) {
        router.replace("/(dashboard)/home");
      }
    }
  }, [
    isAuthLoaded,
    isSignedIn,
    segments,
    rootNavigationState,
    currentUser,
    hasConvexUser,
    isUserLoading,
  ]);

  // Loading states
  const showLoading =
    !isAuthLoaded || !rootNavigationState?.key || (isSignedIn && isUserLoading);

  if (showLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <StatusBar />
    </Stack>
  );
}
