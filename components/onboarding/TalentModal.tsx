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
  const { colors, isDarkMode } = useTheme();

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
        <View
          style={[
            styles.modalOverlay,
            {
              backgroundColor: isDarkMode
                ? "rgba(0,0,0,0.8)"
                : "rgba(0,0,0,0.6)",
            },
          ]}
        >
          <TouchableWithoutFeedback>
            <Animated.View
              entering={FadeIn.duration(300)}
              style={[styles.modalContent, { backgroundColor: colors.border }]}
            >
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Select Your Talent
                </Text>
                <TouchableOpacity
                  onPress={onClose}
                  style={[
                    styles.closeButton,
                    { backgroundColor: colors.backgrounds.card },
                  ]}
                  activeOpacity={0.7}
                >
                  <Ionicons name="close" size={20} color={colors.text} />
                </TouchableOpacity>
              </View>

              <Text style={[styles.modalSubtitle, { color: colors.text }]}>
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
                          backgroundColor: colors.backgrounds.card,
                          borderLeftWidth: 4,
                          borderLeftColor: colors.primary,
                        },
                      ]}
                      onPress={() => handleSelect(option.value)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.optionContent}>
                        <View
                          style={[
                            styles.optionIcon,
                            {
                              backgroundColor: colors.primary + "15",
                            },
                          ]}
                        >
                          <Ionicons
                            name={option.icon as any}
                            size={22}
                            color={colors.primary}
                          />
                        </View>
                        <View style={styles.optionTextContainer}>
                          <Text
                            style={[
                              styles.optionLabel,
                              {
                                color: colors.text,
                              },
                            ]}
                          >
                            {option.label}
                          </Text>
                          <Text
                            style={[
                              styles.optionDescription,
                              {
                                color: colors.text,
                              },
                            ]}
                          >
                            {option.description}
                          </Text>
                        </View>
                      </View>

                      <Ionicons
                        name="chevron-forward"
                        size={18}
                        color={colors.text}
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: width - 40,
    maxWidth: 400,
    maxHeight: "80%",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  optionsContainer: {
    marginBottom: 8,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
});

export default TalentModal;
