import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ProductCard } from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";
import { ShopLogo } from "../components/ShopLogo";
import { MapPin, Clock, MessageCircle, Instagram, Truck, BadgeCheck, Tag, Star } from "lucide-react";

export default function Home() {
  const { products } = useAppContext();
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* ─────────────────────────────── HERO ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#FFFAF8] min-h-[560px] flex items-center">
        {/* Soft pink oval blob — top right */}
        <div className="absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full bg-[#F4A0B0]/18 pointer-events-none" />
        {/* Smaller accent blob */}
        <div className="absolute bottom-[60px] right-[20%] w-[160px] h-[160px] rounded-full bg-[#FDE8ED]/60 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT — text */}
          <div className="flex flex-col items-start">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-1.5 text-[#E8547A] text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-4 h-[2px] bg-[#E8547A] rounded-full inline-block" />
              Trusted by 1000+ Moms
            </span>

            <h1 className="font-heading text-[2.75rem] sm:text-6xl md:text-[4rem] leading-[1.08] text-[#5C3D2E] mb-5 tracking-tight">
              Gorakhpur ki<br />
              <span className="text-[#E8547A]">No.1</span> Baby Shop
            </h1>

            <p className="text-[#8A7070] font-semibold text-base mb-8 max-w-[380px] leading-relaxed">
              Original branded diapers, wipes &amp; baby care products. Free delivery anywhere in Gorakhpur city.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/products">
                <Button
                  className="h-13 px-8 rounded-full bg-[#E8547A] hover:bg-[#D43D63] text-white font-bold text-base shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 gap-2"
                  data-testid="button-hero-shop-now"
                >
                  Shop Now
                  <span className="text-lg leading-none">→</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                className="h-13 px-7 rounded-full border-2 border-[#F4A0B0] text-[#5C3D2E] hover:bg-[#FDE8ED] hover:border-[#E8547A] font-bold text-base transition-all"
                onClick={() => window.open("https://wa.me/919876543210", "_blank")}
                data-testid="button-hero-whatsapp"
              >
                WhatsApp Order
              </Button>
            </div>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-6 mt-10">
              {[
                { value: "5.0★", label: "Google Rating" },
                { value: "FREE", label: "Delivery" },
                { value: "1000+", label: "Happy Moms" },
              ].map(s => (
                <div key={s.label}>
                  <p className="font-heading text-2xl text-[#5C3D2E] leading-none">{s.value}</p>
                  <p className="text-[10px] font-bold text-[#8A7070] uppercase tracking-widest mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — decorative illustration */}
          <div className="relative flex items-center justify-center h-[340px] md:h-[420px]">
            {/* Large pale circle */}
            <div className="absolute w-72 h-72 rounded-full bg-[#FDE8ED]/80" />
            {/* Main big emoji */}
            <span className="relative z-10 text-[9rem] leading-none select-none drop-shadow-sm">👶</span>
            {/* Floating accents */}
            <span className="absolute top-8 right-8 text-4xl animate-bounce-slow select-none">🌟</span>
            <span className="absolute bottom-12 left-8 text-3xl select-none opacity-80">🍼</span>
            <span className="absolute top-1/2 right-4 text-2xl select-none opacity-70">💕</span>
            <span className="absolute top-6 left-14 text-3xl select-none opacity-60">✨</span>
            {/* Small product bubbles */}
            <div className="absolute bottom-8 right-14 w-16 h-16 rounded-2xl bg-white shadow-sm border border-[#F4A0B0]/30 flex items-center justify-center text-2xl select-none">
              🧸
            </div>
            <div className="absolute top-14 left-4 w-14 h-14 rounded-2xl bg-white shadow-sm border border-[#F4A0B0]/30 flex items-center justify-center text-xl select-none">
              🧻
            </div>
          </div>
        </div>

        {/* Curved wave divider at bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0,36 C280,72 580,0 860,36 C1080,62 1280,20 1440,36 L1440,72 L0,72 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* ─────────────────────────── WHY US — light pink bg ────────────────── */}
      <section className="py-20 bg-[#FDE8ED]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold text-[#E8547A] tracking-widest uppercase mb-3">Our Promise</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-[#5C3D2E]">Why Choose GDH?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Truck className="w-5 h-5 text-[#E8547A]" />, title: "FREE Delivery", desc: "Fast, free delivery across all of Gorakhpur city." },
              { icon: <BadgeCheck className="w-5 h-5 text-[#E8547A]" />, title: "100% Original", desc: "Every product sourced directly from brands. No fakes." },
              { icon: <Tag className="w-5 h-5 text-[#E8547A]" />, title: "Best Prices", desc: "Wholesale rates for retail customers. Save every time." },
              { icon: <Star className="w-5 h-5 text-[#E8547A] fill-[#E8547A]" />, title: "5★ Rated Shop", desc: "Gorakhpur's highest rated baby store on Google." },
            ].map(card => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-7 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FDE8ED] flex items-center justify-center mb-5">
                  {card.icon}
                </div>
                <h3 className="font-bold text-[#5C3D2E] text-base mb-2">{card.title}</h3>
                <p className="text-[#8A7070] text-xs font-medium leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────── FEATURED PRODUCTS — white bg ────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[10px] font-bold text-[#E8547A] tracking-widest uppercase mb-2">Best Sellers</p>
              <h2 className="font-heading text-4xl sm:text-5xl text-[#5C3D2E]">Top Picks</h2>
            </div>
            <Link href="/products" className="hidden sm:block">
              <Button
                variant="outline"
                className="rounded-full font-bold border-[#F4A0B0]/40 text-[#5C3D2E] hover:bg-[#FDE8ED] hover:border-[#E8547A]/30 transition-all text-sm"
              >
                View All →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/products">
              <Button variant="outline" className="w-full rounded-full font-bold h-12 border-[#F4A0B0]/40">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────── LOYALTY PROGRAM — cream bg ─────────────────── */}
      <section className="py-20 bg-[#FFFAF8]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold text-[#E8547A] tracking-widest uppercase mb-3">Rewards</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-[#5C3D2E] mb-3">GDH Family Rewards</h2>
            <p className="text-[#8A7070] font-semibold text-sm max-w-sm mx-auto leading-relaxed">
              Shop more, earn points, unlock bigger discounts — forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[
              { emoji: "🥉", tier: "Silver", range: "0 – 499 pts", pct: "5%", extra: "Discount on every order", border: "border-[#D1D5DB]", label: "text-[#6B7280]" },
              { emoji: "🥈", tier: "Gold", range: "500 – 1499 pts", pct: "10%", extra: "Discount + Priority Delivery", border: "border-[#F59E0B]/50", label: "text-[#D97706]", featured: true },
              { emoji: "🥇", tier: "Platinum", range: "1500+ pts", pct: "15%", extra: "Discount + Free Gift", border: "border-[#9CA3AF]", label: "text-[#6B7280]" },
            ].map(t => (
              <div
                key={t.tier}
                className={`bg-white border-2 ${t.border} rounded-2xl p-8 text-center hover:-translate-y-1 transition-all duration-200 ${t.featured ? "shadow-md" : "shadow-sm"}`}
              >
                <div className="text-5xl mb-4">{t.emoji}</div>
                <h3 className={`font-heading text-2xl mb-1 ${t.label}`}>{t.tier}</h3>
                <p className="text-[#8A7070] text-xs font-bold mb-5 uppercase tracking-wide">{t.range}</p>
                <div className="text-4xl font-black text-[#E8547A] mb-1">{t.pct}</div>
                <p className="text-xs text-[#8A7070] font-medium">{t.extra}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#FDE8ED] rounded-2xl p-5 text-center">
            <p className="text-[#5C3D2E] font-bold text-sm">
              Earn <span className="text-[#E8547A]">10 points</span> for every ₹100 spent &nbsp;·&nbsp; <span className="text-[#E8547A]">50 points</span> for every referral
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────── CONTACT — light pink bg ────────────────────── */}
      <section className="py-20 bg-[#FDE8ED]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold text-[#E8547A] tracking-widest uppercase mb-3">Find Us</p>
            <h2 className="font-heading text-4xl text-[#5C3D2E]">Visit Our Store</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <MapPin className="w-5 h-5 text-[#E8547A]" />,
                title: "Address",
                content: (
                  <p className="text-[#8A7070] text-xs font-medium leading-relaxed">
                    Rahmat Nagar Chauraha,<br />Near Water Tank, Khoonipur,<br />Sahabganj, Gorakhpur UP 273005
                  </p>
                ),
              },
              {
                icon: <Clock className="w-5 h-5 text-[#E8547A]" />,
                title: "Timing",
                content: (
                  <p className="text-[#8A7070] text-xs font-medium leading-relaxed">
                    Mon – Sat<br />10:00 AM – 8:00 PM<br /><span className="text-[#F4A0B0]">Sunday Closed</span>
                  </p>
                ),
              },
              {
                icon: <MessageCircle className="w-5 h-5 text-[#E8547A]" />,
                title: "WhatsApp",
                content: (
                  <button
                    onClick={() => window.open("https://wa.me/919876543210", "_blank")}
                    className="mt-1 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
                  >
                    Chat Now
                  </button>
                ),
              },
              {
                icon: <Instagram className="w-5 h-5 text-[#E8547A]" />,
                title: "Instagram",
                content: (
                  <a href="#" className="text-[#8A7070] hover:text-[#E8547A] text-xs font-semibold transition-colors">
                    @gorakhpurdiaperhouse
                  </a>
                ),
              },
            ].map(card => (
              <div key={card.title} className="bg-white rounded-2xl p-6 hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#FDE8ED] flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="font-bold text-[#5C3D2E] text-sm mb-2">{card.title}</h3>
                {card.content}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────── FOOTER ─────────────────────────────── */}
      <footer className="bg-[#5C3D2E] text-white py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <ShopLogo height={60} variant="footer" />
              <p className="text-[#FDE8ED]/50 text-xs font-medium max-w-[160px] leading-relaxed">
                Gorakhpur ki No.1 Baby Shop
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-1">
              <p className="text-[#FDE8ED]/50 text-xs font-medium">© {new Date().getFullYear()} Gorakhpur Diaper House. All rights reserved.</p>
              <p className="text-[#FDE8ED]/35 text-xs font-medium">Made with ❤️ for Gorakhpur</p>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .h-13 { height: 3.25rem; }
      `}</style>
    </div>
  );
}
