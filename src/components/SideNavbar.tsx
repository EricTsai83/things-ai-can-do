'use client';
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiRobotFill } from 'react-icons/ri';
import { TbTextSize } from 'react-icons/tb';
import { IoBodySharp } from 'react-icons/io5';
import { BsImageFill } from 'react-icons/bs';
import { FaDochub } from 'react-icons/fa';
import { BiLogoVenmo } from 'react-icons/bi';
import { HiOutlineMail } from 'react-icons/hi';
import { Disclosure } from '@headlessui/react';
import {
  MdOutlineHome,
  MdOutlineTagFaces,
  MdOutlineSpaceDashboard,
} from 'react-icons/md';
import Link from 'next/link';

// group 可以把子元素綁在一起，比如說服元素被hover，相當於子元素也觸發了 hover
const navItemStyle = `
  group flex w-full cursor-pointer items-center justify-start
  gap-4 rounded-lg pb-4 pl-5 pr-2 pt-4 hover:bg-teal-50`;
const iconStyle = `text-2xl text-gray-600 group-hover:text-teal-600`;
const nameStyle = `text-base font-medium text-gray-800 group-hover:text-teal-600`;
const titleStyle = `pb-4 text-base font-semibold text-gray-800`;
const blockStyle = `my-4 border-b border-gray-100 pb-4`;

function SideNavbar() {
  return (
    <div className="">
      {/* Render a `nav` for the root `Disclosure` component */}
      <Disclosure className="" as="nav">
        {/* Use the `open` state to conditionally change the direction of an icon. */}
        {({ open, close }) => (
          <>
            <button
              className="absolute right-40 top-40"
              onClick={() => {
                console.log(66666666666);
                close();
              }}>
              close
            </button>
            <Disclosure.Button
              // When you need to style an element based on the state of a sibling
              // element, mark the sibling with the peer class, and use peer-* modifiers
              // like peer-invalid to style the target element:
              className="
                group peer
                absolute left-6 top-2.5
                inline-flex items-center justify-center
                rounded-md p-2 text-gray-800
              hover:bg-gray-900 hover:text-white
                focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <GiHamburgerMenu className="block h-6 w-6" aria-hidden="true" />
            </Disclosure.Button>
            <div
              // peer-focus:left-0 可以讓點其他element，將 side navbar 收回，
              className={
                open
                  ? `peer:transition fixed left-0 top-16 z-20
                  h-screen w-1/2
                bg-white p-6 pt-0
                  delay-150 duration-300 ease-out
                  sm:w-60`
                  : `peer:transition fixed -left-1/2 top-16 z-20
                  h-screen w-1/2
                  bg-white p-6 pt-0
                  delay-150 duration-300 ease-out
                  sm:-left-60 sm:w-60
                  `
              }>
              <div className={blockStyle}>
                <Link href={'/'}>
                  <div className={navItemStyle + ' border-b border-gray-100'}>
                    <MdOutlineHome className={iconStyle} />
                    <h1 className={nameStyle}>首頁</h1>
                  </div>
                </Link>

                <div className={blockStyle}>
                  <h2 className={titleStyle}>Playground</h2>
                  <Link href={'/playground/aws-facial-recognition'}>
                    <div className={navItemStyle}>
                      <MdOutlineTagFaces className={iconStyle} />
                      <h3 className={nameStyle}>臉部識別</h3>
                    </div>
                  </Link>
                  <Link href={'/playground/chat-gpt'}>
                    <div className={navItemStyle}>
                      <RiRobotFill className={iconStyle} />
                      <h3 className={nameStyle}>聊天機器人</h3>
                    </div>
                  </Link>
                  <Link href={'/playground/create-your-own-puzzle'}>
                    <div className={navItemStyle}>
                      <TbTextSize className={iconStyle} />
                      <h3 className={nameStyle}>文字轉圖像</h3>
                    </div>
                  </Link>
                  <Link href={'/tech-intro/real-time-pose-estimation'}>
                    <div className={navItemStyle}>
                      <IoBodySharp className={iconStyle} />
                      <h3 className={nameStyle}>肢體偵測</h3>
                    </div>
                  </Link>
                  <Link href={'/playground/human-image-matting'}>
                    <div className={navItemStyle}>
                      <MdOutlineSpaceDashboard className={iconStyle} />
                      <h3 className={nameStyle}>圖像分割</h3>
                    </div>
                  </Link>
                  <Link href={'/playground/sketch'}>
                    <div className={navItemStyle}>
                      <BsImageFill className={iconStyle} />
                      <h3 className={nameStyle}>圖片分類</h3>
                    </div>
                  </Link>
                </div>
                {/* setting  */}
                <div className={blockStyle}>
                  <h2 className={titleStyle}>Knowledge</h2>
                  <div className={navItemStyle}>
                    <FaDochub className={iconStyle} />
                    <h3 className={nameStyle}>資料科學</h3>
                  </div>
                  <div className={navItemStyle}>
                    <BiLogoVenmo className={iconStyle} />
                    <h3 className={nameStyle}>資料視覺化</h3>
                  </div>
                </div>
                {/* logout */}
                <div className="my-4">
                  <div className="group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md border border-gray-200 p-2 pl-5 hover:bg-sky-900 hover:shadow-lg">
                    <HiOutlineMail className="text-2xl text-gray-600 group-hover:text-white" />
                    <h3 className="text-base font-semibold text-gray-800 group-hover:text-white">
                      與我聯繫
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {/* 
        <Disclosure.Button>Terms</Disclosure.Button>
        <Disclosure.Panel>
          {({ close }) => (
            <button
              onClick={async () => {
                console.log(66666666666);
                close();
              }}>
              Read and accept
            </button>
          )}
        </Disclosure.Panel> */}
      </Disclosure>
    </div>
  );
}

export default SideNavbar;
