'use client';
import { useEffect,useState } from 'react';

import { Order, OrderSchema } from '@/types/shop';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/merch/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      // array of orders
      const validateOrders = OrderSchema.array().safeParse(
        await response.json()
      );
      if (!validateOrders.success) {
        throw new Error('Invalid data received');
      }
      setOrders(validateOrders.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading, error, refetch: fetchOrders };
}
