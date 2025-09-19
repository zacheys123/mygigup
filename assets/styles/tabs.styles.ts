import { ColorScheme } from "@/theme/types";
import { StyleSheet } from "react-native";

export const createTabsStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    loadingOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: "#6b7280",
    },
    blurBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    waitingText: {
      fontSize: 18,
      color: "#6b7280",
      textAlign: "center",
      padding: 20,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 24,
      width: "100%",
      maxWidth: 400,
      alignItems: "center",
    },
    modalHeader: {
      alignItems: "center",
      marginBottom: 24,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#374151",
      marginTop: 16,
      marginBottom: 8,
      textAlign: "center",
    },
    modalSubtitle: {
      fontSize: 16,
      color: "#6b7280",
      textAlign: "center",
      lineHeight: 22,
    },
    modalBody: {
      width: "100%",
      marginBottom: 24,
    },
    requirementItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 20,
      padding: 16,
      backgroundColor: "#f9fafb",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#e5e7eb",
    },
    requirementTextContainer: {
      flex: 1,
      marginLeft: 12,
    },
    requirementTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#374151",
      marginBottom: 4,
    },
    requirementDescription: {
      fontSize: 14,
      color: "#6b7280",
      lineHeight: 18,
    },
    modalFooter: {
      width: "100%",
      alignItems: "center",
    },
    primaryButton: {
      backgroundColor: "#667eea",
      padding: 18,
      borderRadius: 12,
      alignItems: "center",
      width: "100%",
      marginBottom: 16,
    },
    primaryButtonText: {
      color: "white",
      fontWeight: "600",
      fontSize: 16,
    },
    mandatoryText: {
      fontSize: 14,
      color: "#ef4444",
      fontWeight: "500",
      textAlign: "center",
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 20,
      marginBottom: 20,
      paddingHorizontal: 16,
    },
    content: {
      flex: 1,
      padding: 16,
      justifyContent: "center",
      alignItems: "center",
    },
    contentText: {
      fontSize: 18,
      color: "#6b7280",
      textAlign: "center",
    },
  });
};
