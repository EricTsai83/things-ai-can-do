import { signIn } from 'next-auth/react';
export default function LoginButton() {
  return (
    <button
      onClick={() => {
        signIn();
      }}
      className="mt-4 rounded-lg bg-slate-800 px-6 py-3 text-white">
      Sign in
    </button>
  );
}
