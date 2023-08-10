import { LuScanFace } from 'react-icons/lu';
import PageTitle from '@/components/PageTitle';
import MainContent from './components/MainContent';
import { SearchParams } from './types';

export const metadata = {
  title: 'Facial Recognition',
};

interface Props {
  searchParams: SearchParams;
}
// searchParams(default prop): An object containing the dynamic route parameters from
// the root segment down to that page.
function Page({ searchParams }: Props) {
  return (
    <div className="flex w-screen flex-col px-4 pt-24 ssm:px-16 xl:w-[calc(100vw-240px)]">
      <PageTitle
        title="臉部識別"
        content="
        臉部識別就像是一個神奇的魔法鏡！它是一種先進的技術，能夠辨識和辨別人們的臉部特徵。
        就像你的指紋獨一無二一樣，每個人的臉部也有獨特的特徵，像是眼睛、鼻子、嘴巴的形狀和位置等。
        它在現實生活中也有很多實用的應用。例如，可以用於安全控制，確保只有授權人員才能進入特定區域；
        也可以用於身份驗證，讓你的手機或電腦只對你開放。
        底下功能能夠深度帶你了解 AI 是如何對你的臉進行分析的，動手玩看看吧！">
        <LuScanFace className="flex items-center justify-center text-5xl text-teal-700" />
      </PageTitle>
      <MainContent searchParams={searchParams} />
    </div>
  );
}

export default Page;
