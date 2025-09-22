import { CustomUserButton } from "@/components/auth/UserProfileButton";
import Logo from "@/components/CustomLogo";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.surface, // Use surface color for the header
          shadowColor: colors.border,
          elevation: 0,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "600",
        },
        headerTitle: () => null, // This removes the title completely
        headerTitleAlign: "center",
        headerLeft: () => (
          <View style={styles.logoContainer}>
            <Logo />
          </View>
        ),
        headerRight: () => (
          <View style={styles.userButtonContainer}>
            {/* The Home Redirect Button goes here instead of the tab bar if you want it in the header */}
            {/* <HomeRedirectButton /> */}
            <CustomUserButton />
          </View>
        ),
      }}
    >
      {/* Home/Discover Tab */}
      <Tabs.Screen
        name="home" // Ensure this name matches your file name: (tabs)/home.tsx
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Billing Tab */}
      <Tabs.Screen
        name="billing"
        options={{
          title: "Billing",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "cash" : "cash-outline"}
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
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    marginLeft: 16,
  },
  userButtonContainer: {
    marginRight: 16,
  },
});
