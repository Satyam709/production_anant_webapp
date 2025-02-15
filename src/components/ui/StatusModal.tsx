import React from 'react';
import { AlertCircle, CheckCircle2, HelpCircle, XCircle } from 'lucide-react';
import GradientButton from './GradientButton';

type StatusType = 'success' | 'error' | 'confirm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: StatusType;
  onConfirm?: () => void;
}

const StatusModal = ({ isOpen, onClose, title, message, type, onConfirm }: Props) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-12 w-12 text-green-500" />;
      case 'error':
        return <XCircle className="h-12 w-12 text-red-500" />;
      case 'confirm':
        return <HelpCircle className="h-12 w-12 text-primary-cyan" />;
      default:
        return <AlertCircle className="h-12 w-12 text-primary-cyan" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900/90 rounded-lg max-w-md w-full border border-gray-800">
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            {getIcon()}
            <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
            <p className="mt-2 text-gray-300">{message}</p>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            {type === 'confirm' ? (
              <>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <GradientButton onClick={onConfirm} type="button">
                  Confirm
                </GradientButton>
              </>
            ) : (
              <GradientButton onClick={onClose} type="button">
                Close
              </GradientButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;