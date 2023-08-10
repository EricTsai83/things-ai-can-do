'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import LoadingButton from '@/components/LoadingButton';
import { FlipToastContainer, apiNotify } from '@/components/ReactToast';
import TooltipContainer from '@/components/TooltipContainer';
import huggingFaceApi from '@/utils/hugging-face-api';
import DifficultPuzzle from '../components/DifficultPuzzle';
import EasyPuzzle from '../components/EasyPuzzle';
import ImageShowMode from '../components/ImageShowMode';
import PromptSearchBox from '../components/PromptSearchBox';
import { plans } from '../components/plans';
import splitImage from '../split-image';
import type { TileObject } from '../split-image';
import type { ModeSelected } from '../types';

function MainContent() {
  const textForDiffusion = useRef<HTMLTextAreaElement>(null);
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imgBlobs, setImgBlobs] = useImmer<TileObject>({});
  const [showImage, setShowImage] = useState<boolean>(false);
  const [showEasyPuzzle, setShowEasyPuzzle] = useState<boolean>(false);
  const [showDifficultPuzzle, setShowDifficultPuzzle] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modeSelected, setModeSelected] = useState<ModeSelected>(plans[1]);

  async function getStableDiffusionImage() {
    if (textForDiffusion.current) {
      setIsLoading(true);
      const postData = {
        inputs: textForDiffusion.current.value,
        options: {
          wait_for_model: true,
        },
      };
      try {
        const myBlob = await huggingFaceApi.getStableDiffusionImage(postData);
        const imgUrl = URL.createObjectURL(myBlob);
        setImgUrl(imgUrl);
        setShowEasyPuzzle(true);
        setShowDifficultPuzzle(false);
        setShowImage(false);
        setModeSelected(plans[1]);
      } catch (event) {
        apiNotify();
      } finally {
        setIsLoading(false);
      }
    }
  }

  const getSplitImage = async (imageUrl: string) => {
    const tileObj = await splitImage(imageUrl);
    setImgBlobs(tileObj);
  };

  async function getPuzzle() {
    if (imgUrl) {
      await getSplitImage(imgUrl);
      setShowDifficultPuzzle(true);
    }
  }

  return (
    <>
      <div className="w-3/4 flex-col">
        <h2 className="mb-8 text-2xl font-semibold text-teal-700">
          步驟一：提示詞參考
        </h2>
        <PromptSearchBox />
      </div>

      <div className="flex flex-col pt-14">
        <h2 className="mb-8 text-2xl font-semibold text-teal-700">
          步驟二：填入想要的場景和人事物
        </h2>
        <textarea
          ref={textForDiffusion}
          placeholder="請用英文描述，建議參考上方提示詞的寫法"
          className="mb-6 min-h-[100px] w-full border placeholder:p-10"
        />
        <div className="flex justify-end">
          <TooltipContainer
            tooltips="
              在一段時間後，首次做模型推論，
              模型得先進行加載，若推論失敗，請等待幾秒鐘後，再次點擊按鈕。">
            <LoadingButton
              isLoading={isLoading}
              executeFunction={getStableDiffusionImage}
              text="模型推論"
            />
          </TooltipContainer>
        </div>
      </div>
      <h2 className="my-8 text-2xl font-semibold text-teal-700">
        步驟三：選擇呈現圖片的方式
      </h2>
      <ImageShowMode
        modeSelected={modeSelected}
        setModeSelected={setModeSelected}
        setShowImage={setShowImage}
        getPuzzle={getPuzzle}
        setShowDifficultPuzzle={setShowDifficultPuzzle}
        setShowEasyPuzzle={setShowEasyPuzzle}
      />

      <div className="flex min-h-[700px] w-full items-center justify-center">
        {imgUrl && (
          <Image
            className={`${showImage ? '' : 'hidden'}`}
            src={imgUrl}
            width={600}
            height={600}
            alt=""
          />
        )}
        <div>
          {imgUrl && showDifficultPuzzle && (
            <DifficultPuzzle imgBlobs={imgBlobs} />
          )}
        </div>
        <div>{imgUrl && showEasyPuzzle && <EasyPuzzle imgUrl={imgUrl} />}</div>
      </div>
      <FlipToastContainer />
    </>
  );
}

export default MainContent;
