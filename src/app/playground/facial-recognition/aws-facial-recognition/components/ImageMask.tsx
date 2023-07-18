'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { FaceDetail } from '../types';
import FacialRecognition from './FacialRecognition';
import MoodPieChart from './MoodPieChart';
import { div } from '@tensorflow/tfjs';

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
    <div className="flex flex-col items-center justify-center md:flex-row">
      <div className="flex w-full max-w-[360px] flex-col ">
        <div className="flex gap-2">
          {faceUrls &&
            faceUrls.map((faceUrl, idx) => {
              return (
                <Image
                  className="cursor-pointer"
                  onClick={() => showFaceAnalysisResult(idx)}
                  key={idx}
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
          ${faceAnalysis ? '' : 'invisible w-[450px] '}
          flex justify-center`}>
        <MoodPieChart faceAnalysis={faceAnalysis} />
      </div>
    </div>
  );
}

export default ImageMask;
