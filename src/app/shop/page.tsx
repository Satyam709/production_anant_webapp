"use client";
import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import MerchandiseSection from "@/components/shop/MerchandiseSection";
import Cart from "@/components/shop/Cart";

export default function Shop() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Background Elements */}
      <div className="fixed inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-primary-purple/5 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary-cyan/5 to-transparent"></div>

        {/* Animated Mathematical Symbols */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
          <div className="absolute top-20 left-[10%] text-8xl text-primary-cyan animate-float delay-0">
            ∫
          </div>
          <div className="absolute top-[40%] right-[15%] text-9xl text-primary-purple animate-float delay-200">
            ∑
          </div>
          <div className="absolute bottom-[30%] left-[20%] text-7xl text-primary-blue animate-float delay-100">
            π
          </div>
          <div className="absolute top-[60%] right-[25%] text-8xl text-primary-cyan animate-float delay-300">
            ∞
          </div>
          <div className="absolute bottom-[20%] right-[10%] text-7xl text-primary-purple animate-float delay-400">
            ∂
          </div>
          <div className="absolute top-[30%] left-[25%] text-8xl text-primary-blue animate-float delay-500">
            θ
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {/* Floating Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-primary-cyan/20 to-primary-purple/20 hover:from-primary-cyan/30 hover:to-primary-purple/30 rounded-full shadow-lg backdrop-blur-md border border-gray-700 transition-all duration-300 hover:scale-110 group"
        >
          <ShoppingCart className="h-6 w-6 text-primary-cyan group-hover:scale-110 transition-transform duration-300" />
          <span className="absolute -top-2 -right-2 bg-primary-purple text-white text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-black">
            0
          </span>
        </button>

        {/* Shop Header */}
        <div className="pt-12 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan animate-gradient bg-200%">
              Anant Shop
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8">
              Where Mathematics Meets Style - Exclusive Mathematical Society
              Merchandise
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-cyan/10 rounded-full text-primary-cyan text-xs sm:text-sm border border-primary-cyan/20">
                Limited Edition
              </span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-purple/10 rounded-full text-primary-purple text-xs sm:text-sm border border-primary-purple/20">
                Mathematical Designs
              </span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-blue/10 rounded-full text-primary-blue text-xs sm:text-sm border border-primary-blue/20">
                Premium Quality
              </span>
            </div>
          </div>
        </div>

        {/* Merchandise Section */}
        <MerchandiseSection />

        {/* Cart Sidebar */}
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </div>
  );
}
