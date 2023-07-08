'use client';
// import { useState } from 'react';
// import FacialRecognition from './components/FacialRecognition';
import MyDropzone from './components/MyDropzone';
// import ImageMask from './components/ImageMask';
import type { FaceDetail } from './types';
import type { SearchParams } from '../types';
import { SelectOption } from './components/Select';

interface Props {
  selectOption: SelectOption[];
  searchParams: SearchParams;
  faceDetails: FaceDetail[] | null;
  setFaceDetails: any;
  imageSrc: string | null;
  setImageSrc: any;
  canvasUrls: any;
  setCanvasUrls: any;
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
  // const [faceDetails, setFaceDetails] = useState<FaceDetail[] | null>(null);
  // const [imageSrc, setImageSrc] = useState<string | null>(null);

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
      {/* <ImageMask imageSrc={imageSrc} faceDetails={faceDetails} /> */}
    </div>
  );
}

export default AwsFacialRecognition;
