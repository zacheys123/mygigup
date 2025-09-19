import { ColorScheme } from "@/theme/types";
import { StyleSheet } from "react-native";

export const createWelcomeStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.bg,
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: colors.text,
      opacity: 0.8,
    },
    logoContainer: {
      alignItems: "center",
      marginBottom: 60,
    },
    logoText: {
      fontSize: 36,
      fontWeight: "800",
      color: colors.text,
      marginTop: 12,
      letterSpacing: 1,
    },
    tagline: {
      fontSize: 16,
      color: colors.textMuted,
      marginTop: 8,
      textAlign: "center",
    },
    authContainer: {
      width: "100%",
      maxWidth: 400,
      gap: 16,
    },
    signUpButton: {
      backgroundColor: colors.primary,
      padding: 18,
      borderRadius: 12,
      alignItems: "center",
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    signUpButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
    signInButton: {
      borderWidth: 1,
      borderColor: colors.border,
      padding: 18,
      borderRadius: 12,
      alignItems: "center",
      backgroundColor: colors.surface,
    },
    signInButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "500",
    },
  });
};
