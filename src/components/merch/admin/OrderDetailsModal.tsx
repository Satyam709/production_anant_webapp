import React, { useState } from "react";
import { X, CheckCircle, XCircle } from "lucide-react";
import { Order, OrderStatus, OrderStatusSchema } from "@/types/shop";
import Image from "next/image";
import { useMerchandise } from "../hooks/useMerchandise";
import { placeholder } from "@/lib/images/placeholder";

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
  onUpdateStatus: (
    orderId: number,
    status: OrderStatus,
    remarks?: string
  ) => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
}) => {
  const [remarks, setRemarks] = useState("");

  const handleApprove = () => {
    if (!order.order_id) {
      alert("Order ID not found");
      return;
    }
    onUpdateStatus(order.order_id, OrderStatusSchema.enum.APPROVED, remarks);
    onClose();
  };

  const handleReject = () => {
    if (!order.order_id) {
      alert("Order ID not found");
      return;
    }
    onUpdateStatus(order.order_id, OrderStatusSchema.enum.REJECTED, remarks);
    onClose();
  };

  const { products } = useMerchandise();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl bg-gray-900/90 rounded-xl border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold">Order Details #{order.order_id}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Order Information */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-400">User ID</p>
              <p className="font-medium text-white">{order.user_id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Order Date</p>
              <p className="font-medium text-white">
                {(order.created_at &&
                  new Date(order.created_at).toLocaleString()) ||
                  "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Payment Method</p>
              <p className="font-medium text-white">
                {order.payment_method || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Transaction ID</p>
              <p className="font-medium text-white">
                {order.transaction_id || "N/A"}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Order Items</h3>
            <div className="space-y-4">
              {(order.orderItems &&
                order.orderItems.map((item) => {
                  const product = products.find(
                    (p) => p.item_id === item.item_id
                  );

                  return (
                    <div
                      key={item.order_item_id}
                      className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700"
                    >
                      <Image
                        src={product?.image_url || placeholder}
                        alt={product?.name || "NA"}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-white">
                          {product?.name || "NA"}
                        </h4>
                        <p className="text-sm text-gray-400">
                          Quantity: {item.quantity} × ₹{item.price_per_item}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Subtotal</p>
                        <p className="font-semibold text-primary-purple">
                          ₹{item.quantity * item.price_per_item}
                        </p>
                      </div>
                    </div>
                  );
                })) ||
                "No items found"}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-end mb-6">
            <div className="bg-gray-800/30 rounded-lg border border-gray-700 p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Amount:</span>
                <span className="text-xl font-bold text-primary-purple ml-8">
                  ₹{order.total_price}
                </span>
              </div>
            </div>
          </div>

          {/* Admin Actions */}
          {order.status === OrderStatusSchema.enum.PENDING && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Remarks
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  rows={3}
                  placeholder="Add any remarks about this order..."
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={handleReject}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-500 font-semibold transition-all duration-300 border border-red-500/30 flex items-center gap-2"
                >
                  <XCircle className="h-5 w-5" />
                  Reject Order
                </button>
                <button
                  onClick={handleApprove}
                  className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-500 font-semibold transition-all duration-300 border border-green-500/30 flex items-center gap-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  Approve Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
