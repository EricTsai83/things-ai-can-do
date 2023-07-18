'use client';
import MyDropzone from './components/MyDropzone';
import type { FaceDetail } from './types';
import type { SearchParams } from '../types';
import { SelectOption } from './components/Select';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  selectOption: SelectOption[];
  searchParams: SearchParams;
  faceDetails: FaceDetail[] | null;
  setFaceDetails: Dispatch<SetStateAction<FaceDetail[] | null>>;
  imageSrc: string | null;
  setImageSrc: Dispatch<SetStateAction<string | null>>;
  canvasUrls: string | null;
  setCanvasUrls: Dispatch<SetStateAction<string | null>>;
}

// searchParams: next default 用來引入 query string 的參數，只能在 page 使用
function AwsFacialRecognition({
  selectOption,
  searchParams,
  faceDetails,
  setFaceDetails,
  imageSrc,
  setImageSrc,
  canvasUrls,
  setCanvasUrls,
}: Props) {
  return (
    <div className="flex w-full flex-col">
      <MyDropzone
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
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
