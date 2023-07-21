'use client';
import { useState } from 'react';
import SplitPane, {
  Divider,
  SplitPaneBottom,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneTop,
} from './components/SplitPane';
import ContentContext from './context/ContentContext';
import ChatGPT from './components/ChatGPT';
import contents from './page-content';
import PageTitle from '@/components/PageTitle';
import { BsRobot } from 'react-icons/bs';

function Page() {
  const [currContent, setCurrContent] = useState(1);

  return (
    <div className="flex h-screen w-screen flex-col px-8 pt-24 xl:w-[calc(100vw-240px)]">
      <ContentContext.Provider
        value={{ contents, currContent, setCurrContent }}>
        <PageTitle
          title="聊天機器人"
          content="
          聊天機器人是一種智能程式創造的虛擬朋友，可以陪聊、回答問題，提供遊戲和娛樂，讓對話變得便利、有趣且有益。
          它們使用自然語言處理技術，理解和解釋人們的話語，有時甚至能模仿情感和個性，成為你的智慧助手。
          透過點擊底下 ChatGPT Prompts 模板標題來學習怎麼應用當今最夯的聊天機器人吧！">
          <BsRobot className="flex items-center justify-center text-5xl text-teal-700" />
        </PageTitle>

        <SplitPane className="flex h-full w-full flex-col gap-20">
          <SplitPaneTop />

          <div className="md:hidden">
            <SplitPaneBottom />

            <div className="mt-10 h-full rounded-t-lg bg-gray-500">
              <ChatGPT />
            </div>
          </div>

          <SplitPane className="hidden h-full w-full flex-row md:flex">
            <SplitPaneLeft>
              <SplitPaneBottom />
            </SplitPaneLeft>
            <Divider className="cursor-col-resize border border-gray-800 hover:border-4 active:border-4" />

            <SplitPaneRight>
              <div className="h-full rounded-t-lg bg-gray-500">
                <ChatGPT />
              </div>
            </SplitPaneRight>
          </SplitPane>
        </SplitPane>
      </ContentContext.Provider>
    </div>
  );
}

export default Page;
