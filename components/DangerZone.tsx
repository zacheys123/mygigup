import { createSettingsStyles } from "@/assets/styles/settings.style";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const DangerZone = () => {
  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationEnabled, setisNotificationEnabled] = useState(true);
  const { isDarkMode, toggleDarkMode, colors } = useTheme();
  const settingStyles = createSettingsStyles(colors);
  const clearAllTodos = () => {};
  const handelResetApp = async () => {
    Alert.alert("Reset App", "This will delete all your todos", [
      { text: "Cance", style: "cancel" },
      {
        text: "Delete All",
        style: "destructive",
        onPress: async () => {
          try {
            const result = await clearAllTodos();
            Alert.alert("App Reset", `Successfully deleted your gigup account`);
          } catch (error) {
            Alert.alert("Error", "Failed to reset App");
          }
        },
      },
    ]);
  };
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingStyles.section}
    >
      <Text style={settingStyles.sectionTitleDanger}>Danger Zone</Text>
      <TouchableOpacity
        style={[settingStyles.actionButton, { borderBottomWidth: 0 }]}
        onPress={handelResetApp}
        activeOpacity={0.7}
      >
        <View>
          <LinearGradient
            colors={colors.gradients.danger}
            style={settingStyles.actionIcon}
          >
            <Ionicons name="trash" size={18} color="#ffffff" />
          </LinearGradient>
          <Text style={settingStyles.actionTextDanger}>Reset App</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default DangerZone;
