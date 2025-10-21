import { Pencil, Plus, Search,Trash2 } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import ProductForm from '@/components/merch/admin/ProductForm';
import { useMerchandise } from '@/components/merch/hooks/useMerchandise';
import { placeholder } from '@/lib/images/placeholder';
import { Merchandise } from '@/types/shop';

const ProductsPage: React.FC = () => {
  const { products, loading, error, refetch } = useMerchandise();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Merchandise | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (product: Merchandise) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    // for now just set the product quantity to 0
    const prod = products.find((p) => p.item_id === productId);
    const res = await fetch('/api/merch/admin/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...prod, stock_quantity: 0 }), // set stock quantity to 0
    });

    console.log(JSON.stringify(await res.json()));

    if (res.ok) {
      console.log('Product updated successfully');
      refetch();
    } else {
      console.log('Product update failed');
    }
  };

  const handleSubmit = async (formData: Partial<Merchandise>) => {
    if (editingProduct) {
      // Update existing product

      // call api to update product
      const res = await fetch('/api/merch/admin/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(JSON.stringify(await res.json()));

      if (res.ok) {
        console.log('Product updated successfully');
        refetch();
      } else {
        console.log('Product update failed');
      }
    } else {
      // call api to add product
      const res = await fetch('/api/merch/admin/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(JSON.stringify(await res.json()));

      if (res.ok) {
        console.log('Product added successfully');
        refetch();
      } else {
        console.log('Product add failed');
      }
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <div className="text-red-300">Error loading products</div>;
  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-primary-purple/20 hover:bg-primary-purple/30 rounded-lg text-white font-semibold transition-all duration-300 border border-primary-purple/30 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-gray-900/30 rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                Image
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                Stock
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredProducts.map((product) => (
              <tr
                key={product.item_id}
                className="hover:bg-gray-800/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <Image
                    src={product.image_url || placeholder}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{product.name}</div>
                  <div className="text-sm text-gray-400">
                    {product.description}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-primary-cyan/10 text-primary-cyan text-sm rounded-full border border-primary-cyan/30">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-primary-purple font-semibold">
                    ₹{product.price}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`${
                      product.stock_quantity > 10
                        ? 'text-green-500'
                        : product.stock_quantity > 0
                          ? 'text-yellow-500'
                          : 'text-red-500'
                    }`}
                  >
                    {product.stock_quantity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.item_id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductsPage;
