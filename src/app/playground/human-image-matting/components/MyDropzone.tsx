'use client';
import { useState, useRef } from 'react';
import huggingFaceApi from '@/utils/hugging-face-api';
import Image from 'next/image'; // the img element will automatically be assigned the position: "absolute" style.
import replaceColorsInPNG from '@/utils/replace-color-in-png';
// import generateHighlyDistinctRGB from '@/utils/generate-highly-distinct-rgb';

const MyDropzone: React.FC = () => {
  const [imageBlob, setImageBlob] = useState<any>();
  const [imageSrc, setImageSrc] = useState<any>(null); // 用來記錄當下dropzone 展示哪一張照片
  const fileInputRef = useRef<HTMLInputElement>(null); // 用來讓 dropdown zone 可以點擊up load file
  const [apiData, setApiData] = useState<any>(null); // set api data
  const [mask, setMask] = useState<any>(null);
  const [pngStrAfterColorChange, setPngStrAfterColorChange] = useState<any[]>(
    [],
  );

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setImageBlob(imageFile);
      setImageSrc(imageUrl);
      setMask(null);
      setPngStrAfterColorChange([]);
      setApiData(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setImageBlob(imageFile);
      setImageSrc(imageUrl);
      event.target.value = '';
      setMask(null);
      setPngStrAfterColorChange([]);
      setApiData(null);
    }
  };

  async function getImageSegmentation(data: any) {
    console.log(data);
    const respond = await huggingFaceApi.getImageSegmentation(data);
    console.log(respond);
    setApiData(respond);
  }

  async function addBackgroundMaskToImage() {
    if (mask) {
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

      await replaceColorsInPNG(mask, colorMappings)
        .then((modifiedPNGString) => {
          setPngStrAfterColorChange((prev) => [
            ...prev,
            `${modifiedPNGString}`,
          ]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
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
            <Image src={imageSrc} alt="Image" width={600} height={600} />
          </div>
        )}
        {!imageSrc && 'Drop image or click here to uploag image'}
        {pngStrAfterColorChange &&
          pngStrAfterColorChange.map((pngStr: any, id: any) => {
            // console.log(element.label);
            // console.log(maskUniqueColors);
            // console.log('=========');
            // console.log(pngStr);
            return (
              <Image
                className="absolute"
                key={id}
                src={pngStr}
                alt="Decoded Image"
                width={600}
                height={600}
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
        className="flex h-20 w-[900px] items-center justify-center border-black">
        {apiData &&
          apiData.map((data: any, idx: any) => {
            return (
              <Image
                onClick={() => {
                  setMask(apiData[idx].mask);
                  console.log(idx);
                }}
                key={idx}
                src={`data:image/png;base64,${data.mask}`} // next js required
                alt=""
                className="mr-2 cursor-pointer border border-black"
                width={80}
                height={80}
              />
            );
          })}
      </div>

      <button
        className="h-[40px] w-[200px] border bg-zinc-300"
        onClick={(): void => {
          getImageSegmentation(imageBlob);
        }}>
        1. 打API
      </button>
      <button
        className="h-[40px] w-[200px] border bg-zinc-300"
        onClick={addBackgroundMaskToImage}>
        將 mask 白色部分變成透明灰色，黑色變成完全透明，然後蓋上圖片
      </button>
    </div>
  );
};

export default MyDropzone;
