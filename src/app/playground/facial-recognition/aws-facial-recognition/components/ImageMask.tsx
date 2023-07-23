'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { FaceDetail } from '../types';
import FacialRecognition from './FacialRecognition';
import MoodPieChart from './MoodPieChart';

interface Props {
  faceDetails: FaceDetail[] | null;
  faceUrls: string[];
}

function ImageMask({ faceDetails, faceUrls }: Props) {
  const [faceAnalysis, setFaceAnalysis] = useState<FaceDetail | null>(null);

  async function showFaceAnalysisResult(idx: number) {
    console.log(idx);
    faceDetails && setFaceAnalysis(faceDetails[idx]);
  }

  return (
    <div className="flex flex-col items-start justify-center md:flex-row">
      <div className="flex w-full max-w-[400px] flex-col ">
        <div className="flex gap-2">
          {faceUrls &&
            faceUrls.map((faceUrl, idx) => {
              return (
                <Image
                  className="cursor-pointer"
                  onClick={() => showFaceAnalysisResult(idx)}
                  key={`face_${idx}`}
                  src={faceUrl}
                  alt=""
                  width={100}
                  height={100}
                />
              );
            })}
        </div>
        {faceAnalysis && <FacialRecognition faceAnalysis={faceAnalysis} />}
      </div>

      <div
        className={`
          ${faceAnalysis ? 'w-[450px]' : 'invisible w-[450px] '}
          `}>
        <MoodPieChart faceAnalysis={faceAnalysis} />
      </div>
    </div>
  );
}

export default ImageMask;
