import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ThemeProvider } from "@/hooks/useTheme";
import { Stack, useRootNavigationState, router } from "expo-router";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { useEffect } from "react";

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
  const { isLoaded, isSignedIn } = useAuth();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!isLoaded || !rootNavigationState?.key) return;

    // If signed in and we're at the root, navigate to home
    if (!isSignedIn) {
      router.replace("/(auth)/home");
    }
  }, [isLoaded, isSignedIn, rootNavigationState]);

  if (!isLoaded || !rootNavigationState?.key) {
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
