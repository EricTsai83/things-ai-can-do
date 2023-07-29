import dynamic from 'next/dynamic';
import { AiFillInfoCircle } from 'react-icons/ai';
import { BsFillRocketTakeoffFill } from 'react-icons/bs';
import HomeSlider from '@/components/HomeSlider';
import PageTitle from '@/components/PageTitle';

const DynamicNewsletter = dynamic(() => import('@/components/Newsletter'), {
  loading: () => <p>Loading...</p>,
});

function Page() {
  return (
    <div className="relative flex h-screen w-screen flex-col px-8 pt-24 xl:w-[calc(100vw-240px)]">
      <PageTitle
        title="Make AI do things for you"
        content="  
          探索AI魔法世界！網站提供臉部識別、聊天機器人、文字轉圖像、肢體偵測、
          圖像分割和分類等令人興奮的AI應用。
          實際體驗透過人臉情緒分析來創建屬於自己的虛擬人像、將文字轉化成創意圖像、圖像去背等多種AI應用
          ，讓AI為你帶來驚奇與便利，一同體驗未來科技的奇蹟吧！">
        <BsFillRocketTakeoffFill className="flex items-center justify-center text-5xl text-teal-700" />
      </PageTitle>

      <div className="flex items-center gap-1 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-xl font-bold">
        <AiFillInfoCircle className="text-xl font-bold text-red-500" />
        <span className="text-transparent">
          大部分的互動遊戲需要透過電腦才可以遊玩喔！
        </span>
      </div>
      <HomeSlider />
      <DynamicNewsletter />
    </div>
  );
}

export default Page;
