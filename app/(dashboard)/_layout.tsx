// app/(dashboard)/_layout.tsx
import { Stack } from "expo-router";
import { CustomTabBar } from "@/components/CustomTabBar";
import { View, StatusBar } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { CustomUserButton } from "@/components/auth/UserProfileButton";
import Logo from "@/components/CustomLogo";

const dashboardTabs = [
  {
    name: "home",
    href: "/(dashboard)/home",
    icon: "grid-outline",
    label: "Overview",
  },
  {
    name: "plan",
    href: "/(dashboard)/plan",
    icon: "card-outline",
    label: "Plans",
  },
  {
    name: "analytics",
    href: "/(dashboard)/analytics",
    icon: "stats-chart-outline",
    label: "Analytics",
  },
  {
    name: "profile",
    href: "/(dashboard)/profile",
    icon: "person-outline",
    label: "Profile",
  },
];

export default function DashboardLayout() {
  const { colors, isDarkMode } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgrounds.card }}>
      {/* StatusBar for dashboard group */}
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={colors.backgrounds.card}
      />
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitle: () => null,
          headerRight: () => <CustomUserButton />,
          headerLeft: () => <Logo />,
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.text,
          contentStyle: {
            backgroundColor: colors.backgrounds.card,
          },
        }}
      >
        <Stack.Screen name="home" options={{ title: "Dashboard" }} />
        <Stack.Screen name="plan" options={{ title: "Plan" }} />
        <Stack.Screen name="analytics" options={{ title: "Analytics" }} />
      </Stack>

      <CustomTabBar tabs={dashboardTabs} />
    </View>
  );
}
