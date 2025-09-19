import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, { SlideInRight } from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { RoleType, TalentType } from "@/types/onboarding";
import { useUser } from "@clerk/clerk-expo";

interface OnboardingFormProps {
  selectedRole: RoleType;
  selectedTalent: TalentType;
  onBack: () => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({
  selectedRole,
  selectedTalent,
  onBack,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    city: "",
    talentbio: "",
    // Musician fields
    instrument: "",
    experience: "",
    vocalistgenres: "",
    djGenre: "",
    djEquipment: "",
    mcType: "",
    mcLanguages: "",
    // Client fields
    organization: "",
  });

  const { user } = useUser();
  const router = useRouter();
  const { colors } = useTheme();
  const updateUserRole = useMutation(api.controllers.user.updateUserRole);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!user) {
        Alert.alert("Error", "User not found");
        return;
      }

      const result = await updateUserRole({
        email: user.primaryEmailAddress?.emailAddress || "",
        isMusician: selectedRole === "musician" || selectedRole === "both",
        isClient: selectedRole === "client" || selectedRole === "both",
        phone: formData.phone,
        musicianData:
          selectedRole === "musician" || selectedRole === "both"
            ? {
                talentType: selectedTalent,
                city: formData.city,
                talentbio: formData.talentbio,
                instrument: formData.instrument,
                experience: formData.experience,
                vocalistgenres: formData.vocalistgenres,
                djGenre: formData.djGenre,
                djEquipment: formData.djEquipment,
                mcType: formData.mcType,
                mcLanguages: formData.mcLanguages,
              }
            : undefined,
        clientData:
          selectedRole === "client" || selectedRole === "both"
            ? {
                city: formData.city,
                talentbio: formData.talentbio,
                organization: formData.organization,
              }
            : undefined,
      });

      if (result.success) {
        Alert.alert("Success", "Profile setup complete!");
        router.replace("/(tabs)");
      } else {
        Alert.alert("Error", result.error || "Failed to complete onboarding");
      }
    } catch (error) {
      console.error("Onboarding error:", error);
      Alert.alert("Error", "Failed to complete onboarding");
    }
  };

  const renderTalentSpecificFields = () => {
    if (selectedRole === "client" || selectedRole === "both") {
      return (
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.textMuted }]}>
            Organization
          </Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.text, color: colors.text },
            ]}
            value={formData.organization}
            onChangeText={(value) => handleInputChange("organization", value)}
            placeholder="Your company or organization name"
            placeholderTextColor={colors.textMuted}
          />
        </View>
      );
    }

    if (!selectedTalent) return null;

    switch (selectedTalent) {
      case "instrumentalist":
        return (
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.textMuted }]}>
              Primary Instrument
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.text, color: colors.text },
              ]}
              value={formData.instrument}
              onChangeText={(value) => handleInputChange("instrument", value)}
              placeholder="e.g., Guitar, Piano, Drums"
              placeholderTextColor={colors.textMuted}
            />
          </View>
        );

      case "vocalist":
        return (
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.textMuted }]}>
              Vocal Genres
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.text, color: colors.text },
              ]}
              value={formData.vocalistgenres}
              onChangeText={(value) =>
                handleInputChange("vocalistgenres", value)
              }
              placeholder="e.g., Pop, Jazz, R&B, Classical"
              placeholderTextColor={colors.textMuted}
            />
          </View>
        );

      case "deejay":
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textMuted }]}>
                DJ Genres
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.text, color: colors.text },
                ]}
                value={formData.djGenre}
                onChangeText={(value) => handleInputChange("djGenre", value)}
                placeholder="e.g., House, Techno, Hip-Hop"
                placeholderTextColor={colors.textMuted}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textMuted }]}>
                DJ Equipment
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.text, color: colors.text },
                ]}
                value={formData.djEquipment}
                onChangeText={(value) =>
                  handleInputChange("djEquipment", value)
                }
                placeholder="e.g., Pioneer CDJs, Technics 1200"
                placeholderTextColor={colors.textMuted}
              />
            </View>
          </>
        );

      case "emcee":
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textMuted }]}>
                MC Type
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.text, color: colors.text },
                ]}
                value={formData.mcType}
                onChangeText={(value) => handleInputChange("mcType", value)}
                placeholder="e.g., Wedding MC, Event Host, Rapper"
                placeholderTextColor={colors.textMuted}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textMuted }]}>
                Languages
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.text, color: colors.text },
                ]}
                value={formData.mcLanguages}
                onChangeText={(value) =>
                  handleInputChange("mcLanguages", value)
                }
                placeholder="Languages you can host in"
                placeholderTextColor={colors.textMuted}
              />
            </View>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={["#1a1a2e", "#16213e", "#0f3460"]}
      style={styles.container}
    >
      <Animated.View
        entering={SlideInRight.duration(500)}
        style={styles.formContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>
            Complete Your Profile
          </Text>
        </View>

        <ScrollView style={styles.formContent}>
          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Basic Information
            </Text>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textMuted }]}>
                Email
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.text, color: colors.text },
                ]}
                value={user?.primaryEmailAddress?.emailAddress || ""}
                editable={false}
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textMuted }]}>
                Phone Number
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.text, color: colors.text },
                ]}
                value={formData.phone}
                onChangeText={(value) => handleInputChange("phone", value)}
                placeholder="Your phone number"
                placeholderTextColor={colors.textMuted}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textMuted }]}>
                City
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.text, color: colors.text },
                ]}
                value={formData.city}
                onChangeText={(value) => handleInputChange("city", value)}
                placeholder="Your city"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textMuted }]}>
                Bio
              </Text>
              <TextInput
                style={[
                  styles.textArea,
                  { backgroundColor: colors.text, color: colors.text },
                ]}
                value={formData.talentbio}
                onChangeText={(value) => handleInputChange("talentbio", value)}
                placeholder="Tell us about yourself..."
                placeholderTextColor={colors.textMuted}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textMuted }]}>
                Experience Level
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.text, color: colors.text },
                ]}
                value={formData.experience}
                onChangeText={(value) => handleInputChange("experience", value)}
                placeholder="e.g., Beginner, Intermediate, Professional"
                placeholderTextColor={colors.textMuted}
              />
            </View>
          </View>

          {/* Talent/Client Specific Fields */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {selectedRole === "client"
                ? "Client Information"
                : "Talent Details"}
            </Text>
            {renderTalentSpecificFields()}
          </View>
        </ScrollView>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: colors.primary }]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Complete Profile</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  formContent: {
    flex: 1,
    marginBottom: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OnboardingForm;
