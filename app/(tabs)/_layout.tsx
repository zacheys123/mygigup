// app/(tabs)/_layout.tsx
import { Stack } from "expo-router";
import { CustomTabBar } from "@/components/CustomTabBar";
import { View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { CustomUserButton } from "@/components/auth/UserProfileButton";
import Logo from "@/components/CustomLogo";

const mainTabs = [
  {
    name: "home",
    href: "/", // Changed to root since home is index
    icon: "compass-outline",
    activeIcon: "compass",
    label: "Discover",
  },
  {
    name: "messages",
    href: "/messages", // Simplified path
    icon: "chatbubbles-outline",
    activeIcon: "chatbubbles",
    label: "Messages",
  },
  {
    name: "dashboard-nav",
    href: "/(dashboard)/home", // Updated path for dashboard
    icon: "document-outline",
    activeIcon: "document",
    label: "Dashboard",
  },
  {
    name: "profile",
    href: "/profile", // Simplified path
    icon: "person-outline",
    activeIcon: "person",
    label: "Profile",
  },
];

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgrounds.card }}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitle: () => null,
          headerRight: () => <CustomUserButton />,
          headerLeft: () => <Logo />,
          headerTintColor: colors.text,
          headerStyle: {
            backgroundColor: colors.surface,
          },
          contentStyle: {
            backgroundColor: colors.backgrounds.card,
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Discover" }} />{" "}
        {/* Changed from "home" to "index" */}
        <Stack.Screen name="messages" options={{ title: "Messages" }} />
        <Stack.Screen name="profile" options={{ title: "Profile" }} />
      </Stack>

      <CustomTabBar tabs={mainTabs} />
    </View>
  );
}
