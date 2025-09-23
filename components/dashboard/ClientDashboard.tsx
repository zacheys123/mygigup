// components/dashboard/ClientDashboard.tsx
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";

interface ClientDashboardProps {
  user: any;
  subscription: any;
}

export function ClientDashboard({ user, subscription }: ClientDashboardProps) {
  const { colors } = useTheme();

  const features = [
    {
      icon: "search",
      title: "Find Talent",
      description: "Browse and book musicians for your events",
      action: "Explore",
    },
    {
      icon: "calendar",
      title: "My Bookings",
      description: "Manage your upcoming events and bookings",
      action: "View",
    },
    {
      icon: "heart",
      title: "Favorites",
      description: "Your saved musicians and preferences",
      action: "See All",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Subscription Status */}
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Your Plan
        </Text>
        <Text style={[styles.planName, { color: colors.primary }]}>
          {subscription.tier.toUpperCase()} Client
        </Text>
        <Text style={[styles.planDescription, { color: colors.textMuted }]}>
          {subscription.tier === "free"
            ? "Basic features to get started. Upgrade for more capabilities."
            : "Full access to all client features."}
        </Text>
      </View>

      {/* Quick Actions */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Quick Actions
      </Text>

      {features.map((feature, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.featureCard, { backgroundColor: colors.surface }]}
        >
          <View style={styles.featureHeader}>
            <Ionicons
              name={feature.icon as any}
              size={24}
              color={colors.primary}
            />
            <Text style={[styles.featureTitle, { color: colors.text }]}>
              {feature.title}
            </Text>
          </View>
          <Text
            style={[styles.featureDescription, { color: colors.textMuted }]}
          >
            {feature.description}
          </Text>
          <Text style={[styles.featureAction, { color: colors.primary }]}>
            {feature.action} →
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
