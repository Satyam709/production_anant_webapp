"use client";

import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import ShopHeader from "@/components/shop/ShopHeader";
import MerchandiseSection from "@/components/shop/MerchandiseSection";
import LoginSymbols from "@/components/floating/LoginSymbols";
import Cart from "@/components/shop/Cart";
import "@/styles/bganimations.css";
import Footer from "@/components/Footer"; 



export default function Shop() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob "
        style={{ top: '10%', right: '70%' }} />
      <div className="absolute w-[500px] h-[500px] bg-blue-500/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob "
        style={{ top: '50%', right: '-10%' }} />
      </div>
     <LoginSymbols/>


      <Navbar />
    
      {/* Content */}
      <div className="relative">
        {/* Floating Cart Button */}
        <button
          onClick={toggleCart}
          className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-primary-cyan/30 to-primary-purple/30 hover:from-primary-cyan/50 hover:to-primary-purple/60 rounded-full shadow-lg backdrop-blur-md border border-gray-700 transition-all duration-300 hover:scale-110 group"
        >
          <ShoppingCart className="h-6 w-6 text-primary-cyan group-hover:scale-110 transition-transform duration-300" />
          <span className="absolute -top-2 -right-2 bg-primary-cyan/80 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-black">
            2
          </span>
        </button>

        {/* Shop Header */}
        <main className="relative z-10 container mx-auto px-4 py-20">
        <ShopHeader />

        {/* Merchandise Section */}
        <MerchandiseSection />

        {/* Cart Sidebar */}
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </main>
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
