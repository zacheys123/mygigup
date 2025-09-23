// app/(settings)/_layout.tsx
import { Stack } from "expo-router";
import { CustomTabBar } from "@/components/CustomTabBar";
import { View } from "react-native";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function MainAppLayout() {
  const { user } = useCurrentUser();
  const mainTabs = user?.isClient
    ? [
        {
          name: "create",
          href: "/(main_app)/client/create",
          icon: "person-outline",
          label: "Create",
        },
        {
          name: "mygigs",
          href: "/(main_app)/client/mygigs",
          icon: "lock-closed-outline",
          label: "MyGigs",
        },
      ]
    : user?.isMusician
      ? [
          {
            name: "allgigs",
            href: "/(main_app)/musician/allgigs",
            icon: "person-outline",
            label: "All Gigs",
          },
          {
            name: "pending",
            href: "/(main_app)/musician/pending",
            icon: "lock-closed-outline",
            label: "Pending",
          },
        ]
      : [
          {
            name: "create",
            href: "/(main_app)/dual/create",
            icon: "person-outline",
            label: "Account",
          },
          {
            name: "mygiigs",
            href: "/(main_app)/dual/mygigs",
            icon: "lock-closed-outline",
            label: "Privacy",
          },
        ];
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

      <CustomTabBar tabs={mainTabs} />
    </View>
  );
}
