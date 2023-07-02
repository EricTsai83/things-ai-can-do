'use client';
import { useState, useRef, ChangeEvent } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { useImmer } from 'use-immer';
import convertImageToBase64 from '@/utils/convert-image-to-base64';
import type { FaceDetail } from '../types';
import drawFacialResultOnImg from '@/utils/draw-facial-recognition-result-on-image';

interface Props {
  faceDetails: FaceDetail[] | null;
  setFaceDetails: Dispatch<SetStateAction<FaceDetail[] | null>>;
  imageSrc: string | null;
  setImageSrc: Dispatch<SetStateAction<string | null>>;
}

function MyDropzone({
  faceDetails,
  setFaceDetails,
  imageSrc,
  setImageSrc,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageBase64String, setImageBase64String] = useImmer<any>({});
  const [marksUsed, setMarksUsed] = useState<string[]>([]);
  const [landmarks, setLandmarks] = useState<string[]>();
  const [canvasUrls, setCanvasUrls] = useState<string | null>(null); // 存畫圖的url

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      const base64String = await convertImageToBase64(imageFile);
      setImageBase64String((draft: any) => {
        draft[imageUrl] = base64String;
      });
      setFaceDetails(null);
      setCanvasUrls(null);
      setImageSrc(imageUrl);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      const base64String = await convertImageToBase64(imageFile);
      setImageBase64String((draft: any) => {
        draft[imageUrl] = base64String;
      });
      setImageSrc(imageUrl);
      event.target.value = '';
    }
  };

  async function getFacialRecognition(data: string) {
    const res = await fetch('/api/aws', {
      method: 'POST',
      body: JSON.stringify({ image_base64: data }),
    });
    const facialRecoRes = await res.json();
    console.log(facialRecoRes);
    setFaceDetails(facialRecoRes.Tags.FaceDetails);

    const marks = await facialRecoRes.Tags.FaceDetails[0].Landmarks.map(
      (landmark: any) => landmark.Type,
    );
    setLandmarks(marks);
  }

  async function asyncDrawFacialResultOnImg(faceDetails: FaceDetail[]) {
    console.log(marksUsed);
    if (imageSrc && faceDetails) {
      const newImageUrl = await drawFacialResultOnImg(
        imageSrc,
        faceDetails,
        marksUsed,
      );
      setCanvasUrls(newImageUrl);
    }
  }

  async function handleChange(event: ChangeEvent) {
    const target = event.target as HTMLInputElement;
    const itemName = target.name;
    const isChecked = target.checked;

    if (isChecked) {
      setMarksUsed((prev) => [...prev, itemName]);
    } else {
      setMarksUsed((prev) => prev.filter((item) => item !== itemName));
    }
  }

  return (
    <div>
      <div // dropzone
        className="relative flex h-[600px] w-[900px] items-center justify-center border-2 border-dashed border-black object-contain"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleBoxClick}>
        {imageSrc && (
          <div className="absolute">
            <Image
              className="h-auto max-h-[600px] w-auto max-w-[900px]"
              src={canvasUrls ? canvasUrls : imageSrc}
              alt="Image"
              width={0}
              height={0}
            />
          </div>
        )}
        {!imageSrc && 'Drop image or click here to uploag image'}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleUpload}
          className="absolute -left-full"
        />
      </div>

      <button
        className="h-[40px] w-[200px] border bg-zinc-300"
        onClick={(): void => {
          console.log('正在打...');
          imageSrc && getFacialRecognition(imageBase64String[imageSrc]);
        }}>
        打API
      </button>

      <fieldset>
        <legend>點我選臉部偵測點</legend>
        {landmarks &&
          landmarks.map((landmark) => {
            return (
              <div key={`${landmark}`}>
                <input
                  type="checkbox"
                  id={landmark}
                  name={landmark}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor={landmark}>{landmark}</label>
              </div>
            );
          })}
      </fieldset>

      <button
        className="border bg-slate-400"
        onClick={async () => {
          faceDetails && (await asyncDrawFacialResultOnImg(faceDetails));
        }}>
        在我臉上畫個龍
      </button>
    </div>
  );
}

export default MyDropzone;
