import { useState } from "react";
import { Product } from "../data/products";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";

const DIAPER_SIZES: Record<string, string[]> = {
  "Baby Diapers": ["NB", "S", "M", "L", "XL", "XXL"],
  "Adult Diapers": ["M", "L", "XL", "XXL"],
};

function isDiaperCategory(category: string): boolean {
  return category in DIAPER_SIZES;
}

const BADGE_STYLES: Record<string, string> = {
  "Best Seller": "bg-[#FFF3E0] text-[#B45309]",
  "New Arrival": "bg-[#ECFDF5] text-[#065F46]",
  "Sale":        "bg-[#FDE8ED] text-[#E8547A]",
  "Top Pick":    "bg-[#EEF2FF] text-[#4338CA]",
};

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, setIsCartOpen } = useAppContext();
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeWarning, setSizeWarning] = useState(false);

  const isDialer = isDiaperCategory(product.category);
  const sizes = DIAPER_SIZES[product.category] ?? [];
  const badgeStyle = product.badge ? (BADGE_STYLES[product.badge] ?? "bg-[#F3F4F6] text-[#6B7280]") : "";
  const savePct = product.oldPrice > product.price
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

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
    toast.success(`Added to cart — Size ${selectedSize}`);
    setSizeModalOpen(false);
    setIsCartOpen(true);
  };

  return (
    <>
      <div
        className="group flex flex-col bg-white border border-[#F4A0B0]/20 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(232,84,122,0.12)] hover:-translate-y-1.5 transition-all duration-250 cursor-pointer"
        data-testid={`card-product-${product.id}`}
      >
        {/* Emoji on light-pink circle */}
        <div className="relative flex items-center justify-center pt-8 pb-6 bg-white">
          {/* Subtle decorative circle behind emoji */}
          <div className="absolute w-28 h-28 rounded-full bg-[#FDE8ED]" />

          {product.badge && (
            <span className={`absolute top-3 left-3 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeStyle}`}>
              {product.badge}
            </span>
          )}
          {savePct > 0 && (
            <span className="absolute top-3 right-3 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8547A] text-white">
              -{savePct}%
            </span>
          )}

          <span className="relative z-10 text-6xl group-hover:scale-110 transition-transform duration-300 select-none leading-none">
            {product.emoji}
          </span>
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 px-5 pt-3 pb-5">
          <p className="text-[10px] font-bold text-[#8A7070] uppercase tracking-widest mb-1">
            {product.brand}
          </p>
          <h3 className="font-bold text-[#5C3D2E] text-sm leading-snug mb-3 line-clamp-2 flex-1">
            {product.name}
          </h3>

          {/* Stars */}
          <div className="flex items-center gap-0.5 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-[#E5E7EB] text-[#E5E7EB]"}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-[10px] text-[#8A7070] ml-1 font-semibold">{product.rating}</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xl font-black text-[#5C3D2E]">₹{product.price}</span>
            {product.oldPrice > product.price && (
              <span className="text-xs text-[#8A7070] line-through">₹{product.oldPrice}</span>
            )}
          </div>

          {/* Add to Cart */}
          <Button
            data-testid={`button-add-to-cart-${product.id}`}
            onClick={handleAddToCartClick}
            className="w-full h-10 rounded-xl bg-[#F4A0B0] hover:bg-[#E8547A] text-white font-bold text-sm transition-colors"
          >
            {isDialer ? "Select Size" : "Add to Cart"}
          </Button>
        </div>
      </div>

      {/* Size Selector Modal */}
      <Dialog open={sizeModalOpen} onOpenChange={setSizeModalOpen}>
        <DialogContent className="max-w-xs rounded-2xl bg-white border-[#F4A0B0]/30 p-6">
          <DialogHeader>
            <DialogTitle className="font-heading text-[#5C3D2E] text-xl text-center">
              Choose Size
            </DialogTitle>
          </DialogHeader>

          <div className="text-center mt-1 mb-4">
            <p className="text-sm font-bold text-[#5C3D2E]">{product.name}</p>
            <p className="text-xs text-[#8A7070] mt-0.5">{product.category}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4" data-testid="size-selector-grid">
            {sizes.map(size => (
              <button
                key={size}
                data-testid={`button-size-${size}`}
                onClick={() => { setSelectedSize(size); setSizeWarning(false); }}
                className={`py-3 rounded-xl text-sm font-bold border-2 transition-all duration-150
                  ${selectedSize === size
                    ? "bg-[#E8547A] border-[#E8547A] text-white shadow-sm"
                    : "bg-white border-[#F4A0B0]/40 text-[#5C3D2E] hover:border-[#F4A0B0] hover:bg-[#FDE8ED]"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>

          {sizeWarning && (
            <p
              data-testid="text-size-warning"
              className="text-xs text-[#E8547A] text-center font-semibold mb-3 bg-[#FDE8ED] py-2 rounded-lg"
            >
              Please select a size first
            </p>
          )}

          <Button
            data-testid="button-confirm-size"
            onClick={handleConfirmSize}
            className="w-full h-12 bg-[#E8547A] hover:bg-[#D43D63] text-white font-bold rounded-xl"
          >
            {selectedSize ? `Add to Cart — Size ${selectedSize}` : "Add to Cart"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
