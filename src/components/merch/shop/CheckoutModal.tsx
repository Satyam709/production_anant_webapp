import React, { useState } from 'react';
import { X, Copy, Check, ArrowLeft } from 'lucide-react';
import { Merchandise ,Order,OrderItem } from '@/types/shop';
import Image from 'next/image';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: { [key: number]: number };
  products: Merchandise[];
  total: number;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedItems,
  products,
  total
}) => {
  const [transactionId, setTransactionId] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');

  const upiId = 'example@upi';
  const accountDetails = {
    name: 'Anant Mathematical Society',
    bank: 'Example Bank',
    account: 'XXXX XXXX XXXX 1234',
    ifsc: 'EXBK0000123'
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (transactionId.trim()) {
      setStep('confirmation');
    }
    // Send order details to server
    const selectedItemsArray : OrderItem[] = Object.entries(selectedItems).map(([productId, quantity]) => {
      const product = products.find(
        (p) => p.item_id === Number(productId)
      );
      if (!product) return null;
      return {
        item_id: Number(productId),
        quantity: quantity,
        price_per_item: product.price,
      }
    }).filter(a => a !== null);

    const orderDetails : Order = {
      total_price: total,
      status: 'PENDING',
      payment_method: 'UPI',
      transaction_id: transactionId,
      orderItems: selectedItemsArray
    }

    const res = await fetch('/api/merch/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })

    if (res.ok) {
      setStep('confirmation');
    } else {
      console.error('Error submitting payment');
      setStep('details');
    }
  };

  if (!isOpen) return null;

  const renderHeader = () => (
    <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {step !== 'details' && (
            <button
              onClick={() => setStep(step === 'confirmation' ? 'payment' : 'details')}
              className="p-2 hover:bg-gray-800/50 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-400" />
            </button>
          )}
          <h2 className="text-xl font-bold text-white">
            {step === 'details' ? 'Order Summary' : 
             step === 'payment' ? 'Payment Details' : 
             'Order Confirmation'}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full sm:w-[95%] max-w-4xl h-full sm:h-auto sm:max-h-[90vh] bg-gray-900/90 sm:rounded-2xl overflow-hidden border border-gray-800">
        {renderHeader()}

        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {step === "details" && (
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                {Object.entries(selectedItems).map(([productId, quantity]) => {
                  const product = products.find(
                    (p) => p.item_id === Number(productId)
                  );
                  if (!product) return null;
                  return (
                    <div
                      key={productId}
                      className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl border border-gray-800"
                    >
                      <Image
                        src={product.image_url || "/images/placeholder.png"}
                        height={80}
                        width={80}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate">
                          {product.name}
                        </h4>
                        <p className="text-gray-400">Quantity: {quantity}</p>
                        <p className="text-primary-purple font-semibold mt-1">
                          ₹{product.price * quantity}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-gray-800/30 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">₹{total}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-lg text-white font-medium">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-primary-purple">
                      ₹{total}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep("payment")}
                className="w-full mt-6 py-4 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
              >
                Proceed to Payment
              </button>
            </div>
          )}

          {step === "payment" && (
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* UPI Section */}
                <div className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Pay via UPI
                  </h3>
                  <div className="flex justify-center mb-4">
                    <div className="bg-white p-4 rounded-lg">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                        height={200}
                        width={200}
                        alt="QR Code"
                        className="w-48 h-48"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300">{upiId}</span>
                    <button
                      onClick={() => handleCopy(upiId, "upi")}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {copied === "upi" ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Bank Transfer Section */}
                <div className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Bank Transfer
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(accountDetails).map(([key, value]) => (
                      <div key={key} className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-gray-400 text-sm">
                              {key.toUpperCase()}
                            </span>
                            <p className="text-gray-300 font-medium">{value}</p>
                          </div>
                          <button
                            onClick={() => handleCopy(value, key)}
                            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            {copied === key ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Transaction ID Form */}
              <form onSubmit={handleSubmit} className="mt-6">
                <div className="mb-4">
                  <label
                    htmlFor="transactionId"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    id="transactionId"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                    placeholder="Enter your transaction ID"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
                >
                  Submit Payment
                </button>
              </form>
            </div>
          )}

          {step === "confirmation" && (
            <div className="p-4 sm:p-6 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Payment Submitted!
                </h2>
                <p className="text-gray-400">
                  We`&apos;`ve received your payment details. We`&apos;`ll
                  process your order once the payment is verified.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;