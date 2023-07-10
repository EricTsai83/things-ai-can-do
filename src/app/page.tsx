import PageTitle from '@/components/PageTitle';
import { BsFillRocketTakeoffFill } from 'react-icons/bs';
import HomeSlider from '@/components/HomeSlider';

function Page() {
  return (
    <div className="relative flex h-screen w-screen flex-col px-8 pt-24 xl:w-[calc(100vw-240px)]">
      <PageTitle
        title="Make AI do thing for you"
        content="  
          探索AI魔法世界！網站提供臉部識別、聊天機器人、文字轉圖像、肢體偵測、
          圖像分割和分類等令人興奮的AI應用。
          實際體驗透過人臉情緒分析來創建屬於自己的虛擬人像、將文字轉化成創意圖像、圖像去背等多種AI應用
          ，讓AI為你帶來驚奇與便利，一同體驗未來科技的奇蹟吧！">
        <BsFillRocketTakeoffFill className="flex items-center justify-center text-5xl text-teal-700" />
      </PageTitle>
      <HomeSlider />
    </div>
  );
}

export default Page;
