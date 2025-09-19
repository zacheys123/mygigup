import { ColorScheme } from "@/theme/types";
import { StyleSheet } from "react-native";

export const createHeaderStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    themeToggle: {
      padding: 8,
      backgroundColor: colors.backgrounds.card,
      borderRadius: 20,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 24,
      width: "80%",
      alignItems: "center",
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#374151",
    },
    userInfo: {
      alignItems: "center",
      marginBottom: 30,
    },
    userName: {
      fontSize: 18,
      fontWeight: "600",
      marginTop: 10,
      color: "#374151",
    },
    rightSection: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    userEmail: {
      fontSize: 14,
      color: "#6b7280",
      marginTop: 4,
    },
    signOutButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#ef4444",
      padding: 12,
      borderRadius: 10,
      gap: 8,
    },
    signOutText: {
      color: "white",
      fontWeight: "600",
    },
  });

  return styles;
};
