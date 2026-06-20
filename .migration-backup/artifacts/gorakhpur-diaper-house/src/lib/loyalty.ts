export interface TierInfo {
  name: string;
  emoji: string;
  discount: number;
  nextTierPoints: number | null;
}

export function getTier(points: number): TierInfo {
  if (points >= 1500) {
    return { name: "Platinum", emoji: "🥇", discount: 15, nextTierPoints: null };
  } else if (points >= 500) {
    return { name: "Gold", emoji: "🥈", discount: 10, nextTierPoints: 1500 };
  } else {
    return { name: "Silver", emoji: "🥉", discount: 5, nextTierPoints: 500 };
  }
}

export function calculatePoints(amount: number): number {
  return Math.floor(amount / 10);
}
