"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#FDFBF9] border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center h-full">
            <Link href="/" className="flex items-center gap-2 h-full">
              <Image
                src="/logo.png"
                alt="CloseDash Logo"
                width={60}
                height={60}
              />
              <Image
                src="/closedash_1.png"
                alt="CloseDash Brand Name"
                width={200}
                height={40}
                className="h-full object-contain"
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/#features"
              className="text-[#1B2D41] hover:text-[#E1766E] transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-[#1B2D41] hover:text-[#E1766E] transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/#how-it-works"
              className="text-[#1B2D41] hover:text-[#E1766E] transition-colors"
            >
              How it works
            </Link>
            <Link
              href="/microApp"
              className="text-[#1B2D41] hover:text-[#E1766E] transition-colors"
            >
              Objection Analyzer
            </Link>
          </nav>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              asChild
              variant="ghost"
              className="text-[#1B2D41] hover:text-[#E1766E] hover:bg-[#E1766E]/10"
            >
              <Link href="/login">Log in</Link>
            </Button>
            <Button
              asChild
              className="bg-[#E1766E] hover:bg-[#E1766E]/90 text-white"
            >
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
              className="text-[#1B2D41] hover:text-[#E1766E] hover:bg-[#E1766E]/10"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FDFBF9] border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              href="/#features"
              className="block text-[#1B2D41] hover:text-[#E1766E] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="block text-[#1B2D41] hover:text-[#E1766E] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/#how-it-works"
              className="block text-[#1B2D41] hover:text-[#E1766E] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How it works
            </Link>
            <Link
              href="/microApp"
              className="block text-[#1B2D41] hover:text-[#E1766E] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Objection Analyzer
            </Link>
            <div className="pt-4 flex flex-col space-y-3">
              <Button
                asChild
                variant="outline"
                className="text-[#1B2D41] hover:text-[#E1766E] hover:bg-[#E1766E]/10 border-[#1B2D41]"
              >
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Log in
                </Link>
              </Button>
              <Button
                asChild
                className="bg-[#E1766E] hover:bg-[#E1766E]/90 text-white"
              >
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  Sign up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
