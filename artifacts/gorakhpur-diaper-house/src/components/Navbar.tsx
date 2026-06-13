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
      <Link
        href="/"
        className="text-sm font-bold text-[#5C3D2E] hover:text-[#E8547A] transition-colors px-3 py-2"
        onClick={() => setMobileMenuOpen(false)}
      >
        Home
      </Link>
      <Link
        href="/products"
        className="text-sm font-bold text-[#5C3D2E] hover:text-[#E8547A] transition-colors px-3 py-2"
        onClick={() => setMobileMenuOpen(false)}
      >
        Products
      </Link>
      <Link
        href="/account"
        className="text-sm font-bold text-[#5C3D2E] hover:text-[#E8547A] transition-colors px-3 py-2 flex items-center gap-2"
        onClick={() => setMobileMenuOpen(false)}
      >
        My Account
        {currentCustomer && (
          <span className="bg-[#FDE8ED] text-[#E8547A] text-xs px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
            {getTier(currentCustomer.points).emoji} {getTier(currentCustomer.points).name}
          </span>
        )}
      </Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#F0E4E8]">
      <div className="container mx-auto px-6 h-[70px] flex items-center justify-between max-w-6xl">

        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-85 transition-opacity" data-testid="link-home-logo">
          <ShopLogo height={52} />
        </Link>

        {/* Desktop Nav — centered pill */}
        <div className="hidden md:flex items-center gap-1 bg-[#FAFAFA] border border-[#F0E4E8] rounded-full px-2 py-1.5">
          <NavLinks />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            className="hidden sm:flex h-9 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm gap-2 shadow-sm"
            onClick={() => window.open("https://wa.me/919876543210", "_blank")}
            data-testid="button-navbar-whatsapp"
          >
            WhatsApp
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-full hover:bg-[#FDE8ED] text-[#5C3D2E]"
            onClick={() => setIsCartOpen(true)}
            data-testid="button-navbar-cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E8547A] text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>

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

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-10 w-10 rounded-full text-[#5C3D2E] hover:bg-[#FDE8ED]"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-white border-l border-[#F0E4E8] p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-[#F0E4E8]">
                  <ShopLogo height={48} />
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <NavLinks />
                  <Link
                    href="/admin"
                    className="text-sm font-bold text-[#8A7070] hover:text-[#5C3D2E] transition-colors px-3 py-2 mt-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                </div>
                <div className="mt-auto p-6 border-t border-[#F0E4E8]">
                  <Button
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold h-11 rounded-full"
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
