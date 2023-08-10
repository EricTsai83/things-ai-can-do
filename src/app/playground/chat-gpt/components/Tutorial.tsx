'use client';

import { useState } from 'react';
import ContentContext from '../context/ContentContext';
import contents from '../page-content';
import ChatGPT from './ChatGPT';
import SplitPane, {
  Divider,
  SplitPaneBottom,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneTop,
} from './SplitPane';

function Tutorial() {
  const [currContent, setCurrContent] = useState<number>(1); // Content ID

  return (
    <ContentContext.Provider value={{ contents, currContent, setCurrContent }}>
      <SplitPane className="flex h-full w-full flex-col gap-20">
        <SplitPaneTop />
        <div className="md:hidden">
          <SplitPaneBottom />
          <div className="mt-10 h-[75vh] rounded-t-lg bg-gray-500">
            <ChatGPT />
          </div>
        </div>

        <SplitPane className="hidden h-full w-full flex-row  md:flex">
          <SplitPaneLeft>
            <SplitPaneBottom />
          </SplitPaneLeft>
          <Divider
            className="
                cursor-col-resize border-4 border-gray-700
                hover:border-4 hover:border-teal-600
                active:border-4 active:border-teal-600"
          />
          <SplitPaneRight>
            <div className="h-full rounded-t-lg bg-gray-500">
              <ChatGPT />
            </div>
          </SplitPaneRight>
        </SplitPane>
      </SplitPane>
    </ContentContext.Provider>
  );
}

export default Tutorial;
