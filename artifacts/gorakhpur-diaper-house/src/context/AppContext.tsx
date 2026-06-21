import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, initialProducts } from "../data/products";
import { Customer, initialCustomers } from "../data/customers";
import { Order } from "../data/orders";
import { supabase } from "../lib/supabase";
import { LoyaltySettings, DEFAULT_LOYALTY_SETTINGS } from "../lib/loyalty";
import { dbToProduct, dbToLoyalty } from "../lib/db";

export interface CartItem {
  productId: number;
  qty: number;
  size?: string;
}

export function cartItemKey(item: CartItem): string {
  return `${item.productId}_${item.size ?? ""}`;
}

interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  cart: CartItem[];
  addToCart: (productId: number, qty?: number, size?: string) => void;
  removeFromCart: (productId: number, size?: string) => void;
  updateCartQty: (productId: number, qty: number, size?: string) => void;
  clearCart: () => void;
  currentCustomer: Customer | null;
  setCurrentCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loyaltySettings: LoyaltySettings;
  setLoyaltySettings: React.Dispatch<React.SetStateAction<LoyaltySettings>>;
  setupRequired: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("gdh_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(() => {
    const saved = localStorage.getItem("gdh_current_customer");
    return saved ? JSON.parse(saved) : null;
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loyaltySettings, setLoyaltySettings] = useState<LoyaltySettings>(() => {
    const saved = localStorage.getItem("gdh_loyalty_settings");
    return saved ? { ...DEFAULT_LOYALTY_SETTINGS, ...JSON.parse(saved) } : DEFAULT_LOYALTY_SETTINGS;
  });
  const [setupRequired, setSetupRequired] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchLoyaltySettings();
  }, []);

  useEffect(() => {
    localStorage.setItem("gdh_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (currentCustomer) {
      localStorage.setItem("gdh_current_customer", JSON.stringify(currentCustomer));
    } else {
      localStorage.removeItem("gdh_current_customer");
    }
  }, [currentCustomer]);

  useEffect(() => {
    localStorage.setItem("gdh_loyalty_settings", JSON.stringify(loyaltySettings));
  }, [loyaltySettings]);

  async function fetchProducts() {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });
    if (error) {
      if (error.code === "42P01") setSetupRequired(true);
      console.warn("[Products] Supabase error:", error.message);
      return;
    }
    if (data && data.length > 0) {
      setProducts(data.map(row => dbToProduct(row as Record<string, unknown>)));
    }
  }

  async function fetchOrders() {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      const mapped = data.map((row: Record<string, unknown>) => ({
        id: String(row.id),
        customer: String(row.customer ?? ""),
        phone: String(row.phone ?? ""),
        items: typeof row.items === "string" ? JSON.parse(row.items as string) : row.items,
        total: Number(row.total ?? 0),
        payment: String(row.payment ?? ""),
        status: String(row.status ?? "Processing"),
        referralUsed: String(row.referral_used ?? row.referralUsed ?? ""),
        date: row.created_at
          ? (row.created_at as string).split("T")[0]
          : String(row.date ?? ""),
        address: String(row.address ?? ""),
        pincode: String(row.pincode ?? ""),
        notes: String(row.notes ?? ""),
      }));
      setOrders(mapped as Order[]);
    }
  }

  async function fetchLoyaltySettings() {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("loyalty_settings")
      .select("*")
      .eq("id", "default")
      .single();
    if (error) {
      console.warn("[Loyalty] Supabase error:", error.message);
      return;
    }
    if (data) {
      const settings = dbToLoyalty(data as Record<string, unknown>);
      setLoyaltySettings(settings);
      localStorage.setItem("gdh_loyalty_settings", JSON.stringify(settings));
    }
  }

  const addToCart = (productId: number, qty = 1, size?: string) => {
    setCart(prev => {
      const existing = prev.find(
        item => item.productId === productId && item.size === size
      );
      if (existing) {
        return prev.map(item =>
          item.productId === productId && item.size === size
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { productId, qty, size }];
    });
  };

  const removeFromCart = (productId: number, size?: string) => {
    setCart(prev =>
      prev.filter(item => !(item.productId === productId && item.size === size))
    );
  };

  const updateCartQty = (productId: number, qty: number, size?: string) => {
    if (qty <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.productId === productId && item.size === size
          ? { ...item, qty }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{
      products, setProducts,
      customers, setCustomers,
      orders, setOrders,
      cart, addToCart, removeFromCart, updateCartQty, clearCart,
      currentCustomer, setCurrentCustomer,
      isCartOpen, setIsCartOpen,
      loyaltySettings, setLoyaltySettings,
      setupRequired,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
