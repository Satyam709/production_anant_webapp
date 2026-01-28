'use client';

import { branch_options } from '@prisma/client';
import { BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import GradientButton from '@/components/ui/GradientButton';
import FormDropdown from '@/components/ui/FormDropdown';
import { UpdateProfile } from '@/lib/actions/Profile';

export default function OnboardingPage() {
  const [branch, setBranch] = useState<string>('');
  const [branchOptions, setBranchOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session, update } = useSession();

  useEffect(() => {
    // Dynamically load branch options and filter unwanted ones
    const options = Object.values(branch_options).filter((b) => b !== 'MSC');
    setBranchOptions(options);
  }, []);

  const setBranchValue = (option: string) => {
    if (branchOptions.includes(option)) {
      setBranch(option);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!branch) {
      setError('Please select a branch');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Use existing UpdateProfile action
      // We only update the branch here. Other fields are undefined.
      const res = await UpdateProfile(
        undefined, // name
        branch as branch_options,
        undefined, // batch
        undefined, // club_dept
        undefined, // linkedIn
        undefined, // github
        undefined // instagram
      );

      if (res) {
        // Update session to reflect the change immediately so BranchGuard lets us pass
        await update({
          user: {
            ...session?.user?.info,
            branch: branch,
          },
        });
        router.push('/'); // Redirect to home or dashboard
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] text-white px-4">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-blue/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10 backdrop-blur-xl bg-black/40 p-8 rounded-2xl border border-gray-800 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-blue via-primary-cyan to-primary-purple">
            Select Your Branch
          </h2>
          <p className="mt-2 text-gray-400">
            Please update your profile to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Branch
            </label>
            <div className="relative">
              <div
                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                style={{ zIndex: 10 }}
              >
                <BookOpen className="h-5 w-5 text-gray-500" />
              </div>
              <FormDropdown
                label="Select Branch"
                options={branchOptions}
                value={branch}
                onSelect={setBranchValue}
              />
            </div>
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
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Save & Continue'}
            </GradientButton>
          </div>
        </form>
      </div>
    </div>
  );
}
