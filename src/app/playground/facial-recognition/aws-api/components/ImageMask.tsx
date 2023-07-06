'use client';
import { useState } from 'react';
import Image from 'next/image';
import cutFaceOnImage from '@/utils/cut-face-on-image';
import type { FaceDetail } from '../types';
import FacialRecognition from './FacialRecognition';
import MoodPieChart from './MoodPieChart';

interface Props {
  faceDetails: FaceDetail[] | null;
  imageSrc: string | null;
}

function ImageMask({ imageSrc, faceDetails }: Props) {
  const [faceUrls, setFaceUrls] = useState<string[]>([]);
  const [faceAnalysis, setFaceAnalysis] = useState<FaceDetail | null>(null);

  async function asyncCutFaceOnImage(faceDetail: FaceDetail) {
    if (imageSrc && faceDetail) {
      const faceImageUrl = await cutFaceOnImage(imageSrc, faceDetail);
      setFaceUrls((prev) => [...prev, faceImageUrl]);
    }
  }

  async function showFaceAnalysisResult(idx: number) {
    console.log(idx);
    faceDetails && setFaceAnalysis(faceDetails[idx]);
  }

  return (
    <>
      <button
        className="border bg-slate-400"
        onClick={() => {
          setFaceUrls([]);

          // 在这个示例中，我们使用array.reduce方法来遍历数组，并在每个元素上执行异步函数asyncFunction。
          // reduce方法的回调函数接收两个参数：previousPromise和data。previousPromise表示前一个异步
          // 函数的返回值，而data则是当前元素的值。我们使用await previousPromise来等待前一个异步函数的完成
          // ，然后使用await asyncFunction(data)来执行当前元素对应的异步函数。
          // 通过这种方式，你可以确保异步函数按照数组中的顺序依次执行，并且每个异步函数都使用相应的数据作为输入。

          faceDetails &&
            faceDetails.reduce(async (previousPromise, faceDetail) => {
              await previousPromise;
              await asyncCutFaceOnImage(faceDetail);
            }, Promise.resolve());
        }}>
        點我看詳情
      </button>
      {faceUrls &&
        faceUrls.map((faceUrl, idx) => {
          return (
            <Image
              onClick={() => showFaceAnalysisResult(idx)}
              key={idx}
              src={faceUrl}
              alt=""
              width={100}
              height={100}
            />
          );
        })}
      {faceAnalysis && <FacialRecognition faceAnalysis={faceAnalysis} />}
      <MoodPieChart faceAnalysis={faceAnalysis} />
    </>
  );
}

export default ImageMask;
