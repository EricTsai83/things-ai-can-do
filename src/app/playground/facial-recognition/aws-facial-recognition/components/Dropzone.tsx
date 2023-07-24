'use client';

import Image from 'next/image';
import type { FaceDetail } from '../types.d';
import { WritableDraft } from 'immer/dist/internal';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, Dispatch, DragEvent, SetStateAction } from 'react';
import { useImmer } from 'use-immer';
import LoadingButton from '@/components/LoadingButton';
import {
  FlipToastContainer,
  apiNotify,
  imgSizeNotify,
} from '@/components/ReactToast';
import { SelectOption } from '@/components/Select';
import TooltipContainer from '@/components/TooltipContainer';
import convertImageToBase64 from '@/utils/convert-image-to-base64';
import { SearchParams } from '../../types';
import sampleImg1 from '../img/sample-img-1.jpg';
import sampleImg2 from '../img/sample-img-2.jpeg';

interface Props {
  faceDetails: FaceDetail[] | null;
  setFaceDetails: Dispatch<SetStateAction<FaceDetail[] | null>>;
  imgSrc: string | null;
  setImgSrc: Dispatch<SetStateAction<string | null>>;
  selectOption: SelectOption[];
  searchParams: SearchParams;
  canvasUrls: string | null;
  setCanvasUrls: Dispatch<SetStateAction<string | null>>;
}

interface ImageBase64String {
  [key: string]: string;
}

function Dropzone({
  setFaceDetails,
  imgSrc,
  setImgSrc,
  searchParams,
  canvasUrls,
  setCanvasUrls,
}: Props) {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [imgBase64Str, setImgBase64Str] = useImmer<
    WritableDraft<ImageBase64String>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const imgFile = event.dataTransfer.files[0]!;
    const maxSize = 1.5 * 1024 * 1024; //1.5 MB
    if (imgFile.size > maxSize) {
      imgSizeNotify();
      return;
    }

    const imgUrl = URL.createObjectURL(imgFile);
    const base64String = (await convertImageToBase64(imgFile)) as string;
    setImgBase64Str((draft) => {
      draft[imgUrl] = base64String;
    });
    setFaceDetails(null);
    setCanvasUrls(null);
    setImgSrc(imgUrl);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleBoxClick = () => {
    uploadInputRef.current?.click();
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const imgFile = event.target.files?.[0]!;
    const maxSize = 1.5 * 1024 * 1024;
    if (imgFile.size > maxSize) {
      imgSizeNotify();
      return;
    }

    const imageUrl = URL.createObjectURL(imgFile);
    const base64String = (await convertImageToBase64(imgFile)) as string;
    setImgBase64Str((draft) => {
      draft[imageUrl] = base64String;
    });
    setImgSrc(imageUrl);
    event.target.value = '';
  };

  async function getFacialRecognition() {
    if (imgSrc) {
      try {
        setIsLoading(true);
        const response = await fetch('/api/aws', {
          method: 'POST',
          body: JSON.stringify({ image_base64: imgBase64Str[imgSrc] }),
        });
        const data = await response.json();
        console.log(data);
        setFaceDetails(data.Tags.FaceDetails);
      } catch (e) {
        apiNotify();
      } finally {
        setIsLoading(false);
      }
    }
  }

  const handleSampleImgCallback = useCallback(
    async (blob: Blob) => {
      const imgUrl = URL.createObjectURL(blob);
      setImgSrc(imgUrl);
      const base64Str = await convertImageToBase64(blob);
      setImgBase64Str((draft) => {
        draft[imgUrl] = base64Str as string;
      });
      setImgSrc(imgUrl);
    },
    [setImgSrc, convertImageToBase64, setImgBase64Str],
  );

  useEffect(() => {
    if (searchParams.img === 'sample-img-1') {
      fetch(sampleImg1.src)
        .then((response) => response.blob())
        .then((blob) => {
          handleSampleImgCallback(blob);
        })
        .catch((error) => {
          console.error('Failed to fetch image:', error);
        });
    } else if (searchParams.img === 'sample-img-2') {
      fetch(sampleImg2.src)
        .then((response) => response.blob())
        .then((blob) => {
          handleSampleImgCallback(blob);
        })
        .catch((error) => {
          console.error('Failed to fetch image:', error);
        });
    } else {
      // pass
    }
  }, [searchParams.img, handleSampleImgCallback]);

  return (
    <div className="w-full">
      <div
        className="
          relative mb-6 flex h-[360px] w-full 
          min-w-[360px] items-center 
          justify-center border-2 border-dashed
          border-black object-contain"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleBoxClick}>
        {imgSrc && (
          <Image
            className="absolute max-h-[360px] w-auto"
            src={canvasUrls ? canvasUrls : imgSrc}
            alt="Image"
            width={0}
            height={0}
          />
        )}
        {!imgSrc && (
          <p className="text-gray-500">點我或托照片到此區域來上傳圖片</p>
        )}

        <input
          type="file"
          accept="image/jpeg, image/png"
          ref={uploadInputRef}
          onChange={handleUpload}
          className="absolute -left-full"
        />
      </div>
      <div className="flex justify-center">
        <TooltipContainer
          tooltips="
            在一段時間後，首次做模型推論，
            模型得先進行加載，若推論失敗，請等待幾秒鐘後，再次點擊按鈕。">
          <LoadingButton
            isLoading={isLoading}
            executeFunction={getFacialRecognition}
            text="模型推論"
          />
        </TooltipContainer>
      </div>

      <FlipToastContainer />
    </div>
  );
}

export default Dropzone;
