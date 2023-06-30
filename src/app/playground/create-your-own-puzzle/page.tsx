'use client';
import { useState, useRef, useCallback } from 'react';
import PuzzleLayout from './components/PuzzleLayout';
import ImagePuzzle from './components/ImagePuzzle';
import Image from 'next/image';
import splitImage from '@/utils/split-image';
import { useImmer } from 'use-immer';
import huggingFaceApi from '@/utils/hugging-face-api';

export default function Content() {
  const textForDiffusion = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>(); // 像是圖片的 reference，而不是圖片本身喔
  const [imgBlobs, setImgBlobs] = useImmer<any>({});
  const [showCut, setShowCut] = useState<any>(false);

  async function getStableDiffusionImage() {
    try {
      if (textForDiffusion.current) {
        const postData = {
          inputs: textForDiffusion.current.value,
          options: {
            wait_for_model: true,
          },
        };
        const myBlob = await huggingFaceApi.getStableDiffusionImage(postData);
        const imgUrl = URL.createObjectURL(myBlob);
        setImageUrl(imgUrl);
        setShowCut(false);
      }
    } catch (err) {
      console.log(err);
      console.log('model is currently loading');
    }
  }

  const getSplitImage = useCallback(
    async (imageUrl: any) => {
      const tileObj = await splitImage(imageUrl);
      console.log(tileObj);
      setImgBlobs(tileObj);
    },
    [imageUrl, setImgBlobs],
  );

  return (
    <main>
      <div>
        <input ref={textForDiffusion} className="border" />
        <button
          onClick={() => {
            textForDiffusion.current && getStableDiffusionImage();
            console.log('Diffusion fetch completed.');
          }}>
          API 請求
        </button>
      </div>
      <div>
        A large cabin on top of a sunny mountain in the style of Dreamworks,
        artstation
      </div>
      <button
        onClick={async () => {
          if (imageUrl) {
            getSplitImage(imageUrl);
          }
          console.log('Cut completed.');
        }}>
        切割請求
      </button>

      <button
        onClick={() => {
          console.log(imgBlobs);
          setShowCut(true);
        }}>
        查看切割
      </button>
      {imageUrl && <Image src={imageUrl} width={600} height={600} alt="" />}

      <div>{imageUrl && showCut && <ImagePuzzle imgBlobs={imgBlobs} />}</div>
      <div>{imageUrl && <PuzzleLayout imageUrl={imageUrl} />}</div>
    </main>
  );
}
