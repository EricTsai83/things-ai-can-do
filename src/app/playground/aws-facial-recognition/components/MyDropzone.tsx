'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';

import convertImageToBase64 from '@/utils/convert-image-to-base64';

const MyDropzone = ({
  setFaceDetails,
  imageBase64String,
  setImageBase64String,
}: any) => {
  const [imageSrc, setImageSrc] = useState<any>(null);
  const [imageSrcRecords, setImageSrcRecords] = useState<any>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      const base64String = await convertImageToBase64(imageFile);
      setImageBase64String((draft: any) => {
        draft[imageUrl] = base64String;
      });
      setImageSrc(imageUrl);
      setImageSrcRecords((prev: any) => [...prev, imageUrl]);
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
      setImageSrcRecords((prev: any) => [...prev, imageUrl]);
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
  }

  return (
    <div>
      <div // dropzone
        className="object-contain border-dashed border-2 border-black w-[900px] h-[600px] flex justify-center items-center relative"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleBoxClick}>
        {imageSrc && (
          <div className="absolute">
            <Image
              className="w-auto h-auto max-w-[900px] max-h-[600px]"
              src={imageSrc}
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
      <div // small image preview
        className="border-black w-[900px] h-[80px] flex justify-center items-center">
        {imageSrcRecords &&
          imageSrcRecords.map((imageSrc: any, idx: any) => {
            return (
              <Image
                className="border border-black mr-2 cursor-pointer w-[80px] h-auto"
                onClick={() => {
                  setImageSrc(imageSrc);
                }}
                key={idx}
                src={imageSrc} // next js required
                alt=""
                // className="border border-black mr-2 cursor-pointer"
                width={0}
                height={0}
              />
            );
          })}
      </div>

      <button
        className="border bg-zinc-300 w-[200px] h-[40px]"
        onClick={(): void => {
          console.log('正在打...');
          getFacialRecognition(imageBase64String[imageSrc]);
        }}>
        打API
      </button>
    </div>
  );
};

export default MyDropzone;
