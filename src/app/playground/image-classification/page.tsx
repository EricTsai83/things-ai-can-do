import { ImMakeGroup } from 'react-icons/im';
import PageTitle from '@/components/PageTitle';
import MainContent from './components/MainContent';

function Page() {
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
      <MainContent />
    </div>
  );
}

export default Page;
