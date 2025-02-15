import React, { useEffect } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

const Dialog = ({ open, onOpenChange, children, className = "" }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Content */}
      <div className={`relative z-50 w-full max-w-lg mx-4 ${className}`}>
        <div className="animate-in slide-in-from-bottom-4 duration-200">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

const DialogContent = ({ children, className = "" }) => {
  return (
    <div
      className={`
      bg-gray-900/95 border border-gray-800 
      backdrop-blur-xl rounded-lg shadow-xl 
      p-6 relative
      ${className}
    `}
    >
      {children}
    </div>
  );
};

const DialogHeader = ({ children, className = "" }) => {
  return <div className={`space-y-1.5 mb-4 ${className}`}>{children}</div>;
};

const DialogTitle = ({ children, className = "" }) => {
  return (
    <h2 className={`text-lg font-semibold text-white ${className}`}>
      {children}
    </h2>
  );
};

const DialogClose = ({ onClose, className = "" }) => {
  return (
    <button
      onClick={onClose}
      className={`
        absolute top-4 right-4 
        p-2 rounded-full
        text-gray-400 hover:text-white
        transition-colors
        ${className}
      `}
    >
      <X className="h-5 w-5" />
    </button>
  );
};

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose };
