'use client';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';

function Provider({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  return (
    <>
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  );
}

export default Provider;
