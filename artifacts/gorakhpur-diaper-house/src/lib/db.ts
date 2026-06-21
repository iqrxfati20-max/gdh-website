import { Product, SizePricing } from "../data/products";
import { LoyaltySettings } from "./loyalty";

export function productToDb(p: Product) {
  return {
    id: p.id,
    emoji: p.emoji,
    name: p.name,
    brand: p.brand,
    category: p.category,
    price: p.price,
    old_price: p.oldPrice,
    badge: p.badge,
    rating: p.rating,
    card_bg: p.cardBg,
    stock: p.stock,
    sizes: p.sizes ?? [],
  };
}

export function dbToProduct(row: Record<string, unknown>): Product {
  return {
    id: Number(row.id),
    emoji: String(row.emoji ?? "📦"),
    name: String(row.name ?? ""),
    brand: String(row.brand ?? ""),
    category: String(row.category ?? "Baby Diapers"),
    price: Number(row.price ?? 0),
    oldPrice: Number(row.old_price ?? 0),
    badge: String(row.badge ?? ""),
    rating: Number(row.rating ?? 4.5),
    cardBg: String(row.card_bg ?? "#FFFFFF"),
    stock: Number(row.stock ?? 0),
    sizes: Array.isArray(row.sizes) ? (row.sizes as SizePricing[]) : [],
  };
}

export function loyaltyToDb(s: LoyaltySettings) {
  return {
    id: "default",
    signup_points: s.signupPoints,
    referral_points: s.referralPoints,
    referrer_points: s.referrerPoints,
    points_mode: s.pointsMode,
    rupees_per_point: s.rupeesPerPoint,
    points_per_order: s.pointsPerOrder,
    silver_discount: s.silverDiscount,
    gold_threshold: s.goldThreshold,
    gold_discount: s.goldDiscount,
    platinum_threshold: s.platinumThreshold,
    platinum_discount: s.platinumDiscount,
    updated_at: new Date().toISOString(),
  };
}

export function dbToLoyalty(row: Record<string, unknown>): LoyaltySettings {
  return {
    signupPoints: Number(row.signup_points ?? 50),
    referralPoints: Number(row.referral_points ?? 20),
    referrerPoints: Number(row.referrer_points ?? 50),
    pointsMode:
      (row.points_mode as "per_rupee" | "per_order") ?? "per_rupee",
    rupeesPerPoint: Number(row.rupees_per_point ?? 10),
    pointsPerOrder: Number(row.points_per_order ?? 10),
    silverDiscount: Number(row.silver_discount ?? 5),
    goldThreshold: Number(row.gold_threshold ?? 500),
    goldDiscount: Number(row.gold_discount ?? 10),
    platinumThreshold: Number(row.platinum_threshold ?? 1500),
    platinumDiscount: Number(row.platinum_discount ?? 15),
  };
}
