import { useAppContext, cartItemKey } from "../context/AppContext";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CheckoutModal } from "./CheckoutModal";
import { useState } from "react";

export function CartSidebar() {
  const { cart, products, isCartOpen, setIsCartOpen, updateCartQty, removeFromCart } = useAppContext();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product !== undefined) as (typeof cart[0] & { product: NonNullable<ReturnType<typeof products.find>> })[];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.qty), 0);

  const handleWhatsAppOrder = () => {
    const lines = cartItems.map(item => {
      const sizePart = item.size ? ` (Size: ${item.size})` : "";
      return `- ${item.product.name}${sizePart} x${item.qty} = ₹${item.product.price * item.qty}`;
    });
    const text = `Hi Gorakhpur Diaper House!\n\nI want to order:\n${lines.join('\n')}\n\nTotal: ₹${subtotal}\n\nPlease let me know the delivery details.`;
    const url = `https://wa.me/919169111557?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md bg-[#FFFAF8] flex flex-col p-0 border-l-[#F4A0B0]/30">
        <div className="p-6 pb-4 border-b border-border/50">
          <SheetHeader>
            <SheetTitle className="font-heading text-2xl text-[#5C3D2E] flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-[#E8547A]" />
              Your Cart
            </SheetTitle>
          </SheetHeader>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <span className="text-6xl mb-4 opacity-50">🛒</span>
            <h3 className="font-bold text-xl text-[#5C3D2E] mb-2">Cart is empty</h3>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
            <Button
              onClick={() => { setIsCartOpen(false); window.location.href = '/products'; }}
              className="bg-[#E8547A] hover:bg-[#D43D63] text-white rounded-xl h-11 px-8 font-bold"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {cartItems.map(item => (
                <div
                  key={cartItemKey(item)}
                  className="flex gap-4 bg-white p-3 rounded-2xl border border-border shadow-sm"
                  data-testid={`card-cart-item-${cartItemKey(item)}`}
                >
                  <div
                    className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl shrink-0"
                    style={{ backgroundColor: item.product.cardBg }}
                  >
                    {item.product.emoji}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h4 className="font-bold text-sm leading-tight text-foreground mb-0.5 line-clamp-2">
                      {item.product.name}
                    </h4>
                    {item.size && (
                      <span
                        className="text-xs font-semibold text-[#E8547A] bg-[#FDE8ED] px-2 py-0.5 rounded-full self-start mb-1"
                        data-testid={`text-cart-size-${cartItemKey(item)}`}
                      >
                        Size: {item.size}
                      </span>
                    )}
                    <span className="font-black text-primary mb-auto">₹{item.product.price}</span>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-md hover:bg-white hover:shadow-sm text-foreground"
                          data-testid={`button-decrease-qty-${cartItemKey(item)}`}
                          onClick={() => updateCartQty(item.productId, item.qty - 1, item.size)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span
                          className="w-6 text-center text-xs font-bold"
                          data-testid={`text-qty-${cartItemKey(item)}`}
                        >
                          {item.qty}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-md hover:bg-white hover:shadow-sm text-foreground"
                          data-testid={`button-increase-qty-${cartItemKey(item)}`}
                          onClick={() => updateCartQty(item.productId, item.qty + 1, item.size)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                        data-testid={`button-remove-${cartItemKey(item)}`}
                        onClick={() => removeFromCart(item.productId, item.size)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border/50 bg-white p-6 pb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground font-medium">Subtotal</span>
                <span className="font-bold">₹{subtotal}</span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-muted-foreground font-medium">Delivery</span>
                <span className="font-bold text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded text-xs uppercase tracking-wider">Free in Gorakhpur</span>
              </div>
              <div className="flex items-center justify-between mb-6 text-xl">
                <span className="font-black text-[#5C3D2E]">Grand Total</span>
                <span className="font-black text-primary">₹{subtotal}</span>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  className="w-full bg-[#E8547A] hover:bg-[#D43D63] text-white font-bold h-12 rounded-xl text-lg shadow-sm"
                  data-testid="button-proceed-to-order"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                >
                  Proceed to Order
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-[#25D366]/5 hover:bg-[#25D366] text-[#25D366] hover:text-white border-[#25D366]/20 font-bold h-12 rounded-xl text-base transition-colors"
                  data-testid="button-whatsapp-order"
                  onClick={handleWhatsAppOrder}
                >
                  Order via WhatsApp
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>

      <CheckoutModal
        open={isCheckoutOpen}
        onOpenChange={setIsCheckoutOpen}
        subtotal={subtotal}
      />
    </Sheet>
  );
}
