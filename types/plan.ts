// types/plan.ts
export type TalentType =
  | "deejay"
  | "emcee"
  | "vocalist"
  | "instrumentalist"
  | "all";

export type TierStatus = "free" | "starter" | "pro" | "elite";

export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  recommended?: boolean;
  forUserType: "musician" | "client" | "dual";
  talentTypes?: TalentType[];
  tier: TierStatus; // Added tier status
}

export interface Subscription {
  id: string;
  planId: string;
  userId: string;
  status?: "active" | "canceled" | "expired" | "pending";
  startDate: number;
  nextBillingDate: number; // Added next billing date
  autoRenew: boolean;
  talentType?: TalentType;
  tier: TierStatus; // Added tier status
}

export interface MpesaPaymentRequest {
  phoneNumber: string;
  amount: number;
  planId: string;
  talentType?: TalentType;
}

export interface MpesaPaymentResponse {
  success: boolean;
  message: string;
  transactionCode?: string;
}
