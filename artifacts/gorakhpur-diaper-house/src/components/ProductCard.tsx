import { useState } from "react";
import { Product } from "../data/products";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";
import { ShoppingCart, Ruler } from "lucide-react";

const DIAPER_SIZES: Record<string, string[]> = {
  "Baby Diapers": ["NB", "S", "M", "L", "XL", "XXL"],
  "Adult Diapers": ["M", "L", "XL", "XXL"],
};

function isDiaperCategory(category: string): boolean {
  return category in DIAPER_SIZES;
}

function getSizePrice(product: Product, size: string): number {
  const sz = product.sizes?.find(s => s.size === size);
  return sz ? sz.price : product.price;
}

function getSizeOldPrice(product: Product, size: string): number {
  const sz = product.sizes?.find(s => s.size === size);
  return sz ? sz.oldPrice : product.oldPrice;
}

const BADGE_STYLES: Record<string, string> = {
  "Best Seller": "bg-amber-50 text-amber-700 border border-amber-200",
  "New Arrival": "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Sale":        "bg-[#FDE8ED] text-[#E8547A] border border-[#F4A0B0]/40",
  "Top Pick":    "bg-indigo-50 text-indigo-700 border border-indigo-200",
};

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, setIsCartOpen } = useAppContext();
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeWarning, setSizeWarning] = useState(false);

  const hasCustomSizes = (product.sizes?.length ?? 0) > 0;
  const isDialer = hasCustomSizes || isDiaperCategory(product.category);
  const sizes = hasCustomSizes
    ? product.sizes!.map(s => s.size)
    : (DIAPER_SIZES[product.category] ?? []);
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

  const cardBg = product.cardBg || "#FDE8ED";

  return (
    <>
      <div
        className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#E8547A]/12 hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-[#F4A0B0]/15 hover:border-[#F4A0B0]/30"
        data-testid={`card-product-${product.id}`}
      >
        {/* ── Image / Emoji Area ── */}
        <div
          className="relative h-48 flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${cardBg}ee 0%, ${cardBg}99 60%, ${cardBg}55 100%)`,
          }}
        >
          {/* Subtle inner shine */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/5" />

          {/* Badge (top-left) */}
          {product.badge && (
            <span className={`absolute top-3 left-3 z-10 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${badgeStyle}`}>
              {product.badge}
            </span>
          )}

          {/* Discount pill (top-right) */}
          {savePct > 0 && (
            <span className="absolute top-3 right-3 z-10 text-[11px] font-black px-2.5 py-1 rounded-full bg-gradient-to-r from-[#E8547A] to-[#C2185B] text-white shadow-sm">
              -{savePct}%
            </span>
          )}

          {/* Central emoji */}
          <span className="relative z-10 text-7xl leading-none select-none drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
            {product.emoji}
          </span>
        </div>

        {/* ── Card Body ── */}
        <div className="flex flex-col flex-1 p-5">
          <p className="text-[10px] font-bold text-[#E8547A] uppercase tracking-widest mb-1">
            {product.brand}
          </p>
          <h3 className="font-bold text-[#1A0E14] text-sm leading-snug mb-3 line-clamp-2 flex-1">
            {product.name}
          </h3>

          {/* Stars */}
          <div className="flex items-center gap-0.5 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-[10px] text-[#7B5970] ml-1.5 font-semibold">{product.rating}</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-black text-[#1A0E14]">₹{product.price}</span>
            {product.oldPrice > product.price && (
              <span className="text-xs text-[#7B5970] line-through font-medium">₹{product.oldPrice}</span>
            )}
          </div>

          {/* CTA Button */}
          <button
            data-testid={`button-add-to-cart-${product.id}`}
            onClick={handleAddToCartClick}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-[#E8547A] to-[#C2185B] text-white font-bold text-sm flex items-center justify-center gap-2 hover:from-[#D43D63] hover:to-[#AD1457] hover:shadow-lg hover:shadow-[#E8547A]/30 active:scale-95 transition-all duration-200"
          >
            {isDialer
              ? <><Ruler className="w-4 h-4" /> Select Size</>
              : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
            }
          </button>
        </div>
      </div>

      {/* ── Size Selector Modal ── */}
      <Dialog open={sizeModalOpen} onOpenChange={setSizeModalOpen}>
        <DialogContent className="max-w-xs rounded-3xl bg-white border-[#F4A0B0]/25 p-6 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-[#1A0E14] text-xl text-center">
              Choose Your Size
            </DialogTitle>
          </DialogHeader>

          <div className="text-center mt-1 mb-5">
            <span className="text-4xl">{product.emoji}</span>
            <p className="text-sm font-bold text-[#1A0E14] mt-2">{product.name}</p>
            <p className="text-xs text-[#7B5970] mt-0.5">{product.category}</p>
          </div>

          <div className={`grid gap-2.5 mb-4 ${hasCustomSizes ? "grid-cols-2" : "grid-cols-3"}`} data-testid="size-selector-grid">
            {sizes.map(size => (
              <button
                key={size}
                data-testid={`button-size-${size}`}
                onClick={() => { setSelectedSize(size); setSizeWarning(false); }}
                className={`py-3 px-3 rounded-2xl border-2 transition-all duration-150 flex flex-col items-center gap-0.5
                  ${selectedSize === size
                    ? "bg-gradient-to-br from-[#E8547A] to-[#C2185B] border-transparent text-white shadow-md shadow-[#E8547A]/30"
                    : "bg-white border-[#F4A0B0]/40 text-[#1A0E14] hover:border-[#F4A0B0] hover:bg-[#FDE8ED]"
                  }`}
              >
                <span className="text-sm font-bold">{size}</span>
                {hasCustomSizes && (
                  <span className={`text-xs font-semibold ${selectedSize === size ? "text-white/85" : "text-[#E8547A]"}`}>
                    ₹{getSizePrice(product, size)}
                  </span>
                )}
              </button>
            ))}
          </div>

          {sizeWarning && (
            <p
              data-testid="text-size-warning"
              className="text-xs text-[#E8547A] text-center font-semibold mb-3 bg-[#FDE8ED] py-2 rounded-xl"
            >
              Please select a size first
            </p>
          )}

          {selectedSize && hasCustomSizes && (
            <div className="flex items-baseline justify-between mb-3 px-1 py-2 bg-[#FFF8FA] rounded-xl">
              <span className="text-sm text-[#7B5970] font-medium">Size {selectedSize}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-[#1A0E14]">₹{getSizePrice(product, selectedSize)}</span>
                {getSizeOldPrice(product, selectedSize) > getSizePrice(product, selectedSize) && (
                  <span className="text-xs text-[#7B5970] line-through">₹{getSizeOldPrice(product, selectedSize)}</span>
                )}
              </div>
            </div>
          )}

          <button
            data-testid="button-confirm-size"
            onClick={handleConfirmSize}
            className="w-full h-13 bg-gradient-to-r from-[#E8547A] to-[#C2185B] text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:from-[#D43D63] hover:to-[#AD1457] hover:shadow-lg hover:shadow-[#E8547A]/30 active:scale-95 transition-all duration-200 text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            {selectedSize ? `Add to Cart — Size ${selectedSize}` : "Add to Cart"}
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
