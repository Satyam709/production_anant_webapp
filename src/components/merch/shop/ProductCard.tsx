import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Merchandise } from "@/types/shop";
import Image from 'next/image';

interface ProductCardProps extends Pick<Merchandise, 'item_id' | 'name' | 'price' | 'image_url' | 'category' | 'stock_quantity'> {
  featured?: boolean;
  onQuickView: () => void;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image_url,
  category,
  stock_quantity,
  featured,
  onQuickView,
  onAddToCart,
}) => {
  return (
    <div className="group relative bg-gray-900/30 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-800 hover:border-primary-cyan/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary-cyan/5">
      {/* Mathematical Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-4 left-4 text-2xl transform -rotate-12">∫</div>
        <div className="absolute bottom-4 right-4 text-2xl transform rotate-12">∑</div>
      </div>
      
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 bg-primary-cyan/50 text-primary-white text-xs rounded-full border border-primary-cyan backdrop-blur-sm">
            Featured
          </span>
        </div>
      )}
      <div className="relative overflow-hidden aspect-[4/5]">
        <Image
          src={image_url||"/images/placeholder.png"}
          alt={name}
          width={400}
          height={500}
          className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex justify-center gap-4">
              <button
                onClick={onQuickView}
                className="p-3 bg-primary-cyan/20 hover:bg-primary-cyan/40 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 border border-primary-cyan/30"
                title="Quick View"
              >
                <Eye className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={onAddToCart}
                className="p-3 bg-primary-purple/20 hover:bg-primary-purple/40 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 border border-primary-purple/30"
                title="Add to Cart"
              >
                <ShoppingCart className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-primary-cyan/70 text-sm px-3 py-1 bg-primary-cyan/10 rounded-full">
            {category}
          </span>
          <span className={`text-sm ${stock_quantity > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {stock_quantity > 0 ? `${stock_quantity} in stock` : 'Out of stock'}
          </span>
        </div>
        <h3 className="text-white font-semibold text-lg group-hover:text-primary-cyan transition-colors duration-300">
          {name}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-primary-cyan">₹{price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;