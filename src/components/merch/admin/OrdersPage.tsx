import { AlertCircle, CheckCircle, Search, XCircle } from 'lucide-react';
import React, { useState } from 'react';

import { Order, OrderStatus, OrderStatusSchema } from '@/types/shop';

import { useOrders } from '../hooks/useOrders';
import OrderDetailsModal from './OrderDetailsModal';

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL');

  const { orders, loading, error, refetch } = useOrders();

  const handleUpdateStatus = async (
    orderId: number,
    status: OrderStatus,
    remarks?: string
  ) => {
    try {
      console.log(JSON.stringify({ orderId, status, remarks }));

      const res = await fetch('/api/merch/admin/approve', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_id: orderId, status, remarks }),
      });
      const data = JSON.stringify(await res.json());
      if (res.status === 200) {
        refetch();
      }
      if (!res.ok) {
        console.log(data);
        throw new Error('Failed to update order status ' + data);
      }
    } catch (err) {
      alert('Error : ' + err);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      (order.order_id && order.order_id.toString().includes(searchTerm)) ||
      (order.user_id &&
        order.user_id.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus =
      statusFilter === 'ALL' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatusSchema.Enum.APPROVED:
        return 'text-green-500 bg-green-500/10 border-green-500/30';
      case OrderStatusSchema.enum.REJECTED:
        return 'text-red-500 bg-red-500/10 border-red-500/30';
      default:
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Orders</h1>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Order ID or User ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as OrderStatus | 'ALL')
          }
          className="px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
        >
          <option value="ALL">All Status</option>
          {Object.values(OrderStatusSchema.Values).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-gray-900/30 rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                User ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                Total
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredOrders.map((order) => (
              <tr
                key={order.order_id}
                className="hover:bg-gray-800/30 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-white">
                  #{order.order_id}
                </td>
                <td className="px-6 py-4 text-gray-300">{order.user_id}</td>
                <td className="px-6 py-4">
                  <span className="text-primary-purple font-semibold">
                    ₹{order.total_price}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full flex items-center justify-evenly text-sm border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status === OrderStatusSchema.Enum.APPROVED ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : order.status === OrderStatusSchema.enum.REJECTED ? (
                      <XCircle className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {(order.created_at &&
                    new Date(order.created_at).toLocaleDateString()) ||
                    'N/A'}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-3 py-1 bg-primary-purple/20 hover:bg-primary-purple/30 rounded-lg text-white text-sm transition-all duration-300 border border-primary-purple/30"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};

export default OrdersPage;
