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
import { validateField, validateOnboardingForm } from "@/lib/validation";

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
    instrument: "",
    experience: "",
    vocalistgenres: "",
    djGenre: "",
    djEquipment: "",
    mcType: "",
    mcLanguages: "",
    organization: "",
  });

  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useUser();
  const router = useRouter();
  const { colors } = useTheme();
  const updateUserRole = useMutation(api.controllers.user.updateUserRole);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Real-time validation when field has been touched
    if (touched[field]) {
      const error = validateField(field, value, selectedRole, selectedTalent);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    }
  };

  const handleFocus = (field: string) => {
    setFocusedInput(field);
  };

  const handleBlur = (field: string) => {
    setFocusedInput(null);
    // Mark field as touched when user leaves it
    if (!touched[field]) {
      setTouched((prev) => ({ ...prev, [field]: true }));
    }

    // Validate field on blur
    const error = validateField(
      field,
      formData[field as keyof typeof formData],
      selectedRole,
      selectedTalent
    );
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const getInputStyle = (field: string) => {
    const isFocused = focusedInput === field;
    const hasError = errors[field] && touched[field];

    return [
      styles.input,
      {
        backgroundColor: isFocused ? "#475569" : "transparent",
        color: isFocused ? "#ffffff" : "#e2e8f0",
        borderLeftColor: hasError
          ? "#ef4444"
          : isFocused
            ? "#60a5fa"
            : "#475569",
        borderBottomColor: hasError
          ? "#ef4444"
          : isFocused
            ? "#60a5fa"
            : "#475569",
        borderLeftWidth: isFocused || hasError ? 3 : 2,
        borderBottomWidth: isFocused || hasError ? 3 : 2,
        shadowColor: hasError
          ? "#ef4444"
          : isFocused
            ? "#60a5fa"
            : "transparent",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: isFocused || hasError ? 0.4 : 0,
        shadowRadius: isFocused || hasError ? 10 : 0,
      },
    ];
  };

  const getTextAreaStyle = (field: string) => {
    const isFocused = focusedInput === field;
    const hasError = errors[field] && touched[field];

    return [
      styles.textArea,
      {
        backgroundColor: isFocused ? "#475569" : "transparent",
        color: isFocused ? "#ffffff" : "#e2e8f0",
        borderLeftColor: hasError
          ? "#ef4444"
          : isFocused
            ? "#60a5fa"
            : "#475569",
        borderBottomColor: hasError
          ? "#ef4444"
          : isFocused
            ? "#60a5fa"
            : "#475569",
        borderLeftWidth: isFocused || hasError ? 3 : 2,
        borderBottomWidth: isFocused || hasError ? 3 : 2,
        shadowColor: hasError
          ? "#ef4444"
          : isFocused
            ? "#60a5fa"
            : "transparent",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: isFocused || hasError ? 0.4 : 0,
        shadowRadius: isFocused || hasError ? 10 : 0,
      },
    ];
  };

  const validateForm = () => {
    // Mark all fields as touched to show all errors
    const allFields = [
      "phone",
      "city",
      "talentbio",
      "experience",
      "organization",
      "instrument",
      "vocalistgenres",
      "djGenre",
      "djEquipment",
      "mcType",
      "mcLanguages",
    ];

    const newTouched: Record<string, boolean> = {};
    allFields.forEach((field) => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    // Validate entire form
    const validation = validateOnboardingForm(
      formData,
      selectedRole,
      selectedTalent
    );
    setErrors(validation.errors);

    return validation.isValid;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (!user) {
        Alert.alert("Error", "User not found");
        return;
      }

      // Validate form before submission
      if (!validateForm()) {
        Alert.alert(
          "Validation Error",
          "Please fix the errors in the form before submitting."
        );
        setIsSubmitting(false);
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
        router.replace("/(dashboard)/home");
      } else {
        Alert.alert("Error", result.error || "Failed to complete onboarding");
      }
    } catch (error) {
      console.error("Onboarding error:", error);
      Alert.alert("Error", "Failed to complete onboarding");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderError = (field: string) => {
    if (errors[field] && touched[field]) {
      return <Text style={styles.errorText}>{errors[field]}</Text>;
    }
    return null;
  };

  const renderTalentSpecificFields = () => {
    if (selectedRole === "client" || selectedRole === "both") {
      return (
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: "#cbd5e1" }]}>Organization</Text>
          <TextInput
            style={getInputStyle("organization")}
            value={formData.organization}
            onChangeText={(value) => handleInputChange("organization", value)}
            onFocus={() => handleFocus("organization")}
            onBlur={() => handleBlur("organization")}
            placeholder="Your company or organization name"
            placeholderTextColor="#64748b"
          />
          {renderError("organization")}
        </View>
      );
    }

    if (!selectedTalent) return null;

    switch (selectedTalent) {
      case "instrumentalist":
        return (
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: "#cbd5e1" }]}>
              Primary Instrument
            </Text>
            <TextInput
              style={getInputStyle("instrument")}
              value={formData.instrument}
              onChangeText={(value) => handleInputChange("instrument", value)}
              onFocus={() => handleFocus("instrument")}
              onBlur={() => handleBlur("instrument")}
              placeholder="e.g., Guitar, Piano, Drums"
              placeholderTextColor="#64748b"
            />
            {renderError("instrument")}
          </View>
        );

      case "vocalist":
        return (
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: "#cbd5e1" }]}>
              Vocal Genres
            </Text>
            <TextInput
              style={getInputStyle("vocalistgenres")}
              value={formData.vocalistgenres}
              onChangeText={(value) =>
                handleInputChange("vocalistgenres", value)
              }
              onFocus={() => handleFocus("vocalistgenres")}
              onBlur={() => handleBlur("vocalistgenres")}
              placeholder="e.g., Pop, Jazz, R&B, Classical"
              placeholderTextColor="#64748b"
            />
            {renderError("vocalistgenres")}
          </View>
        );

      case "deejay":
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: "#cbd5e1" }]}>
                DJ Genres
              </Text>
              <TextInput
                style={getInputStyle("djGenre")}
                value={formData.djGenre}
                onChangeText={(value) => handleInputChange("djGenre", value)}
                onFocus={() => handleFocus("djGenre")}
                onBlur={() => handleBlur("djGenre")}
                placeholder="e.g., House, Techno, Hip-Hop"
                placeholderTextColor="#64748b"
              />
              {renderError("djGenre")}
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: "#cbd5e1" }]}>
                DJ Equipment
              </Text>
              <TextInput
                style={getInputStyle("djEquipment")}
                value={formData.djEquipment}
                onChangeText={(value) =>
                  handleInputChange("djEquipment", value)
                }
                onFocus={() => handleFocus("djEquipment")}
                onBlur={() => handleBlur("djEquipment")}
                placeholder="e.g., Pioneer CDJs, Technics 1200"
                placeholderTextColor="#64748b"
              />
              {renderError("djEquipment")}
            </View>
          </>
        );

      case "emcee":
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: "#cbd5e1" }]}>MC Type</Text>
              <TextInput
                style={getInputStyle("mcType")}
                value={formData.mcType}
                onChangeText={(value) => handleInputChange("mcType", value)}
                onFocus={() => handleFocus("mcType")}
                onBlur={() => handleBlur("mcType")}
                placeholder="e.g., Wedding MC, Event Host, Rapper"
                placeholderTextColor="#64748b"
              />
              {renderError("mcType")}
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: "#cbd5e1" }]}>
                Languages
              </Text>
              <TextInput
                style={getInputStyle("mcLanguages")}
                value={formData.mcLanguages}
                onChangeText={(value) =>
                  handleInputChange("mcLanguages", value)
                }
                onFocus={() => handleFocus("mcLanguages")}
                onBlur={() => handleBlur("mcLanguages")}
                placeholder="Languages you can host in"
                placeholderTextColor="#64748b"
              />
              {renderError("mcLanguages")}
            </View>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={["#0f172a", "#1e293b", "#334155"]}
      style={styles.container}
    >
      <Animated.View
        entering={SlideInRight.duration(500)}
        style={styles.formContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, { backgroundColor: "#334155" }]}
          >
            <Ionicons name="arrow-back" size={24} color="#cbd5e1" />
          </TouchableOpacity>
          <Text style={[styles.title, { color: "#f8fafc" }]}>
            Complete Your Profile
          </Text>
        </View>

        <ScrollView
          style={styles.formContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Basic Information */}
          <View style={[styles.section, { backgroundColor: "#1e293b" }]}>
            <Text style={[styles.sectionTitle, { color: "#f1f5f9" }]}>
              Basic Information
            </Text>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: "#cbd5e1" }]}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: "#334155",
                    color: "#94a3b8",
                    borderLeftColor: "#475569",
                    borderBottomColor: "#475569",
                    borderLeftWidth: 2,
                    borderBottomWidth: 2,
                  },
                ]}
                value={user?.primaryEmailAddress?.emailAddress || ""}
                editable={false}
                placeholderTextColor="#64748b"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: "#cbd5e1" }]}>
                Phone Number
              </Text>
              <TextInput
                style={getInputStyle("phone")}
                value={formData.phone}
                onChangeText={(value) => handleInputChange("phone", value)}
                onFocus={() => handleFocus("phone")}
                onBlur={() => handleBlur("phone")}
                placeholder="Your phone number"
                placeholderTextColor="#64748b"
                keyboardType="phone-pad"
              />
              {renderError("phone")}
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: "#cbd5e1" }]}>City</Text>
              <TextInput
                style={getInputStyle("city")}
                value={formData.city}
                onChangeText={(value) => handleInputChange("city", value)}
                onFocus={() => handleFocus("city")}
                onBlur={() => handleBlur("city")}
                placeholder="Your city"
                placeholderTextColor="#64748b"
              />
              {renderError("city")}
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: "#cbd5e1" }]}>Bio</Text>
              <TextInput
                style={getTextAreaStyle("talentbio")}
                value={formData.talentbio}
                onChangeText={(value) => handleInputChange("talentbio", value)}
                onFocus={() => handleFocus("talentbio")}
                onBlur={() => handleBlur("talentbio")}
                placeholder="Tell us about yourself..."
                placeholderTextColor="#64748b"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              {renderError("talentbio")}
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: "#cbd5e1" }]}>
                Experience (Years)
              </Text>
              <TextInput
                style={getInputStyle("experience")}
                value={formData.experience}
                onChangeText={(value) => handleInputChange("experience", value)}
                onFocus={() => handleFocus("experience")}
                onBlur={() => handleBlur("experience")}
                placeholder="e.g., 2 years, 5+ years, Beginner"
                placeholderTextColor="#64748b"
                keyboardType="numeric"
              />
              {renderError("experience")}
            </View>
          </View>

          {/* Talent/Client Specific Fields */}
          <View style={[styles.section, { backgroundColor: "#1e293b" }]}>
            <Text style={[styles.sectionTitle, { color: "#f1f5f9" }]}>
              {selectedRole === "client"
                ? "Client Information"
                : "Talent Details"}
            </Text>
            {renderTalentSpecificFields()}
          </View>
        </ScrollView>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            {
              backgroundColor: isSubmitting ? "#60a5fa" : "#3b82f6",
              opacity: isSubmitting ? 0.7 : 1,
            },
          ]}
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? "Submitting..." : "Complete Profile"}
          </Text>
          {!isSubmitting && (
            <Ionicons
              name="checkmark-circle"
              size={20}
              color="white"
              style={styles.submitIcon}
            />
          )}
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
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  backButton: {
    marginRight: 16,
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    flex: 1,
  },
  formContent: {
    flex: 1,
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#334155",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    fontWeight: "500",
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  textArea: {
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    height: 120,
    textAlignVertical: "top",
    fontWeight: "500",
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 4,
    fontWeight: "500",
  },
  submitButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#3b82f6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  submitIcon: {
    marginLeft: 4,
  },
});

export default OnboardingForm;
