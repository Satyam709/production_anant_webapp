import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

interface ImageViewerProps {
  images: Array<{ id: string; url: string }>;
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
  onPrevious,
}) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrevious();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyPress);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "auto";
    };
  }, [onNext, onPrevious, onClose]);

  if (currentIndex === -1) return null;

  return (
    <div className="fixed inset-0 top-[-40px] z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 top-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main content */}
      <div className="relative h-full flex items-center justify-center p-4">
        {/* Previous button */}
        {currentIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}

        {/* Image */}
        <Image
          src={images[currentIndex].url}
          alt=""
          width={800}
          height = {800}
          className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Next button */}
        {currentIndex < images.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}

        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};
