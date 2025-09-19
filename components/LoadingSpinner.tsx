import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { useTheme } from "../hooks/useTheme";

interface LoadingSpinnerProps {
  size?: "small" | "large";
  text?: string;
}

export default function LoadingSpinner({
  size = "large",
  text,
}: LoadingSpinnerProps) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.bg,
    },
    spinner: {
      marginBottom: text ? 16 : 0,
    },
    text: {
      color: colors.text,
      fontSize: 16,
      opacity: 0.8,
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={size}
        color={colors.primary}
        style={styles.spinner}
      />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}
