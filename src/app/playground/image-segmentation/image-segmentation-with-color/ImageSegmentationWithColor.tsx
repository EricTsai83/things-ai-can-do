'use client';
import { useState, useRef } from 'react';
import type { DragEvent, ChangeEvent } from 'react';
import { useImmer } from 'use-immer';
import Image from 'next/image'; // the img element will automatically be assigned the position: "absolute" style.
import ColorMask from './components/ColorMask';
import Mask from './components/Mask';
import getUniqueColorsInPNG from '@/utils/get-unique-colors-in-png';
import type { UniqueColorsInPng } from '@/utils/get-unique-colors-in-png';
import huggingFaceApi from '@/utils/hugging-face-api';

interface ImageBlob {
  [key: string]: File;
}

export interface Respond {
  score: number;
  label: string;
  mask: string;
}

interface Masks {
  [key: string]: Respond[];
}

function Page() {
  // 1. 取得照片的 blob
  // 2. 建立照片 reference URL
  // 3. 建構一個 state 可以儲存 {reference url: image blob}
  const [imageBlob, setImageBlob] = useImmer<ImageBlob>({});
  const [imageSrc, setImageSrc] = useState<string | null>(null); // 用來記錄當下dropzone 展示哪一張照片
  const [droppedImages, setDroppedImages] = useState<string[]>([]); // 用來記錄dropzone 下方小圖展示的圖片有哪些
  const fileInputRef = useRef<HTMLInputElement>(null); // 用來讓 dropdown zone 可以點擊up load file
  const [masks, setMasks] = useImmer<Masks>({}); // set api data
  const [maskUniqueColors, setMaskUniqueColors] =
    useState<UniqueColorsInPng | null>(null);

  async function getImageSegmentation(data: File) {
    const respond = await huggingFaceApi.getImageSegmentation(data);
    console.log(respond);
    await storeMaskData(respond);
    await setUniqueColorsInPNG(respond);
  }

  async function storeMaskData(apiRespond: any) {
    setMasks((draft: Masks) => {
      if (imageSrc) {
        draft[imageSrc] = apiRespond;
      }
      return draft;
    });
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setImageBlob((draft: ImageBlob) => {
        draft[imageUrl] = imageFile;
        return draft;
      });
      setImageSrc(imageUrl);
      setDroppedImages((prevImages) => [...prevImages, imageUrl]);
    }
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleSmallImageClick(imageUrl: string) {
    setMasks({});
    setImageSrc(imageUrl);
  }

  function handleBoxClick() {
    fileInputRef.current?.click();
  }

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setImageSrc(imageUrl);
      setDroppedImages((prevImages) => [...prevImages, imageUrl]);
      event.target.value = ''; // Reset the file input field
    }
  }

  async function setUniqueColorsInPNG(respond: any) {
    if (imageSrc) {
      const uniqueColors = await getUniqueColorsInPNG(respond[0].mask);
      setMaskUniqueColors(uniqueColors as UniqueColorsInPng);
      console.log('set color completed');
    }
  }

  return (
    <div>
      <div
        className="
          relative mb-6 flex h-[360px] w-full 
          min-w-[360px] items-center 
          justify-center border-2 border-dashed
        border-black object-contain"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleBoxClick}>
        {imageSrc && (
          <div className="absolute">
            {masks[imageSrc] && (
              <ColorMask
                // @ts-ignore
                segmentations={masks[imageSrc] as Respond}
                maskUniqueColors={maskUniqueColors as UniqueColorsInPng}
              />
            )}
            <Image
              src={imageSrc}
              alt="Image"
              width={600}
              height={600}
              className="max-h-[360px] w-auto"
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
      <div className="flex h-20 w-[900px] items-center justify-center border-black">
        {droppedImages.map((imageUrl, index) => (
          <Image
            key={index}
            src={imageUrl} // next js required
            alt={`Small Image ${index + 1}`} // next js required
            className="mr-2 cursor-pointer border border-black"
            width={80}
            height={80}
            onClick={() => handleSmallImageClick(imageUrl)}
          />
        ))}
      </div>
      <button
        className="h-[100px] w-[100px] border border-gray-500"
        onClick={async () => {
          if (imageSrc) {
            // setMaskUniqueColors(null);
            await getImageSegmentation(imageBlob[imageSrc]);
          }
        }}>
        點我幹大事
      </button>

      {/* <div
        className="h-[40px] w-[80px] bg-cyan-300"
        onClick={setUniqueColorsInPNG}>
        點我上色彩
      </div> */}

      <Mask // @ts-ignore
        segmentations={masks[imageSrc] as Respond}
      />
    </div>
  );
}

export default Page;
