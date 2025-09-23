// app/(settings)/_layout.tsx
import { Stack } from "expo-router";
import { CustomTabBar } from "@/components/CustomTabBar";
import { View } from "react-native";

const settingsTabs = [
  {
    name: "account",
    href: "/(settings)/account",
    icon: "person-outline",
    label: "Account",
  },
  {
    name: "privacy",
    href: "/(settings)/privacy",
    icon: "lock-closed-outline",
    label: "Privacy",
  },
  {
    name: "settings",
    href: "/(settings)/Settings",
    icon: "Settings-outline",
    label: "Notifications",
  },
];

export default function SettingsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen name="account" options={{ title: "Account Settings" }} />
        <Stack.Screen name="privacy" options={{ title: "Privacy" }} />
        <Stack.Screen
          name="notifications"
          options={{ title: "Notifications" }}
        />
      </Stack>

      <CustomTabBar tabs={settingsTabs} />
    </View>
  );
}
