import React from 'react';
import { X, ShoppingCart,StarsIcon } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import Image from 'next/image';
import { Merchandise } from '@/types/shop';

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
          className="text-gray-300 hover:text-white px-3 py-3 rounded-2xl text-sm font-medium 
                  transition-all duration-300 ease-out hover:bg-gradient-to-b from-primary-blue/20 to-primary-purple/20
                  hover:shadow-[0_0_15px_rgba(0,224,255,0.15)] border border-transparent hover:border-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <Image
              src={product.image_url || '/images/placeholder.jpg'}
              alt={product.name}
              width={500}
              height={500}
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
                <span className="text-3xl font-bold text-primary-cyan">₹{product.price}</span>
                <span className="text-sm text-gray-400">Free shipping on orders above ₹999</span>
              </div>
              <GradientButton href="" onClick={onAddToCart} className="w-1/2 hover:border-green-400">
                <ShoppingCart className="h-5 w-15" />
                Add to Cart
              </GradientButton>
              <GradientButton className="w-1/2  hover:border-yellow-400">
                <StarsIcon className="h-5 w-15" />
                Wishlist
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;