'use client';
import { useEffect, useState, useCallback } from 'react';
import { FaceDetail } from '../page';
import Image from 'next/image';
import drawBoundingBoxOnFace from '@/utils/draw-bounding-box-on-face';
import { Event } from 'three';

const ImageMask = ({ imageSrc, faceDetails }: any) => {
  const [faceUrls, setFaceUrls] = useState<string | null>(null);
  const [landmarks, setLandmarks] = useState<any>();
  const [marksUsed, setMarksUsed] = useState<any>([]);

  async function asyncDrawBoundingBoxOnFace() {
    const imageUrls = await drawBoundingBoxOnFace(
      imageSrc,
      faceDetails[0],
      marksUsed,
    );

    setFaceUrls(imageUrls);
    const marks = faceDetails.map((faceDetail: any) => faceDetail.Landmarks);
    setLandmarks(marks);
  }

  async function handleChange(e: Event) {
    const itemName = e.target.name;
    const isChecked = e.target.checked;

    if (isChecked) {
      setMarksUsed((prev: any) => [...prev, itemName]);
    } else {
      setMarksUsed((prev: any) =>
        prev.filter((item: string) => item !== itemName),
      );
    }
  }

  return (
    <>
      {faceUrls && <Image src={faceUrls} alt="" width={150} height={150} />}
      <button
        className="border bg-slate-400"
        onClick={asyncDrawBoundingBoxOnFace}>
        點我畫 Bounding Box
      </button>
      <button
        className="border bg-slate-400"
        onClick={asyncDrawBoundingBoxOnFace}>
        我來看看點了哪些
      </button>

      <fieldset>
        <legend>點我選臉部偵測點</legend>
        {landmarks &&
          landmarks.map((landmark: any, idx1: any) => {
            return landmark.map((faceItem: any, idx2: any) => {
              return (
                <div key={`${idx1}_${idx2}`}>
                  <input
                    type="checkbox"
                    id={faceItem.Type}
                    name={faceItem.Type}
                    onChange={async (e) => {
                      await handleChange(e);
                    }}
                  />
                  <label htmlFor={faceItem.Type}>{faceItem.Type}</label>
                </div>
              );
            });
          })}
      </fieldset>
    </>
  );
};

export default ImageMask;
