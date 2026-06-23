import { useState, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { ProductCard } from "../components/ProductCard";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Search, SlidersHorizontal } from "lucide-react";

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
  "Baby Shampoo",
];

export default function Products() {
  const { products } = useAppContext();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-[#FFF8FA] to-white">

      {/* Page header */}
      <div className="bg-gradient-to-br from-[#FFF0F5] via-[#FFF5F8] to-[#FFE8F0] border-b border-[#F4A0B0]/15 py-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-1">
            <span className="inline-block text-[11px] font-bold text-[#E8547A] tracking-widest uppercase bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full mb-3 border border-[#F4A0B0]/30">
              Our Products
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-[#1A0E14] mb-1">
            Shop Baby Care
          </h1>
          <p className="text-[#7B5970] font-medium text-sm mt-1">
            {products.length} products · All 100% original &amp; branded
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-8">

        {/* Search + filter header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B5970]/50 h-4.5 w-4.5" />
            <Input
              placeholder="Search by product or brand..."
              className="pl-11 h-12 rounded-2xl text-sm border-[#F4A0B0]/30 bg-white shadow-sm focus-visible:ring-[#E8547A]/30 focus-visible:border-[#E8547A]/40 placeholder:text-[#7B5970]/40 font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {(search || activeCategory !== "All") && (
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="h-12 px-4 rounded-2xl border border-[#F4A0B0]/30 bg-white text-[#7B5970] font-semibold text-sm hover:bg-[#FDE8ED] hover:text-[#E8547A] hover:border-[#F4A0B0]/50 transition-all whitespace-nowrap flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        {/* Category pills */}
        <ScrollArea className="w-full pb-3 mb-8">
          <div className="flex w-max gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`h-10 px-5 rounded-full font-bold text-sm transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[#E8547A] to-[#C2185B] text-white shadow-md shadow-[#E8547A]/25 -translate-y-0.5"
                    : "bg-white text-[#7B5970] border border-[#F4A0B0]/30 hover:bg-[#FDE8ED] hover:text-[#E8547A] hover:border-[#F4A0B0]/50 hover:-translate-y-0.5 shadow-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Results */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 rounded-3xl bg-[#FDE8ED] flex items-center justify-center mb-5">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="font-heading text-2xl text-[#1A0E14] mb-2">No products found</h3>
            <p className="text-[#7B5970] text-sm font-medium mb-6">Try adjusting your search or category filter.</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="h-11 px-6 rounded-full bg-gradient-to-r from-[#E8547A] to-[#C2185B] text-white font-bold text-sm hover:shadow-lg hover:shadow-[#E8547A]/30 transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-[#7B5970] font-medium mb-5">
              Showing <strong className="text-[#1A0E14]">{filteredProducts.length}</strong> products
              {activeCategory !== "All" && <> in <strong className="text-[#E8547A]">{activeCategory}</strong></>}
              {search && <> matching "<strong className="text-[#1A0E14]">{search}</strong>"</>}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
