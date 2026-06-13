import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, initialProducts } from "../data/products";
import { Customer, initialCustomers } from "../data/customers";
import { Order, initialOrders } from "../data/orders";

export interface CartItem {
  productId: number;
  qty: number;
}

interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  cart: CartItem[];
  addToCart: (productId: number, qty?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQty: (productId: number, qty: number) => void;
  clearCart: () => void;
  currentCustomer: Customer | null;
  setCurrentCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("gdh_products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem("gdh_customers");
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("gdh_orders");
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("gdh_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(() => {
    const saved = localStorage.getItem("gdh_current_customer");
    return saved ? JSON.parse(saved) : null;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("gdh_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("gdh_customers", JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem("gdh_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("gdh_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (currentCustomer) {
      localStorage.setItem("gdh_current_customer", JSON.stringify(currentCustomer));
      // sync current customer with customers array
      setCustomers(prev => prev.map(c => c.id === currentCustomer.id ? currentCustomer : c));
    } else {
      localStorage.removeItem("gdh_current_customer");
    }
  }, [currentCustomer]);

  const addToCart = (productId: number, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item => item.productId === productId ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { productId, qty }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateCartQty = (productId: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.productId === productId ? { ...item, qty } : item));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{
      products, setProducts,
      customers, setCustomers,
      orders, setOrders,
      cart, addToCart, removeFromCart, updateCartQty, clearCart,
      currentCustomer, setCurrentCustomer,
      isCartOpen, setIsCartOpen
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
