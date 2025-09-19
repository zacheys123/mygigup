import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";

interface OnBoardingComponentProps {
  showOnboardingModal: boolean;
  checkingOnboarding: boolean;
  handleStartOnboarding: () => void;
}

const OnBoardingComponent: React.FC<OnBoardingComponentProps> = ({
  showOnboardingModal,
  checkingOnboarding,
  handleStartOnboarding,
}) => {
  const { colors } = useTheme();

  if (checkingOnboarding) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>
          Checking your profile...
        </Text>
      </View>
    );
  }

  return (
    <Modal
      visible={showOnboardingModal}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={["#1a1a2e", "#16213e", "#0f3460"]}
          style={styles.gradient}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Animated.View
              entering={FadeIn.duration(800)}
              style={styles.header}
            >
              <Animated.View
                entering={ZoomIn.duration(600)}
                style={[
                  styles.logoContainer,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Ionicons name="mic" size={40} color="white" />
              </Animated.View>
              <Text style={[styles.title, { color: colors.text }]}>
                Welcome to GigUp!
              </Text>
              <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                Let's get you set up with the ultimate music platform
              </Text>
            </Animated.View>

            <View style={styles.featuresContainer}>
              <Animated.View
                entering={FadeIn.duration(800).delay(200)}
                style={styles.featureCard}
              >
                <View
                  style={[
                    styles.featureIcon,
                    { backgroundColor: colors.primary + "20" },
                  ]}
                >
                  <Ionicons name="mic" size={24} color={colors.primary} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>
                    For Musicians & Talent
                  </Text>
                  <Text
                    style={[
                      styles.featureDescription,
                      { color: colors.textMuted },
                    ]}
                  >
                    Showcase your skills, find gigs, connect with clients, and
                    build your professional portfolio
                  </Text>
                </View>
              </Animated.View>

              <Animated.View
                entering={FadeIn.duration(800).delay(400)}
                style={styles.featureCard}
              >
                <View
                  style={[
                    styles.featureIcon,
                    { backgroundColor: "#3b82f6" + "20" },
                  ]}
                >
                  <Ionicons name="business" size={24} color="#3b82f6" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>
                    For Event Clients
                  </Text>
                  <Text
                    style={[
                      styles.featureDescription,
                      { color: colors.textMuted },
                    ]}
                  >
                    Discover amazing talent, book performers, manage events, and
                    create unforgettable experiences
                  </Text>
                </View>
              </Animated.View>

              <Animated.View
                entering={FadeIn.duration(800).delay(600)}
                style={styles.featureCard}
              >
                <View
                  style={[
                    styles.featureIcon,
                    { backgroundColor: "#8b5cf6" + "20" },
                  ]}
                >
                  <Ionicons name="people" size={24} color="#8b5cf6" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>
                    Dual Role Flexibility
                  </Text>
                  <Text
                    style={[
                      styles.featureDescription,
                      { color: colors.textMuted },
                    ]}
                  >
                    Be both a performer and a booker - perfect for industry
                    professionals
                  </Text>
                </View>
              </Animated.View>

              <Animated.View
                entering={FadeIn.duration(800).delay(800)}
                style={styles.featureCard}
              >
                <View
                  style={[
                    styles.featureIcon,
                    { backgroundColor: "#10b981" + "20" },
                  ]}
                >
                  <Ionicons name="calendar" size={24} color="#10b981" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>
                    Seamless Booking
                  </Text>
                  <Text
                    style={[
                      styles.featureDescription,
                      { color: colors.textMuted },
                    ]}
                  >
                    Easy scheduling, secure payments, and professional
                    communication tools
                  </Text>
                </View>
              </Animated.View>
            </View>

            <View style={styles.benefitsSection}>
              <Text style={[styles.benefitsTitle, { color: colors.text }]}>
                Why Choose GigUp?
              </Text>
              <View style={styles.benefitsList}>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                  <Text
                    style={[styles.benefitText, { color: colors.textMuted }]}
                  >
                    Verified artists and clients
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                  <Text
                    style={[styles.benefitText, { color: colors.textMuted }]}
                  >
                    Secure payment system
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                  <Text
                    style={[styles.benefitText, { color: colors.textMuted }]}
                  >
                    Real-time messaging
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                  <Text
                    style={[styles.benefitText, { color: colors.textMuted }]}
                  >
                    Portfolio showcasing
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                  <Text
                    style={[styles.benefitText, { color: colors.textMuted }]}
                  >
                    Event management tools
                  </Text>
                </View>
              </View>
            </View>

            <Animated.View
              entering={FadeIn.duration(800).delay(1000)}
              style={styles.ctaContainer}
            >
              <Text style={[styles.ctaText, { color: colors.textMuted }]}>
                Ready to join the community?
              </Text>
              <TouchableOpacity
                style={[styles.ctaButton, { backgroundColor: colors.primary }]}
                onPress={handleStartOnboarding}
              >
                <Text style={styles.ctaButtonText}>Complete Signup</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
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
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 22,
  },
  featuresContainer: {
    gap: 20,
    marginBottom: 32,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 20,
    borderRadius: 16,
    gap: 16,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  benefitsSection: {
    marginBottom: 32,
  },
  benefitsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  benefitText: {
    fontSize: 14,
    flex: 1,
  },
  ctaContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  ctaText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 8,
    minWidth: width - 100,
  },
  ctaButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OnBoardingComponent;
