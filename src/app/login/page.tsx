"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { User, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientButton from "@/components/ui/GradientButton";
import LoginSymbols from "@/components/floating/LoginSymbols";

export default function LoginPage() {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Call signIn with 'credentials' provider
    const result = await signIn("credentials", {
      redirect: false,
      rollNo: rollNumber,
      password: password,
    });

    if (result?.error) {
      setError(result.error);
    } else if (result?.ok) {
      // Optional: you can handle redirection or success actions here
      window.location.href = "/dashboard"; // or use router.push('/dashboard');
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>

      <LoginSymbols />
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10 min-h-[calc(100vh-8rem)]">
        <div className="max-w-md w-full">
          {/* Login Card */}
          <div className="backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-gray-800 shadow-xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-blue via-primary-cyan to-primary-purple">
                Welcome Back
              </h2>
              <p className="mt-2 text-gray-400">Sign in to your account</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="roll-number"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Roll Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="roll-number"
                      name="roll-number"
                      type="text"
                      required
                      className="block w-full pl-10 px-3 py-2 bg-black/30 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50 text-white placeholder-gray-500"
                      placeholder="Enter your roll number"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="block w-full pl-10 px-3 py-2 bg-black/30 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50 text-white placeholder-gray-500"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center bg-red-900/20 py-2 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <GradientButton type="submit" className="w-full justify-center">
                  Sign in
                </GradientButton>
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/register"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Don't have an account?
                <span className="ml-1 text-primary-cyan hover:text-primary-blue">
                  Sign up
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
