'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const buttonStyle = 'rounded-lg bg-zinc-800 px-6 py-2 text-white';

export default function ProfileIcon() {
  const { data: session, status } = useSession();
  if (status === 'authenticated') {
    return (
      <div className="flex items-center justify-center gap-5">
        <Image
          src={session.user ? (session.user.image as string) : ''}
          width={40}
          height={40}
          className="rounded-full"
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
