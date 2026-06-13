import { useState } from "react";
import { Product } from "../data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";
import { Star } from "lucide-react";

const DIAPER_SIZES: Record<string, string[]> = {
  "Baby Diapers": ["NB", "S", "M", "L", "XL", "XXL"],
  "Adult Diapers": ["M", "L", "XL", "XXL"],
};

function isDiaperCategory(category: string): boolean {
  return category in DIAPER_SIZES;
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, setIsCartOpen } = useAppContext();
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeWarning, setSizeWarning] = useState(false);

  const isDialer = isDiaperCategory(product.category);
  const sizes = DIAPER_SIZES[product.category] ?? [];

  const handleAddToCartClick = () => {
    if (isDialer) {
      setSelectedSize(null);
      setSizeWarning(false);
      setSizeModalOpen(true);
    } else {
      addToCart(product.id);
      toast.success("Added to cart!");
      setIsCartOpen(true);
    }
  };

  const handleConfirmSize = () => {
    if (!selectedSize) {
      setSizeWarning(true);
      return;
    }
    addToCart(product.id, 1, selectedSize);
    toast.success(`Added to cart! — Size: ${selectedSize}`);
    setSizeModalOpen(false);
    setIsCartOpen(true);
  };

  return (
    <>
      <div
        className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-border hover:shadow-md transition-all duration-300"
        data-testid={`card-product-${product.id}`}
      >
        {product.badge && (
          <div className="absolute left-3 top-3 z-10">
            <Badge className="bg-primary/90 hover:bg-primary text-white font-semibold">
              {product.badge}
            </Badge>
          </div>
        )}

        <div
          className="aspect-square flex items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: product.cardBg }}
        >
          <span className="text-8xl transform group-hover:scale-110 transition-transform duration-500">
            {product.emoji}
          </span>
        </div>

        <div className="flex flex-col flex-1 p-5">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
            {product.brand}
          </span>
          <h3 className="font-bold text-foreground text-lg leading-tight mb-2 line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-muted text-muted"}`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-foreground">₹{product.price}</span>
              {product.oldPrice > product.price && (
                <span className="text-sm font-medium text-muted-foreground line-through decoration-muted-foreground/50">
                  ₹{product.oldPrice}
                </span>
              )}
            </div>
            {product.oldPrice > product.price && (
              <p className="text-xs font-bold text-primary mt-0.5">
                Save ₹{product.oldPrice - product.price}!
              </p>
            )}
          </div>

          <Button
            data-testid={`button-add-to-cart-${product.id}`}
            onClick={handleAddToCartClick}
            className="w-full mt-4 bg-[#E8547A] hover:bg-[#D43D63] text-white font-bold h-11 rounded-xl"
          >
            {isDialer ? "Select Size & Add" : "Add to Cart"}
          </Button>
        </div>
      </div>

      <Dialog open={sizeModalOpen} onOpenChange={setSizeModalOpen}>
        <DialogContent className="max-w-sm rounded-2xl bg-[#FFFAF8] border-[#F4A0B0]/40 p-6">
          <DialogHeader>
            <DialogTitle className="font-heading text-[#5C3D2E] text-xl text-center">
              Select Size
            </DialogTitle>
          </DialogHeader>

          <div className="mt-1 text-center">
            <p className="text-sm text-muted-foreground mb-1">{product.name}</p>
            <p className="text-xs text-muted-foreground mb-4">{product.category}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4" data-testid="size-selector-grid">
            {sizes.map(size => (
              <button
                key={size}
                data-testid={`button-size-${size}`}
                onClick={() => {
                  setSelectedSize(size);
                  setSizeWarning(false);
                }}
                className={`
                  py-3 rounded-xl text-sm font-bold border-2 transition-all duration-150
                  ${selectedSize === size
                    ? "bg-[#E8547A] border-[#E8547A] text-white shadow-md scale-105"
                    : "bg-white border-[#F4A0B0] text-[#5C3D2E] hover:border-[#E8547A] hover:bg-[#FDE8ED]"
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>

          {sizeWarning && (
            <p
              data-testid="text-size-warning"
              className="text-xs text-destructive text-center font-medium mb-3 bg-destructive/10 py-2 rounded-lg"
            >
              Please select a size
            </p>
          )}

          <Button
            data-testid="button-confirm-size"
            onClick={handleConfirmSize}
            className="w-full bg-[#E8547A] hover:bg-[#D43D63] text-white font-bold h-12 rounded-xl text-base"
          >
            {selectedSize ? `Add to Cart — Size ${selectedSize}` : "Add to Cart"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
