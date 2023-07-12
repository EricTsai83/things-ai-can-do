'use client';
import { useState, useRef, useCallback } from 'react';
import PuzzleLayout from './components/PuzzleLayout';
import ImagePuzzle from './components/ImagePuzzle';
import Image from 'next/image';
import splitImage from '@/utils/split-image';
import type { TileObject } from '@/utils/split-image';
import { useImmer } from 'use-immer';
import huggingFaceApi from '@/utils/hugging-face-api';
import PromptSearchBox from './components/PromptSearchBox';
import PageTitle from '@/components/PageTitle';
import { IoImages } from 'react-icons/io5';
import { MdOutlineTextFields } from 'react-icons/md';
import { ImArrowRight } from 'react-icons/im';
import LoadingButton from '@/components/LoadingButton';
import ImageShowMode from './components/ImageShowMode';
import { plans } from './components/plans';

function Page() {
  const textForDiffusion = useRef<HTMLTextAreaElement>(null);
  const [imageUrl, setImageUrl] = useState<string>(); // 像是圖片的 reference，而不是圖片本身喔
  const [imgBlobs, setImgBlobs] = useImmer<TileObject>({});
  const [showImage, SetShowImage] = useState<boolean>(false);
  const [showEasyPuzzle, SetShowEasyPuzzle] = useState<boolean>(false);
  const [showDifficultPuzzle, setShowDifficultPuzzle] =
    useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(plans[1]);

  async function getStableDiffusionImage() {
    try {
      if (textForDiffusion.current) {
        setLoading(true);
        const postData = {
          inputs: textForDiffusion.current.value,
          options: {
            wait_for_model: true,
          },
        };
        try {
          const myBlob = await huggingFaceApi.getStableDiffusionImage(postData);
          const imgUrl = URL.createObjectURL(myBlob);
          setImageUrl(imgUrl);
          SetShowEasyPuzzle(true);
          // 隱藏其他兩個模式，只顯示簡單拼圖模式
          setShowDifficultPuzzle(false);
          SetShowImage(false);
          setSelected(plans[1]);
        } catch (e) {
          window.alert('模型 API 被佔用中，請稍後再試');
        } finally {
          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
      console.log('model is currently loading');
    }
  }

  const getSplitImage = useCallback(
    async (imageUrl: string) => {
      const tileObj = await splitImage(imageUrl);
      console.log(tileObj);
      setImgBlobs(tileObj);
    },
    [setImgBlobs],
  );

  async function getPuzzle() {
    if (imageUrl) {
      await getSplitImage(imageUrl);
      setShowDifficultPuzzle(true);
      console.log('Cut completed.');
    }
  }

  return (
    <main className="flex w-screen flex-col px-16 pt-24 xl:w-[calc(100vw-240px)]">
      <PageTitle
        title="文字轉圖像"
        content="
          文字轉圖像是一種魔法筆！這項神奇的AI技術可以將文字描述變成真實的圖像。
          只要你用文字描述想像的場景或物品，魔法筆就會把它們變成色彩繽紛、生動有趣的圖片，
          讓你的想像力成為現實！無論是夢想的旅行目的地、奇幻生物還是美味的食物，
          魔法筆都能把它們畫出來，讓你驚艷不已！讓我們的想像力和魔法筆一起翱翔吧！">
        <div className="flex items-center justify-center gap-1">
          <MdOutlineTextFields className="flex items-center justify-center text-4xl text-teal-700" />
          <ImArrowRight className="flex items-center justify-center text-xl text-teal-700" />
          <IoImages className="flex items-center justify-center text-4xl text-teal-700" />
        </div>
      </PageTitle>

      <div className="flex w-full justify-end">
        <div className="w-3/4">
          <PromptSearchBox />
        </div>
      </div>

      <div className="flex flex-col pt-14">
        <textarea
          ref={textForDiffusion}
          placeholder="填入想要的場景和人事物"
          className="mb-6 min-h-[100px] w-full border placeholder:p-10"
        />
        <div className="flex justify-end">
          <LoadingButton
            loading={loading}
            executeFunction={getStableDiffusionImage}
          />
        </div>
      </div>
      <ImageShowMode
        selected={selected}
        setSelected={setSelected}
        SetShowImage={SetShowImage}
        getPuzzle={getPuzzle}
        setShowDifficultPuzzle={setShowDifficultPuzzle}
        SetShowEasyPuzzle={SetShowEasyPuzzle}
      />
      {/* <button
        onClick={async () => {
          if (imageUrl) {
            await getSplitImage(imageUrl);
            setShowCut(true);
          }
          console.log('Cut completed.');
        }}>
        切割請求
      </button> */}

      {/* <button
        onClick={() => {
          console.log(imgBlobs);
          setShowDifficultPuzzle(true);
        }}>
        查看切割
      </button> */}

      <div className="flex min-h-[700px] w-full items-center justify-center">
        {imageUrl && (
          <Image
            className={`${showImage ? '' : 'hidden'}`}
            src={imageUrl}
            width={600}
            height={600}
            alt=""
          />
        )}
        <div>
          {imageUrl && showDifficultPuzzle && (
            <ImagePuzzle imgBlobs={imgBlobs} />
          )}
        </div>
        <div>
          {imageUrl && showEasyPuzzle && <PuzzleLayout imageUrl={imageUrl} />}
        </div>
      </div>
    </main>
  );
}

export default Page;
