'use client';

import Image from 'next/image';
import type { Response } from '../../types.d';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import { FaUpload } from 'react-icons/fa';
import { useImmer } from 'use-immer';
import LoadingButton from '@/components/LoadingButton';
import MirrorReflectionBtn from '@/components/MirrorReflectionButton';
import {
  apiNotify,
  imgSizeNotify,
  uploadWrongImgFormatNotify,
} from '@/components/ReactToast';
import TooltipContainer from '@/components/TooltipContainer';
import huggingFaceApi from '@/utils/hugging-face-api';
import replaceColorsInPNG from '@/utils/replace-color-in-png';
import guysImg from '../../img/demo-guys-img.png';

interface CoverStatus {
  [key: string]: boolean;
}

interface Mask {
  [key: string]: string;
}

function Dropzone() {
  const [imgBlobForAPI, setImgBlobForAPI] = useState<Blob | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [response, setResponse] = useState<Response[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [mask, setMask] = useImmer<Mask>({});
  const [coverStatus, setCoverStatus] = useImmer<CoverStatus>({});

  useEffect(() => {
    async function fetchLocalImg() {
      const response = await fetch(guysImg.src);
      const imgArrayBuffer = await response.arrayBuffer();
      const imgBlob = new Blob([imgArrayBuffer], {
        type: 'image/jpeg',
      });
      const imgUrl = URL.createObjectURL(imgBlob);
      setImgBlobForAPI(imgBlob);
      setImgSrc(imgUrl);
    }

    fetchLocalImg();
  }, [setImgBlobForAPI, setImgSrc]);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const imgFile = event.dataTransfer.files[0];

    const allowedFormats = ['image/jpeg', 'image/png'];
    if (!allowedFormats.includes(imgFile.type)) {
      uploadWrongImgFormatNotify();
      return;
    }

    if (imgFile) {
      const maxSize = 1.5 * 1024 * 1024;
      if (imgFile.size > maxSize) {
        imgSizeNotify();
        return;
      }

      const imageUrl = URL.createObjectURL(imgFile);
      setImgBlobForAPI(imgFile);
      setImgSrc(imageUrl);
      setResponse(null);
      setCoverStatus({});
      setMask({});
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleBoxClick = () => {
    uploadInputRef.current?.click();
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const imgFile = event.target.files?.[0];
    if (imgFile) {
      const maxSize = 1.5 * 1024 * 1024; // 1.5 MB
      if (imgFile.size > maxSize) {
        imgSizeNotify();
        return;
      }

      const imgUrl = URL.createObjectURL(imgFile);
      setImgBlobForAPI(imgFile);
      setImgSrc(imgUrl);
      event.target.value = '';
      setResponse(null);
      setCoverStatus({});
      setMask({});
    }
  };

  async function getImageSegmentation(data: Blob) {
    try {
      setIsLoading(true);
      const response = await huggingFaceApi.getImageSegmentation(data);
      if (response.error) {
        apiNotify();
      } else {
        setResponse(response);
      }
    } catch (error) {
      apiNotify();
    } finally {
      setIsLoading(false);
    }
  }

  async function addMaskOnImage(apiMask: string) {
    const colorMappings = [
      {
        targetColor: {
          r: 0,
          g: 0,
          b: 0,
          a: 255,
        },
        replacementColor: {
          r: 0,
          g: 0,
          b: 0,
          a: 0,
        },
      },
    ];

    await replaceColorsInPNG(apiMask, colorMappings).then(
      (modifiedPNGString) => {
        setMask((draft) => {
          draft[apiMask] = modifiedPNGString as string;
          return draft;
        });
      },
    );
  }

  async function coverToggle(apiMask: string) {
    if (apiMask in mask) {
      setMask((draft) => {
        delete draft[apiMask];
        return draft;
      });
      return 'uncover';
    } else {
      return 'cover';
    }
  }

  return (
    <div>
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

        {Object.values(mask).length > 0 &&
          Object.values(mask).map((pngStr: string, id: number) => {
            return (
              <Image
                className="absolute max-h-[360px] w-auto"
                key={id}
                src={pngStr}
                alt="Decoded Image"
                width={0}
                height={0}
              />
            );
          })}

        <input
          ref={uploadInputRef}
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleUpload}
          className="absolute -left-full"
        />
        <div onClick={handleBoxClick}>
          <FaUpload className="absolute right-0 top-0 m-3 cursor-pointer text-3xl text-gray-400 active:text-gray-200" />
        </div>

        <div className="absolute bottom-0 right-0">
          <TooltipContainer
            tooltips="
              在一段時間後，首次做模型推論，
              模型得先進行加載，若推論失敗，請等待幾秒鐘後，再次點擊按鈕。">
            <LoadingButton
              isLoading={isLoading}
              executeFunction={() =>
                imgBlobForAPI && imgSrc && getImageSegmentation(imgBlobForAPI)
              }
              text="模型推論"
            />
          </TooltipContainer>
        </div>
      </div>
      <div className="mt-10 flex h-20 flex-wrap items-center justify-center gap-2 border-black">
        {response &&
          response.map((data: Response, idx: number) => {
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center gap-2">
                <Image
                  src={`data:image/png;base64,${data.mask}`}
                  alt=""
                  className="mr-2 cursor-pointer border border-black"
                  width={100}
                  height={80}
                />

                <MirrorReflectionBtn
                  executeFunction={async () => {
                    const status = await coverToggle(response[idx].mask);
                    if (status === 'cover') {
                      await addMaskOnImage(response[idx].mask);
                    }

                    setCoverStatus((draft) => {
                      if (draft[idx]) {
                        draft[idx] = false;
                      } else {
                        draft[idx] = true;
                      }
                      return draft;
                    });
                  }}
                  cover={coverStatus[idx]}
                  toggleTexts={{ positive: '已遮罩', negative: '遮罩' }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Dropzone;
