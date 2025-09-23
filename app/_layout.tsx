// app/_layout.tsx
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ThemeProvider, useTheme } from "@/hooks/useTheme";
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

// StatusBar component that uses theme
function ThemedStatusBar() {
  const { colors, isDarkMode } = useTheme();

  return (
    <StatusBar
      barStyle={isDarkMode ? "light-content" : "dark-content"}
      backgroundColor={colors.backgrounds.card}
      translucent={false}
    />
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <ConvexProvider client={convex}>
        <ThemeProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <ThemedStatusBar />
            <RootLayoutNav />
          </SafeAreaView>
        </ThemeProvider>
      </ConvexProvider>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();
  const { colors } = useTheme();
  const {
    user: currentUser,
    isLoading: isUserLoading,
    hasConvexUser,
  } = useCurrentUser();
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key || !isAuthLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inOnboarding =
      segments[0] === "(auth)" && segments[1] === "onBoarding";
    const inProtectedGroup =
      segments[0] === "(tabs)" ||
      segments[0] === "(dashboard)" ||
      segments[0] === "(main_app)";

    if (!isSignedIn) {
      if (inProtectedGroup) {
        router.replace("/(auth)/home");
      }
      return;
    }

    if (isUserLoading) return;

    if (!hasConvexUser) {
      if (!inOnboarding) {
        router.replace("/(auth)/onBoarding");
      }
    } else {
      if (inAuthGroup && !inOnboarding) {
        router.replace("/(tabs)/home");
      }
    }
  }, [
    isAuthLoaded,
    isSignedIn,
    segments,
    rootNavigationState,
    hasConvexUser,
    isUserLoading,
  ]);

  const showLoading =
    !isAuthLoaded || !rootNavigationState?.key || (isSignedIn && isUserLoading);

  if (showLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.backgrounds.card,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
