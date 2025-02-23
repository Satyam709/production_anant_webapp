import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';

interface ImageViewerProps {
  images: Array<{ id: string; url: string; }>;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious
}) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyPress);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'auto';
    };
  }, [onNext, onPrevious, onClose]);

  if (currentIndex === -1) return null;

  return (
    <div className="fixed inset-0  z-50 touch-none">
      {/* Darker backdrop with stronger gradient */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

      {/* Main content */}
      <div className="relative h-full flex flex-col items-center justify-center p-4">
        {/* Close button - larger on mobile */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 p-4 sm:p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-primary-cyan/20 hover:border-primary-cyan/50 transition-all duration-300 z-50"
        >
          <X className="w-6 h-6 sm:w-5 sm:h-5" />
        </button>

        {/* Navigation area - full height touch targets */}
        <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4">
          {/* Previous button - full height on mobile */}
          <button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className="h-full sm:h-auto py-20 sm:py-3 px-4 sm:px-3 flex items-center rounded-l-2xl sm:rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-primary-cyan/20 hover:border-primary-cyan/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-black/50 disabled:hover:border-white/10"
          >
            <ChevronLeft className="w-8 h-8 sm:w-5 sm:h-5" />
          </button>

          {/* Next button - full height on mobile */}
          <button
            onClick={onNext}
            disabled={currentIndex === images.length - 1}
            className="h-full sm:h-auto py-20 sm:py-3 px-4 sm:px-3 flex items-center rounded-r-2xl sm:rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-primary-cyan/20 hover:border-primary-cyan/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-black/50 disabled:hover:border-white/10"
          >
            <ChevronRight className="w-8 h-8 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Image container */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={images[currentIndex].url}
            alt=""
            width={800}
            height={800}
            className="max-h-[90vh] sm:max-h-[85vh] max-w-[95vw] sm:max-w-[85vw] object-contain rounded-lg shadow-2xl shadow-primary-cyan/10 animate-fade-in select-none"
          />
        </div>

        {/* Image counter - adjusted for mobile */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-primary-cyan animate-pulse" />
            <span className="text-white font-medium text-sm sm:text-base">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};