export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateOnboardingForm = (
  formData: any,
  selectedRole: string,
  selectedTalent: string | undefined
): ValidationResult => {
  const errors: Record<string, string> = {};

  // Required fields for all roles
  if (!formData.phone?.trim()) {
    errors.phone = "Phone number is required";
  } else if (
    !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ""))
  ) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!formData.city?.trim()) {
    errors.city = "City is required";
  } else if (formData.city.trim().length < 2) {
    errors.city = "Please enter a valid city name";
  }

  if (!formData.talentbio?.trim()) {
    errors.talentbio = "Bio is required";
  } else if (formData.talentbio.trim().length < 10) {
    errors.talentbio = "Bio must be at least 10 characters long";
  } else if (formData.talentbio.trim().length > 500) {
    errors.talentbio = "Bio must be less than 500 characters";
  }

  if (!formData.experience?.trim()) {
    errors.experience = "Experience is required";
  } else if (!/^\d+$/.test(formData.experience.trim())) {
    errors.experience = "Experience must be a valid number";
  } else if (parseInt(formData.experience) > 100) {
    errors.experience = "Please enter a realistic experience value";
  }

  // Client-specific validation
  if (selectedRole === "client" || selectedRole === "both") {
    if (!formData.organization?.trim()) {
      errors.organization = "Organization name is required";
    } else if (formData.organization.trim().length < 2) {
      errors.organization = "Please enter a valid organization name";
    }
  }

  // Musician-specific validation
  if (selectedRole === "musician" || selectedRole === "both") {
    if (!selectedTalent) {
      errors.talent = "Please select a talent type";
    } else {
      switch (selectedTalent) {
        case "instrumentalist":
          if (!formData.instrument?.trim()) {
            errors.instrument = "Primary instrument is required";
          }
          break;

        case "vocalist":
          if (!formData.vocalistgenres?.trim()) {
            errors.vocalistgenres = "Vocal genres are required";
          }
          break;

        case "deejay":
          if (!formData.djGenre?.trim()) {
            errors.djGenre = "DJ genres are required";
          }
          if (!formData.djEquipment?.trim()) {
            errors.djEquipment = "DJ equipment is required";
          }
          break;

        case "emcee":
          if (!formData.mcType?.trim()) {
            errors.mcType = "MC type is required";
          }
          if (!formData.mcLanguages?.trim()) {
            errors.mcLanguages = "Languages are required";
          }
          break;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Helper function to validate individual fields in real-time
export const validateField = (
  field: string,
  value: string,
  selectedRole?: string,
  selectedTalent?: string
): string => {
  switch (field) {
    case "phone":
      if (!value.trim()) return "Phone number is required";
      if (!/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, "")))
        return "Please enter a valid phone number";
      return "";

    case "city":
      if (!value.trim()) return "City is required";
      if (value.trim().length < 2) return "Please enter a valid city name";
      return "";

    case "talentbio":
      if (!value.trim()) return "Bio is required";
      if (value.trim().length < 10)
        return "Bio must be at least 10 characters long";
      if (value.trim().length > 500)
        return "Bio must be less than 500 characters";
      return "";

    case "experience":
      if (!value.trim()) return "Experience is required";
      if (!/^\d+$/.test(value.trim()))
        return "Experience must be a valid number";
      if (parseInt(value) > 100)
        return "Please enter a realistic experience value";
      return "";

    case "organization":
      if (
        (selectedRole === "client" || selectedRole === "both") &&
        !value.trim()
      ) {
        return "Organization name is required";
      }
      if (value.trim().length < 2 && value.trim().length > 0) {
        return "Please enter a valid organization name";
      }
      return "";

    case "instrument":
      if (
        (selectedRole === "musician" || selectedRole === "both") &&
        selectedTalent === "instrumentalist" &&
        !value.trim()
      ) {
        return "Primary instrument is required";
      }
      return "";

    case "vocalistgenres":
      if (
        (selectedRole === "musician" || selectedRole === "both") &&
        selectedTalent === "vocalist" &&
        !value.trim()
      ) {
        return "Vocal genres are required";
      }
      return "";

    case "djGenre":
      if (
        (selectedRole === "musician" || selectedRole === "both") &&
        selectedTalent === "deejay" &&
        !value.trim()
      ) {
        return "DJ genres are required";
      }
      return "";

    case "djEquipment":
      if (
        (selectedRole === "musician" || selectedRole === "both") &&
        selectedTalent === "deejay" &&
        !value.trim()
      ) {
        return "DJ equipment is required";
      }
      return "";

    case "mcType":
      if (
        (selectedRole === "musician" || selectedRole === "both") &&
        selectedTalent === "emcee" &&
        !value.trim()
      ) {
        return "MC type is required";
      }
      return "";

    case "mcLanguages":
      if (
        (selectedRole === "musician" || selectedRole === "both") &&
        selectedTalent === "emcee" &&
        !value.trim()
      ) {
        return "Languages are required";
      }
      return "";

    default:
      return "";
  }
};
