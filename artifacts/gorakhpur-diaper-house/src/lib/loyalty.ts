export interface LoyaltySettings {
  signupPoints: number;
  referralPoints: number;
  referrerPoints: number;
  pointsMode: "per_rupee" | "per_order";
  rupeesPerPoint: number;
  pointsPerOrder: number;
  silverDiscount: number;
  goldThreshold: number;
  goldDiscount: number;
  platinumThreshold: number;
  platinumDiscount: number;
}

export const DEFAULT_LOYALTY_SETTINGS: LoyaltySettings = {
  signupPoints: 50,
  referralPoints: 20,
  referrerPoints: 50,
  pointsMode: "per_rupee",
  rupeesPerPoint: 10,
  pointsPerOrder: 10,
  silverDiscount: 5,
  goldThreshold: 500,
  goldDiscount: 10,
  platinumThreshold: 1500,
  platinumDiscount: 15,
};

export interface TierInfo {
  name: string;
  emoji: string;
  discount: number;
  nextTierPoints: number | null;
}

export function getTier(points: number, s: LoyaltySettings = DEFAULT_LOYALTY_SETTINGS): TierInfo {
  if (points >= s.platinumThreshold) {
    return { name: "Platinum", emoji: "🥇", discount: s.platinumDiscount, nextTierPoints: null };
  } else if (points >= s.goldThreshold) {
    return { name: "Gold", emoji: "🥈", discount: s.goldDiscount, nextTierPoints: s.platinumThreshold };
  } else {
    return { name: "Silver", emoji: "🥉", discount: s.silverDiscount, nextTierPoints: s.goldThreshold };
  }
}

export function calculatePoints(amount: number, s: LoyaltySettings = DEFAULT_LOYALTY_SETTINGS): number {
  if (s.pointsMode === "per_order") return s.pointsPerOrder;
  return Math.floor(amount / s.rupeesPerPoint);
}
