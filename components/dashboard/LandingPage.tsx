import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/clerk-expo";
import { useTheme } from "@/hooks/useTheme";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import LoadingSpinner from "../LoadingSpinner";
import { ClientDashboard } from "./ClientDashboard";
import { MusicianDashboard } from "./MusicianDashboard";
import { DualDashboard } from "./DualDashboard";
import { DefaultDashboard } from "./DefaultDashBoard";
import { useEffect } from "react";

export default function DashboardHome() {
  const { colors } = useTheme();
  const { user } = useCurrentUser();

  // Fetch subscription
  const subscription = useQuery(api.controllers.user.getSubscription, {
    userId: user?._id || "",
  });

  // Mutation to initialize subscription if needed
  const initializeSubscription = useMutation(
    api.controllers.user.initializeSubscription
  );

  // Initialize free subscription if user exists but no subscription
  useEffect(() => {
    if (user && !subscription) {
      initializeSubscription({ userId: user._id });
    }
  }, [user, subscription, initializeSubscription]);

  // Fix user type logic
  const userType =
    user?.isClient && user?.isMusician
      ? "dual"
      : user?.isClient
        ? "client"
        : user?.isMusician
          ? "musician"
          : "default";

  const renderDashboard = () => {
    switch (userType) {
      case "client":
        return <ClientDashboard user={user} subscription={subscription} />;
      case "musician":
        return <MusicianDashboard user={user} subscription={subscription} />;
      case "dual":
        return <DualDashboard user={user} subscription={subscription} />;
      default:
        null;
    }
  };

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <LoadingSpinner size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.surface }]}>
          <Text style={[styles.welcome, { color: colors.text }]}>
            Welcome back, {user.firstName}!
          </Text>
          <Text style={[styles.subscription, { color: colors.textMuted }]}>
            {subscription?.tier
              ? subscription.tier.charAt(0).toUpperCase() +
                subscription.tier.slice(1) +
                " Plan"
              : "Loading Plan..."}
          </Text>
        </View>

        {/* Main Dashboard Content */}
        {renderDashboard()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subscription: {
    fontSize: 16,
  },
});
