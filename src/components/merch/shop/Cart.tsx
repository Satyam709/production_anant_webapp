import React, { useState } from "react";
import { ShoppingCart, X, Trash2 } from "lucide-react";
import SignInDialog from "./SignInDialog";
import CheckoutModal from "./CheckoutModal";
import { Merchandise } from "@/types/shop";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { placeholder } from "@/lib/images/placeholder";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: { [key: number]: number };
  products: Merchandise[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  products,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const session = useSession();

  const total = Object.entries(items).reduce((sum, [productId, quantity]) => {
    const product = products.find((p) => p.item_id === parseInt(productId));
    return sum + (product ? product.price * quantity : 0);
  }, 0);

  const handleCheckout = () => {
    // Set to true for testing
    const isLoggedIn = session.data?.user;

    if (!isLoggedIn) {
      setShowSignInDialog(true);
      return;
    }

    setShowCheckoutModal(true);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-gray-900/90 border-l border-gray-800">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-6 w-6 text-primary-cyan" />
                <h2 className="text-xl font-bold text-white">Your Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800/50 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {Object.keys(items).length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                Your cart is empty
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(items).map(([productId, quantity]) => {
                  const product = products.find(
                    (p) => p.item_id === parseInt(productId)
                  );
                  if (!product) return null;

                  return (
                    <div
                      key={productId}
                      className="flex gap-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700"
                    >
                      <Image
                        src={product.image_url || placeholder}
                        alt={product.name}
                        height={80}
                        width={80}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate">
                          {product.name}
                        </h4>
                        <p className="text-primary-purple font-semibold mt-1">
                          ₹{product.price * quantity}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                onUpdateQuantity(product.item_id, quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700"
                              disabled={quantity <= 1}
                            >
                              -
                            </button>
                            <span className="text-white w-8 text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(product.item_id, quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => onRemoveItem(product.item_id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-800">
            <div className="flex justify-between mb-4">
              <span className="text-gray-400">Total</span>
              <span className="text-xl font-bold text-primary-purple">
                ₹{total}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={Object.keys(items).length === 0}
              className="w-full py-3 px-4 bg-gradient-to-r from-primary-cyan/20 to-primary-purple/20 hover:from-primary-cyan/30 hover:to-primary-purple/30 rounded-lg text-white font-semibold transition-all duration-300 border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Sign In Dialog */}
      <SignInDialog
        isOpen={showSignInDialog}
        onClose={() => setShowSignInDialog(false)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        selectedItems={items}
        products={products}
        total={total}
      />
    </div>
  );
};

export default Cart;
