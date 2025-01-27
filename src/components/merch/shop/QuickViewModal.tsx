import React from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { Merchandise } from '../../types/shop';

interface QuickViewModalProps {
  product: Merchandise;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-gray-900/90 rounded-2xl w-full max-w-4xl mx-4 overflow-hidden border border-gray-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-all duration-300"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
          </div>
          <div className="flex flex-col">
            <div className="mb-auto">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary-cyan/10 text-primary-cyan text-sm rounded-full border border-primary-cyan/30">
                  {product.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm border ${
                  product.stock_quantity > 0 
                    ? 'bg-green-500/10 text-green-500 border-green-500/30'
                    : 'bg-red-500/10 text-red-500 border-red-500/30'
                }`}>
                  {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                </span>
              </div>
              <h2 className="text-3xl font-bol d text-white mb-4">{product.name}</h2>
              <p className="text-gray-400 leading-relaxed mb-6">{product.description}</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-primary-purple">₹{product.price}</span>
                <span className="text-sm text-gray-400">Free shipping on orders above ₹999</span>
              </div>
              <button
                onClick={onAddToCart}
                disabled={product.stock_quantity === 0}
                className="w-full py-4 px-6 flex items-center justify-center gap-3 bg-gradient-to-r from-primary-cyan/20 to-primary-purple/20 hover:from-primary-cyan/30 hover:to-primary-purple/30 rounded-lg text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-gray-700"
              >
                <ShoppingCart className="h-5 w-5" />
                {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;