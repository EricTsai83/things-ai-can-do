'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { GiArtificialHive, GiRobotGolem } from 'react-icons/gi';
import {
  BounceToastContainer,
  FlipToastContainer,
  newsletterSubscribeFailureNotify,
  newsletterSubscribeSuccessNotify,
} from '@/components/ReactToast';
import robotPeekImg from './robot-peek.png';

function Page() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [emailStatus, setEmailStatus] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');

  function validateEmail(email: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

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
    <div
      className="
        flex h-[calc(100vh-64px)] w-screen flex-col items-center justify-center
        px-12 pt-24 xl:w-[calc(100vw-240px)]">
      <div className="w-full max-w-3xl">
        <section className="relative py-24">
          <GiArtificialHive className="absolute left-5 top-5 z-10 text-6xl text-teal-700" />
          <div className="relative z-10 mx-auto mt-5 max-w-screen-2xl items-center justify-between gap-10 px-8 md:flex">
            <div className="max-w-[75%] md:max-w-none">
              <h3 className="text-3xl font-bold">
                <div className="text-xl text-gray-700 md:text-2xl">
                  現在訂閱電子報，即時獲取 AI 應用的第一手資訊。
                </div>
                <div className="mt-5 text-2xl text-gray-700 md:text-3xl">
                  一起讓 AI 成為你人生的助力吧！
                </div>
              </h3>
            </div>
            <div className="mt-5 min-w-[45%] md:mt-0">
              <form
                onSubmit={(event) => event.preventDefault()}
                className="flex items-center gap-x-3 md:justify-end">
                <div className="relative">
                  <svg // email icon
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
                    type="text"
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
            </div>
          </div>
          <div
            className="absolute inset-0 h-full w-full rounded-3xl"
            style={{
              background:
                'linear-gradient(to right, rgb(153, 246, 228), rgb(217, 249, 157))',
            }}>
            <div className="absolute bottom-1 right-0 px-5 text-lg text-gray-500">
              <div className="my-3 flex">
                <GiRobotGolem className="text-6xl text-indigo-700" />
                <div className="ml-5 flex items-end">
                  Know what AI can do, and make AI do things for you.
                </div>
              </div>
            </div>
          </div>
          <Image
            className="absolute right-0 top-0 translate-x-52"
            src={robotPeekImg}
            width={300}
            height={300}
            alt="newsletter's decorated image"
          />
        </section>
      </div>
      {emailStatus ? <FlipToastContainer /> : <BounceToastContainer />}
    </div>
  );
}

export default Page;
