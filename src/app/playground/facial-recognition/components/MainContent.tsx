'use client';

import { useState } from 'react';
import type { SelectOption } from '@/components/Select';
import { Select } from '@/components/Select';
import AvatarBox from '../avatar/AvatarBox';
import AwsFacialRecognition from '../aws-facial-recognition/AwsFacialRecognition';
import ModelReport from '../aws-facial-recognition/components/ModelReport';
import options from '../aws-facial-recognition/components/select-option-config';
import { FaceDetail } from '../aws-facial-recognition/types';
import Tabs from '../components/Tabs';
import type { SearchParams } from '../types';

interface Props {
  searchParams: SearchParams;
}

function MainContent({ searchParams }: Props) {
  const [tabClass, setTabClass] = useState<string>('picture');
  const [selectOption, setSelectOption] = useState<SelectOption[]>([
    options[0],
  ]);
  const [faceDetails, setFaceDetails] = useState<FaceDetail[] | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [canvasUrls, setCanvasUrls] = useState<string | null>(null);
  return (
    <>
      <div className="flex w-full flex-col-reverse items-start gap-6 md:flex-row ">
        {tabClass === 'picture' ? (
          <AwsFacialRecognition
            searchParams={searchParams}
            selectOption={selectOption}
            faceDetails={faceDetails}
            setFaceDetails={setFaceDetails}
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
            canvasUrls={canvasUrls}
            setCanvasUrls={setCanvasUrls}
          />
        ) : (
          <AvatarBox searchParams={searchParams} />
        )}
        <div className="flex w-full flex-col items-end gap-6">
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
          imgSrc={imgSrc}
          selectOption={selectOption}
          setCanvasUrls={setCanvasUrls}
        />
      )}
    </>
  );
}

export default MainContent;
