'use client';
import { useState, useRef } from 'react';
import { useImmer } from 'use-immer';
import huggingFaceApi from '@/utils/hugging-face-api';
import Image from 'next/image'; // the img element will automatically be assigned the position: "absolute" style.
import ColorMask from './components/ColorMask';
import getUniqueColorsInPNG from '@/utils/get-unique-colors-in-png';
import Mask from './components/Mask';

const Page: React.FC = () => {
  // 1. 取得照片的 blob
  // 2. 建立照片 reference URL
  // 3. 建構一個 state 可以儲存 {reference url: image blob}
  // 4.
  const [imageBlob, setImageBlob] = useImmer<any>({});
  const [imageSrc, setImageSrc] = useState<any>(null); // 用來記錄當下dropzone 展示哪一張照片
  const [droppedImages, setDroppedImages] = useState<string[]>([]); // 用來記錄dropzone 下方小圖展示的圖片有哪些
  const fileInputRef = useRef<HTMLInputElement>(null); // 用來讓 dropdown zone 可以點擊up load file
  const [masks, setMasks] = useImmer<any>({}); // set api data
  const [maskUniqueColors, setMaskUniqueColors] = useState<any>();

  async function getImageSegmentation(data: any) {
    console.log(data);
    const respond = await huggingFaceApi.getImageSegmentation(data);
    console.log(respond);
    setMasks((draft: any) => {
      draft[imageSrc] = respond;
      return draft;
    });
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setImageBlob((draft: any) => {
        draft[imageUrl] = imageFile;
        return draft;
      });
      setImageSrc(imageUrl);
      setDroppedImages((prevImages) => [...prevImages, imageUrl]);
      // getImageSegmentation(imageFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSmallImageClick = (imageUrl: string) => {
    setImageSrc(imageUrl);
    // Revert back to the image file
    // console.log(imageBlob);
    // console.log(imageBlob[imageUrl]);
    // getImageSegmentation(imageBlob[imageUrl]);
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setImageSrc(imageUrl);
      setDroppedImages((prevImages) => [...prevImages, imageUrl]);
      event.target.value = ''; // Reset the file input field

      // getImageSegmentation(imageFile);
    }
  };

  const setUniqueColorsInPNG = async () => {
    const uniqueColors = await getUniqueColorsInPNG(masks[imageSrc][0].mask);
    setMaskUniqueColors(uniqueColors);
    console.log('set color completed');
  };

  // const getUniqueColors = useCallback(() => {
  //   setUniqueColorsInPNG();
  // }, [imageSrc, setUniqueColorsInPNG]);

  return (
    <div>
      <div
        className="object-contain border-dashed border-2 border-black w-[900px] h-[600px] flex justify-center items-center relative"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleBoxClick}>
        {imageSrc && (
          <div className="absolute">
            {masks[imageSrc] && (
              <ColorMask
                // @ts-ignore
                segmentations={masks[imageSrc]}
                maskUniqueColors={maskUniqueColors}
              />
            )}
            <Image src={imageSrc} alt="Image" width={600} height={600} />
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
      <div className="border-black w-[900px] h-20 flex justify-center items-center">
        {droppedImages.map((imageUrl, index) => (
          <Image
            key={index}
            src={imageUrl} // next js required
            alt={`Small Image ${index + 1}`} // next js required
            className="border border-black mr-2 cursor-pointer"
            width={80}
            height={80}
            onClick={() => handleSmallImageClick(imageUrl)}
          />
        ))}
      </div>
      <button
        className="border border-gray-500 w-[100px] h-[100px]"
        onClick={() => {
          getImageSegmentation(imageBlob[imageSrc]);
        }}>
        點我幹大事
      </button>

      <div
        className="bg-cyan-300 w-[80px] h-[40px]"
        onClick={setUniqueColorsInPNG}>
        點我上色彩
      </div>

      <Mask // @ts-ignore
        segmentations={masks[imageSrc]}
      />
    </div>
  );
};

export default Page;
