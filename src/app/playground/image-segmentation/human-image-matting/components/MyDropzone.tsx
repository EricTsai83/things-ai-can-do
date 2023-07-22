'use client';
import { useState, useRef, useEffect } from 'react';
import type { DragEvent, ChangeEvent } from 'react';
import huggingFaceApi from '@/utils/hugging-face-api';
import Image from 'next/image';
import replaceColorsInPNG from '@/utils/replace-color-in-png';
import LoadingButton from '@/components/LoadingButton';
import TooltipContainer from '@/components/TooltipContainer';
import MirrorReflectionBtn from '@/components/MirrorReflectionButton';
import { useImmer } from 'use-immer';
import { FaUpload } from 'react-icons/fa';
import {
  apiNotify,
  imgSizeNotify,
  uploadWrongImgFormatNotify,
} from '@/components/ReactToast';
import demoImg from '../../img/demo-guys-img.png';

interface Respond {
  label: string;
  mask: string;
  score: number;
}

function MyDropzone() {
  const [imageBlob, setImageBlob] = useState<File | Blob>();
  const [imageSrc, setImageSrc] = useState<string | null>(null); // 用來記錄當下dropzone 展示哪一張照片
  const fileInputRef = useRef<HTMLInputElement>(null); // 用來讓 dropdown zone 可以點擊up load file
  const [apiData, setApiData] = useState<Respond[] | null>(null); // set api data
  const [loading, setLoading] = useState(false);
  const [cover, setCover] = useImmer<{ [key: string]: string }>({});
  const [coverStatus, setCoverStatus] = useImmer<{ [key: string]: boolean }>(
    {},
  );

  useEffect(() => {
    const fetchImage = async () => {
      console.log(demoImg.src);
      const response = await fetch(demoImg.src);
      const imageArrayBuffer = await response.arrayBuffer();
      const demoImageBlob = new Blob([imageArrayBuffer], {
        type: 'image/jpeg',
      });
      console.log(demoImageBlob);
      const imageUrl = URL.createObjectURL(demoImageBlob);
      setImageBlob(demoImageBlob);
      console.log(imageUrl);
      setImageSrc(imageUrl);
    };

    fetchImage();
  }, [setImageBlob, setImageSrc]);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];

    const allowedFormats = ['image/jpeg', 'image/png'];
    if (!allowedFormats.includes(imageFile.type)) {
      uploadWrongImgFormatNotify();
      return;
    }

    if (imageFile) {
      const maxSize = 1.5 * 1024 * 1024; // 1.5 MB
      if (imageFile.size > maxSize) {
        imgSizeNotify();
        return;
      }

      const imageUrl = URL.createObjectURL(imageFile);
      setImageBlob(imageFile);
      setImageSrc(imageUrl);
      setApiData(null);
      setCoverStatus({});
      setCover({});
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleBoxClick = (event: { preventDefault: () => void }) => {
    fileInputRef.current?.click();
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      const maxSize = 1.5 * 1024 * 1024; // 1.5 MB
      if (imageFile.size > maxSize) {
        imgSizeNotify();
        return;
      }

      const imageUrl = URL.createObjectURL(imageFile);
      setImageBlob(imageFile);
      setImageSrc(imageUrl);
      event.target.value = '';
      setApiData(null);
      setCoverStatus({});
      setCover({});
    }
  };

  async function getImageSegmentation(data: File | Blob) {
    try {
      setLoading(true);
      console.log(data);
      const respond = await huggingFaceApi.getImageSegmentation(data);
      console.log(respond);
      if (respond.error) {
        apiNotify();
      } else {
        setApiData(respond);
      }
    } catch (e) {
      apiNotify();
    } finally {
      setLoading(false);
    }
  }

  async function addBackgroundMaskToImage(apiMask: string) {
    const colorMappings = [
      {
        // 讓黑的地方變透明
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

    await replaceColorsInPNG(apiMask, colorMappings)
      .then((modifiedPNGString) => {
        setCover((draft) => {
          draft[apiMask] = modifiedPNGString as string;
          return draft;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function coverToggle(apiMask: string) {
    if (apiMask in cover) {
      console.log('嘿嘿');
      setCover((draft) => {
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
      <div // dropzone
        className="
          relative mx-auto mb-6 flex h-[360px] w-full
          min-w-[300px] max-w-4xl items-center
          justify-center border-2 border-dashed
        border-black object-contain"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        // onClick={handleBoxClick}
      >
        {imageSrc && (
          <div className="absolute">
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

        {Object.values(cover).length > 0 &&
          Object.values(cover).map((pngStr: string, id: number) => {
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
          ref={fileInputRef}
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
             模型得先進行加載，若推論失敗，請等待幾秒鐘後，再次點擊按鈕。"
            tailwindSettingFromTop="40">
            <LoadingButton
              loading={loading}
              executeFunction={() =>
                imageBlob && imageSrc && getImageSegmentation(imageBlob)
              }
              text="模型推論"
            />
          </TooltipContainer>
        </div>
      </div>
      <div // small image preview
        className="mt-10 flex h-20 flex-wrap items-center justify-center gap-2 border-black">
        {apiData &&
          apiData.map((data: Respond, idx: number) => {
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center gap-2">
                <Image
                  src={`data:image/png;base64,${data.mask}`} // next js required
                  alt=""
                  className="mr-2 cursor-pointer border border-black"
                  width={100}
                  height={80}
                />

                <MirrorReflectionBtn
                  executeFunction={async () => {
                    const status = await coverToggle(apiData[idx].mask);
                    if (status === 'cover') {
                      await addBackgroundMaskToImage(apiData[idx].mask);
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

export default MyDropzone;
