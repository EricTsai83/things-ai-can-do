'use client';
import { useState } from 'react';
import FacialRecognition from './components/FacialRecognition';
import MyDropzone from './components/MyDropzone';

import ImageMask from './components/ImageMask';

export interface FaceDetail {
  AgeRange: { [key: string]: number };
  beard: { Confidence: number; Value: boolean };
  BoundingBox: { [key: string]: number };
  Emotions: Array<{ Type: string; Confidence: number }>;
  Eyeglasses: { Confidence: number; Value: boolean };
  EyesOpen: { Confidence: number; Value: boolean };
  FaceOccluded: { Confidence: number; Value: boolean };
  Gender: { Confidence: number; Value: boolean };
  Landmarks: Array<{ Type: string; X: number; Y: number }>;
  MouthOpen: { Confidence: number; Value: boolean };
  Mustache: { Confidence: number; Value: boolean };
  Pose: { [key: string]: number };
  Quality: { [key: string]: number };
  Smile: { Confidence: number; Value: boolean };
  Sunglasses: { Confidence: number; Value: boolean };
}

function Page() {
  const [faceDetails, setFaceDetails] = useState<FaceDetail | null>(null);
  const [imageSrc, setImageSrc] = useState<any>(null);

  return (
    <div>
      <MyDropzone
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
        setFaceDetails={setFaceDetails}
      />

      <ImageMask imageSrc={imageSrc} faceDetails={faceDetails} />
      <FacialRecognition faceDetails={faceDetails} />
    </div>
  );
}

export default Page;
