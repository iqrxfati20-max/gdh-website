import { Link, useLocation } from "wouter";
import { ShoppingCart, Search, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "../context/AppContext";
import { getTier } from "../lib/loyalty";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { ShopLogo } from "./ShopLogo";

const CATEGORIES = [
  "Baby Diapers",
  "Adult Diapers",
  "Baby Wipes",
  "Sanitary Pads",
  "Rash Cream",
  "Baby Lotion",
  "Baby Powder",
  "Baby Oil",
];

export function Navbar() {
  const { cart, currentCustomer, setIsCartOpen } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const tier = currentCustomer ? getTier(currentCustomer.points) : null;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-[#F4A0B0]/25">
        <div className="container mx-auto px-4 max-w-7xl h-[68px] flex items-center justify-between relative">

          {/* LEFT — hamburger (mobile) + nav links (desktop) */}
          <div className="flex items-center gap-1">
            {/* Mobile hamburger — LEFT side */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-10 w-10 rounded-full text-[#5C3D2E] hover:bg-[#FDE8ED]"
                  data-testid="button-mobile-menu"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="3" y1="7" x2="21" y2="7" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="17" x2="21" y2="17" />
                  </svg>
                </Button>
              </SheetTrigger>

              {/* Mobile drawer — slides from LEFT */}
              <SheetContent side="left" className="w-[300px] p-0 bg-white border-r border-[#F4A0B0]/25">
                <div className="flex flex-col h-full">
                  {/* Drawer header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[#F4A0B0]/20">
                    <ShopLogo height={44} />
                    <Button
                      variant="ghost" size="icon"
                      className="h-8 w-8 rounded-full text-[#8A7070] hover:bg-[#FDE8ED]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Main links */}
                  <div className="px-4 pt-5 pb-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#F4A0B0] px-3 mb-2">Navigate</p>
                    {[
                      { href: "/", label: "Home" },
                      { href: "/products", label: "All Products" },
                      { href: "/account", label: "My Account" },
                      { href: "/admin", label: "Admin" },
                    ].map(({ href, label }) => (
                      <button
                        key={href}
                        onClick={() => { setLocation(href); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl text-[#5C3D2E] font-bold text-sm hover:bg-[#FDE8ED] transition-colors block"
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Category links */}
                  <div className="px-4 pb-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#F4A0B0] px-3 mb-2">Shop by Category</p>
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => { setLocation("/products"); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-xl text-[#8A7070] font-semibold text-sm hover:bg-[#FDE8ED] hover:text-[#5C3D2E] transition-colors block"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* WhatsApp CTA */}
                  <div className="mt-auto p-5 border-t border-[#F4A0B0]/20">
                    {currentCustomer && tier && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-[#FDE8ED] rounded-xl mb-3">
                        <span className="text-lg">{tier.emoji}</span>
                        <div>
                          <p className="text-xs font-bold text-[#5C3D2E]">{currentCustomer.name}</p>
                          <p className="text-[10px] text-[#E8547A] font-semibold">{tier.name} · {currentCustomer.points} pts</p>
                        </div>
                      </div>
                    )}
                    <Button
                      className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold h-11 rounded-full"
                      onClick={() => { window.open("https://wa.me/919876543210", "_blank"); setMobileMenuOpen(false); }}
                    >
                      Chat on WhatsApp
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-0.5">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/account", label: "My Account" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-bold text-[#5C3D2E] hover:text-[#E8547A] transition-colors px-3 py-2 rounded-full hover:bg-[#FDE8ED]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* CENTER — Logo absolutely centered */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 hover:opacity-85 transition-opacity"
            data-testid="link-home-logo"
          >
            <ShopLogo height={50} />
          </Link>

          {/* RIGHT — icons */}
          <div className="flex items-center gap-1">
            {/* WhatsApp (desktop only) */}
            <Button
              className="hidden sm:flex h-9 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs gap-1.5 shadow-sm"
              onClick={() => window.open("https://wa.me/919876543210", "_blank")}
              data-testid="button-navbar-whatsapp"
            >
              WhatsApp
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-full hover:bg-[#FDE8ED] text-[#5C3D2E]"
              onClick={() => setIsCartOpen(true)}
              data-testid="button-navbar-cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#E8547A] text-white text-[9px] font-bold h-[18px] w-[18px] rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Admin (desktop) */}
            <Link href="/admin" className="hidden sm:block">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full text-[#8A7070] hover:bg-[#FDE8ED] hover:text-[#E8547A]"
                data-testid="button-navbar-admin"
              >
                <ShieldCheck className="h-5 w-5" />
              </Button>
            </Link>

            {/* Tier badge (desktop, logged in) */}
            {currentCustomer && tier && (
              <Link href="/account" className="hidden md:flex items-center gap-1.5 bg-[#FDE8ED] text-[#E8547A] px-3 py-1.5 rounded-full text-xs font-bold hover:bg-[#F4A0B0]/30 transition-colors">
                <span>{tier.emoji}</span>
                <span>{currentCustomer.points} pts</span>
              </Link>
            )}
          </div>
        </div>

        {/* Category bar (desktop) */}
        <div className="hidden md:block border-t border-[#F4A0B0]/15 bg-[#FFFAF8]">
          <div className="container mx-auto px-4 max-w-7xl flex items-center gap-1 h-10 overflow-x-auto no-scrollbar">
            {CATEGORIES.map(cat => (
              <Link
                key={cat}
                href="/products"
                className="text-xs font-semibold text-[#8A7070] hover:text-[#E8547A] whitespace-nowrap px-3 py-1 rounded-full hover:bg-[#FDE8ED] transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}
