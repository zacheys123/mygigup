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
import { ActivityIndicator, StatusBar, View, SafeAreaView } from "react-native";

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
          <SafeAreaView style={{ flex: 1 }}>
            <RootLayoutNav />
          </SafeAreaView>
        </ThemeProvider>
      </ConvexProvider>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();

  if (!isLoaded || !rootNavigationState?.key) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const inAuthGroup = segments[0] === "(auth)";
  const currentAuthRoute = segments[1];
  const allowedSignedInAuthRoutes = ["onBoarding"];
  const isAllowedAuthRoute =
    currentAuthRoute && allowedSignedInAuthRoutes.includes(currentAuthRoute);

  if (isSignedIn) {
    if (inAuthGroup && !isAllowedAuthRoute) {
      return <Redirect href="/(dashboard)/home" />;
    }
  } else {
    if (!inAuthGroup) {
      return <Redirect href="/(auth)/home" />;
    }
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <StatusBar />
    </Stack>
  );
}
