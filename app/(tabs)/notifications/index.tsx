import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";

export default function NotificationsScreen() {
  const { colors } = useTheme();

  const notifications = [
    {
      id: 1,
      type: "booking",
      title: "New Booking Request",
      message: "John Doe wants to book you for a wedding event",
      time: "2 hours ago",
      read: false,
      icon: "calendar",
    },
    {
      id: 2,
      type: "message",
      title: "New Message",
      message: "You have a new message from Sarah Johnson",
      time: "5 hours ago",
      read: true,
      icon: "chatbubble",
    },
    {
      id: 3,
      type: "system",
      title: "System Update",
      message: "New features available in the latest update",
      time: "1 day ago",
      read: true,
      icon: "information",
    },
    {
      id: 4,
      type: "payment",
      title: "Payment Received",
      message: "Your payment of $250 has been processed",
      time: "2 days ago",
      read: true,
      icon: "cash",
    },
  ];

  return (
    <LinearGradient
      colors={["#1a1a2e", "#16213e", "#0f3460"]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Alerts</Text>
          <TouchableOpacity>
            <Ionicons name="filter" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.notificationsList}>
          {notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationCard,
                {
                  backgroundColor: colors.shadow,
                  borderLeftColor: notification.read
                    ? "transparent"
                    : colors.primary,
                  borderLeftWidth: notification.read ? 0 : 4,
                },
              ]}
            >
              <View style={styles.notificationIcon}>
                <Ionicons
                  name={notification.icon as any}
                  size={20}
                  color={colors.primary}
                />
              </View>

              <View style={styles.notificationContent}>
                <Text
                  style={[styles.notificationTitle, { color: colors.text }]}
                >
                  {notification.title}
                </Text>
                <Text
                  style={[
                    styles.notificationMessage,
                    { color: colors.textMuted },
                  ]}
                >
                  {notification.message}
                </Text>
                <Text
                  style={[styles.notificationTime, { color: colors.textMuted }]}
                >
                  {notification.time}
                </Text>
              </View>

              {!notification.read && (
                <View
                  style={[
                    styles.unreadDot,
                    { backgroundColor: colors.primary },
                  ]}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  notificationsList: {
    gap: 16,
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationContent: {
    flex: 1,
    gap: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  notificationMessage: {
    fontSize: 14,
  },
  notificationTime: {
    fontSize: 12,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
