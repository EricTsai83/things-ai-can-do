'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import type { Dispatch, SetStateAction, DragEvent, ChangeEvent } from 'react';
import { useImmer } from 'use-immer';
import type { FaceDetail } from '../types';
import convertImageToBase64 from '@/utils/convert-image-to-base64';
import Image from 'next/image';
import sampleImg1 from '../img/sample-img-1.jpg';
import sampleImg2 from '../img/sample-img-2.jpeg';
import { WritableDraft } from 'immer/dist/internal';
import { SearchParams } from '../../types';
import { SelectOption } from './Select';
import LoadingButton from '@/components/LoadingButton';

interface Props {
  faceDetails: FaceDetail[] | null;
  setFaceDetails: Dispatch<SetStateAction<FaceDetail[] | null>>;
  imageSrc: string | null;
  setImageSrc: Dispatch<SetStateAction<string | null>>;
  selectOption: SelectOption[];
  searchParams: SearchParams;
  canvasUrls: any;
  setCanvasUrls: any;
}

interface ImageBase64String {
  [key: string]: string;
}

function MyDropzone({
  // faceDetails,
  setFaceDetails,
  imageSrc,
  setImageSrc,
  // selectOption,
  searchParams,
  canvasUrls,
  setCanvasUrls,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageBase64String, setImageBase64String] = useImmer<
    WritableDraft<ImageBase64String>
  >({});
  const [loading, setLoading] = useState(false);

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      const base64String = (await convertImageToBase64(imageFile)) as string;
      setImageBase64String((draft) => {
        draft[imageUrl] = base64String;
      });
      setFaceDetails(null);
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
      const base64String = await convertImageToBase64(imageFile);
      setImageBase64String((draft: any) => {
        draft[imageUrl] = base64String;
      });
      setImageSrc(imageUrl);
      event.target.value = '';
    }
  };

  async function getFacialRecognition() {
    if (imageSrc) {
      setLoading(true);
      const res = await fetch('/api/aws', {
        method: 'POST',
        body: JSON.stringify({ image_base64: imageBase64String[imageSrc] }),
      });
      const facialRecoRes = await res.json();
      console.log(facialRecoRes);
      setFaceDetails(facialRecoRes.Tags.FaceDetails);

      const marks = await facialRecoRes.Tags.FaceDetails[0].Landmarks.map(
        (landmark: any) => landmark.Type,
      );
      setLoading(false);
    }
  }

  async function handleSampleImg(blob: Blob) {
    const imageUrl = URL.createObjectURL(blob);
    setImageSrc(imageUrl);
    const base64String = await convertImageToBase64(blob);
    setImageBase64String((draft: any) => {
      draft[imageUrl] = base64String;
    });
    setImageSrc(imageUrl);
  }

  const handleSampleImgCallback = useCallback((blob: Blob) => {
    handleSampleImg(blob);
  }, []);

  useEffect(() => {
    if (searchParams.img === 'sample-img-1') {
      fetch(sampleImg1.src)
        .then((response) => response.blob())
        .then((blob) => {
          // 因為這個執行是有待參數的，為了讓其加入dependency後，可以一直被視為相同function，故要加入useCallback
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
      <LoadingButton loading={loading} executeFunction={getFacialRecognition} />
    </div>
  );
}

export default MyDropzone;