'use client';
import { useRef } from 'react';
import type { Dispatch, SetStateAction, DragEvent, ChangeEvent } from 'react';
import Image from 'next/image';

interface Props {
  imageSrc: string | null;
  setImageSrc: Dispatch<SetStateAction<string | null>>;
  canvasUrls: any;
  setCanvasUrls: any;
}

function ImageSegmentationWithColorNew({
  imageSrc,
  setImageSrc,
  canvasUrls,
  setCanvasUrls,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setCanvasUrls(null);
      setImageSrc(imageUrl);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setImageSrc(imageUrl);
      event.target.value = '';
    }
  };

  return (
    <div>
      <div // dropzone
        className="
          relative mb-6 flex h-[360px] w-full 
          min-w-[360px] items-center 
          justify-center border-2 border-dashed
        border-black object-contain"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleBoxClick}>
        {imageSrc && (
          <Image
            className="absolute max-h-[360px] w-auto"
            src={canvasUrls ? canvasUrls : imageSrc}
            alt="Image"
            width={0}
            height={0}
          />
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
    </div>
  );
}

export default ImageSegmentationWithColorNew;
