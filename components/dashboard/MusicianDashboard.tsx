import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles"; // Import from shared styles file

interface MusicianDashboardProps {
  user: any;
  subscription: any;
}

export function MusicianDashboard({
  user,
  subscription,
}: MusicianDashboardProps) {
  const { colors } = useTheme();

  const features = [
    {
      icon: "mic",
      title: "My Gigs",
      description: "View and manage your upcoming performances",
      action: "Manage",
    },
    {
      icon: "trending-up",
      title: "Profile Views",
      description: "See who's interested in your talent",
      action: "Analytics",
    },
    {
      icon: "calendar",
      title: "Availability",
      description: "Set your schedule and booking preferences",
      action: "Update",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Subscription Status */}
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Your Artist Plan
        </Text>
        <Text style={[styles.planName, { color: colors.primary }]}>
          {subscription?.tier?.toUpperCase() || "FREE"} Musician
        </Text>
        <Text style={[styles.planDescription, { color: colors.textMuted }]}>
          {subscription?.tier === "free"
            ? "Basic artist profile. Upgrade to get more visibility and features."
            : "Premium features for professional musicians."}
        </Text>
      </View>

      {/* Quick Actions */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Artist Tools
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
