"use client"
import { Coffee, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import ModeToggle from "./mode-toggle";



const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Link href={""} className="flex gap-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-chart-2 rounded-lg flex items-center justify-center">
                {" "}
                <Coffee className="w-5 h-5 text-primary-foreground" />{" "}
              </div>
              <span className="text-2xl bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent font-custom">
                TheCoffeeRoom
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>

            <a
              href="#testimonials"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Reviews
            </a>
            <ModeToggle></ModeToggle>
            <Link
              href={"/signup"}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg transition-all duration-100 hover:scale-101 ease-in-out hover:shadow-lg"
            >
              Start Creating
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-t border-border/50">
          <div className="px-4 py-4 space-y-4">
            <a
              href="#features"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              Reviews
            </a>
            <Link
              href={"/signup"}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-all duration-300"
            >
              Start Creating
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
