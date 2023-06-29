'use client';
import { useEffect, useState, useCallback } from 'react';
import { FaceDetail } from '../page';
import Image from 'next/image';
import drawBoundingBoxOnFace from '@/utils/draw-bounding-box-on-face';

const ImageMask = ({ imageSrc, faceDetails }: any) => {
  const [faceUrls, setFaceUrls] = useState();

  async function asyncDrawBoundingBoxOnFace() {
    const imageUrls = await drawBoundingBoxOnFace(imageSrc, faceDetails[0]);
    console.log('imageUrls', imageUrls);
    setFaceUrls(imageUrls);
  }

  return (
    <>
      {faceUrls && <Image src={faceUrls} alt="" width={200} height={200} />}
      <button
        className="border bg-slate-400"
        onClick={asyncDrawBoundingBoxOnFace}>
        點我畫 Bounding Box
      </button>
    </>
  );
};

export default ImageMask;
