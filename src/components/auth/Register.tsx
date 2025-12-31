'use client';

import {
  BookOpen,
  KeyRound,
  Lock,
  ShieldCheck,
  UserCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import GradientButton from '@/components/ui/GradientButton';

import { InputField } from './InputField';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleVerify = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roll_number: rollNumber }),
      });

      if (!res.ok) throw new Error('Failed to send OTP');
      setOtpSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          roll_number: rollNumber,
          password,
          otp,
          confirmpassword: confirmPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-black/40 p-8 rounded-2xl border border-gray-800 shadow-2xl mt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-blue via-primary-cyan to-primary-purple">
          Create Account
        </h2>
        <p className="mt-2 text-gray-400">Join The Mathematical Society</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <InputField
            id="username"
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={<UserCircle2 className="h-5 w-5 text-gray-500" />}
            placeholder="Enter your username"
            disabled={isLoading}
          />

          <div>
            <label
              htmlFor="rollNumber"
              className="block text-sm font-medium text-gray-300 mb-1.5"
            >
              Roll Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                id="rollNumber"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="block w-full pl-10 pr-24 py-2.5 bg-black/30 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50 text-white placeholder-gray-500 transition-colors"
                placeholder="Enter your roll number"
                required
                disabled={isLoading || otpSent}
              />
              <button
                type="button"
                onClick={handleVerify}
                disabled={isLoading || otpSent}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary-blue/20 hover:bg-primary-blue/30 text-primary-blue rounded-md transition-colors duration-200 disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : otpSent ? 'OTP Sent' : 'Verify'}
              </button>
            </div>
          </div>

          {otpSent && (
            <InputField
              id="otp"
              label="OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              icon={<ShieldCheck className="h-5 w-5 text-gray-500" />}
              placeholder="Enter OTP"
              disabled={isLoading}
            />
          )}

          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<KeyRound className="h-5 w-5 text-gray-500" />}
            placeholder="Enter your password"
            disabled={isLoading}
          />

          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={<Lock className="h-5 w-5 text-gray-500" />}
            placeholder="Confirm your password"
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm text-center bg-red-900/20 py-2 px-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="pt-2">
          <GradientButton
            type="submit"
            className="w-full py-2.5 justify-center"
            disabled={isLoading || !otpSent}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </GradientButton>
        </div>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Already have an account?{' '}
          <span className="text-primary-cyan hover:text-primary-blue transition-colors">
            Sign in
          </span>
        </Link>
      </div>
    </div>
  );
}
