import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";

interface HeaderProps {
  title?: string;
  onMenuPress?: () => void;
  onProfilePress?: () => void;
}

export default function HeaderComponent({
  title = "Gigup",
  onMenuPress,
  onProfilePress,
}: HeaderProps) {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    leftSection: {
      flexDirection: "row",
      alignItems: "center",
    },
    menuButton: {
      padding: 8,
      marginRight: 12,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
    },
    rightSection: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    themeToggle: {
      padding: 8,
      backgroundColor: colors.backgrounds.card,
      borderRadius: 20,
    },
    profileButton: {
      padding: 8,
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {onMenuPress && (
          <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
            <Ionicons name="menu" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity onPress={toggleDarkMode} style={styles.themeToggle}>
          <Ionicons
            name={isDarkMode ? "sunny" : "moon"}
            size={20}
            color={colors.text}
          />
        </TouchableOpacity>

        {onProfilePress && (
          <TouchableOpacity
            onPress={onProfilePress}
            style={styles.profileButton}
          >
            <Ionicons name="person-circle" size={28} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
