import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ProductCard } from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";
import { ShopLogo } from "../components/ShopLogo";
import { Truck, BadgeCheck, Tag, Star, MapPin, Clock, MessageCircle, Instagram } from "lucide-react";

export default function Home() {
  const { products } = useAppContext();
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-b from-[#FDE8ED] via-[#FEF0F4] to-white pt-24 pb-28 overflow-hidden">
        {/* Subtle decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F4A0B0]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#E8547A]/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-5xl relative z-10 flex flex-col items-center text-center">
          {/* FREE Delivery pill */}
          <span className="inline-flex items-center gap-2 bg-[#25D366]/10 text-[#166534] border border-[#25D366]/25 px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-8">
            <Truck className="w-4 h-4" /> FREE Delivery inside Gorakhpur City
          </span>

          {/* Main heading */}
          <h1 className="font-heading text-[3.5rem] sm:text-7xl lg:text-8xl leading-[1.05] text-[#5C3D2E] mb-6 tracking-tight">
            Gorakhpur ki<br />
            No.1 Baby Shop
          </h1>

          <p className="text-lg sm:text-xl text-[#8A7070] font-semibold mb-10 max-w-xl leading-relaxed">
            Original branded products at the best prices. Order online, delivered free to your door.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-16">
            <Link href="/products">
              <Button
                className="h-14 px-10 rounded-full bg-[#E8547A] hover:bg-[#D43D63] text-white font-bold text-base shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                data-testid="button-hero-shop-now"
              >
                Shop Now
              </Button>
            </Link>
            <Button
              variant="outline"
              className="h-14 px-10 rounded-full border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-bold text-base transition-all"
              onClick={() => window.open("https://wa.me/919876543210", "_blank")}
              data-testid="button-hero-whatsapp"
            >
              Order via WhatsApp
            </Button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
            {[
              { icon: <Star className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />, value: "5.0", label: "Google Rating" },
              { icon: <BadgeCheck className="w-5 h-5 text-[#E8547A]" />, value: "15+", label: "Reviews" },
              { icon: <Truck className="w-5 h-5 text-[#25D366]" />, value: "FREE", label: "Delivery" },
              { icon: <span className="text-lg">👨‍👩‍👧</span>, value: "1000+", label: "Happy Customers" },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5">
                  {stat.icon}
                  <span className="font-heading text-2xl text-[#5C3D2E]">{stat.value}</span>
                </div>
                <span className="text-xs text-[#8A7070] font-semibold tracking-wide uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl sm:text-5xl text-[#5C3D2E] mb-3">Why Choose Us?</h2>
            <p className="text-[#8A7070] font-semibold text-base max-w-md mx-auto">Gorakhpur's most trusted baby products store — built on quality and care.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Truck className="w-6 h-6 text-[#E8547A]" />,
                title: "FREE Delivery",
                desc: "Fast, free delivery to every corner of Gorakhpur city.",
              },
              {
                icon: <BadgeCheck className="w-6 h-6 text-[#E8547A]" />,
                title: "100% Original",
                desc: "Every product is genuine, sourced directly from brands.",
              },
              {
                icon: <Tag className="w-6 h-6 text-[#E8547A]" />,
                title: "Best Prices",
                desc: "Wholesale rates on retail purchases. Save on every order.",
              },
              {
                icon: <Star className="w-6 h-6 text-[#E8547A] fill-[#E8547A]" />,
                title: "5 Star Rated",
                desc: "Gorakhpur's highest rated baby store on Google Maps.",
              },
            ].map(item => (
              <div
                key={item.title}
                className="bg-white border border-[#F0E4E8] rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FDE8ED] flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#5C3D2E] text-lg mb-2">{item.title}</h3>
                <p className="text-[#8A7070] text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-24 bg-[#FFFAF8]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#E8547A] font-bold text-sm tracking-widest uppercase mb-2">Best Sellers</p>
              <h2 className="font-heading text-4xl sm:text-5xl text-[#5C3D2E]">Top Picks</h2>
            </div>
            <Link href="/products" className="hidden sm:block">
              <Button
                variant="outline"
                className="rounded-full font-bold border-[#F0E4E8] hover:bg-[#FDE8ED] hover:text-[#E8547A] hover:border-[#E8547A]/30 transition-all"
              >
                View All
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
              <Button variant="outline" className="w-full rounded-full font-bold h-12 border-[#F0E4E8]">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── LOYALTY PROGRAM ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-[#E8547A] font-bold text-sm tracking-widest uppercase mb-2">Rewards Program</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-[#5C3D2E] mb-3">GDH Family Rewards</h2>
            <p className="text-[#8A7070] font-semibold max-w-md mx-auto">Earn points on every purchase and unlock exclusive discounts. The more you shop, the more you save.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              { emoji: "🥉", tier: "Silver", range: "0 – 499 pts", discount: "5%", extra: "Discount on every order", border: "border-gray-200", accent: "text-gray-500" },
              { emoji: "🥈", tier: "Gold", range: "500 – 1499 pts", discount: "10%", extra: "Discount + Priority Delivery", border: "border-[#F59E0B]/40", accent: "text-[#D97706]", featured: true },
              { emoji: "🥇", tier: "Platinum", range: "1500+ pts", discount: "15%", extra: "Discount + Free Gift", border: "border-slate-300", accent: "text-slate-600" },
            ].map(t => (
              <div
                key={t.tier}
                className={`border-2 ${t.border} rounded-2xl p-8 text-center bg-white hover:-translate-y-1 transition-all duration-200 ${t.featured ? "shadow-md" : "shadow-sm"}`}
              >
                <div className="text-5xl mb-4">{t.emoji}</div>
                <h3 className={`font-heading text-2xl mb-1 ${t.accent}`}>{t.tier}</h3>
                <p className="text-[#8A7070] text-sm font-semibold mb-5">{t.range}</p>
                <div className="text-4xl font-black text-[#E8547A] mb-1">{t.discount}</div>
                <p className="text-sm text-[#8A7070] font-medium">{t.extra}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#FDE8ED] rounded-2xl p-6 text-center">
            <p className="text-[#5C3D2E] font-bold text-base">
              Earn <span className="text-[#E8547A]">10 points</span> for every ₹100 spent &nbsp;·&nbsp; <span className="text-[#E8547A]">50 points</span> for every referral
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#5C3D2E] text-white py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[#F4A0B0]" />
                <h3 className="font-bold text-[#FDE8ED] text-sm tracking-widest uppercase">Visit Store</h3>
              </div>
              <p className="text-[#FDE8ED]/70 text-sm font-medium leading-relaxed">
                Rahmat Nagar Chauraha,<br />
                Near Water Tank, Khoonipur,<br />
                Sahabganj, Gorakhpur<br />
                UP 273005
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[#F4A0B0]" />
                <h3 className="font-bold text-[#FDE8ED] text-sm tracking-widest uppercase">Hours</h3>
              </div>
              <p className="text-[#FDE8ED]/70 text-sm font-medium leading-relaxed">
                Monday – Saturday<br />
                10:00 AM – 8:00 PM<br />
                <span className="text-[#F4A0B0]/60">Sunday Closed</span>
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-4 h-4 text-[#F4A0B0]" />
                <h3 className="font-bold text-[#FDE8ED] text-sm tracking-widest uppercase">WhatsApp</h3>
              </div>
              <button
                onClick={() => window.open("https://wa.me/919876543210", "_blank")}
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold px-4 py-2 rounded-full transition-colors"
              >
                Chat with us
              </button>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Instagram className="w-4 h-4 text-[#F4A0B0]" />
                <h3 className="font-bold text-[#FDE8ED] text-sm tracking-widest uppercase">Instagram</h3>
              </div>
              <a
                href="#"
                className="text-[#FDE8ED]/70 hover:text-white text-sm font-semibold transition-colors"
              >
                @gorakhpurdiaperhouse
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <ShopLogo height={64} variant="footer" />
              <p className="text-[#FDE8ED]/50 text-sm font-medium max-w-[180px] leading-relaxed">
                Gorakhpur ki No.1 Baby Shop
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-1">
              <p className="text-[#FDE8ED]/50 text-sm font-medium">© {new Date().getFullYear()} Gorakhpur Diaper House</p>
              <p className="text-[#FDE8ED]/35 text-sm font-medium">Made with ❤️ for Gorakhpur</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
