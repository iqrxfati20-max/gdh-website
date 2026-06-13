import { Link } from "wouter";
import { ShoppingCart, Menu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "../context/AppContext";
import { getTier } from "../lib/loyalty";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { ShopLogo } from "./ShopLogo";

export function Navbar() {
  const { cart, currentCustomer, setIsCartOpen } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const NavLinks = () => (
    <>
      <Link href="/" className="font-bold text-[#5C3D2E] hover:text-[#E8547A] transition-colors px-4 py-2" onClick={() => setMobileMenuOpen(false)}>
        Home
      </Link>
      <Link href="/products" className="font-bold text-[#5C3D2E] hover:text-[#E8547A] transition-colors px-4 py-2" onClick={() => setMobileMenuOpen(false)}>
        Products
      </Link>
      <Link href="/account" className="font-bold text-[#5C3D2E] hover:text-[#E8547A] transition-colors px-4 py-2 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
        My Account
        {currentCustomer && (
          <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
            {getTier(currentCustomer.points).emoji} {getTier(currentCustomer.points).name}
          </span>
        )}
      </Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-[#FFFAF8]/80 backdrop-blur-md border-b border-[#F4A0B0]/30 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-90 transition-opacity" data-testid="link-home-logo">
          <ShopLogo height={55} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2 bg-white rounded-full px-2 py-1.5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-[#F4A0B0]/20">
          <NavLinks />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button 
            variant="outline"
            className="hidden sm:flex bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20 hover:bg-[#25D366] hover:text-white font-bold rounded-full h-10 px-5"
            onClick={() => window.open("https://wa.me/919876543210", "_blank")}
          >
            WhatsApp Us
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="relative h-10 w-10 rounded-full border-[#F4A0B0]/30 bg-white hover:bg-[#FDE8ED] hover:text-[#E8547A]"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#E8547A] text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Button>

          <Link href="/admin">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hover:bg-muted hidden sm:flex">
              <ShieldCheck className="h-5 w-5" />
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-10 w-10 rounded-full">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#FFFAF8] border-l-[#F4A0B0]/30">
              <div className="flex flex-col gap-6 mt-10">
                <div className="flex items-center gap-3 px-4 pb-6 border-b border-border">
                  <ShopLogo height={48} />
                </div>
                <div className="flex flex-col gap-2">
                  <NavLinks />
                  <Link href="/admin" className="font-bold text-muted-foreground hover:text-foreground transition-colors px-4 py-2 mt-4" onClick={() => setMobileMenuOpen(false)}>
                    Admin Dashboard
                  </Link>
                </div>
                
                <div className="mt-auto px-4 pb-8">
                  <Button 
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold h-12 rounded-xl"
                    onClick={() => window.open("https://wa.me/919876543210", "_blank")}
                  >
                    Chat on WhatsApp
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </nav>
  );
}
