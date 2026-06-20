export interface OrderItem {
  productId: number;
  qty: number;
}

export interface Order {
  id: string;
  customer: string;
  phone: string;
  items: OrderItem[];
  total: number;
  payment: string;
  status: string;
  referralUsed: string;
  date: string;
}

export const initialOrders: Order[] = [
  { id: "GDH001", customer: "Priya Sharma", phone: "9876543210", items: [{productId: 1, qty: 2}], total: 898, payment: "COD", status: "Delivered", referralUsed: "", date: "2025-01-10" },
  { id: "GDH002", customer: "Riya Singh", phone: "8765432109", items: [{productId: 2, qty: 1}], total: 549, payment: "UPI", status: "Processing", referralUsed: "", date: "2025-01-12" },
  { id: "GDH003", customer: "Anjali Gupta", phone: "7654321098", items: [{productId: 7, qty: 3}], total: 447, payment: "COD", status: "Shipped", referralUsed: "GDH-PRIYA-1234", date: "2025-01-15" },
];