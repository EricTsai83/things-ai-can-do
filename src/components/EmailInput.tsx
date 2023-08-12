'use client';

import { useEffect, useRef, useState } from 'react';
import {
  BounceToastContainer,
  FlipToastContainer,
  newsletterSubscribeFailureNotify,
  newsletterSubscribeSuccessNotify,
} from './ReactToast';

function validateEmail(email: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function EmailInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [emailStatus, setEmailStatus] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const currRef = inputRef.current!;
    if (currRef.value) {
      if (emailStatus) {
        newsletterSubscribeSuccessNotify();
        currRef.value = '';
      } else {
        newsletterSubscribeFailureNotify();
      }
    }
  }, [email, emailStatus]);
  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-x-3 md:justify-end">
        <div className="relative">
          <svg
            className="absolute inset-y-0 left-3 my-auto h-6 w-6 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          <input
            ref={inputRef}
            placeholder="輸入信箱"
            className="
              w-full rounded-lg border bg-white py-2 pl-12 pr-3 
            text-gray-500 shadow-sm outline-none focus:border-indigo-600"
          />
        </div>
        <button
          onClick={() => {
            const currRef = inputRef.current as HTMLInputElement;
            const isValid = validateEmail(currRef.value);
            setEmailStatus(isValid);
            setEmail(currRef.value);
          }}
          className="
            block min-w-[64px] rounded-lg bg-indigo-600 px-4 py-3
            text-center text-sm font-medium text-white shadow
          hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none">
          訂閱
        </button>
      </form>
      {emailStatus ? <FlipToastContainer /> : <BounceToastContainer />}
    </>
  );
}

export default EmailInput;
