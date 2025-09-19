import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

import { ThemeProvider } from "@/hooks/useTheme";
import {
  Redirect,
  Stack,
  useRootNavigationState,
  useSegments,
} from "expo-router";
import { ActivityIndicator, StatusBar, View } from "react-native";

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
          <RootLayoutNav />
        </ThemeProvider>
      </ConvexProvider>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();

  // Show loading indicator while auth is loading or navigation isn't ready
  if (!isLoaded || !rootNavigationState?.key) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Check if we're inside the auth group
  const inAuthGroup = segments[0] === "(auth)";

  // Get the current route within auth group
  const currentAuthRoute = segments[1];

  // Define which auth routes are allowed when signed in (for post-signup flows)
  const allowedSignedInAuthRoutes = ["onBoarding"];
  const isAllowedAuthRoute =
    currentAuthRoute && allowedSignedInAuthRoutes.includes(currentAuthRoute);

  // Redirect logic - FIXED: Redirect to specific screens, not layout groups
  if (isSignedIn) {
    if (inAuthGroup && !isAllowedAuthRoute) {
      // User signed in but trying to access auth pages that aren't allowed
      return <Redirect href="/(tabs)" />;
    }
  } else {
    if (!inAuthGroup) {
      // User not signed in and not trying to access auth pages
      return <Redirect href="/(auth)/sign-in" />; // Redirect to specific screen
    }
  }

  // Render the stack without any Screen components
  // Expo Router will automatically discover routes from file system
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <StatusBar />
    </Stack>
  );
}
