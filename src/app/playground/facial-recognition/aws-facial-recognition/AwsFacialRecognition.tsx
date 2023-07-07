'use client';
import { useState } from 'react';
// import FacialRecognition from './components/FacialRecognition';
import MyDropzone from './components/MyDropzone';
import ImageMask from './components/ImageMask';
import type { FaceDetail } from './types';
import type { SearchParams } from '../types';

// searchParams: next default 用來引入 query string 的參數，只能在 page 使用
function AwsFacialRecognition({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [faceDetails, setFaceDetails] = useState<FaceDetail[] | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  return (
    <div className="">
      <MyDropzone
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
        faceDetails={faceDetails}
        setFaceDetails={setFaceDetails}
        searchParams={searchParams}
      />
      <ImageMask imageSrc={imageSrc} faceDetails={faceDetails} />
    </div>
  );
}

export default AwsFacialRecognition;
