'use client';
import { useState, useRef } from 'react';
import type { DragEvent, ChangeEvent } from 'react';
import { useImmer } from 'use-immer';
import Image from 'next/image';
import ColorMask from './components/ColorMask';
import getUniqueColorsInPNG from '@/utils/get-unique-colors-in-png';
import type { UniqueColorsInPng } from '@/utils/get-unique-colors-in-png';
import huggingFaceApi from '@/utils/hugging-face-api';
import LoadingButton from '@/components/LoadingButton';
import { FaUpload } from 'react-icons/fa';
import { apiNotify, imgSizeNotify } from '@/components/ReactToast';

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
        apiNotify();
      } else {
        await storeMaskData(respond);
        await setUniqueColorsInPNG(respond);
      }
    } catch (e) {
      apiNotify();
    } finally {
      setLoading(false);
    }
  }

  async function storeMaskData(apiRespond: Respond[]) {
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
    const maxSize = 1.5 * 1024 * 1024; // 1.5 MB
    if (imageFile.size > maxSize) {
      console.log('handleDrop');
      imgSizeNotify();
      return;
    }

    if (Object.keys(imageBlob).length < 6) {
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

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    console.log('handleUpload');
    if (Object.keys(imageBlob).length < 6) {
      const imageFile = event.target.files?.[0];
      if (imageFile) {
        const maxSize = 1.5 * 1024 * 1024; // 1.5 MB
        if (imageFile.size > maxSize) {
          imgSizeNotify();
          return;
        }

        const imageUrl = URL.createObjectURL(imageFile);
        setImageSrc(imageUrl);
        setDroppedImages((prevImages) => [...prevImages, imageUrl]);
        event.target.value = ''; // Reset the file input field
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

  function handleUploadIconClick() {
    fileInputRef.current?.click();
  }

  async function setUniqueColorsInPNG(responds: Respond[]) {
    if (imageSrc) {
      const uniqueColors = await getUniqueColorsInPNG(responds[0].mask);
      setMaskUniqueColors(uniqueColors as UniqueColorsInPng);
      console.log('set color completed');
    }
  }

  return (
    <div className="mt-3">
      <div
        className="
          relative mx-auto mb-6 flex h-[360px] w-full
          min-w-[300px] max-w-4xl items-center
          justify-center border-2 border-dashed
        border-black object-contain"
        onDrop={handleDrop}
        onDragOver={handleDragOver}>
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
        {!imageSrc && '拖照片到此區域來上傳圖片'}
        <input
          type="file"
          accept="image/jpeg, image/png"
          ref={fileInputRef}
          onChange={handleUpload}
          className="absolute -left-full"
        />

        <div onClick={handleUploadIconClick}>
          <FaUpload className="absolute right-0 top-0 m-3 cursor-pointer text-3xl text-gray-400 active:text-gray-200" />
        </div>

        <div className="absolute bottom-0 right-0 z-10">
          <LoadingButton
            loading={loading}
            executeFunction={() =>
              imageSrc && getImageSegmentation(imageBlob[imageSrc])
            }
            text="模型推論"
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
