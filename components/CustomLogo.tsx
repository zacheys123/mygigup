// components/Logo.tsx (Simpler version)
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";

const Logo = () => {
  const { colors, isDarkMode } = useTheme();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={
          isDarkMode
            ? ["#667eea", "#764ba2"] // Professional blue-purple gradient
            : ["#4facfe", "#00f2fe"] // Professional blue gradient
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Main text with 3D effect */}
        <Text
          style={[
            styles.text,
            {
              color: "#fff",
              textShadowColor: "rgba(0, 0, 0, 0.3)",
            },
          ]}
        >
          GigUp
        </Text>

        {/* 3D bottom shadow */}
        <View
          style={[
            styles.shadow,
            {
              backgroundColor: isDarkMode
                ? "rgba(58, 65, 111, 0.6)"
                : "rgba(55, 195, 185, 0.4)",
            },
          ]}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  gradient: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    minWidth: 90,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    position: "relative",
    zIndex: 2,
  },
  shadow: {
    position: "absolute",
    bottom: -2,
    left: 8,
    right: 8,
    height: 5,
    borderRadius: 8,
    zIndex: 1,
    transform: [{ skewX: "-10deg" }],
  },
});

export default Logo;
