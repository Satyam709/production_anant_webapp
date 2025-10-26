import { Filter, SortDesc } from 'lucide-react';
import React, { useState } from 'react';

import ProductCard from '@/components/merch/shop/ProductCard';
import ProductSkeleton from '@/components/merch/shop/ProductSkeleton';
import QuickViewModal from '@/components/merch/shop/QuickViewModal';
import SignInDialog from '@/components/merch/shop/SignInDialog';
import { ItemCategorySchema, Merchandise } from '@/types/shop';

interface MerchandiseSectionProps {
  onAddToCart: (productId: number) => void;
  products: Merchandise[];
  loading: boolean;
  error: string | null;
}

const MerchandiseSection: React.FC<MerchandiseSectionProps> = ({
  onAddToCart,
  products,
  loading,
  error,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Merchandise | null>(
    null
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showSignInDialog, setShowSignInDialog] = useState(false);

  const categories = ['All', ...ItemCategorySchema.options];

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((product) => product.category === activeCategory);

  const featuredProducts = products.filter(
    (product) => 'featured' in product && product.featured
  );

  const handleAddToCart = (productId: number) => {
    // Cart will just be localusage for now
    onAddToCart(productId);
  };

  if (error) {
    return (
      <div className="py-20 px-4 text-center">
        <div className="max-w-md mx-auto p-6 bg-red-500/10 rounded-lg border border-red-500/20">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-white transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Featured Products */}
        <div className="mb-12 sm:mb-20">
          <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
            <div className="w-full sm:w-auto flex items-center gap-3 px-4 py-2 bg-primary-cyan/10 rounded-full border border-primary-cyan/20">
              <span className="text-lg font-bold text-white">
                Featured Collection
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => <ProductSkeleton key={i} />)
              : featuredProducts.map((product) => (
                  <ProductCard
                    key={product.item_id}
                    {...product}
                    featured={true}
                    onQuickView={() => {
                      setSelectedProduct(product);
                      setIsModalOpen(true);
                    }}
                    onAddToCart={() => handleAddToCart(product.item_id)}
                  />
                ))}
          </div>
        </div>

        {/* All Products */}
        <div>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="w-full">
              {/* Mobile Categories Dropdown */}
              <div className="sm:hidden">
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900/90 backdrop-blur-sm rounded-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-cyan appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                  }}
                >
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="bg-gray-900"
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              {/* Desktop Categories */}
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-800/50 rounded-full backdrop-blur-sm">
                <Filter className="h-5 w-5 text-primary-cyan shrink-0" />
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 sm:px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
                        activeCategory === category
                          ? 'bg-primary-purple/20 text-white border border-primary-purple/30'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 text-gray-400 hover:bg-gray-700 transition-all duration-300 border border-gray-700/50 backdrop-blur-sm">
              <SortDesc className="h-4 w-4" />
              <span>Sort</span>
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {loading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => <ProductSkeleton key={i} />)
              : filteredProducts.map((product) => (
                  <ProductCard
                    key={product.item_id}
                    {...product}
                    featured={false}
                    onQuickView={() => {
                      setSelectedProduct(product);
                      setIsModalOpen(true);
                    }}
                    onAddToCart={() => handleAddToCart(product.item_id)}
                  />
                ))}
          </div>
        </div>

        {/* Quick View Modal */}
        {selectedProduct && (
          <QuickViewModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedProduct(null);
            }}
            onAddToCart={() => handleAddToCart(selectedProduct.item_id)}
          />
        )}

        {/* Sign In Dialog */}
        <SignInDialog
          isOpen={showSignInDialog}
          onClose={() => setShowSignInDialog(false)}
        />
      </div>
    </div>
  );
};

export default MerchandiseSection;
