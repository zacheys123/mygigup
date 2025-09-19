// components/MpesaPaymentModal.tsx
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Plan, TalentType } from "@/types/plan";
import { Ionicons } from "@expo/vector-icons";

interface MpesaPaymentModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (phoneNumber: string) => void;
  plan: Plan | null;
  isLoading: boolean;
  talentType: TalentType | null;
  onTalentTypeChange: (type: TalentType) => void;
  nextBillingDate: Date;
}

const MpesaPaymentModal: React.FC<MpesaPaymentModalProps> = ({
  visible,
  onClose,
  onConfirm,
  plan,
  isLoading,
  talentType,
  onTalentTypeChange,
  nextBillingDate,
}) => {
  const { colors } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleConfirm = () => {
    // Validate phone number (basic Kenyan phone validation)
    const phoneRegex = /^(\+?254|0)?[7][0-9]{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid Kenyan phone number"
      );
      return;
    }

    // For musician plans, validate talent type selection
    if (
      plan?.forUserType === "musician" &&
      plan.talentTypes &&
      plan.talentTypes.length > 1 &&
      !talentType
    ) {
      Alert.alert("Talent Type Required", "Please select your talent type");
      return;
    }

    // Format phone number to 254 format
    let formattedPhone = phoneNumber.trim();
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "254" + formattedPhone.substring(1);
    } else if (formattedPhone.startsWith("+254")) {
      formattedPhone = formattedPhone.substring(1);
    } else if (!formattedPhone.startsWith("254")) {
      formattedPhone = "254" + formattedPhone;
    }

    onConfirm(formattedPhone);
  };

  const handleClose = () => {
    setPhoneNumber("");
    onClose();
  };

  const renderTalentTypeSelector = () => {
    if (!plan?.talentTypes || plan.talentTypes.length <= 1) return null;

    return (
      <View style={styles.talentTypeContainer}>
        <Text style={[styles.talentTypeLabel, { color: colors.text }]}>
          Select Your Talent Type:
        </Text>
        <View style={styles.talentTypeOptions}>
          {plan.talentTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.talentTypeButton,
                {
                  backgroundColor:
                    talentType === type ? colors.primary : colors.border,
                  borderColor: colors.primary,
                },
              ]}
              onPress={() => onTalentTypeChange(type)}
              disabled={isLoading}
            >
              <Text
                style={[
                  styles.talentTypeText,
                  { color: talentType === type ? colors.border : colors.text },
                ]}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View
        style={[
          styles.modalContainer,
          { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        ]}
      >
        <View
          style={[styles.modalContent, { backgroundColor: colors.surface }]}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Complete Payment via M-Pesa
            </Text>
            <TouchableOpacity onPress={handleClose} disabled={isLoading}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View style={styles.planSummary}>
              <Text style={[styles.planName, { color: colors.text }]}>
                {plan?.name}
              </Text>
              <Text style={[styles.planPrice, { color: colors.primary }]}>
                KES {plan?.price.toLocaleString()}
                <Text
                  style={[styles.billingCycle, { color: colors.textMuted }]}
                >
                  /{plan?.interval}
                </Text>
              </Text>
              <Text
                style={[styles.nextBillingDate, { color: colors.textMuted }]}
              >
                Next billing: {nextBillingDate.toLocaleDateString()}
              </Text>
            </View>

            {renderTalentTypeSelector()}

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>
                M-Pesa Phone Number
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.border,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="e.g., 07XX XXX XXX"
                placeholderTextColor={colors.textMuted}
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                editable={!isLoading}
              />
              <Text style={[styles.helpText, { color: colors.textMuted }]}>
                You will receive a prompt on this number to confirm payment
              </Text>
            </View>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.cancelButton, { backgroundColor: colors.border }]}
              onPress={handleClose}
              disabled={isLoading}
            >
              <Text style={[styles.cancelButtonText, { color: colors.text }]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                {
                  backgroundColor:
                    isLoading ||
                    !phoneNumber ||
                    (plan?.forUserType === "musician" &&
                      plan.talentTypes &&
                      plan.talentTypes.length > 1 &&
                      !talentType)
                      ? colors.surface
                      : colors.primary,
                },
              ]}
              onPress={handleConfirm}
              disabled={
                isLoading ||
                !phoneNumber ||
                (plan?.forUserType === "musician" &&
                  plan.talentTypes &&
                  plan.talentTypes.length > 1 &&
                  !talentType)
              }
            >
              {isLoading ? (
                <ActivityIndicator color={colors.border} />
              ) : (
                <Text
                  style={[styles.confirmButtonText, { color: colors.border }]}
                >
                  Confirm Payment
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxHeight: "80%",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
    marginRight: 16,
  },
  planSummary: {
    marginBottom: 24,
    alignItems: "center",
  },
  planName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: "700",
  },
  billingCycle: {
    fontSize: 16,
    fontWeight: "500",
  },
  nextBillingDate: {
    fontSize: 14,
    marginTop: 8,
    fontStyle: "italic",
  },
  talentTypeContainer: {
    marginBottom: 24,
  },
  talentTypeLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  talentTypeOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  talentTypeButton: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  talentTypeText: {
    fontSize: 14,
    fontWeight: "500",
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  confirmButton: {
    flex: 2,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MpesaPaymentModal;
