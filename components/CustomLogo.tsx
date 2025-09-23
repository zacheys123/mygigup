// components/CustomLogo.tsx
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";

export default function Logo() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: colors.primary + "20" },
        ]}
      >
        <Ionicons name="mic" size={20} color={colors.primary} />
      </View>
      <Text style={[styles.text, { color: colors.text }]}>GigUp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
