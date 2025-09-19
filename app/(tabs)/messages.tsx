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

export default function MessagesScreen() {
  const { colors } = useTheme();

  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      lastMessage: "Hey! I'm interested in booking you for our event",
      time: "2:30 PM",
      unread: 3,
      avatar: "👩‍🎤",
    },
    {
      id: 2,
      name: "Mike Thompson",
      lastMessage: "Thanks for the great performance!",
      time: "Yesterday",
      unread: 0,
      avatar: "👨‍💼",
    },
    {
      id: 3,
      name: "Event Planners Inc.",
      lastMessage: "We have multiple events coming up",
      time: "2 days ago",
      unread: 1,
      avatar: "🏢",
    },
    {
      id: 4,
      name: "Lisa Rodriguez",
      lastMessage: "What's your availability next month?",
      time: "3 days ago",
      unread: 0,
      avatar: "👩‍💼",
    },
  ];

  return (
    <LinearGradient
      colors={["#1a1a2e", "#16213e", "#0f3460"]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Messages</Text>
          <TouchableOpacity>
            <Ionicons name="search" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.conversationsList}>
          {conversations.map((conversation) => (
            <TouchableOpacity
              key={conversation.id}
              style={[
                styles.conversationCard,
                { backgroundColor: colors.text },
              ]}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{conversation.avatar}</Text>
              </View>

              <View style={styles.conversationContent}>
                <View style={styles.conversationHeader}>
                  <Text
                    style={[styles.conversationName, { color: colors.text }]}
                  >
                    {conversation.name}
                  </Text>
                  <Text
                    style={[
                      styles.conversationTime,
                      { color: colors.textMuted },
                    ]}
                  >
                    {conversation.time}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.lastMessage,
                    {
                      color: colors.textMuted,
                      fontWeight: conversation.unread > 0 ? "600" : "400",
                    },
                  ]}
                  numberOfLines={1}
                >
                  {conversation.lastMessage}
                </Text>
              </View>

              {conversation.unread > 0 && (
                <View
                  style={[
                    styles.unreadBadge,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <Text style={styles.unreadCount}>{conversation.unread}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => console.log("New message")}
      >
        <Ionicons name="pencil" size={24} color="white" />
      </TouchableOpacity>
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
  conversationsList: {
    gap: 16,
  },
  conversationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 20,
  },
  conversationContent: {
    flex: 1,
    gap: 4,
  },
  conversationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  conversationName: {
    fontSize: 16,
    fontWeight: "600",
  },
  conversationTime: {
    fontSize: 12,
  },
  lastMessage: {
    fontSize: 14,
  },
  unreadBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadCount: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
