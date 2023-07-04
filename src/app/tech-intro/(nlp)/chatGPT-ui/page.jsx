'use client';
import { useState } from 'react';
import SplitPane, {
  Divider,
  SplitPaneBottom,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneTop,
} from './components/SplitPane';
import QuoteContext from './context/QuoteContext';
import ChatGPT from './components/ChatGPT';

const quotes = [
  {
    id: 1,
    author: '使用分隔符清楚地指示輸入的不同部分',
    description:
      '一鄉二里共三夫子，不識四書五經六義，竟敢教七八九子，十分大膽！',
  },
  {
    id: 2,
    author: '要求結構化輸出',
    description: '十室九貧，湊得八兩七錢六分五毫四厘，猶且三心兩意，一等下流！',
  },
  {
    id: 3,
    author: '要求模型檢查條件是否滿足',
    description:
      '圖畫裡，龍不吟虎不嘯，小小書僮可笑可笑。棋盤內，車無輪馬無韁，叫聲將軍提防提防。',
  },

  {
    id: 4,
    author: '提供例子，並要求模型模仿',
    description: '十口心思，思君思國思社稷。八目尚賞，賞花賞月賞秋香。',
  },
  {
    id: 5,
    author: '要求以指定格式輸出',
    description: '鶯鶯燕燕翠翠紅紅處處融融洽洽。雨雨風風花花葉葉年年暮暮朝朝。',
  },
];

function Page() {
  const [currQuote, setCurrQuote] = useState(1);

  return (
    <div className="h-screen w-screen pt-16">
      <QuoteContext.Provider value={{ quotes, currQuote, setCurrQuote }}>
        <SplitPane className="flex h-full w-full flex-row">
          <SplitPaneLeft>
            <SplitPane className="flex h-full w-full flex-col">
              <SplitPaneTop />
              <Divider className="cursor-row-resize border-2 border-black" />
              <SplitPaneBottom />
            </SplitPane>
          </SplitPaneLeft>
          <Divider className="cursor-col-resize border-2 border-black" />

          <SplitPaneRight>
            <ChatGPT />
          </SplitPaneRight>
        </SplitPane>
      </QuoteContext.Provider>
    </div>
  );
}

export default Page;
