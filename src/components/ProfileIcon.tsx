'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function ProfileIcon() {
  const { data: session, status }: any = useSession();
  if (status === 'authenticated') {
    return (
      <div className="flex gap-5">
        <Image
          src={session.user.image as string}
          width={40}
          height={40}
          className="rounded-full"
          alt=""
        />

        <button
          className="text-base text-gray-600"
          onClick={() => {
            // @ts-ignore
            signOut();
          }}>
          登出
        </button>
      </div>
    );
  }

  return (
    <button className="text-base text-gray-600" onClick={() => signIn()}>
      登入
    </button>
  );
}
