'use client';
import { useEffect, useState } from 'react';

import { getProductsSchema, Merchandise } from '@/types/shop';

export function useMerchandise() {
  const [products, setProducts] = useState<Merchandise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/merch');

      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await res.json();
      const products = getProductsSchema.safeParse(data);
      if (!products.success) {
        throw new Error('Invalid data received');
      }
      console.log(products.success);
      setProducts(products.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
}
