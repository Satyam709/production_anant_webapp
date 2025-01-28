"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ShopHeader from "@/components/merch/shop/ShopHeader";
import MerchandiseSection from "@/components/merch/shop/MerchandiseSection";
import LoginSymbols from "@/components/floating/LoginSymbols";
import Cart from "@/components/merch/shop/Cart";
import "@/styles/bganimations.css";
import Footer from "@/components/Footer";

import { useMerchandise } from "@/components/merch/hooks/useMerchandise";

export default function Shop() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});

  const { products, loading, error } = useMerchandise();

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      const updatedItems = { ...cartItems };
      delete updatedItems[productId];
      setCartItems(updatedItems);
    } else {
      setCartItems((prev) => ({
        ...prev,
        [productId]: newQuantity,
      }));
    }
  };

  const handleRemoveItem = (productId: number) => {
    const updatedItems = { ...cartItems };
    delete updatedItems[productId];
    setCartItems(updatedItems);
  };

  const handleAddToCart = (productId: number) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[500px] h-[500px] bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob "
          style={{ top: "10%", right: "70%" }}
        />
        <div
          className="absolute w-[500px] h-[500px] bg-blue-500/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob "
          style={{ top: "50%", right: "-10%" }}
        />
      </div>
      <LoginSymbols />

      <Navbar />

      {/* Content */}
      <div className="relative">
        {/* Floating Cart Button */}
        {/* <button
          onClick={toggleCart}
          className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-primary-cyan/30 to-primary-purple/30 hover:from-primary-cyan/50 hover:to-primary-purple/60 rounded-full shadow-lg backdrop-blur-md border border-gray-700 transition-all duration-300 hover:scale-110 group"
        >
          <ShoppingCart className="h-6 w-6 text-primary-cyan group-hover:scale-110 transition-transform duration-300" />
          <span className="absolute -top-2 -right-2 bg-primary-purple text-white text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-black">
            {Object.values(cartItems).reduce(
              (sum, quantity) => sum + quantity,
              0
            )}
          </span>
        </button> */}

        <ShopHeader />

        <MerchandiseSection
          onAddToCart={handleAddToCart}
          products={products}
          loading={loading}
          error={error}
        />

        {/* Cart */}
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          products={products}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      </div>
      <Footer></Footer>
    </div>
  );
}
