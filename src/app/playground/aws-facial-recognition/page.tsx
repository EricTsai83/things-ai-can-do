'use client';
import { useState } from 'react';
// import FacialRecognition from './components/FacialRecognition';
import MyDropzone from './components/MyDropzone';
import ImageMask from './components/ImageMask';
import type { FaceDetail } from './types';

function Page() {
  const [faceDetails, setFaceDetails] = useState<FaceDetail[] | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  return (
    <div className="pt-16">
      <MyDropzone
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
        faceDetails={faceDetails}
        setFaceDetails={setFaceDetails}
      />
      <ImageMask imageSrc={imageSrc} faceDetails={faceDetails} />
    </div>
  );
}

export default Page;
