'use client';
import { useState, useRef } from 'react';
import type { DragEvent, ChangeEvent } from 'react';
import { useImmer } from 'use-immer';
import Image from 'next/image'; // the img element will automatically be assigned the position: "absolute" style.
import ColorMask from './components/ColorMask';
// import Mask from './components/Mask';
import getUniqueColorsInPNG from '@/utils/get-unique-colors-in-png';
import type { UniqueColorsInPng } from '@/utils/get-unique-colors-in-png';
import huggingFaceApi from '@/utils/hugging-face-api';
import LoadingButton from '@/components/LoadingButton';
import { FaUpload } from 'react-icons/fa';

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
  const [loading, setLoading] = useState(false);

  async function getImageSegmentation(data: File) {
    try {
      setLoading(true);
      const respond = await huggingFaceApi.getImageSegmentation(data);
      console.log(respond);
      if (respond.error) {
        window.alert('模型 API 被佔用中，請稍後再試');
      } else {
        await storeMaskData(respond);
        await setUniqueColorsInPNG(respond);
      }
    } catch (e) {
      window.alert('模型 API 被佔用中，請稍後再試');
    } finally {
      setLoading(false);
    }
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
    if (Object.keys(imageBlob).length < 6) {
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
    } else {
      window.alert('最多上傳 6 張圖片喔！');
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
    if (Object.keys(imageBlob).length < 6) {
      const imageFile = event.target.files?.[0];
      if (imageFile) {
        const imageUrl = URL.createObjectURL(imageFile);
        setImageSrc(imageUrl);
        setDroppedImages((prevImages) => [...prevImages, imageUrl]);
        event.target.value = ''; // Reset the file input field
      }
    } else {
      window.alert('最多上傳 6 張圖片喔！');
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
    <div className="mt-3">
      <div
        className="
          relative mx-auto mb-6 flex h-[360px] w-full
          min-w-[360px] max-w-4xl items-center
          justify-center border-2 border-dashed
        border-black object-contain"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        // onClick={handleBoxClick}
      >
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
              width={0}
              height={0}
              className="max-h-[360px] w-auto"
            />
          </div>
        )}
        {!imageSrc && '點我或拖照片到此區域來上傳圖片'}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleUpload}
          className="absolute -left-full"
        />

        <div onClick={handleBoxClick}>
          <FaUpload className="absolute right-0 top-0 m-3 cursor-pointer text-3xl text-gray-400 active:text-gray-200" />
        </div>

        <div className="absolute bottom-0 right-0">
          <LoadingButton
            loading={loading}
            executeFunction={() =>
              imageSrc && getImageSegmentation(imageBlob[imageSrc])
            }
          />
        </div>
      </div>
      <div className="flex h-20 items-center justify-center border-black">
        {droppedImages.map((imageUrl, index) => (
          <Image
            key={index}
            src={imageUrl}
            alt={`Small Image ${index + 1}`}
            className="mr-2 cursor-pointer border border-black"
            width={80}
            height={80}
            onClick={() => handleSmallImageClick(imageUrl)}
          />
        ))}
      </div>
    </div>
  );
}

export default Page;
