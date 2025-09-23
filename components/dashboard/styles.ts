import { StyleSheet } from "react-native";

// Shared styles for all dashboard components
export const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  planName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 12,
  },
  featureCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  featureDescription: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  featureAction: {
    fontSize: 14,
    fontWeight: "600",
  },
});
