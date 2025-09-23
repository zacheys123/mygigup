// components/dashboard/DefaultDashboard.tsx
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface DefaultDashboardProps {
  user: any;
  subscription: any;
}

export function DefaultDashboard({
  user,
  subscription,
}: DefaultDashboardProps) {
  const { colors } = useTheme();
  const router = useRouter();

  const setupOptions = [
    {
      icon: "person",
      title: "Complete Your Profile",
      description:
        "Tell us more about yourself to get personalized recommendations",
      action: "Setup Profile",
      route: "/profile/edit",
    },
    {
      icon: "help-buoy",
      title: "Choose Account Type",
      description:
        "Are you looking to book talent or get booked as a musician?",
      action: "Select Type",
      route: "/onboarding/account-type",
    },
    {
      icon: "star",
      title: "Explore Features",
      description: "Discover what you can do with your free account",
      action: "Learn More",
      route: "/features",
    },
  ];

  const quickStats = [
    {
      icon: "eye",
      label: "Profile Views",
      value: "0",
      color: colors.primary,
    },
    {
      icon: "calendar",
      label: "Upcoming Gigs",
      value: "0",
      color: colors.success,
    },
    {
      icon: "chatbubbles",
      label: "Messages",
      value: "0",
      color: colors.warning,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Welcome Card */}
      <View style={[styles.welcomeCard, { backgroundColor: colors.surface }]}>
        <View style={styles.welcomeHeader}>
          <Ionicons name="person-circle" size={48} color={colors.primary} />
          <View style={styles.welcomeText}>
            <Text style={[styles.welcomeTitle, { color: colors.text }]}>
              Welcome to GigUp!
            </Text>
            <Text style={[styles.welcomeSubtitle, { color: colors.textMuted }]}>
              Let's get your account set up
            </Text>
          </View>
        </View>
        <Text style={[styles.welcomeDescription, { color: colors.textMuted }]}>
          Complete your profile setup to unlock all features and get the most
          out of your GigUp experience.
        </Text>
      </View>

      {/* Quick Stats */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Your Overview
      </Text>
      <View style={styles.statsContainer}>
        {quickStats.map((stat, index) => (
          <View
            key={index}
            style={[styles.statCard, { backgroundColor: colors.surface }]}
          >
            <View
              style={[styles.statIcon, { backgroundColor: stat.color + "20" }]}
            >
              <Ionicons name={stat.icon as any} size={20} color={stat.color} />
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {stat.value}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Setup Actions */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Get Started
      </Text>

      {setupOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.optionCard, { backgroundColor: colors.surface }]}
          onPress={() => router.push(option.route as any)}
        >
          <View style={styles.optionHeader}>
            <View style={styles.optionIconContainer}>
              <Ionicons
                name={option.icon as any}
                size={24}
                color={colors.primary}
              />
            </View>
            <View style={styles.optionText}>
              <Text style={[styles.optionTitle, { color: colors.text }]}>
                {option.title}
              </Text>
              <Text
                style={[styles.optionDescription, { color: colors.textMuted }]}
              >
                {option.description}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.actionButton,
              { backgroundColor: colors.primary + "20" },
            ]}
          >
            <Text style={[styles.actionText, { color: colors.primary }]}>
              {option.action}
            </Text>
            <Ionicons name="arrow-forward" size={16} color={colors.primary} />
          </View>
        </TouchableOpacity>
      ))}

      {/* Subscription Info */}
      <View
        style={[styles.subscriptionCard, { backgroundColor: colors.surface }]}
      >
        <View style={styles.subscriptionHeader}>
          <Ionicons name="card" size={24} color={colors.primary} />
          <Text style={[styles.subscriptionTitle, { color: colors.text }]}>
            Free Plan
          </Text>
        </View>
        <Text
          style={[styles.subscriptionDescription, { color: colors.textMuted }]}
        >
          You're currently on our free plan. Upgrade to unlock premium features
          and get more visibility.
        </Text>
        <TouchableOpacity
          style={[styles.upgradeButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push("/plans" as any)}
        >
          <Text style={[styles.upgradeText, { color: colors.surface }]}>
            View Plans
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingBottom: 20,
  },
  welcomeCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 8,
  },
  welcomeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 12,
  },
  welcomeText: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
  },
  welcomeDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  optionCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  optionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
  },
  subscriptionCard: {
    padding: 20,
    borderRadius: 16,
    marginTop: 8,
  },
  subscriptionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subscriptionDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  upgradeButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  upgradeText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
