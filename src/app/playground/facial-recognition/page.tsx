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

function Page({ searchParams }: { searchParams: SearchParams }) {
  const [tabClass, setTabClass] = useState<string>('picture');
  const [selectOption, setSelectOption] = useState<SelectOption[]>([
    options[0],
  ]);
  const [faceDetails, setFaceDetails] = useState<FaceDetail[] | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [canvasUrls, setCanvasUrls] = useState<string | null>(null); // 存畫圖的url

  return (
    <div className="flex w-screen flex-col px-16 pt-24 xl:w-[calc(100vw-240px)]">
      <div className="flex w-full gap-6">
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
          <Tabs setTabClass={setTabClass} />
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
