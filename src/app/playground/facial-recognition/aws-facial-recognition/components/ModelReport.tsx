import { Disclosure } from '@headlessui/react';
import { useState } from 'react';
import { FaceDetail } from '../types';
import { SelectOption } from './Select';
import ImageMask from './ImageMask';
import cutFaceOnImage from '@/utils/cut-face-on-image';
import drawFacialResultOnImg from '@/utils/draw-facial-recognition-result-on-image';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { ImCross, ImCheckmark } from 'react-icons/im';
import { GiClick } from 'react-icons/gi';
import { IoIosRefreshCircle } from 'react-icons/io';

interface Props {
  faceDetails: FaceDetail[] | null;
  imageSrc: string | null;
  selectOption: SelectOption[];
  setCanvasUrls: any;
}

export default function ModelReport({
  faceDetails,
  selectOption,
  imageSrc,
  setCanvasUrls,
}: Props) {
  const [faceUrls, setFaceUrls] = useState<string[]>([]);

  async function asyncDrawFacialResultOnImg(faceDetails: FaceDetail[]) {
    console.log(selectOption);
    if (imageSrc && faceDetails && selectOption) {
      const marksUsed = selectOption.map((element) => element.label);
      const newImageUrl = await drawFacialResultOnImg(
        imageSrc,
        faceDetails,
        marksUsed,
      );
      setCanvasUrls(newImageUrl);
    }
  }

  async function asyncCutFaceOnImage(faceDetail: FaceDetail) {
    if (imageSrc && faceDetail) {
      const faceImageUrl = await cutFaceOnImage(imageSrc, faceDetail);
      setFaceUrls((prev) => [...prev, faceImageUrl]);
    }
  }

  return (
    <div className="flex min-h-[800px] w-full pt-10">
      <div className="mx-auto w-full min-w-[85%] rounded-2xl bg-white p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                onClick={() => {
                  faceDetails && asyncDrawFacialResultOnImg(faceDetails);
                }}
                className="
                  flex w-full items-center justify-between rounded-lg
                bg-teal-50 px-4 py-2 text-left text-lg font-medium
                text-teal-600
                hover:bg-teal-100 focus:outline-none
                  focus-visible:ring focus-visible:ring-teal-200
                  focus-visible:ring-opacity-75 ">
                <span className="flex items-center text-xl">
                  顯示臉部偵測點在圖片上
                  <IoIosRefreshCircle
                    onClick={(event) => {
                      event.stopPropagation();
                      faceDetails && asyncDrawFacialResultOnImg(faceDetails);
                    }}
                    className="z-10 ml-3 cursor-pointer text-2xl text-green-600 hover:text-3xl"
                  />
                </span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-8 w-8 text-teal-600`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="flex px-6 pb-2 pt-4 text-sm text-gray-500">
                {faceDetails ? (
                  <div className="flex">
                    <div className="group relative">
                      <div
                        className="
                          absolute -left-8 top-8 hidden w-32 border border-gray-300
                        bg-white p-2 text-center
                          group-hover:block">
                        刷新臉部偵測點
                      </div>
                    </div>

                    <p className="flex">
                      <ImCheckmark className="text-2xl text-green-600" />
                      <p className="ml-2 flex items-center justify-center">
                        已完成繪製臉部偵測框與臉部偵測點
                      </p>
                    </p>
                  </div>
                ) : (
                  <div className="flex">
                    <ImCross className="text-2xl text-red-600" />
                    <p className="ml-2 flex items-center justify-center">
                      顯示失敗: 請先上傳圖片後，點擊模型推論的按鈕喔！
                    </p>
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button
                onClick={() => {
                  setFaceUrls([]);
                  // 在此示例中，我們使用array.reduce 方法來檢索吞吐量，並在每個元素上執行異步函數 asyncFunction。
                  // reduce方法的回調函數接收兩個參數：previousPromise和data。previousPromise表示前一個異步
                  // 函數的返回值，而data寫入當前元素的值。我們使用await previousPromise來等待前一個異步函數的完成
                  // ，然後使用await asyncFunction(data)來執行當前元素對應的異步函數。
                  // 通過這種方式，你可以確保異步函數按照隊列中的順序依次執行，並且每個異步函數都使用相應的數據作為輸入。

                  faceDetails &&
                    faceDetails.reduce(async (previousPromise, faceDetail) => {
                      await previousPromise;
                      await asyncCutFaceOnImage(faceDetail);
                    }, Promise.resolve());
                }}
                className="
                flex w-full items-center justify-between rounded-lg bg-teal-50
                px-4 py-2 text-left text-lg font-medium text-teal-600
                hover:bg-teal-100 focus:outline-none focus-visible:ring
                focus-visible:ring-teal-200 focus-visible:ring-opacity-75">
                <span className="flex items-center text-xl">
                  臉部分析模型推論結果
                  <IoIosRefreshCircle
                    onClick={(event) => {
                      event.stopPropagation();
                      setFaceUrls([]);
                      faceDetails &&
                        faceDetails.reduce(
                          async (previousPromise, faceDetail) => {
                            await previousPromise;
                            await asyncCutFaceOnImage(faceDetail);
                          },
                          Promise.resolve(),
                        );
                    }}
                    className="z-10 ml-3 cursor-pointer text-2xl text-green-600 hover:text-3xl"
                  />
                </span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-8 w-8 text-teal-600`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="flex flex-col items-start px-6 pb-2 pt-4 text-sm text-gray-500">
                {faceDetails ? (
                  <div className="w-full">
                    <div className="flex">
                      <GiClick className="text-2xl text-cyan-600" />
                      <p className="mb-4 ml-1 flex items-center justify-center">
                        點擊頭像取得進一步的結果
                      </p>
                    </div>
                    <div>
                      <ImageMask
                        faceDetails={faceDetails}
                        faceUrls={faceUrls}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <ImCross className="text-2xl text-red-600" />
                    <p className="ml-2 flex items-center justify-center">
                      分析失敗: 請先上傳圖片後，點擊模型推論的按鈕喔！
                    </p>
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
