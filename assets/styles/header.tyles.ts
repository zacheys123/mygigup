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
      backgroundColor: colors.shadow, // Using your shadow color with transparency
    },
    modalContent: {
      backgroundColor: colors.backgrounds.modal,
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
      color: colors.text,
    },
    userInfo: {
      alignItems: "center",
      marginBottom: 30,
    },
    userName: {
      fontSize: 18,
      fontWeight: "600",
      marginTop: 10,
      color: colors.text,
    },
    rightSection: {
      backgroundColor: colors.surface, // Fixed typo and used surface color
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 8,
      borderRadius: 12,
    },
    userEmail: {
      fontSize: 14,
      color: colors.textMuted,
      marginTop: 4,
    },
    signOutButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.danger,
      padding: 12,
      borderRadius: 10,
      gap: 8,
    },
    signOutText: {
      color: colors.surface, // Using surface for contrast on danger background
      fontWeight: "600",
    },
    closeButton: {
      padding: 4,
      borderRadius: 20,
      backgroundColor: colors.backgrounds.card,
    }, // Add these to your createHeaderStyles function
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    leftSection: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    userAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary + "20", // 20% opacity
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return styles;
};
