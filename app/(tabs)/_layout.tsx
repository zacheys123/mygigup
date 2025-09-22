import { router, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { CustomUserButton } from "@/components/auth/UserProfileButton";
import Logo from "@/components/CustomLogo";
import { Pressable } from "react-native";

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true, // Enable headers to show the button
        tabBarStyle: {
          backgroundColor: colors.border,
          borderTopColor: colors.border,
        },
        headerTitle: () => null,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerRight: () => <CustomUserButton />, // Fixed: return the component

        headerLeft: () => <Logo />, // Fixed: return the component
        headerStyle: {
          backgroundColor: colors.border,
        },
        headerTitleStyle: {
          color: colors.text,
        },
      }}
    >
      {/* Discover Tab */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Messages Tab */}
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Notifications Tab */}
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Alerts",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard-nav"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size, focused }) => (
            <Pressable onPress={() => router.push("/(dashboard)/home")}>
              <Ionicons
                name={focused ? "document" : "document-outline"}
                size={size}
                color={color}
              />
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
