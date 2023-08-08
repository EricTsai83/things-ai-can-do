'use client';

import { Dispatch, SetStateAction } from 'react';
import type { SelectOption } from '@/components/Select';
import type { SearchParams } from '../types';
import Dropzone from './components/Dropzone';
import type { FaceDetail } from './types';

interface Props {
  selectOption: SelectOption[];
  searchParams: SearchParams;
  faceDetails: FaceDetail[] | null;
  setFaceDetails: Dispatch<SetStateAction<FaceDetail[] | null>>;
  imgSrc: string | null;
  setImgSrc: Dispatch<SetStateAction<string | null>>;
  canvasUrls: string | null;
  setCanvasUrls: Dispatch<SetStateAction<string | null>>;
}

function AwsFacialRecognition({
  selectOption,
  searchParams,
  faceDetails,
  setFaceDetails,
  imgSrc,
  setImgSrc,
  canvasUrls,
  setCanvasUrls,
}: Props) {
  return (
    <div className="flex w-full flex-col">
      <Dropzone
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        faceDetails={faceDetails}
        setFaceDetails={setFaceDetails}
        selectOption={selectOption}
        searchParams={searchParams}
        canvasUrls={canvasUrls}
        setCanvasUrls={setCanvasUrls}
      />
    </div>
  );
}

export default AwsFacialRecognition;
