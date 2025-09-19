import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { RoleType } from "@/types/onboarding";

interface RoleCardProps {
  title: string;
  description: string;
  icon: string;
  role: RoleType;
  isSelected: boolean;
  gradientColors: string[];
  animationDelay: number;
  onPress: (role: RoleType) => void;
}

const RoleCard: React.FC<RoleCardProps> = ({
  title,
  description,
  icon,
  role,
  isSelected,
  gradientColors,
  animationDelay,
  onPress,
}) => {
  const { colors } = useTheme();

  return (
    <Animated.View
      entering={FadeInDown.duration(600).delay(animationDelay).springify()}
      style={styles.animatedContainer}
    >
      <TouchableOpacity
        style={[
          styles.card,
          {
            borderColor: isSelected ? colors.primary : "transparent",
            borderWidth: isSelected ? 2 : 0,
            shadowColor: colors.text,
          },
        ]}
        onPress={() => onPress(role)}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={colors.gradients.danger}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={icon as any} size={32} color="white" />
          </View>

          <View style={styles.content}>
            <Text style={[styles.title, { color: "white" }]}>{title}</Text>
            <Text
              style={[
                styles.description,
                { color: "rgba(255, 255, 255, 0.8)" },
              ]}
            >
              {description}
            </Text>
          </View>

          {isSelected && (
            <View style={styles.selectedIndicator}>
              <Ionicons name="checkmark-circle" size={24} color="white" />
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    width: "100%",
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  gradient: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 120,
    position: "relative",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  selectedIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
  },
});

export default RoleCard;
