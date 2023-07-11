'use client';
import { useEffect, useState } from 'react';
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
import { usePathname } from 'next/navigation';

// group 可以把子元素綁在一起，比如說服元素被hover，相當於子元素也觸發了 hover
const navItemStyle = `
  group flex w-full cursor-pointer items-center justify-start
  gap-4 rounded-lg pb-4 pl-5 pr-2 pt-4 hover:bg-zinc-100`;
const iconStyle = `text-2xl text-gray-600 group-hover:text-gray-800`;
const nameStyle = `text-base font-medium text-gray-600 group-hover:text-gray-800`;
const titleStyle = `pb-4 text-base font-semibold text-gray-800`;
const blockStyle = `my-4 border-b border-gray-100 pb-4`;

const selectedNavItemStyle = `
  flex w-full cursor-pointer items-center justify-start
  gap-4 rounded-lg pb-4 pl-5 pr-2 pt-4 bg-teal-100`;
const selectedIconStyle = `
  text-2xl text-teal-800`;
const selectedNameStyle = `
  text-base font-medium text-teal-800`;

function SideNavbar() {
  const pathname = usePathname();
  const [selected, setSelected] = useState('首頁');

  useEffect(() => {
    const pathElements = pathname.split('/');
    const lastElement = pathElements[pathElements.length - 1];

    console.log(pathname);
    console.log(lastElement);

    if (lastElement === '') {
      setSelected('首頁');
    } else if (lastElement === 'facial-recognition') {
      setSelected('臉部識別');
    } else if (lastElement === 'chat-gpt') {
      setSelected('聊天機器人');
    } else if (lastElement === 'create-your-own-puzzle') {
      setSelected('文字轉圖像');
    } else if (lastElement === 'real-time-pose-estimation') {
      setSelected('肢體偵測');
    } else if (lastElement === 'human-image-matting') {
      setSelected('圖像分割');
    } else if (lastElement === 'sketch') {
      setSelected('圖片分類');
    } else if (lastElement === 'data-science') {
      setSelected('資料科學');
    } else if (lastElement === 'data-visualization') {
      setSelected('資料視覺化');
    }
  }, [pathname]); // 讓重新整理有作用就行

  function renderPlaygroundItem() {
    const hrefs = [
      '/playground/facial-recognition',
      '/playground/chat-gpt',
      '/playground/create-your-own-puzzle',
      '/tech-intro/real-time-pose-estimation',
      '/playground/image-segmentation',
      '/playground/sketch',
    ];

    const selectOption = [
      '臉部識別',
      '聊天機器人',
      '文字轉圖像',
      '肢體偵測',
      '圖像分割',
      '圖片分類',
    ];

    function createIconComponents() {
      const icons = [];
      for (let i = 0; i < selectOption.length; i++) {
        const className =
          selected === selectOption[i] ? selectedIconStyle : iconStyle;
        if (selectOption[i] === '臉部識別') {
          icons.push(<MdOutlineTagFaces className={className} />);
        } else if (selectOption[i] === '聊天機器人') {
          icons.push(<RiRobotFill className={className} />);
        } else if (selectOption[i] === '文字轉圖像') {
          icons.push(<TbTextSize className={className} />);
        } else if (selectOption[i] === '肢體偵測') {
          icons.push(<IoBodySharp className={className} />);
        } else if (selectOption[i] === '圖像分割') {
          icons.push(<MdOutlineSpaceDashboard className={className} />);
        } else if (selectOption[i] === '圖片分類') {
          icons.push(<BsImageFill className={className} />);
        } else {
          // pass
        }
      }
      return icons;
    }
    const icons = createIconComponents();

    const items = [];
    for (let i = 0; i < hrefs.length; i++) {
      items.push(
        <Link href={hrefs[i]} key={i} prefetch={false}>
          <div
            onClick={() => {
              setSelected(selectOption[i]);
            }}
            className={
              selected === selectOption[i] ? selectedNavItemStyle : navItemStyle
            }>
            {icons[i]}
            <h3
              className={
                selected === selectOption[i] ? selectedNameStyle : nameStyle
              }>
              {selectOption[i]}
            </h3>
          </div>
        </Link>,
      );
    }
    return items;
  }

  return (
    <Disclosure as="nav" className="">
      {/* Use the `open` state to conditionally change the direction of an icon. */}
      {({ open, close }) => (
        <>
          <div
            className={
              open
                ? `
                absolute right-0 top-0 z-40 h-screen w-screen
              bg-black opacity-50
                transition delay-150 duration-300 ease-out
                xl:hidden`
                : `
              bg-black opacity-0
                transition delay-150 duration-300 ease-out`
            }
            onClick={() => {
              console.log('e04麻把我關掉!');
              close();
            }}></div>
          <Disclosure.Button
            // When you need to style an element based on the state of a sibling
            // element, mark the sibling with the peer class, and use peer-* modifiers
            // like peer-invalid to style the target element:
            className="
              group peer
              absolute left-6 top-2.5 z-50
              inline-flex items-center justify-center
              rounded-md p-2 text-gray-500
              hover:rounded-full hover:bg-gray-100
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <GiHamburgerMenu
              className="block h-6 w-6 xl:hidden"
              aria-hidden="true"
            />
          </Disclosure.Button>
          <div
            // peer-focus:left-0 可以讓點其他element，將 side navbar 收回，
            className={
              open
                ? `peer:transition fixed left-0 top-16 z-50
                  h-screen w-1/2
                  overflow-y-auto 
                border-r-2 border-gray-100 bg-white 
                  p-6 pt-0 delay-150
                  duration-300
                  ease-out ssm:w-60
                  `
                : `peer:transition fixed -left-1/2 top-16 z-50
                  h-screen w-1/2
                  overflow-y-auto 
                border-r-2 border-gray-100 bg-white 
                  p-6 pt-0 delay-150
                  duration-300 ease-out
                  ssm:-left-60 ssm:w-60 xl:left-0`
            }>
            <div className={blockStyle}>
              <Link href={'/'} prefetch={false}>
                <div
                  onClick={() => {
                    setSelected('首頁');
                  }}
                  className={
                    (selected === '首頁'
                      ? selectedNavItemStyle
                      : navItemStyle) + ' border-b border-gray-100'
                  }>
                  <MdOutlineHome
                    className={
                      selected === '首頁' ? selectedIconStyle : iconStyle
                    }
                  />
                  <h1
                    className={
                      selected === '首頁' ? selectedNameStyle : nameStyle
                    }>
                    首頁
                  </h1>
                </div>
              </Link>

              <div className={blockStyle}>
                <h2 className={titleStyle}>Playground</h2>
                {renderPlaygroundItem()}
              </div>

              <div className={blockStyle}>
                <h2 className={titleStyle}>Knowledge</h2>
                <Link href={'/'} prefetch={false}>
                  <div
                    onClick={() => {
                      setSelected('資料科學');
                    }}
                    className={
                      selected === '資料科學'
                        ? selectedNavItemStyle
                        : navItemStyle
                    }>
                    <FaDochub
                      className={
                        selected === '資料科學' ? selectedIconStyle : iconStyle
                      }
                    />
                    <h3
                      className={
                        selected === '資料科學' ? selectedNameStyle : nameStyle
                      }>
                      資料科學
                    </h3>
                  </div>
                </Link>
                <Link href={'/'} prefetch={false}>
                  <div
                    onClick={() => {
                      setSelected('資料視覺化');
                    }}
                    className={
                      selected === '資料視覺化'
                        ? selectedNavItemStyle
                        : navItemStyle
                    }>
                    <BiLogoVenmo
                      className={
                        selected === '資料視覺化'
                          ? selectedIconStyle
                          : iconStyle
                      }
                    />
                    <h3
                      className={
                        selected === '資料視覺化'
                          ? selectedNameStyle
                          : nameStyle
                      }>
                      資料視覺化
                    </h3>
                  </div>
                </Link>
              </div>

              <div className="my-4">
                <div
                  className="
                    group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md border border-gray-200 p-2 pl-5 hover:bg-sky-900 hover:shadow-lg">
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
    </Disclosure>
  );
}

export default SideNavbar;
