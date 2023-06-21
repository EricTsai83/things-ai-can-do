'use client';
import huggingFaceApi from '@/utils/hugging-face-api';
import { useState, useRef } from 'react';
import Image from 'next/image';

export default function Content() {
  const textForDiffusion = useRef<HTMLInputElement>(null);
  const [output, setOutput] = useState<string>();

  async function getStableDiffusionImage() {
    try {
      if (textForDiffusion.current) {
        const postData = { inputs: textForDiffusion.current.value };
        const myBlob = await huggingFaceApi.getStableDiffusionImage(postData);
        const imgUrl = URL.createObjectURL(myBlob);
        setOutput(imgUrl);
      }
    } catch (err) {
      console.log(err);
      console.log('model is currently loading');
    }
  }

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
        A small cabin on top of a snowy mountain in the style of Disney,
        artstation
        {output && <Image src={output} alt="" width={600} height={600} />}
      </div>
    </main>
  );
}
