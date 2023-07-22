'use client';

import LoginButton from './LoginButton';
import { useSession } from 'next-auth/react';

function UserProfile() {
  const { data: session, status } = useSession();
  const ProfileCSS = 'flex h-screen flex-col items-center justify-center';

  if (status === 'authenticated') {
    return (
      <div className={ProfileCSS}>
        <h1>Welcome,</h1>
        <span className="text-2xl font-bold">
          {session.user && session.user.name}
        </span>
      </div>
    );
  }

  return (
    <div className={ProfileCSS}>
      <h1>Login to get started</h1>
      <LoginButton />
    </div>
  );
}

export default UserProfile;
