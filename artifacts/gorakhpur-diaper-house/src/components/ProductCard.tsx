import { Product } from "../data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";
import { Star } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, setIsCartOpen } = useAppContext();

  const handleAddToCart = () => {
    addToCart(product.id);
    toast.success("Added to cart!");
    setIsCartOpen(true);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-border hover:shadow-md transition-all duration-300">
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

        <div className="mt-auto flex items-end justify-between">
          <div>
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
        </div>

        <Button 
          onClick={handleAddToCart}
          className="w-full mt-4 bg-[#E8547A] hover:bg-[#D43D63] text-white font-bold h-11 rounded-xl"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
