// app/(auth)/_layout.tsx
import { Stack } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { StatusBar } from "react-native";

export default function AuthLayout() {
  const { colors, isDarkMode } = useTheme();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={colors.backgrounds.card}
        translucent={false}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          title: "Sign In",
          headerShown: false, // Remove header if desired
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: "Sign Up",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="onBoarding"
        options={{
          title: "Onboarding",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
