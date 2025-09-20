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
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  ZoomIn,
} from "react-native-reanimated";
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
  const { colors, isDarkMode } = useTheme();

  if (checkingOnboarding) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.backgrounds.input },
        ]}
      >
        <Animated.View entering={ZoomIn.duration(600)}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text
            style={[styles.loadingText, { color: colors.text, marginTop: 16 }]}
          >
            Preparing your experience...
          </Text>
        </Animated.View>
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
      <View
        style={[
          styles.modalContainer,
          {
            backgroundColor: isDarkMode ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.7)",
          },
        ]}
      >
        <View
          style={[
            styles.contentContainer,
            { backgroundColor: colors.backgrounds.input },
          ]}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header Section */}
            <Animated.View
              entering={FadeInDown.duration(800)}
              style={styles.header}
            >
              <Animated.View
                entering={ZoomIn.duration(600)}
                style={[
                  styles.logoContainer,
                  {
                    backgroundColor: colors.primary,
                  },
                ]}
              >
                <Ionicons name="mic" size={32} color="white" />
              </Animated.View>
              <Text style={[styles.title, { color: colors.text }]}>
                Welcome to <Text style={{ color: colors.primary }}>GigUp</Text>
              </Text>
              <Text style={[styles.subtitle, { color: colors.text }]}>
                Connect musicians with event planners seamlessly
              </Text>
            </Animated.View>

            {/* Features Grid */}
            <View style={styles.featuresContainer}>
              <Animated.View
                entering={FadeIn.duration(800).delay(200)}
                style={[
                  styles.featureCard,
                  {
                    backgroundColor: colors.backgrounds.card,
                    borderLeftWidth: 4,
                    borderLeftColor: colors.primary,
                  },
                ]}
              >
                <View
                  style={[
                    styles.featureIcon,
                    { backgroundColor: colors.primary + "15" },
                  ]}
                >
                  <Ionicons name="mic" size={24} color={colors.primary} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>
                    For Musicians
                  </Text>
                  <Text
                    style={[styles.featureDescription, { color: colors.text }]}
                  >
                    Showcase talent, find gigs, build portfolio
                  </Text>
                </View>
              </Animated.View>

              <Animated.View
                entering={FadeIn.duration(800).delay(300)}
                style={[
                  styles.featureCard,
                  {
                    backgroundColor: colors.backgrounds.card,
                    borderLeftWidth: 4,
                    borderLeftColor: "#3b82f6",
                  },
                ]}
              >
                <View
                  style={[
                    styles.featureIcon,
                    { backgroundColor: "#3b82f6" + "15" },
                  ]}
                >
                  <Ionicons name="business" size={24} color="#3b82f6" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>
                    For Event Planners
                  </Text>
                  <Text
                    style={[styles.featureDescription, { color: colors.text }]}
                  >
                    Discover talent, create memorable events
                  </Text>
                </View>
              </Animated.View>

              <Animated.View
                entering={FadeIn.duration(800).delay(400)}
                style={[
                  styles.featureCard,
                  {
                    backgroundColor: colors.backgrounds.card,
                    borderLeftWidth: 4,
                    borderLeftColor: "#8b5cf6",
                  },
                ]}
              >
                <View
                  style={[
                    styles.featureIcon,
                    { backgroundColor: "#8b5cf6" + "15" },
                  ]}
                >
                  <Ionicons name="people" size={24} color="#8b5cf6" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>
                    Dual Roles
                  </Text>
                  <Text
                    style={[styles.featureDescription, { color: colors.text }]}
                  >
                    Be both performer and booker
                  </Text>
                </View>
              </Animated.View>

              <Animated.View
                entering={FadeIn.duration(800).delay(500)}
                style={[
                  styles.featureCard,
                  {
                    backgroundColor: colors.backgrounds.card,
                    borderLeftWidth: 4,
                    borderLeftColor: "#10b981",
                  },
                ]}
              >
                <View
                  style={[
                    styles.featureIcon,
                    { backgroundColor: "#10b981" + "15" },
                  ]}
                >
                  <Ionicons name="calendar" size={24} color="#10b981" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>
                    Seamless Booking
                  </Text>
                  <Text
                    style={[styles.featureDescription, { color: colors.text }]}
                  >
                    Easy scheduling and secure payments
                  </Text>
                </View>
              </Animated.View>
            </View>

            {/* Benefits Section */}
            <Animated.View
              entering={FadeIn.duration(800).delay(600)}
              style={styles.benefitsSection}
            >
              <Text style={[styles.benefitsTitle, { color: colors.text }]}>
                Key Features
              </Text>
              <View style={styles.benefitsGrid}>
                <View style={styles.benefitItem}>
                  <View
                    style={[
                      styles.benefitIcon,
                      { backgroundColor: colors.primary + "15" },
                    ]}
                  >
                    <Ionicons
                      name="shield-checkmark"
                      size={18}
                      color={colors.primary}
                    />
                  </View>
                  <Text style={[styles.benefitText, { color: colors.text }]}>
                    Verified Community
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <View
                    style={[
                      styles.benefitIcon,
                      { backgroundColor: "#3b82f6" + "15" },
                    ]}
                  >
                    <Ionicons name="lock-closed" size={18} color="#3b82f6" />
                  </View>
                  <Text style={[styles.benefitText, { color: colors.text }]}>
                    Secure Payments
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <View
                    style={[
                      styles.benefitIcon,
                      { backgroundColor: "#8b5cf6" + "15" },
                    ]}
                  >
                    <Ionicons name="chatbubbles" size={18} color="#8b5cf6" />
                  </View>
                  <Text style={[styles.benefitText, { color: colors.text }]}>
                    Real-time Chat
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <View
                    style={[
                      styles.benefitIcon,
                      { backgroundColor: "#10b981" + "15" },
                    ]}
                  >
                    <Ionicons name="briefcase" size={18} color="#10b981" />
                  </View>
                  <Text style={[styles.benefitText, { color: colors.text }]}>
                    Portfolio Showcase
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* CTA Section */}
            <Animated.View
              entering={FadeInUp.duration(800).delay(800)}
              style={styles.ctaContainer}
            >
              <TouchableOpacity
                style={[styles.ctaButton, { backgroundColor: colors.primary }]}
                onPress={handleStartOnboarding}
                activeOpacity={0.9}
              >
                <Text style={styles.ctaButtonText}>Get Started</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
              <Text style={[styles.ctaSubtext, { color: colors.text }]}>
                Join our community of music professionals
              </Text>
            </Animated.View>
          </ScrollView>
        </View>
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
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: "90%",
    maxWidth: 400,
    borderRadius: 16,
    maxHeight: "90%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "400",
  },
  featuresContainer: {
    gap: 12,
    marginBottom: 32,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  benefitsSection: {
    marginBottom: 32,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  benefitsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  benefitItem: {
    width: (width - 100) / 2,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  benefitIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  benefitText: {
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },
  ctaContainer: {
    alignItems: "center",
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 8,
    width: "100%",
    marginBottom: 16,
  },
  ctaButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  ctaSubtext: {
    fontSize: 13,
    textAlign: "center",
  },
});

export default OnBoardingComponent;
