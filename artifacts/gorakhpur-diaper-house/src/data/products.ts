export interface Product {
  id: number;
  emoji: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice: number;
  badge: string;
  rating: number;
  cardBg: string;
  stock: number;
}

export const initialProducts: Product[] = [
  { id: 1, emoji: "👶", name: "Pampers New Born (S)", brand: "Pampers", category: "Baby Diapers", price: 449, oldPrice: 599, badge: "Best Seller", rating: 4.8, cardBg: "#FDE8ED", stock: 50 },
  { id: 2, emoji: "✨", name: "Huggies Wonder Pants (L)", brand: "Huggies", category: "Baby Diapers", price: 549, oldPrice: 699, badge: "Top Pick", rating: 4.7, cardBg: "#E8F4FD", stock: 40 },
  { id: 3, emoji: "🌸", name: "MamyPoko Pants (XL)", brand: "MamyPoko", category: "Baby Diapers", price: 399, oldPrice: 499, badge: "Sale", rating: 4.6, cardBg: "#F3E8FD", stock: 35 },
  { id: 4, emoji: "🏥", name: "Friends Adult Diaper (L)", brand: "Friends", category: "Adult Diapers", price: 349, oldPrice: 429, badge: "Best Seller", rating: 4.5, cardBg: "#E8FDF0", stock: 30 },
  { id: 5, emoji: "🧻", name: "Johnsons Baby Wipes", brand: "Johnson's", category: "Baby Wipes", price: 199, oldPrice: 249, badge: "New Arrival", rating: 4.9, cardBg: "#FDFDE8", stock: 60 },
  { id: 6, emoji: "🌺", name: "Stayfree Pads XL", brand: "Stayfree", category: "Sanitary Pads", price: 89, oldPrice: 110, badge: "", rating: 4.4, cardBg: "#F3E8FD", stock: 80 },
  { id: 7, emoji: "🌿", name: "Himalaya Rash Cream", brand: "Himalaya", category: "Rash Cream", price: 149, oldPrice: 179, badge: "Best Seller", rating: 4.8, cardBg: "#E8FDF0", stock: 45 },
  { id: 8, emoji: "💧", name: "Johnsons Baby Lotion", brand: "Johnson's", category: "Baby Lotion", price: 249, oldPrice: 299, badge: "", rating: 4.7, cardBg: "#E8F4FD", stock: 55 },
  { id: 9, emoji: "☁️", name: "Johnsons Baby Powder", brand: "Johnson's", category: "Baby Powder", price: 189, oldPrice: 220, badge: "", rating: 4.6, cardBg: "#FDFDE8", stock: 50 },
  { id: 10, emoji: "🌻", name: "Dabur Baby Massage Oil", brand: "Dabur", category: "Baby Oil", price: 175, oldPrice: 210, badge: "New Arrival", rating: 4.5, cardBg: "#FDE8ED", stock: 40 },
];