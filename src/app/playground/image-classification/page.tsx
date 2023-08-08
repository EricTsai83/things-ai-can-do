'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { ImMakeGroup } from 'react-icons/im';
import ArrowIconButton from '@/components/ArrowIconButton';
import PageTitle from '@/components/PageTitle';
import Animated3dFlipCard from './components/Animated3dFlipCard';
import label from './label';
import type { Response } from './types';

const CanvasWithoutSSR = dynamic(() => import('./components/Canvas'), {
  ssr: false,
});

function Page() {
  const [drawingTool, setDrawingTool] = useState<string>('pen');
  const [subject, setSubject] = useState<string | null>(null);
  const [responses, setResponses] = useState<Response[] | null>(null);
  const [rightAnwser, setRightAnwser] = useState<boolean>(false);

  function getRandomLabel() {
    const random = Math.floor(Math.random() * Object.keys(label).length);
    setSubject(Object.keys(label)[random] as string);
  }

  useEffect(() => {
    if (responses !== null && subject !== null) {
      const res = responses.some((obj) => {
        return obj.label === label[subject];
      });

      setRightAnwser(res);
    }
  }, [responses, subject]);

  return (
    <div className="flex w-screen flex-col px-4 pt-24 ssm:px-16 xl:w-[calc(100vw-240px)]">
      <PageTitle
        title="圖片分類"
        content="
          圖片分類就像是一個智能眼睛，它可以辨識和分類數字圖像。它通過學習圖像的特徵和模式來辨別不同的物體或場景，
          就像我們辨認事物一樣。這項技術已經廣泛應用於識別人臉、檢測疾病、辨識商品等各個領域。透過不斷改進，
          這個智能眼睛正在變得越來越準確和強大，為我們的生活帶來了許多便利和驚喜。
          底下我們設計了一個手繪遊戲，讓你根據電腦隨機產生的圖片，來畫出相應的東西，
          看看 AI 能不能透過圖片分類的技術猜到你在畫什麼，趕快動手玩玩看吧！">
        <div className="flex items-center justify-center gap-1">
          <ImMakeGroup className="flex items-center justify-center text-5xl text-teal-700" />
        </div>
      </PageTitle>

      <div
        onClick={getRandomLabel}
        className="flex items-center justify-center">
        <ArrowIconButton text={'產生題目'} />
      </div>

      <div className="mt-5 flex w-full flex-col items-center justify-center gap-5 md:flex-row md:items-start">
        <div className="flex flex-1 flex-col">
          <select
            className="max-w-[120px] text-xl"
            value={drawingTool}
            onChange={(e) => {
              setDrawingTool(e.target.value);
            }}>
            <option value="pen">✒️ 畫筆</option>
            <option value="eraser">⬜ 橡皮擦</option>
          </select>
          <div>
            <CanvasWithoutSSR
              drawingTool={drawingTool}
              setResponses={setResponses}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col">
            {subject ? (
              <div className="flex h-[200px] w-[220px] flex-col">
                <Animated3dFlipCard subject={subject} />
              </div>
            ) : (
              <div className="flex h-[200px] w-[220px] items-center justify-center border text-2xl font-medium text-teal-600">
                題目板
              </div>
            )}
          </div>
          <div className="mt-5 h-[200px] w-[220px] border">
            <div className="mt-3 flex justify-center text-xl text-gray-700 underline decoration-teal-600 decoration-4 underline-offset-4">
              AI 五大猜測結果
            </div>
            <ul className="ml-3 mt-3 list-inside list-disc">
              {responses &&
                responses.map((response, index) => (
                  <li key={index} className="text-gray-600">
                    <span
                      className={
                        subject &&
                        rightAnwser &&
                        label[subject] === response.label
                          ? 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text font-bold text-transparent'
                          : ''
                      }>
                      {response.label}
                    </span>
                    : <span>{`${response.score.toFixed(2)}`}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
