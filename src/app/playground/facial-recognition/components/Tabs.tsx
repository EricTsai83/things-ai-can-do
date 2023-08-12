'use client';

import { useRouter } from 'next/navigation';
import { Tab } from '@headlessui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import classNames from '@/utils/tailwind-class-name-formatter';
import { FaceDetail } from '../aws-facial-recognition/types';
import categories from './categories';

interface Props {
  setTabClass: Dispatch<SetStateAction<string>>;
  setFaceDetails: Dispatch<SetStateAction<FaceDetail[] | null>>;
  setCanvasUrls: Dispatch<SetStateAction<string | null>>;
}

export default function Tabs({
  setTabClass,
  setFaceDetails,
  setCanvasUrls,
}: Props) {
  const router = useRouter();

  return (
    <div className="w-full">
      <Tab.Group defaultIndex={0}>
        <Tab.List className="flex w-full space-x-1 rounded-xl bg-slate-200 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              onClick={() => {
                setTabClass(category);
              }}
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-lg font-medium leading-5 text-teal-600 ssm:text-2xl',
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
                    <h3 className="text-lg font-medium leading-5">
                      {post.title}
                    </h3>

                    <ul className="mt-3 flex space-x-1 text-base font-normal leading-4 text-gray-500">
                      <li>{post.desc}</li>
                      <li>&middot;</li>
                      <li>{post.subject}</li>
                    </ul>

                    <div
                      className={classNames(
                        'absolute inset-0 cursor-pointer rounded-md',
                        'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2',
                      )}
                      onClick={() => {
                        setFaceDetails(null);
                        setCanvasUrls(null);
                        router.push(
                          `/playground/facial-recognition/${post.sampleImgQuery}`,
                          { shallow: true },
                        );
                      }}></div>
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
