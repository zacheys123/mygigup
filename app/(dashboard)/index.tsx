import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderComponent from "@/components/Header";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "expo-router";

import { createTabsStyles } from "@/assets/styles/tabs.styles";
import { useTheme } from "@/hooks/useTheme";
import OnBoardingComponent from "@/components/onboarding/onBoardingComponent";

const Index = () => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const { colors } = useTheme();
  const styles = createTabsStyles(colors);

  // Get user email from Clerk
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;

  // Query Convex to check onboarding status
  const myUser = useQuery(
    api.controllers.user.getUserByEmail,
    userEmail ? { email: userEmail } : "skip"
  );

  const mySubscription = useQuery(
    api.controllers.user.getSubscription,
    myUser?._id ? { userId: myUser._id } : "skip"
  );

  useEffect(() => {
    if (!isUserLoaded || !userEmail) return;

    // Check onboarding status immediately
    if (myUser === undefined) {
      // Still loading data
      return;
    }

    if (myUser) {
      if (myUser.onboardingComplete === true) {
        // User has completed onboarding
        setIsOnboardingComplete(true);
        setCheckingOnboarding(false);
        setShowOnboardingModal(false);
      } else {
        // User needs to complete onboarding - show modal immediately
        setShowOnboardingModal(true);
        setCheckingOnboarding(false);
      }
    } else {
      // User not found in database, they need to onboard
      setShowOnboardingModal(true);
      setCheckingOnboarding(false);
    }
  }, [isUserLoaded, myUser, userEmail]);

  const handleStartOnboarding = () => {
    setShowOnboardingModal(false);
    router.replace("/(auth)/onBoarding"); // Navigate to the onboarding route
  };

  // If onboarding is not complete, show the onboarding modal
  if (!isOnboardingComplete) {
    return (
      <OnBoardingComponent
        showOnboardingModal={showOnboardingModal}
        checkingOnboarding={checkingOnboarding}
        handleStartOnboarding={handleStartOnboarding}
      />
    );
  }

  // Only show app content if onboarding is complete
  return (
    <View style={styles.container}>
      {mySubscription?.tier !== "free" && (
        <Text style={styles.welcomeText}>
          Welcome to the app, {user?.firstName}!
        </Text>
      )}
      {/* Your main app content here */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Your app content goes here...</Text>
      </View>
    </View>
  );
};

export default Index;
