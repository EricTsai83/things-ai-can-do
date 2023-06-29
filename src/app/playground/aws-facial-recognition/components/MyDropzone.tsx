'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useImmer } from 'use-immer';
import convertImageToBase64 from '@/utils/convert-image-to-base64';

const MyDropzone = ({ setFaceDetails, imageSrc, setImageSrc }: any) => {
  const [imageSrcRecords, setImageSrcRecords] = useState<any>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageBase64String, setImageBase64String] = useImmer<any>({});

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
        className="relative flex h-[600px] w-[900px] items-center justify-center border-2 border-dashed border-black object-contain"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleBoxClick}>
        {imageSrc && (
          <div className="absolute">
            <Image
              className="h-auto max-h-[600px] w-auto max-w-[900px]"
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
        className="flex h-[80px] w-[900px] items-center justify-center border-black">
        {imageSrcRecords &&
          imageSrcRecords.map((imageSrc: any, idx: any) => {
            return (
              <Image
                className="mr-2 h-auto w-[80px] cursor-pointer border border-black"
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
        className="h-[40px] w-[200px] border bg-zinc-300"
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
