// Your React Native component file
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useUser } from "@clerk/clerk-react";

export default function MySubscriptionScreen() {
  const { user } = useUser();
  const userId = user?.id; // Get the user ID once

  // Conditionally declare the hook based on userId
  const subscription = userId
    ? useQuery(api.controllers.user.getSubscription, { userId })
    : null;

  // Handle the loading state
  if (subscription === undefined) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading subscription...</Text>
      </View>
    );
  }

  // Handle the no subscription state
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
