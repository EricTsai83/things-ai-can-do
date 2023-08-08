'use client';

import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';

const buttonStyle =
  'rounded-lg bg-zinc-800 py-2 text-white md:py-2 text-sm min-w-[70px]';

export default function ProfileIcon() {
  const { data: session, status } = useSession();
  if (status === 'authenticated') {
    return (
      <div className="flex items-center justify-center gap-5">
        <Image
          className="hidden rounded-full sm:block sm:h-10 sm:w-10"
          src={session.user ? (session.user.image as string) : ''}
          width={40}
          height={40}
          alt=""
        />

        <button
          className={buttonStyle}
          onClick={() => {
            signOut();
          }}>
          登出
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <button className={buttonStyle} onClick={() => signIn()}>
        登入
      </button>
    </div>
  );
}
