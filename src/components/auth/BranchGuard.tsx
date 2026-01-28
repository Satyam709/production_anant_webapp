'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function BranchGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'loading') return;

    // Check if user is logged in but has no branch
    // session.user.info contains the user object from database (from authOptions callback)
    if (
      status === 'authenticated' &&
      session?.user?.info &&
      !session.user.info.branch
    ) {
      if (pathname !== '/onboarding' && pathname !== '/api/auth/signout') {
        router.push('/onboarding');
      }
    }
  }, [session, status, pathname, router]);

  return <>{children}</>;
}
