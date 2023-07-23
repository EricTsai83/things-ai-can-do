'use client';
import { useState } from 'react';
import AwsFacialRecognition from './aws-facial-recognition/AwsFacialRecognition';
import AvatarBox from './avatar/AvatarBox';
import Tabs from './components/Tabs';
import type { SearchParams } from './types';
import {
  Select,
  SelectOption,
} from './aws-facial-recognition/components/Select';
import options from './aws-facial-recognition/components/select-option-config';
import ModelReport from './aws-facial-recognition/components/ModelReport';
import { FaceDetail } from './aws-facial-recognition/types';
import PageTitle from '@/components/PageTitle';
import { LuScanFace } from 'react-icons/lu';

function Page({ searchParams }: { searchParams: SearchParams }) {
  const [tabClass, setTabClass] = useState<string>('picture');
  const [selectOption, setSelectOption] = useState<SelectOption[]>([
    options[0],
  ]);
  const [faceDetails, setFaceDetails] = useState<FaceDetail[] | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [canvasUrls, setCanvasUrls] = useState<string | null>(null);

  return (
    <div className="flex w-screen flex-col px-16 pt-24 xl:w-[calc(100vw-240px)]">
      <PageTitle
        title="臉部識別"
        content="
        臉部識別就像是一個神奇的魔法鏡！它是一種先進的技術，能夠辨識和辨別人們的臉部特徵。
        就像你的指紋獨一無二一樣，每個人的臉部也有獨特的特徵，像是眼睛、鼻子、嘴巴的形狀和位置等。
        它在現實生活中也有很多實用的應用。例如，可以用於安全控制，確保只有授權人員才能進入特定區域；
        也可以用於身份驗證，讓你的手機或電腦只對你開放。
        底下功能能夠深度帶你了解 AI 是如何對你的臉進行分析的，動手玩看看吧！">
        <LuScanFace className="flex items-center justify-center text-5xl text-teal-700" />
      </PageTitle>
      <div className="flex w-full flex-col-reverse gap-6 md:flex-row ">
        {tabClass === 'picture' ? (
          <AwsFacialRecognition
            searchParams={searchParams}
            selectOption={selectOption}
            faceDetails={faceDetails}
            setFaceDetails={setFaceDetails}
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
            canvasUrls={canvasUrls}
            setCanvasUrls={setCanvasUrls}
          />
        ) : (
          <AvatarBox searchParams={searchParams} />
        )}
        <div className="flex w-full min-w-[360px] flex-col items-end gap-6">
          <Tabs
            setTabClass={setTabClass}
            setFaceDetails={setFaceDetails}
            setCanvasUrls={setCanvasUrls}
          />
          {tabClass === 'picture' && (
            <div className="flex w-full flex-col gap-2">
              <h3 className="text-base font-medium text-gray-600">
                偵測點參數選擇
              </h3>
              <Select
                multiple
                options={options}
                value={selectOption}
                onChange={(o) => setSelectOption(o)}
              />
            </div>
          )}
        </div>
      </div>
      {tabClass === 'picture' && (
        <ModelReport
          faceDetails={faceDetails}
          imageSrc={imageSrc}
          selectOption={selectOption}
          setCanvasUrls={setCanvasUrls}
        />
      )}
    </div>
  );
}

export default Page;
