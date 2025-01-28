"use client"
import React from "react";
import { X, LogIn } from "lucide-react";

import { useRouter } from "next/navigation";

interface SignInDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInDialog: React.FC<SignInDialogProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  if (!isOpen) return null;

  const handleSignIn = () => {
    // navigate to /signin
    router.push("/login");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-2xl w-full max-w-md mx-4 overflow-hidden border border-gray-700">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan animate-gradient bg-200%" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-300"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          <div className="w-16 h-16 mx-auto mb-6 bg-primary-purple/20 rounded-full flex items-center justify-center">
            <LogIn className="h-8 w-8 text-primary-purple" />
          </div>

          <h2 className="text-2xl font-bold text-center text-white mb-3">
            Sign In Required
          </h2>
          <p className="text-gray-400 text-center mb-6">
            Please sign in to add items to your cart and continue shopping.
          </p>

          <button
            onClick={handleSignIn}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary-cyan/20 to-primary-purple/20 hover:from-primary-cyan/30 hover:to-primary-purple/30 rounded-lg text-white font-semibold transition-all duration-300 border border-gray-700 flex items-center justify-center gap-2 group"
          >
            <LogIn className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            Sign In
          </button>

          <p className="mt-4 text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="text-primary-cyan hover:text-primary-purple transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInDialog;
