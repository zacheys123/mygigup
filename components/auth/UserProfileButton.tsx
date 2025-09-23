import * as React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { createHeaderStyles } from "@/assets/styles/header.tyles";

export function CustomUserButton() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const [modalVisible, setModalVisible] = React.useState(false);
  const { colors, isDarkMode, toggleDarkMode } = useTheme();

  const headerStyles = createHeaderStyles(colors);

  if (!isSignedIn) {
    return null;
  }

  // Return a single View wrapper instead of multiple elements
  return (
    <View style={headerStyles.rightSection}>
      <TouchableOpacity
        onPress={toggleDarkMode}
        style={headerStyles.themeToggle}
      >
        <Ionicons
          name={isDarkMode ? "sunny" : "moon"}
          size={20}
          color={colors.text}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="person-circle" size={32} color={colors.warning} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={headerStyles.modalContainer}>
          <View style={headerStyles.modalContent}>
            <View style={headerStyles.modalHeader}>
              <Text style={headerStyles.modalTitle}>Profile</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            <View style={headerStyles.userInfo}>
              <Ionicons name="person" size={48} color="#667eea" />
              <Text style={headerStyles.userName}>
                {user?.firstName} {user?.lastName}
              </Text>
              <Text style={headerStyles.userEmail}>
                {user?.emailAddresses[0]?.emailAddress}
              </Text>
            </View>

            <TouchableOpacity
              style={headerStyles.signOutButton}
              onPress={() => {
                signOut();
                setModalVisible(false);
              }}
            >
              <Ionicons name="log-out" size={20} color="white" />
              <Text style={headerStyles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
