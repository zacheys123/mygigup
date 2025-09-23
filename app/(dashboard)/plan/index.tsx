// components/SubscriptionPlans.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Plan, TalentType, TierStatus, Subscription } from "@/types/plan";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MpesaPaymentModal from "@/components/MpesaPaymentModal";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// Helper function to calculate next billing date
const calculateNextBillingDate = (interval: "month" | "year"): Date => {
  const date = new Date();
  if (interval === "month") {
    date.setMonth(date.getMonth() + 1);
  } else {
    date.setFullYear(date.getFullYear() + 1);
  }
  return date;
};

// Plan data with tier status and next billing date calculation
const SUBSCRIPTION_PLANS: Plan[] = [
  // Talent Plans (Musicians)
  {
    id: "talent_starter",
    name: "Talent Starter",
    price: 999,
    interval: "month",
    features: [
      "Browse unlimited gig opportunities",
      "Apply to 5 gigs monthly",
      "Basic profile visibility to clients",
      "Email notifications for new gigs",
      "Limited cancellation (1 cancellation per month)",
    ],
    forUserType: "musician",
    talentTypes: ["deejay", "emcee", "vocalist", "instrumentalist"],
    tier: "starter",
  },
  {
    id: "talent_pro",
    name: "Talent Pro",
    price: 1499,
    interval: "month",
    features: [
      "Unlimited gig applications",
      "Priority listing in talent searches",
      "Advanced performance analytics",
      "Direct messaging with platinum clients",
      "Customizable profile portfolio",
      "Enhanced cancellation (3 cancellations per month)",
    ],
    recommended: true,
    forUserType: "musician",
    talentTypes: ["deejay", "emcee", "vocalist", "instrumentalist"],
    tier: "pro",
  },
  {
    id: "talent_elite",
    name: "Talent Elite",
    price: 1999,
    interval: "month",
    features: [
      "Featured placement in talent listings",
      "Unlimited everything",
      "Dedicated talent support agent",
      "Early access to premium gigs",
      "Detailed performance analytics dashboard",
      "Premium cancellation (5 cancellations per month)",
    ],
    forUserType: "musician",
    talentTypes: ["deejay", "emcee", "vocalist", "instrumentalist"],
    tier: "elite",
  },

  // Client Plans
  {
    id: "client_essentials",
    name: "Client Essentials",
    price: 999,
    interval: "month",
    features: [
      "Post 3 gigs monthly",
      "Basic talent search filters",
      "Standard customer support",
      "Email notifications for applications",
    ],
    forUserType: "client",
    tier: "starter",
  },
  {
    id: "client_premier",
    name: "Client Premier",
    price: 1499,
    interval: "month",
    features: [
      "Unlimited gig postings",
      "Advanced talent matching algorithms",
      "Priority access to top talent",
      "Complete booking management suite",
      "Custom branding on gig postings",
    ],
    recommended: true,
    forUserType: "client",
    tier: "pro",
  },
  {
    id: "platinum_client",
    name: "Platinum Client",
    price: 1999,
    interval: "month",
    features: [
      "Multi-user team management",
      "White-label booking solutions",
      "Dedicated account manager",
      "API access for integration",
      "Custom reporting and analytics",
    ],
    forUserType: "client",
    tier: "elite",
  },

  // Dual Role Plans
  {
    id: "all_access_elite",
    name: "All Access Elite",
    price: 2999,
    interval: "month",
    features: [
      "Complete talent features suite",
      "Complete client features suite",
      "50% savings compared to separate plans",
      "Unified talent-client dashboard",
      "24/7 priority support",
    ],
    forUserType: "dual",
    tier: "elite",
  },
];

const SubscriptionPlans = () => {
  const { colors } = useTheme();
  const { user: currentUser } = useCurrentUser();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedTalentType, setSelectedTalentType] =
    useState<TalentType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [currentSubscription, setCurrentSubscription] =
    useState<Subscription | null>(null);
  const updateTier = useMutation(api.controllers.user.updateTier);
  // Determine user type
  const userType = currentUser?.isBoth
    ? "dual"
    : currentUser?.isClient
      ? "client"
      : "musician";

  // Filter plans based on user type
  const availablePlans = SUBSCRIPTION_PLANS.filter(
    (plan) => plan.forUserType === userType
  );

  // Check if user has an active subscription
  useEffect(() => {
    // In a real app, this would come from your backend/API
    const fetchUserSubscription = async () => {
      try {
        // Simulate API call
        const mockSubscription: Subscription | null = null; // Set to null to see all plans

        // Example of an active subscription:
        // const mockSubscription: Subscription = {
        //   id: "sub_123",
        //   planId: "talent_pro",
        //   userId: currentUser?.id || "",
        //   status: "active",
        //   startDate: new Date(),
        //   endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        //   nextBillingDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        //   autoRenew: true,
        //   tier: "pro",
        // };

        setCurrentSubscription(mockSubscription);
      } catch (error) {
        console.error("Failed to fetch subscription:", error);
      }
    };

    fetchUserSubscription();
  }, [currentUser]);

  const initiateSubscription = async (plan: Plan) => {
    // If user already has this plan, show management options
    if (currentSubscription && currentSubscription.planId === plan.id) {
      Alert.alert(
        "Current Plan",
        `You are already subscribed to the ${plan.name} plan.`,
        [
          {
            text: "Manage Subscription",
            onPress: () => console.log("Manage subscription"),
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
      return;
    }

    setCurrentPlan(plan);
    setSelectedPlan(plan.id);

    // If it's a musician plan with multiple talent types, show talent type selection
    if (
      plan.forUserType === "musician" &&
      plan.talentTypes &&
      plan.talentTypes.length > 1
    ) {
      setShowPaymentModal(true);
    } else {
      setShowPaymentModal(true);
    }
  };

  const processPayment = async (phoneNumber: string) => {
    setIsProcessing(true);

    try {
      // Simulate M-Pesa payment process
      console.log(
        "Processing M-Pesa payment for:",
        phoneNumber,
        "Plan:",
        currentPlan?.name,
        "Talent Type:",
        selectedTalentType
      );

      // Here you would integrate with your M-Pesa API
      // await new Promise((resolve) => setTimeout(resolve, 3000));

      // Create a new subscription object with next billing date
      const newSubscription: Subscription = {
        id: `sub_${Math.random().toString(36).substr(2, 9)}`,
        planId: currentPlan?.id || "",
        userId: currentUser?._id || "",
        startDate: new Date().getTime(),

        nextBillingDate: calculateNextBillingDate(
          currentPlan?.interval || "month"
        ).getTime(),
        autoRenew: true,

        tier: currentPlan?.tier || "starter",
      };

      setCurrentSubscription(newSubscription);
      const result = await updateTier(newSubscription);
      Alert.alert(
        "Payment Successful!",
        `You've successfully subscribed to ${currentPlan?.name}${selectedTalentType ? ` as a ${selectedTalentType}` : ""}. Your next billing date is ${newSubscription.nextBillingDate}. A confirmation has been sent to ${phoneNumber}`,
        [
          {
            text: "OK",
            onPress: () => {
              setSelectedPlan(null);
              setSelectedTalentType(null);
              setShowPaymentModal(false);
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Payment Failed",
        "We couldn't process your payment. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const getTierBadgeColor = (tier: TierStatus) => {
    switch (tier) {
      case "starter":
        return "#10B981"; // Green
      case "pro":
        return "#3B82F6"; // Blue
      case "elite":
        return "#8B5CF6"; // Purple
      default:
        return "#6B7280"; // Gray
    }
  };

  const renderTierBadge = (tier: TierStatus) => {
    return (
      <View
        style={[styles.tierBadge, { backgroundColor: getTierBadgeColor(tier) }]}
      >
        <Text style={styles.tierBadgeText}>{tier.toUpperCase()}</Text>
      </View>
    );
  };

  const renderCurrentSubscription = () => {
    if (!currentSubscription) return null;

    return (
      <View
        style={[
          styles.currentPlanContainer,
          { backgroundColor: colors.surface },
        ]}
      >
        <Text style={[styles.currentPlanTitle, { color: colors.text }]}>
          Your Current Plan
        </Text>
        <View style={styles.currentPlanDetails}>
          <View style={styles.currentPlanHeader}>
            <Text style={[styles.currentPlanName, { color: colors.text }]}>
              {SUBSCRIPTION_PLANS.find(
                (p) => p.id === currentSubscription.planId
              )?.name || "Current Plan"}
            </Text>
            {renderTierBadge(currentSubscription.tier)}
          </View>

          {currentSubscription.talentType && (
            <Text style={[styles.talentTypeText, { color: colors.textMuted }]}>
              Talent Type:{" "}
              {currentSubscription.talentType.charAt(0).toUpperCase() +
                currentSubscription.talentType.slice(1)}
            </Text>
          )}

          <Text style={[styles.nextBillingText, { color: colors.textMuted }]}>
            Next Billing: {currentSubscription.nextBillingDate}
          </Text>

          <Text
            style={[
              styles.statusText,
              {
                color:
                  currentSubscription.status === "active"
                    ? colors.success
                    : colors.warning,
              },
            ]}
          >
            Status:
            {currentSubscription?.status &&
              currentSubscription?.status.charAt(0).toUpperCase() +
                currentSubscription?.status.slice(1)}
          </Text>
        </View>
      </View>
    );
  };

  const renderPlanCard = (plan: Plan) => {
    const isSelected = selectedPlan === plan.id;
    const isRecommended = plan.recommended;
    const isCurrentPlan = currentSubscription?.planId === plan.id;

    return (
      <View
        key={plan.id}
        style={[
          styles.planCard,
          {
            backgroundColor: colors.surface,
            borderColor: isCurrentPlan
              ? colors.success
              : isSelected
                ? colors.primary
                : colors.border,
            borderWidth: isCurrentPlan ? 2 : isSelected ? 2 : 1,
            transform: [{ scale: isSelected ? 1.02 : 1 }],
            opacity: isCurrentPlan ? 0.9 : 1,
          },
        ]}
      >
        {isCurrentPlan && (
          <View
            style={[styles.currentBadge, { backgroundColor: colors.success }]}
          >
            <Ionicons name="checkmark" size={14} color="#FFF" />
            <Text style={styles.currentBadgeText}>CURRENT PLAN</Text>
          </View>
        )}

        {isRecommended && !isCurrentPlan && (
          <LinearGradient
            colors={["#FFD700", "#FFA500"]}
            style={styles.recommendedBadge}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="star" size={14} color="#000" />
            <Text style={styles.recommendedText}>RECOMMENDED</Text>
          </LinearGradient>
        )}

        <View style={styles.planHeader}>
          <Text style={[styles.planName, { color: colors.text }]}>
            {plan.name}
          </Text>
          {renderTierBadge(plan.tier)}
          <Text style={[styles.planPrice, { color: colors.primary }]}>
            KES {plan.price.toLocaleString()}
            <Text style={[styles.planInterval, { color: colors.textMuted }]}>
              /{plan.interval}
            </Text>
          </Text>
        </View>

        {plan.talentTypes && (
          <View style={styles.talentTypes}>
            <Text
              style={[styles.talentTypesLabel, { color: colors.textMuted }]}
            >
              For:{" "}
              {plan.talentTypes
                .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
                .join(", ")}
            </Text>
          </View>
        )}

        <View style={styles.featuresList}>
          {plan.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={colors.success}
                style={styles.featureIcon}
              />
              <Text style={[styles.featureText, { color: colors.text }]}>
                {feature}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.subscribeButton,
            {
              backgroundColor: isCurrentPlan
                ? colors.success
                : isSelected
                  ? colors.primary
                  : "transparent",
              borderColor: isCurrentPlan ? colors.success : colors.primary,
            },
          ]}
          onPress={() => initiateSubscription(plan)}
          disabled={isProcessing || isCurrentPlan}
        >
          {isProcessing && isSelected ? (
            <ActivityIndicator color={colors.border} />
          ) : (
            <Text
              style={[
                styles.subscribeText,
                {
                  color: isCurrentPlan
                    ? colors.border
                    : isSelected
                      ? colors.border
                      : colors.primary,
                },
              ]}
            >
              {isCurrentPlan ? "Current Plan" : "Select Plan"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.border }]}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Elevate Your Experience
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            {userType === "musician"
              ? "Unlock premium opportunities for deejays, emcees, vocalists, and instrumentalists"
              : userType === "client"
                ? "Connect with top talent and streamline your booking process"
                : "Maximize your potential with full platform access"}
          </Text>
        </View>

        {renderCurrentSubscription()}

        <View style={styles.plansContainer}>
          {availablePlans.map(renderPlanCard)}
        </View>

        <View style={styles.footer}>
          <View
            style={[styles.benefitTag, { backgroundColor: colors.surface }]}
          >
            <Ionicons name="lock-closed" size={16} color={colors.success} />
            <Text style={[styles.footerText, { color: colors.text }]}>
              Secure M-Pesa payments
            </Text>
          </View>
          <View
            style={[styles.benefitTag, { backgroundColor: colors.surface }]}
          >
            <Ionicons name="refresh" size={16} color={colors.primary} />
            <Text style={[styles.footerText, { color: colors.text }]}>
              Cancel anytime
            </Text>
          </View>
          <View
            style={[styles.benefitTag, { backgroundColor: colors.surface }]}
          >
            <Ionicons name="shield-checkmark" size={16} color={colors.accent} />
            <Text style={[styles.footerText, { color: colors.text }]}>
              No hidden fees
            </Text>
          </View>
        </View>
      </ScrollView>

      <MpesaPaymentModal
        visible={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setSelectedPlan(null);
          setSelectedTalentType(null);
        }}
        onConfirm={processPayment}
        plan={currentPlan}
        isLoading={isProcessing}
        talentType={selectedTalentType}
        onTalentTypeChange={setSelectedTalentType}
        nextBillingDate={
          currentPlan
            ? calculateNextBillingDate(currentPlan.interval)
            : new Date()
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  currentPlanContainer: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  currentPlanTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  currentPlanDetails: {
    gap: 8,
  },
  currentPlanHeader: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 8,
  },
  currentPlanName: {
    fontSize: 20,
    fontWeight: "700",
  },
  talentTypeText: {
    fontSize: 14,
  },
  nextBillingText: {
    fontSize: 14,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  tierBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tierBadgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700",
  },
  plansContainer: {
    gap: 24,
    marginBottom: 30,
  },
  planCard: {
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
    position: "relative",
  },
  currentBadge: {
    position: "absolute",
    top: -12,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 6,
    zIndex: 10,
  },
  currentBadgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700",
  },
  recommendedBadge: {
    position: "absolute",
    top: -12,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 6,
  },
  recommendedText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "700",
  },
  planHeader: {
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  planName: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  planPrice: {
    fontSize: 36,
    fontWeight: "800",
  },
  planInterval: {
    fontSize: 16,
    fontWeight: "500",
  },
  talentTypes: {
    marginBottom: 16,
    alignItems: "center",
  },
  talentTypesLabel: {
    fontSize: 14,
    fontStyle: "italic",
  },
  featuresList: {
    marginBottom: 24,
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  featureIcon: {
    marginTop: 2,
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  subscribeButton: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  subscribeText: {
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    gap: 12,
    padding: 20,
  },
  benefitTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default SubscriptionPlans;
