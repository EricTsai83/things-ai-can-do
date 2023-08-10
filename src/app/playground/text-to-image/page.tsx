import { ImArrowRight } from 'react-icons/im';
import { IoImages } from 'react-icons/io5';
import { MdOutlineTextFields } from 'react-icons/md';
import PageTitle from '@/components/PageTitle';
import MainContent from './components/MainContent';

export const metadata = {
  title: 'Text To Image',
};

function Page() {
  return (
    <main className="flex w-screen flex-col px-4 pt-24 ssm:px-16 xl:w-[calc(100vw-240px)]">
      <PageTitle
        title="文字生成圖片"
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
      <MainContent />
    </main>
  );
}

export default Page;
