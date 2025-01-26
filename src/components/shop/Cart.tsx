import React from 'react';
import { ShoppingCart, X } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-gray-900/90 border-l border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-6 w-6 text-primary-cyan" />
              <h2 className="text-xl font-bold text-white">Your Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800/50 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="text-center text-gray-400 py-8">
            Your cart is empty
          </div>
        </div>

        <div className="p-4 border-t border-gray-800">
          <div className="flex justify-between mb-4">
            <span className="text-gray-400">Total</span>
            <span className="text-xl font-bold text-primary-purple">₹0</span>
          </div>
          <button className="w-full py-3 px-4 bg-gradient-to-r from-primary-cyan/20 to-primary-purple/20 hover:from-primary-cyan/30 hover:to-primary-purple/30 rounded-lg text-white font-semibold transition-all duration-300 border border-gray-700">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;