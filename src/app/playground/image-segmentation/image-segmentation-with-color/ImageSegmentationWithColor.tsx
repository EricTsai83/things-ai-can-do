'use client';

import Image from 'next/image';
import { Response } from '../types.d';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import { FaUpload } from 'react-icons/fa';
import { useImmer } from 'use-immer';
import LoadingButton from '@/components/LoadingButton';
import {
  apiNotify,
  imgSizeNotify,
  limitedImgNumNotify,
  uploadWrongImgFormatNotify,
} from '@/components/ReactToast';
import TooltipContainer from '@/components/TooltipContainer';
import getUniqueColorsInPNG from '@/utils/get-unique-colors-in-png';
import type { UniqueColorsInPng } from '@/utils/get-unique-colors-in-png';
import huggingFaceApi from '@/utils/hugging-face-api';
import womanImg from '../img/demo-woman-img.jpeg';
import ColorMask from './components/ColorMask';

interface ImgBlob {
  [key: string]: Blob;
}

interface Masks {
  [key: string]: Response[];
}

function Page() {
  const [imgBlobForAPI, setImgBlobForAPI] = useImmer<ImgBlob>({});
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [droppedImages, setDroppedImages] = useState<string[]>([]);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [responseOfImg, setResponseOfImg] = useImmer<Masks>({});
  const [maskUniqueColors, setMaskUniqueColors] =
    useState<UniqueColorsInPng | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchLocalImg() {
      const response = await fetch(womanImg.src);
      const imgArrayBuffer = await response.arrayBuffer();
      const imgBlob = new Blob([imgArrayBuffer], {
        type: 'image/jpeg',
      });
      const imgUrl = URL.createObjectURL(imgBlob);
      setImgBlobForAPI((draft: ImgBlob) => {
        draft[imgUrl] = imgBlob;
        return draft;
      });
      setDroppedImages((prevImages) => [...prevImages, imgUrl]);
      setImgSrc(imgUrl);
    }

    fetchLocalImg();
  }, [setImgBlobForAPI, setDroppedImages, setImgSrc]);

  async function getImageSegmentation(data: Blob) {
    async function storeApiResponse(response: Response[]) {
      setResponseOfImg((draft: Masks) => {
        if (imgSrc) {
          draft[imgSrc] = response;
        }
        return draft;
      });
    }

    try {
      setIsLoading(true);
      const response = await huggingFaceApi.getImageSegmentation(data);
      if (response.error) {
        apiNotify();
      } else {
        await storeApiResponse(response);
        await setUniqueColorsInPNG(response);
      }
    } catch (error) {
      apiNotify();
    } finally {
      setIsLoading(false);
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const imgFile = event.dataTransfer.files[0];
    const maxSize = 1.5 * 1024 * 1024; // 1.5 MB

    const allowedFormats = ['image/jpeg', 'image/png'];
    if (!allowedFormats.includes(imgFile.type)) {
      uploadWrongImgFormatNotify();
      return;
    }

    if (imgFile.size > maxSize) {
      imgSizeNotify();
      return;
    }

    if (Object.keys(imgBlobForAPI).length < 6) {
      if (imgFile) {
        const imageUrl = URL.createObjectURL(imgFile);
        setImgBlobForAPI((draft: ImgBlob) => {
          draft[imageUrl] = imgFile;
          return draft;
        });
        setImgSrc(imageUrl);
        setDroppedImages((prevImages) => [...prevImages, imageUrl]);
      }
    } else {
      limitedImgNumNotify();
    }
  }

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    if (Object.keys(imgBlobForAPI).length < 6) {
      const imgFile = event.target.files?.[0]!;
      const maxSize = 1.5 * 1024 * 1024;
      // if (imgFile) {

      if (imgFile.size > maxSize) {
        imgSizeNotify();
        return;
      }

      const imageUrl = URL.createObjectURL(imgFile);

      setImgBlobForAPI((draft: ImgBlob) => {
        draft[imageUrl] = imgFile;
        return draft;
      });
      setImgSrc(imageUrl);
      setDroppedImages((prevImages) => [...prevImages, imageUrl]);
      event.target.value = '';
      // }
    } else {
      limitedImgNumNotify();
    }
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleSmallImageClick(imgUrl: string) {
    setResponseOfImg({});
    setImgSrc(imgUrl);
  }

  function handleUploadIconClick() {
    uploadInputRef.current?.click();
  }

  async function setUniqueColorsInPNG(responses: Response[]) {
    if (imgSrc) {
      const uniqueColors = await getUniqueColorsInPNG(responses[0].mask);
      setMaskUniqueColors(uniqueColors as UniqueColorsInPng);
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
        {imgSrc && (
          <div className="absolute">
            {responseOfImg[imgSrc] && (
              <ColorMask
                segmentations={responseOfImg[imgSrc]}
                maskUniqueColors={maskUniqueColors as UniqueColorsInPng}
              />
            )}
            <Image
              src={imgSrc}
              alt="Image"
              width={0}
              height={0}
              className="max-h-[360px] w-auto"
            />
          </div>
        )}
        {!imgSrc && '拖照片到此區域來上傳圖片'}
        <input
          type="file"
          accept="image/jpeg, image/png"
          ref={uploadInputRef}
          onChange={handleUpload}
          className="absolute -left-full"
        />

        <div onClick={handleUploadIconClick}>
          <FaUpload className="absolute right-0 top-0 m-3 cursor-pointer text-3xl text-gray-400 active:text-gray-200" />
        </div>

        <div className="absolute bottom-0 right-0 z-10">
          <TooltipContainer
            tooltips="
            在一段時間後，首次做模型推論，
            模型得先進行加載，若推論失敗，請等待幾秒鐘後，再次點擊按鈕。">
            <LoadingButton
              isLoading={isLoading}
              executeFunction={() =>
                imgSrc && getImageSegmentation(imgBlobForAPI[imgSrc])
              }
              text="模型推論"
            />
          </TooltipContainer>
        </div>
      </div>
      <div className="flex h-20 flex-wrap items-center justify-center gap-2 border-black">
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
