// components/dashboard/DualDashboard.tsx
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";

interface DualDashboardProps {
  user: any;
  subscription: any;
}

export function DualDashboard({ user, subscription }: DualDashboardProps) {
  const { colors } = useTheme();

  const clientFeatures = [
    { icon: "search", title: "Find Talent", action: "Browse" },
    { icon: "calendar", title: "My Events", action: "Manage" },
  ];

  const musicianFeatures = [
    { icon: "mic", title: "My Gigs", action: "View" },
    { icon: "stats-chart", title: "Analytics", action: "See" },
  ];

  return (
    <View style={styles.container}>
      {/* Subscription Status */}
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Dual Account
        </Text>
        <Text style={[styles.planName, { color: colors.primary }]}>
          {subscription.tier.toUpperCase()} Plan
        </Text>
        <Text style={[styles.planDescription, { color: colors.textMuted }]}>
          Access both client and musician features with your account.
        </Text>
      </View>

      {/* Client Section */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        As a Client
      </Text>
      {clientFeatures.map((feature, index) => (
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
          <Text style={[styles.featureAction, { color: colors.primary }]}>
            {feature.action} →
          </Text>
        </TouchableOpacity>
      ))}

      {/* Musician Section */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        As a Musician
      </Text>
      {musicianFeatures.map((feature, index) => (
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
          <Text style={[styles.featureAction, { color: colors.primary }]}>
            {feature.action} →
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
