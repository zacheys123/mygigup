import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, ZoomIn, FadeOut } from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { OnboardingData, RoleType, TalentType } from "@/types/onboarding";

import { SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaView
import TalentModal from "@/components/onboarding/TalentModal";
import RoleCard from "@/components/onboarding/RoleCard";
import OnboardingForm from "@/components/onboarding/onBoardingForm";

const OnBoarding = () => {
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const [selectedTalent, setSelectedTalent] = useState<TalentType>();
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();

  const handleRoleSelection = (role: RoleType) => {
    setSelectedRole(role);
    if (role === "musician") {
      setModalVisible(true);
    } else {
      setSelectedTalent("");
    }
  };

  const handleTalentSelection = (talent: TalentType) => {
    setSelectedTalent(talent);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* SafeAreaView wraps everything */}
      <LinearGradient
        colors={["#1a1a2e", "#16213e", "#0f3460"]}
        style={styles.container}
      >
        <TalentModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onTalentSelect={handleTalentSelection}
        />

        {!selectedRole ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              entering={FadeIn.duration(1000)}
              style={styles.header}
            >
              <Animated.View
                entering={ZoomIn.duration(800)}
                style={[
                  styles.logoContainer,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Ionicons name="mic" size={40} color="white" />
              </Animated.View>
              <Text style={[styles.title, { color: colors.success }]}>
                Welcome to Gigup!
              </Text>
              <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                Let's set up your profile. Choose how you'd like to use Gigup:
              </Text>
            </Animated.View>

            <View style={styles.cardsContainer}>
              <RoleCard
                title="Musician/Talent"
                description="Showcase your skills, find gigs, and build your portfolio"
                icon="mic"
                role="musician"
                isSelected={selectedRole === "musician"}
                gradientColors={colors.gradients.warning}
                animationDelay={200}
                onPress={handleRoleSelection}
              />

              <RoleCard
                title="Event Client"
                description="Book talented musicians, manage events, and create experiences"
                icon="business"
                role="client"
                isSelected={selectedRole === "client"}
                gradientColors={colors.gradients.danger}
                animationDelay={400}
                onPress={handleRoleSelection}
              />

              <RoleCard
                title="Dual Role"
                description="Both perform and book talent - perfect for professionals"
                icon="people"
                role="both"
                isSelected={selectedRole === "both"}
                gradientColors={colors.gradients.success}
                animationDelay={600}
                onPress={handleRoleSelection}
              />
            </View>
          </ScrollView>
        ) : (
          <OnboardingForm
            selectedRole={selectedRole}
            selectedTalent={selectedTalent}
            onBack={() => {
              setSelectedRole(null);
              setSelectedTalent("");
            }}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // SafeAreaView should take full height
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 20, // Reduced since SafeAreaView handles the top padding
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    width: "100%",
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 22,
  },
  cardsContainer: {
    width: "100%",
    gap: 20,
    marginBottom: 30,
  },
});

export default OnBoarding;
