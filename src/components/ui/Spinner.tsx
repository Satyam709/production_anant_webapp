"use client";

export function Spinner() {
  return (
    <div className="w-8 h-8 relative">
      <div className="absolute inset-0 rounded-full border-2 border-blue-200/30 border-t-[#f5c722] animate-spin"></div>
    </div>
  );
}
