'use client';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

import { SessionProvider } from 'next-auth/react';

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
