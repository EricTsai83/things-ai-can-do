import { BsRobot } from 'react-icons/bs';
import PageTitle from '@/components/PageTitle';
import Tutorial from './components/Tutorial';

function Page() {
  return (
    <div className="flex h-screen w-screen flex-col px-4 pt-24 ssm:px-16 xl:w-[calc(100vw-240px)]">
      <PageTitle
        title="聊天機器人"
        content="
          聊天機器人是一種智能程式創造的虛擬朋友，可以陪聊、回答問題，提供遊戲和娛樂，讓對話變得便利、有趣且有益。
          它們使用自然語言處理技術，理解和解釋人們的話語，有時甚至能模仿情感和個性，成為你的智慧助手。
          透過點擊底下 ChatGPT Prompts 模板標題來學習怎麼應用當今最夯的聊天機器人吧！">
        <BsRobot className="flex items-center justify-center text-5xl text-teal-700" />
      </PageTitle>
      <Tutorial />
    </div>
  );
}

export default Page;
