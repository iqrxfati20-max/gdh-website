import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ProductCard } from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";
import { ShopLogo } from "../components/ShopLogo";
import { MapPin, Clock, MessageCircle, Instagram, Truck, BadgeCheck, Tag, Star, ArrowRight } from "lucide-react";

export default function Home() {
  const { products } = useAppContext();
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">

      {/* ══════════════════════════════════ HERO ══════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
        {/* Layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8FA] via-[#FFF2F6] to-[#FFE4EF]" />
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#F4A0B0]/20 to-[#E8547A]/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#FFB3C6]/15 to-transparent blur-2xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-48 h-48 rounded-full bg-[#FDE8ED]/30 blur-2xl pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT — Copy */}
          <div className="flex flex-col items-start animate-fade-slide-up">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-[#F4A0B0]/40 text-[#E8547A] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-7 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8547A] animate-pulse" />
              Trusted by 1000+ Moms in Gorakhpur
            </div>

            {/* Headline */}
            <h1 className="font-heading text-5xl sm:text-[3.6rem] md:text-[3.8rem] leading-[1.06] text-[#1A0E14] mb-6 tracking-tight">
              Gorakhpur ki<br />
              <span className="text-shimmer">No.1</span> Baby Shop
            </h1>

            <p className="text-[#7B5970] text-lg font-medium mb-9 max-w-[410px] leading-relaxed">
              Original branded diapers, wipes &amp; baby care products.{" "}
              <span className="text-[#E8547A] font-semibold">Free delivery</span> anywhere in Gorakhpur city.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/products">
                <Button
                  className="h-14 px-8 rounded-2xl bg-gradient-to-r from-[#E8547A] to-[#C2185B] text-white font-bold text-base shadow-lg shadow-[#E8547A]/25 hover:shadow-xl hover:shadow-[#E8547A]/35 hover:-translate-y-0.5 transition-all duration-200 gap-2 animate-pulse-ring"
                  data-testid="button-hero-shop-now"
                >
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="h-14 px-7 rounded-2xl border-2 border-[#F4A0B0]/50 bg-white/70 backdrop-blur-sm text-[#1A0E14] hover:bg-[#FDE8ED] hover:border-[#E8547A]/40 font-bold text-base transition-all duration-200"
                onClick={() => window.open("https://wa.me/919169111557", "_blank")}
                data-testid="button-hero-whatsapp"
              >
                💬 WhatsApp Order
              </Button>
            </div>

            {/* Stats strip */}
            <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-[#F4A0B0]/20 w-full">
              {[
                { value: "5.0★", label: "Google Rating" },
                { value: "FREE", label: "City Delivery" },
                { value: "1000+", label: "Happy Moms" },
              ].map(s => (
                <div key={s.label} className="flex flex-col gap-1">
                  <p className="font-heading text-2xl text-[#1A0E14] leading-none">{s.value}</p>
                  <p className="text-[10px] font-bold text-[#7B5970] uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Illustration */}
          <div className="relative flex items-center justify-center h-[380px] md:h-[460px] mt-4 md:mt-0">
            {/* Main glowing circle */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#FFD6E0] via-[#FFC1D0] to-[#F4A0B0]/70 flex items-center justify-center shadow-2xl shadow-[#F4A0B0]/40">
              <div className="absolute inset-4 rounded-full bg-white/30 backdrop-blur-sm" />
              <span className="relative text-[8rem] leading-none select-none drop-shadow-2xl animate-float">👶</span>
            </div>

            {/* Floating product bubbles */}
            {[
              { emoji: "👶", label: "Diapers", cls: "top-3 right-4 animate-float-d1" },
              { emoji: "🧻", label: "Wipes",   cls: "bottom-8 right-2 animate-float-d2" },
              { emoji: "🌿", label: "Cream",   cls: "bottom-16 left-2 animate-float-d3" },
              { emoji: "💧", label: "Lotion",  cls: "top-8 left-2 animate-float-d4" },
            ].map(b => (
              <div
                key={b.label}
                className={`absolute ${b.cls} w-[70px] h-[70px] rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl shadow-[#E8547A]/12 border border-[#F4A0B0]/30 flex flex-col items-center justify-center gap-1`}
              >
                <span className="text-2xl">{b.emoji}</span>
                <span className="text-[9px] font-bold text-[#E8547A]">{b.label}</span>
              </div>
            ))}

            {/* Sparkle accents */}
            <span className="absolute top-2 left-1/2 -translate-x-1/2 text-yellow-400 text-xl animate-spin-slow select-none">✨</span>
            <span className="absolute bottom-4 right-1/3 text-pink-300 text-lg animate-float select-none">💕</span>
            <span className="absolute top-1/2 right-0 text-yellow-300 text-sm animate-float-d3 select-none">⭐</span>
          </div>
        </div>

        {/* Bottom wave into white */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 80" className="w-full block fill-white">
            <path d="M0,45 C360,80 720,5 1080,45 C1260,65 1380,30 1440,45 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════ TRUST BAR ══════════════════════════ */}
      <section className="py-4 bg-white border-b border-[#F4A0B0]/15">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs text-[#7B5970] font-semibold">
            {["✅ 100% Original Products", "🚚 Free Delivery in Gorakhpur", "⭐ 5-Star Google Rated", "💬 WhatsApp Support"].map(item => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ WHY US ════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14">
            <span className="inline-block text-[11px] font-bold text-[#E8547A] tracking-widest uppercase bg-[#FDE8ED] px-4 py-1.5 rounded-full mb-4">Our Promise</span>
            <h2 className="font-heading text-4xl sm:text-5xl text-[#1A0E14]">Why Choose GDH?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <Truck className="w-6 h-6 text-[#E8547A]" />,
                bg: "from-[#FDE8ED] to-[#FFB3C6]/30",
                title: "FREE Delivery",
                desc: "Fast, free delivery across all of Gorakhpur city, every day.",
              },
              {
                icon: <BadgeCheck className="w-6 h-6 text-[#10B981]" />,
                bg: "from-[#D1FAE5] to-[#6EE7B7]/20",
                title: "100% Original",
                desc: "Every product sourced directly from brands. Zero fakes.",
              },
              {
                icon: <Tag className="w-6 h-6 text-[#F59E0B]" />,
                bg: "from-[#FEF3C7] to-[#FDE68A]/20",
                title: "Best Prices",
                desc: "Wholesale rates for retail customers. Save every time you shop.",
              },
              {
                icon: <Star className="w-6 h-6 text-[#6366F1] fill-[#6366F1]" />,
                bg: "from-[#EEF2FF] to-[#C7D2FE]/20",
                title: "5★ Rated Shop",
                desc: "Gorakhpur's highest rated baby store on Google Maps.",
              },
            ].map(card => (
              <div
                key={card.title}
                className="group bg-white rounded-3xl p-7 flex flex-col items-center text-center border border-[#F4A0B0]/15 hover:border-[#F4A0B0]/30 hover:shadow-xl hover:shadow-[#E8547A]/8 hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-[#1A0E14] text-base mb-2">{card.title}</h3>
                <p className="text-[#7B5970] text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FEATURED PRODUCTS ══════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-[#FFF8FA] to-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="inline-block text-[11px] font-bold text-[#E8547A] tracking-widest uppercase bg-[#FDE8ED] px-4 py-1.5 rounded-full mb-4">Best Sellers</span>
              <h2 className="font-heading text-4xl sm:text-5xl text-[#1A0E14]">Top Picks</h2>
            </div>
            <Link href="/products" className="hidden sm:block">
              <Button
                variant="outline"
                className="rounded-full font-bold border-[#F4A0B0]/40 text-[#1A0E14] hover:bg-[#FDE8ED] hover:border-[#E8547A]/40 transition-all text-sm h-10 px-5"
              >
                View All →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link href="/products">
              <Button variant="outline" className="w-full rounded-full font-bold h-12 border-[#F4A0B0]/40">
                View All Products →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ LOYALTY PROGRAM ════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14">
            <span className="inline-block text-[11px] font-bold text-[#E8547A] tracking-widest uppercase bg-[#FDE8ED] px-4 py-1.5 rounded-full mb-4">Rewards</span>
            <h2 className="font-heading text-4xl sm:text-5xl text-[#1A0E14] mb-3">GDH Family Rewards</h2>
            <p className="text-[#7B5970] font-medium text-base max-w-sm mx-auto leading-relaxed">
              Shop more, earn points, unlock bigger discounts — forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[
              {
                emoji: "🥉", tier: "Silver",
                range: "0 – 499 pts", pct: "5%",
                extra: "Discount on every order",
                gradient: "from-white to-[#F9FAFB]",
                border: "border-[#D1D5DB]",
                badge: "text-[#6B7280] bg-[#F3F4F6]",
              },
              {
                emoji: "🥇", tier: "Gold",
                range: "500 – 1499 pts", pct: "10%",
                extra: "Discount + Priority Delivery",
                gradient: "from-[#FFFBEB] to-[#FEF3C7]/60",
                border: "border-[#F59E0B]/50",
                badge: "text-[#D97706] bg-[#FEF3C7]",
                featured: true,
              },
              {
                emoji: "💎", tier: "Platinum",
                range: "1500+ pts", pct: "15%",
                extra: "Discount + Free Gift",
                gradient: "from-[#F5F3FF] to-[#EDE9FE]/50",
                border: "border-[#8B5CF6]/30",
                badge: "text-[#7C3AED] bg-[#EDE9FE]",
              },
            ].map(t => (
              <div
                key={t.tier}
                className={`relative bg-gradient-to-b ${t.gradient} border-2 ${t.border} rounded-3xl p-8 text-center hover:-translate-y-2 transition-all duration-300 ${t.featured ? "shadow-xl shadow-[#F59E0B]/15" : "shadow-sm"}`}
              >
                {t.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white text-[10px] font-bold px-3 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                <div className="text-5xl mb-4">{t.emoji}</div>
                <span className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full mb-3 ${t.badge}`}>{t.tier}</span>
                <p className="text-[#7B5970] text-xs font-bold mb-5 uppercase tracking-wide">{t.range}</p>
                <div className="text-5xl font-black text-[#E8547A] mb-1.5 font-heading">{t.pct}</div>
                <p className="text-xs text-[#7B5970] font-medium">{t.extra}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#FDE8ED] via-[#FFD6E0] to-[#FDE8ED] rounded-2xl p-5 text-center border border-[#F4A0B0]/20">
            <p className="text-[#1A0E14] font-bold text-sm">
              Earn <span className="text-[#E8547A]">10 points</span> for every ₹100 spent &nbsp;·&nbsp; <span className="text-[#E8547A]">50 bonus points</span> for every referral
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ CONTACT ════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-[#FFF8FA] to-[#FFF2F5]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14">
            <span className="inline-block text-[11px] font-bold text-[#E8547A] tracking-widest uppercase bg-[#FDE8ED] px-4 py-1.5 rounded-full mb-4">Find Us</span>
            <h2 className="font-heading text-4xl sm:text-5xl text-[#1A0E14]">Visit Our Store</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <MapPin className="w-5 h-5 text-[#E8547A]" />,
                bg: "bg-[#FDE8ED]",
                title: "Address",
                content: (
                  <p className="text-[#7B5970] text-sm font-medium leading-relaxed">
                    Rahmat Nagar Chauraha,<br />Near Water Tank, Khoonipur,<br />Sahabganj, Gorakhpur UP 273005
                  </p>
                ),
              },
              {
                icon: <Clock className="w-5 h-5 text-[#6366F1]" />,
                bg: "bg-[#EEF2FF]",
                title: "Timing",
                content: (
                  <p className="text-[#7B5970] text-sm font-medium leading-relaxed">
                    Mon – Sat<br />10:00 AM – 8:00 PM<br /><span className="text-[#F4A0B0] font-semibold">Sunday Closed</span>
                  </p>
                ),
              },
              {
                icon: <MessageCircle className="w-5 h-5 text-[#10B981]" />,
                bg: "bg-[#D1FAE5]",
                title: "WhatsApp",
                content: (
                  <button
                    onClick={() => window.open("https://wa.me/919169111557", "_blank")}
                    className="mt-1 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-4 py-2 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-md shadow-[#25D366]/25"
                  >
                    Chat Now
                  </button>
                ),
              },
              {
                icon: <Instagram className="w-5 h-5 text-[#E8547A]" />,
                bg: "bg-[#FDE8ED]",
                title: "Instagram",
                content: (
                  <a href="#" className="text-[#7B5970] hover:text-[#E8547A] text-sm font-semibold transition-colors">
                    @gorakhpurdiaperhouse
                  </a>
                ),
              },
            ].map(card => (
              <div key={card.title} className="bg-white rounded-3xl p-6 border border-[#F4A0B0]/15 hover:shadow-lg hover:shadow-[#E8547A]/6 hover:-translate-y-1 transition-all duration-300">
                <div className={`w-11 h-11 rounded-2xl ${card.bg} flex items-center justify-center mb-4`}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-[#1A0E14] text-sm mb-2">{card.title}</h3>
                {card.content}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ FOOTER ══════════════════════════════ */}
      <footer className="bg-gradient-to-br from-[#1A0E14] via-[#2D1520] to-[#1A0E14] text-white py-14">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <ShopLogo height={60} variant="footer" />
              <div>
                <p className="text-white/80 font-bold text-sm">Gorakhpur Diaper House</p>
                <p className="text-white/40 text-xs font-medium mt-0.5">Gorakhpur ki No.1 Baby Shop</p>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-1.5">
              <p className="text-white/40 text-xs font-medium">© {new Date().getFullYear()} Gorakhpur Diaper House. All rights reserved.</p>
              <p className="text-white/25 text-xs">Made with ❤️ for Gorakhpur</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
