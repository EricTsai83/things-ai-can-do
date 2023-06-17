'use client'; // This is a client component
import huggingFaceApi from '@/utils/hugging-face-api';
import {useState, useRef} from 'react';

export default function Content() {
  const textForDiffusion = useRef<HTMLInputElement>(null);
  const [output, setOutput] = useState<string>();

  async function getStableDiffusionImage() {
    try {
      if (textForDiffusion.current) {
        const postData = {inputs: textForDiffusion.current.value};
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

        <img src={output} />
      </div>
    </main>
  );
}
