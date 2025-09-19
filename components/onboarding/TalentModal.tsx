import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { TalentType } from "@/types/onboarding";

interface TalentModalProps {
  visible: boolean;
  onClose: () => void;
  onTalentSelect: (talent: TalentType) => void;
}

const TalentModal: React.FC<TalentModalProps> = ({
  visible,
  onClose,
  onTalentSelect,
}) => {
  const { colors } = useTheme();

  const talentOptions: {
    value: TalentType;
    label: string;
    icon: string;
    description: string;
  }[] = [
    {
      value: "instrumentalist",
      label: "Instrumentalist",
      icon: "musical-notes",
      description: "Play instruments like guitar, piano, drums, etc.",
    },
    {
      value: "deejay",
      label: "DJ",
      icon: "disc",
      description: "Mix music and create atmosphere for events",
    },
    {
      value: "emcee",
      label: "Emcee",
      icon: "mic",
      description: "Host events and engage audiences",
    },
    {
      value: "vocalist",
      label: "Vocalist",
      icon: "mic",
      description: "Sing as a solo artist or with a group",
    },
  ];

  const handleSelect = (talent: TalentType) => {
    onTalentSelect(talent);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              entering={FadeIn.duration(300)}
              style={[styles.modalContent, { backgroundColor: colors.border }]}
            >
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Select Your Talent
                </Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>

              <Text style={[styles.modalSubtitle, { color: colors.textMuted }]}>
                What's your primary musical talent?
              </Text>

              <ScrollView
                style={styles.optionsContainer}
                showsVerticalScrollIndicator={false}
              >
                {talentOptions.map((option, index) => (
                  <Animated.View
                    key={option.value}
                    entering={FadeInDown.duration(400).delay(index * 100)}
                  >
                    <TouchableOpacity
                      style={[
                        styles.optionButton,
                        {
                          backgroundColor: colors.text,
                          borderColor: colors.border,
                        },
                      ]}
                      onPress={() => handleSelect(option.value)}
                    >
                      <View style={styles.optionContent}>
                        <View
                          style={[
                            styles.optionIcon,
                            {
                              backgroundColor: colors.primary + "20",
                            },
                          ]}
                        >
                          <Ionicons
                            name={option.icon as any}
                            size={24}
                            color={colors.primary}
                          />
                        </View>
                        <View style={styles.optionTextContainer}>
                          <Text
                            style={[
                              styles.optionText,
                              {
                                color: colors.text,
                                fontWeight: "600",
                              },
                            ]}
                          >
                            {option.label}
                          </Text>
                          <Text
                            style={[
                              styles.optionDescription,
                              {
                                color: colors.textMuted,
                              },
                            ]}
                          >
                            {option.description}
                          </Text>
                        </View>
                      </View>

                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={colors.textMuted}
                      />
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </ScrollView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: width - 40,
    maxHeight: "80%",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
  },
});

export default TalentModal;
