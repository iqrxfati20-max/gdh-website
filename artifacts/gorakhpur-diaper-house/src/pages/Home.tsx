import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductCard } from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const { products } = useAppContext();
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FDE8ED] to-white pt-20 pb-32">
        {/* Animated Bubbles (CSS keyframes in style block below) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="bubble w-32 h-32 bg-[#F4A0B0]/20 rounded-full absolute left-[10%] bottom-[-10%] blur-xl animate-float-slow"></div>
          <div className="bubble w-48 h-48 bg-[#F4A0B0]/20 rounded-full absolute right-[10%] top-[20%] blur-xl animate-float-med"></div>
          <div className="bubble w-20 h-20 bg-[#5C3D2E]/5 rounded-full absolute left-[50%] top-[10%] blur-lg animate-float-fast"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-[#25D366]/10 text-[#166534] px-4 py-1.5 rounded-full font-bold text-sm mb-6 border border-[#25D366]/20">
            <span>🚚</span> FREE Delivery in Gorakhpur City!
          </div>
          
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-[#5C3D2E] mb-4 tracking-tight drop-shadow-sm">
            Gorakhpur <br className="hidden md:block"/> Diaper House
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-bold mb-10 max-w-2xl">
            Gorakhpur ki No.1 Baby Shop. 👶 Original products, best prices, guaranteed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full justify-center max-w-md mx-auto">
            <Link href="/products" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-[#E8547A] hover:bg-[#D43D63] text-white font-bold h-14 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                Shop Now
              </Button>
            </Link>
            <Button 
              variant="outline"
              className="w-full sm:w-auto bg-white hover:bg-[#25D366] text-[#25D366] hover:text-white border-[#25D366]/30 font-bold h-14 px-8 rounded-full text-lg shadow-md transition-all"
              onClick={() => window.open("https://wa.me/919876543210", "_blank")}
            >
              Order via WhatsApp
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[#5C3D2E] font-bold text-sm md:text-base">
            <div className="flex items-center gap-2"><span className="text-2xl">⭐</span> 5 Star Rated</div>
            <div className="flex items-center gap-2"><span className="text-2xl">📝</span> 15k+ Reviews</div>
            <div className="flex items-center gap-2"><span className="text-2xl">💯</span> 100% Original</div>
            <div className="flex items-center gap-2"><span className="text-2xl">👨‍👩‍👧</span> 10,000+ Happy Customers</div>
          </div>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 rounded-3xl border-border shadow-sm text-center hover:shadow-md transition-shadow bg-[#FDE8ED]/50">
              <span className="text-5xl block mb-4">🚚</span>
              <h3 className="font-heading text-xl text-[#5C3D2E] mb-2">FREE Delivery</h3>
              <p className="text-muted-foreground font-medium text-sm">Superfast free delivery anywhere inside Gorakhpur city limits.</p>
            </Card>
            <Card className="p-6 rounded-3xl border-border shadow-sm text-center hover:shadow-md transition-shadow bg-[#E8FDF0]/50">
              <span className="text-5xl block mb-4">✅</span>
              <h3 className="font-heading text-xl text-[#5C3D2E] mb-2">100% Original</h3>
              <p className="text-muted-foreground font-medium text-sm">We only sell genuine products sourced directly from brands.</p>
            </Card>
            <Card className="p-6 rounded-3xl border-border shadow-sm text-center hover:shadow-md transition-shadow bg-[#E8F4FD]/50">
              <span className="text-5xl block mb-4">💰</span>
              <h3 className="font-heading text-xl text-[#5C3D2E] mb-2">Best Prices</h3>
              <p className="text-muted-foreground font-medium text-sm">Guaranteed wholesale rates on retail purchases. Save on every order.</p>
            </Card>
            <Card className="p-6 rounded-3xl border-border shadow-sm text-center hover:shadow-md transition-shadow bg-[#FDFDE8]/50">
              <span className="text-5xl block mb-4">⭐</span>
              <h3 className="font-heading text-xl text-[#5C3D2E] mb-2">5 Star Shop</h3>
              <p className="text-muted-foreground font-medium text-sm">Gorakhpur's most trusted and highly rated baby store on Google.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-[#FFFAF8]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-heading text-4xl text-[#5C3D2E] mb-2">Best Sellers 🌟</h2>
              <p className="text-muted-foreground font-bold text-lg">Top picks by Gorakhpur moms!</p>
            </div>
            <Link href="/products" className="hidden sm:block">
              <Button variant="outline" className="rounded-full font-bold hover:bg-[#FDE8ED] hover:text-[#E8547A]">
                View All Products
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
              <Button variant="outline" className="w-full rounded-full font-bold h-12">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* LOYALTY PROGRAM */}
      <section className="py-20 bg-[#FDE8ED]">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="font-heading text-4xl text-[#5C3D2E] mb-4">GDH Family Rewards 🎁</h2>
          <p className="text-muted-foreground font-bold text-lg mb-12 max-w-2xl mx-auto">
            Earn points on every purchase and unlock lifetime discounts. Create an account today and get started!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#F4A0B0]/30 relative overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-200 to-transparent opacity-20 rounded-bl-full"></div>
              <span className="text-6xl block mb-4">🥉</span>
              <h3 className="font-heading text-2xl text-gray-700 mb-1">Silver Tier</h3>
              <p className="text-sm text-muted-foreground font-bold mb-4">0 - 499 pts</p>
              <div className="text-3xl font-black text-primary mb-2">5% OFF</div>
              <p className="text-sm font-medium">on all orders</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-md border-2 border-[#F59E0B]/30 relative overflow-hidden group hover:-translate-y-1 transition-transform md:-mt-4">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#F59E0B] to-transparent opacity-10 rounded-bl-full"></div>
              <span className="text-6xl block mb-4">🥈</span>
              <h3 className="font-heading text-2xl text-[#F59E0B] mb-1">Gold Tier</h3>
              <p className="text-sm text-muted-foreground font-bold mb-4">500 - 1499 pts</p>
              <div className="text-3xl font-black text-primary mb-2">10% OFF</div>
              <p className="text-sm font-medium">+ Priority Delivery</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-300 relative overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-400 to-transparent opacity-20 rounded-bl-full"></div>
              <span className="text-6xl block mb-4">🥇</span>
              <h3 className="font-heading text-2xl text-slate-700 mb-1">Platinum</h3>
              <p className="text-sm text-muted-foreground font-bold mb-4">1500+ pts</p>
              <div className="text-3xl font-black text-primary mb-2">15% OFF</div>
              <p className="text-sm font-medium">+ Free Gifts</p>
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur rounded-2xl p-6 inline-block font-bold text-[#5C3D2E]">
            💡 How to earn: <span className="text-primary">10 pts</span> for every ₹100 spent • <span className="text-primary">50 pts</span> per referral
          </div>
        </div>
      </section>

      {/* CONTACT & FOOTER */}
      <footer className="bg-[#5C3D2E] text-white pt-20 pb-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            <div>
              <h3 className="font-heading text-2xl mb-4 text-[#FDE8ED]">Visit Store 📍</h3>
              <p className="text-[#FDE8ED]/80 font-medium leading-relaxed">
                Rahmat Nagar Chauraha,<br/>
                Near Water Tank, Khoonipur,<br/>
                Sahabganj, Gorakhpur<br/>
                UP 273005
              </p>
            </div>
            <div>
              <h3 className="font-heading text-2xl mb-4 text-[#FDE8ED]">Timing 🕐</h3>
              <p className="text-[#FDE8ED]/80 font-medium leading-relaxed">
                Monday – Saturday<br/>
                10:00 AM – 8:00 PM<br/>
                Sunday Closed
              </p>
            </div>
            <div>
              <h3 className="font-heading text-2xl mb-4 text-[#FDE8ED]">Contact 📱</h3>
              <Button 
                variant="outline" 
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white border-none font-bold rounded-xl"
                onClick={() => window.open("https://wa.me/919876543210", "_blank")}
              >
                WhatsApp Us
              </Button>
            </div>
            <div>
              <h3 className="font-heading text-2xl mb-4 text-[#FDE8ED]">Follow 📸</h3>
              <a href="#" className="inline-flex items-center gap-2 text-[#FDE8ED]/80 hover:text-white font-bold transition-colors">
                @gorakhpurdiaperhouse
              </a>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50 font-medium">
            <p>© {new Date().getFullYear()} Gorakhpur Diaper House. All rights reserved.</p>
            <p>Made with ❤️ for Gorakhpur</p>
          </div>
        </div>
      </footer>

      {/* Add keyframes to the document head implicitly via styled JSX or plain style tag */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes float-med {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(0.95); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-med { animation: float-med 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
      `}} />
    </div>
  );
}
