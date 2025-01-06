"use client";

import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  placeholder: string;
  disabled?: boolean;
}

export function InputField({
  id,
  label,
  type,
  value,
  onChange,
  icon,
  placeholder,
  disabled
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className="block w-full pl-10 pr-3 py-2.5 bg-black/30 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50 text-white placeholder-gray-500 transition-colors"
          placeholder={placeholder}
          required
          disabled={disabled}
        />
      </div>
    </div>
  );
}