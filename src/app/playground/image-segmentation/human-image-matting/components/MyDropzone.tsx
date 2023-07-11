'use client';
import { useState, useRef } from 'react';
import type { DragEvent, ChangeEvent } from 'react';
import huggingFaceApi from '@/utils/hugging-face-api';
import Image from 'next/image';
import replaceColorsInPNG from '@/utils/replace-color-in-png';
import LoadingButton from '@/components/LoadingButton';
import MirrorReflectionBtn from '@/components/MirrorReflectionButton';
import { useImmer } from 'use-immer';

interface Respond {
  label: string;
  mask: string;
  score: number;
}

function MyDropzone() {
  const [imageBlob, setImageBlob] = useState<File>();
  const [imageSrc, setImageSrc] = useState<string | null>(null); // 用來記錄當下dropzone 展示哪一張照片
  const fileInputRef = useRef<HTMLInputElement>(null); // 用來讓 dropdown zone 可以點擊up load file
  const [apiData, setApiData] = useState<Respond[] | null>(null); // set api data
  // const [mask, setMask] = useState<string | null>(null);
  // const [pngStrAfterColorChange, setPngStrAfterColorChange] = useState<
  //   string[]
  // >([]);
  const [loading, setLoading] = useState(false);
  const [cover, setCover] = useImmer<{ [key: string]: string }>({});
  const [coverStatus, setCoverStatus] = useImmer<{ [key: string]: boolean }>(
    {},
  );

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setImageBlob(imageFile);
      setImageSrc(imageUrl);
      // setMask(null);
      // setPngStrAfterColorChange([]);
      setApiData(null);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setImageBlob(imageFile);
      setImageSrc(imageUrl);
      event.target.value = '';
      // setMask(null);
      // setPngStrAfterColorChange([]);
      setApiData(null);
    }
  };

  async function getImageSegmentation(data: File) {
    try {
      setLoading(true);
      console.log(data);
      const respond = await huggingFaceApi.getImageSegmentation(data);
      console.log(respond);
      if (respond.error) {
        window.alert('模型 API 被佔用中，請稍後再試');
      } else {
        setApiData(respond);
      }
    } catch (e) {
      window.alert('模型 API 被佔用中，請稍後再試');
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
        // setPngStrAfterColorChange((prev) => [...prev, `${modifiedPNGString}`]);

        setCover((draft: any) => {
          draft[apiMask] = modifiedPNGString;
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

    // if (pngStrAfterColorChange.includes(apiMask)) {
    //   arry = arry.filter((item) => item !== pngStr);
    //   setPngStrAfterColorChange(arry);
    // } else {
    //   setPngStrAfterColorChange((prev) => [...prev, `${pngStr}`]);
    // }
  }

  return (
    <div className="relative">
      <div // dropzone
        className="
          relative mx-auto mb-6 flex h-[360px] w-full
          min-w-[360px] max-w-4xl items-center
          justify-center border-2 border-dashed
        border-black object-contain"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleBoxClick}>
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
        {!imageSrc && '點我或拖照片到此區域來上傳圖片'}
        {/* {pngStrAfterColorChange &&
          pngStrAfterColorChange.map((pngStr: string, id: number) => {
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
          })} */}

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
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleUpload}
          className="absolute -left-full"
        />
      </div>
      <div // small image preview
        className="mt-10 flex h-20 items-center justify-center border-black">
        {apiData &&
          apiData.map((data: Respond, idx: number) => {
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center gap-2">
                <Image
                  // onClick={() => {
                  //   setMask(apiData[idx].mask);
                  //   console.log(idx);
                  // }}
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
                />
              </div>
            );
          })}
      </div>

      {/* <button
        className="h-[40px] w-[200px] border bg-zinc-300"
        onClick={(): void => {
          imageBlob && getImageSegmentation(imageBlob);
        }}>
        1. 打API
      </button> */}
      <div className="absolute right-0 top-0 flex flex-col gap-2">
        <LoadingButton
          loading={loading}
          executeFunction={() =>
            imageBlob && imageSrc && getImageSegmentation(imageBlob)
          }
        />

        {/* <button
          className="h-12 w-40 rounded-md border bg-zinc-300"
          onClick={
            //將 mask 白色部分變成透明，黑色變成完全透明，然後蓋上圖片
            addBackgroundMaskToImage
          }>
          執行遮罩
        </button> */}
      </div>
    </div>
  );
}

export default MyDropzone;
