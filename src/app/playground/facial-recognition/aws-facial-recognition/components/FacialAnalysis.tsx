'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { FaceDetail } from '../types';
import FacialFeatureTable from './FacialFeatureTable';
import FacialMoodPieChart from './FacialMoodPieChart';

interface Props {
  faceDetails: FaceDetail[] | null;
  faceUrls: string[];
}

function FacialAnalysis({ faceDetails, faceUrls }: Props) {
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
        {faceAnalysis && <FacialFeatureTable faceAnalysis={faceAnalysis} />}
      </div>

      <div
        className={`
          ${faceAnalysis ? 'w-[450px]' : 'invisible w-[450px] '}
          `}>
        <FacialMoodPieChart faceAnalysis={faceAnalysis} />
      </div>
    </div>
  );
}

export default FacialAnalysis;
