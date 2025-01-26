import React, { useState } from 'react';
import { Filter, SortDesc, Sparkles, FunctionSquare as Function } from 'lucide-react';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';

const products = [
  {
    id: '1',
    name: 'Infinity Series T-Shirt',
    price: 499,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60',
    category: 'Apparel',
    stock: 50,
    description: 'Premium cotton t-shirt featuring the mesmerizing infinity series pattern. Perfect for mathematics enthusiasts.',
    featured: true
  },
  {
    id: '2',
    name: 'Mathematical Journal',
    price: 199,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=60',
    category: 'Accessories',
    stock: 100,
    description: 'High-quality journal with LaTeX-style grid paper. Ideal for mathematical proofs and calculations.',
    featured: false
  },
  {
    id: '3',
    name: 'Fibonacci Hoodie',
    price: 899,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60',
    category: 'Apparel',
    stock: 30,
    description: 'Cozy hoodie featuring the Fibonacci spiral design. Perfect for showing your love for mathematical sequences.',
    featured: true
  }
];

const MerchandiseSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Apparel', 'Accessories'];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(product => product.category === activeCategory);

  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Featured Products */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center gap-3 px-4 py-2 bg-primary-cyan/10 rounded-full border border-primary-cyan/20">
              <Function className="h-5 w-5 text-primary-cyan" />
              <h2 className="text-lg font-bold text-white">Featured Collection</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onQuickView={() => {
                  setSelectedProduct(product);
                  setIsModalOpen(true);
                }}
                onAddToCart={() => {
                  console.log('Added to cart:', product.name);
                }}
              />
            ))}
          </div>
        </div>

        {/* All Products */}
        <div>
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/50 rounded-full backdrop-blur-sm">
                <Filter className="h-5 w-5 text-primary-cyan" />
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
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
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 text-gray-400 hover:bg-gray-700 transition-all duration-300 border border-gray-700/50 backdrop-blur-sm">
              <SortDesc className="h-4 w-4" />
              <span>Sort</span>
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onQuickView={() => {
                  setSelectedProduct(product);
                  setIsModalOpen(true);
                }}
                onAddToCart={() => {
                  console.log('Added to cart:', product.name);
                }}
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
            onAddToCart={() => {
              console.log('Added to cart:', selectedProduct.name);
              setIsModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MerchandiseSection;