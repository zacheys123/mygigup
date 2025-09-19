// Your React Native component file (e.g., MyScreen.js)
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useUser } from "@clerk/clerk-react"; // Example: using Clerk for user info
import { useCurrentUser } from "./useCurrentUser";

export default function MySubscriptionScreen() {
  const { user } = useCurrentUser();

  // Conditionally call the hook only when the user ID is available
  const subscription = useQuery(
    user?._id ? api.controllers.user.getSubscription : null,
    user?._id ? { userId: user._id } : {}
  );

  // Handle different states: loading, no subscription, and data available
  if (subscription === undefined) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading subscription...</Text>
      </View>
    );
  }

  if (subscription === null) {
    return (
      <View style={styles.container}>
        <Text>You don't have an active subscription.</Text>
      </View>
    );
  }

  // Render the subscription details
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription Details</Text>
      <Text>Plan: {subscription.tier}</Text>
      <Text>Status: {subscription.status}</Text>
      <Text>
        Next Billing Date:{" "}
        {new Date(subscription.nextBillingDate).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
