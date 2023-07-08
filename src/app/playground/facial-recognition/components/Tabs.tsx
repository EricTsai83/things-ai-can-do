'use client';
import { useState } from 'react';
import { Tab } from '@headlessui/react';
import Link from 'next/link';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface Category {
  id: number;
  title: string;
  desc: string;
  subject: string;
  class: string;
  sampleImgQuery: string;
}

interface Categories {
  [key: string]: Category[];
}

export default function Tabs({ setTabClass }: any) {
  let [categories] = useState<Categories>({
    picture: [
      {
        id: 1,
        title: '範例 1',
        desc: '多個人臉',
        subject: '黃仁勳與蘇姿丰',
        class: '照片',
        sampleImgQuery: '?img=sample-img-1',
      },
      {
        id: 2,
        title: '範例 2',
        desc: '單一人臉',
        subject: 'AWS 範例圖',
        class: '照片',
        sampleImgQuery: '?img=sample-img-2',
      },
    ],
    avatar: [
      {
        id: 1,
        title: '搖滾巨星',
        desc: '男',
        subject: '永遠年輕，永遠熱淚盈眶',
        class: '虛擬人像',
        sampleImgQuery: '?gender=man&age=40',
      },
      {
        id: 2,
        title: '時尚達人',
        desc: '女',
        subject: '我就是時尚的代言人',
        class: '虛擬人像',
        sampleImgQuery: '?gender=woman&age=36',
      },
      {
        id: 3,
        title: '傑出青年',
        desc: '男',
        subject: '我不去和別人比較，我要創造自己的歷史，繼續超越自己',
        class: '虛擬人像',
        sampleImgQuery: '?gender=man&age=28',
      },
      {
        id: 4,
        title: '傑出女性',
        desc: '女',
        subject: '權力不是被給予的，而是自己爭取來的',
        class: '虛擬人像',
        sampleImgQuery: '?gender=woman&age=18',
      },
    ],
  });

  return (
    <div className="w-full">
      <Tab.Group defaultIndex={0}>
        <Tab.List className="flex space-x-1 rounded-xl bg-slate-200 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              onClick={() => {
                console.log(category);
                setTabClass(category);
              }}
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-lg font-medium leading-5 text-teal-600',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-teal-200 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-teal-50 shadow'
                    : 'text-teal-500 hover:bg-white/[0.12] hover:text-teal-600',
                )
              }>
              {categories[category][0].class}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400',
                'focus:outline-none focus:ring-2',
              )}>
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="
                      relative rounded-md p-3 hover:bg-gray-100">
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{post.desc}</li>
                      <li>&middot;</li>
                      <li>{post.subject}</li>
                    </ul>

                    <Link
                      href={`/playground/facial-recognition/${post.sampleImgQuery}`}
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2',
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
