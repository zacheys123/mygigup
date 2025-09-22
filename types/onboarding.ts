export type TalentType =
  | "instrumentalist"
  | "vocalist"
  | "deejay"
  | "emcee"
  | ""
  | undefined;
export type RoleType = "musician" | "client" | "both";
export type GigType = "regular" | "concert" | "function";
export type ExperienceLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "professional";

export interface BaseUserInfo {
  city: string;
  talentBio: string;
}

export interface InstrumentalistInfo extends BaseUserInfo {
  instrument: string;
  yearsExperience: number;
  rates: {
    regular: string;
    concert: string;
    function: string;
  };
}

export interface VocalistInfo extends BaseUserInfo {
  vocalistgenres: string[];
  yearsExperience: number;
  rates: {
    regular: string;
    concert: string;
    function: string;
  };
}

export interface DeejayInfo extends BaseUserInfo {
  djGenre: string[];
  djEquipment: string;
  yearsExperience: number;
  rates: {
    regular: string;
    concert: string;
    function: string;
  };
}

export interface EmceeInfo extends BaseUserInfo {
  mcLanguages: string[];
  mcType: string[];
  yearsExperience: number;
  rates: {
    regular: string;
    concert: string;
    function: string;
  };
}

export interface ClientInfo extends BaseUserInfo {
  organization: string;
}

export interface OnboardingData {
  roleType: RoleType;
  talentType?: TalentType;
  city: string;
  talentbio: string;
  phone: string;
  organization?: string;

  // Instrumentalist
  instrument?: string;

  // Vocalist
  vocalistgenres?: string;

  // DJ
  djGenre?: string;
  djEquipment?: string;

  // Emcee
  mcType?: string;
  mcLanguages?: string;

  // Common for all musicians
  experience?: string; // Single experience field for everyone
}
