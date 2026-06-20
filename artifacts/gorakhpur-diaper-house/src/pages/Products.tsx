import { useState, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { ProductCard } from "../components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

const CATEGORIES = [
  "All",
  "Baby Diapers",
  "Adult Diapers",
  "Baby Wipes",
  "Sanitary Pads",
  "Baby Care",
  "Rash Cream",
  "Baby Lotion",
  "Baby Powder",
  "Baby Oil",
  "Baby Soap",
  "Baby Shampoo"
];

export default function Products() {
  const { products } = useAppContext();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                            p.brand.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl min-h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-8 space-y-6">
        <h1 className="font-heading text-4xl text-[#5C3D2E]">Our Products</h1>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input 
            placeholder="Search by product or brand name..." 
            className="pl-10 h-12 rounded-xl text-lg border-primary/20 focus-visible:ring-primary shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex w-max space-x-2">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                className={`rounded-full h-10 px-5 font-bold ${
                  activeCategory === cat 
                    ? "bg-[#E8547A] text-white hover:bg-[#D43D63]" 
                    : "bg-white text-muted-foreground border-border hover:bg-[#FDE8ED] hover:text-[#E8547A]"
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="flex-1">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-6xl mb-4 opacity-50">🔍</span>
            <h3 className="font-bold text-xl text-[#5C3D2E] mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
            <Button 
              variant="outline" 
              className="mt-6 font-bold"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
