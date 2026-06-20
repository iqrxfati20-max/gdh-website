export interface PointsHistoryEntry {
  date: string;
  desc: string;
  points: number;
}

export interface Customer {
  id: number;
  name: string;
  mobile: string;
  referralCode: string;
  points: number;
  tier: string;
  referredBy: string | null;
  referralCount: number;
  totalSpent: number;
  orderCount: number;
  pointsHistory: PointsHistoryEntry[];
}

export const initialCustomers: Customer[] = [
  { id: 1, name: "Priya Sharma", mobile: "9876543210", referralCode: "GDH-PRIYA-1234", points: 320, tier: "Silver", referredBy: null, referralCount: 2, totalSpent: 3200, orderCount: 4, pointsHistory: [
    { date: "2025-01-10", desc: "Purchase - GDH001", points: 90 },
    { date: "2025-01-15", desc: "Referral Bonus", points: 50 },
    { date: "2025-01-20", desc: "Purchase - GDH005", points: 180 },
  ]},
  { id: 2, name: "Riya Singh", mobile: "8765432109", referralCode: "GDH-RIYA-5678", points: 680, tier: "Gold", referredBy: null, referralCount: 1, totalSpent: 6800, orderCount: 7, pointsHistory: [
    { date: "2025-01-05", desc: "Purchase - GDH002", points: 55 },
    { date: "2025-01-12", desc: "Referral Bonus", points: 50 },
    { date: "2025-01-18", desc: "Purchase - GDH003", points: 45 },
    { date: "2025-01-25", desc: "Purchase - GDH004", points: 200 },
    { date: "2025-02-01", desc: "Purchase", points: 330 },
  ]},
];