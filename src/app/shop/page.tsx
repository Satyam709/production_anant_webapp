"use client";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import MerchandiseSection from "@/components/merch/shop/MerchandiseSection";
import Cart from "@/components/merch/shop/Cart";
import Navbar from "@/components/merch/Navbar";
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
      {/* Background Elements */}
      <div className="fixed inset-0">
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
        <Navbar />

        {/* Floating Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-primary-cyan/20 to-primary-purple/20 hover:from-primary-cyan/30 hover:to-primary-purple/30 rounded-full shadow-lg backdrop-blur-md border border-gray-700 transition-all duration-300 hover:scale-110 group"
        >
          <ShoppingCart className="h-6 w-6 text-primary-cyan group-hover:scale-110 transition-transform duration-300" />
          <span className="absolute -top-2 -right-2 bg-primary-purple text-white text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-black">
            {Object.values(cartItems).reduce(
              (sum, quantity) => sum + quantity,
              0
            )}
          </span>
        </button>

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
    </div>
  );
}
