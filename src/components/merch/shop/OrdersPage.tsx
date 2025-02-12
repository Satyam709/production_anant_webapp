"use client";
import React from "react";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";
import { useOrders } from "../hooks/useOrders";
import Image from "next/image";
import { OrderStatus } from "@/types/shop";
import { useMerchandise } from "../hooks/useMerchandise";
import { placeholder } from "@/lib/images/placeholder";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    PENDING: {
      icon: Clock,
      text: "Pending",
      className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
    },
    APPROVED: {
      icon: CheckCircle,
      text: "Approved",
      className: "bg-green-500/10 text-green-500 border-green-500/30",
    },
    REJECTED: {
      icon: XCircle,
      text: "Rejected",
      className: "bg-red-500/10 text-red-500 border-red-500/30",
    },
  }[status];

  // Ensure the status is valid
  if (!statusConfig) {
    return null;
  }

  const Icon = statusConfig.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border ${statusConfig.className}`}
    >
      <Icon className="w-4 h-4" />
      {statusConfig.text}
    </span>
  );
};

const OrdersPage = () => {
  const getMerchandise = (item_id: number) => {
    return products.find((product) => product.item_id === item_id);
  };

  const { orders: allOrders, loading, error } = useOrders();
  const { products } = useMerchandise();
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-primary-purple/5 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary-cyan/5 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-primary-purple/20 rounded-full">
            <Package className="w-6 h-6 text-primary-purple" />
          </div>
          <h1 className="text-3xl font-bold">Your Orders</h1>
        </div>

        <div className="space-y-6">
          {allOrders.map((order, idx) => (
            <div
              key={idx}
              className="bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-gray-800">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Order ID</p>
                    <p className="font-medium text-white">{idx}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Transaction ID</p>
                    <p className="font-medium text-white">
                      {order.transaction_id}
                    </p>
                  </div>
                  {order.created_at && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Date</p>
                      <p className="font-medium text-white">
                        {new Date(order.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Status</p>
                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-gray-800">
                {order.orderItems &&
                  order.orderItems.map((item, idx) => {
                    const product = getMerchandise(item.item_id);

                    return (
                      <div key={idx} className="p-6 flex items-center gap-6">
                        {product && (
                          <>
                            <Image
                              src={
                                product.image_url || placeholder
                              }
                              height={150}
                              width={150}
                              alt={product.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-medium text-white">
                                {product.name}
                              </h3>
                              <p className="text-gray-400">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </>
                        )}
                        <div className="text-right">
                          <p className="text-sm text-gray-400">
                            Price per item
                          </p>
                          <p className="text-lg font-medium text-primary-purple">
                            ₹{item.price_per_item}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Order Footer */}
              <div className="p-6 bg-gray-900/50 border-t border-gray-800">
                <div className="flex justify-end items-center gap-4">
                  <span className="text-gray-400">Total Amount:</span>
                  <span className="text-2xl font-bold text-primary-purple">
                    ₹{order.total_price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
