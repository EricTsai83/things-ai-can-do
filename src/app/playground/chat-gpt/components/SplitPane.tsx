import { useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode, MouseEventHandler } from 'react';
import ContentContext from '../context/ContentContext';
import SplitPaneContext from '../context/SplitPaneContext';
import Delimiter from './prompt/Delimiter';
import StructureFormat from './prompt/StructureFormat';
import Condition from './prompt/Condition';
import Link from 'next/link';
import Imitate from './prompt/Imitate';
import { TbTargetArrow } from 'react-icons/tb';

interface SplitPaneProps {
  children: ReactNode[];
  className: string;
}

// ...props: 可以方便你重用組建時，取不一樣的props
function SplitPane({ children, ...props }: SplitPaneProps) {
  const [clientHeight, setClientHeight] = useState<number | null>(null);
  const [clientWidth, setClientWidth] = useState<number | null>(null);
  const yDividerPos = useRef<number | null>(null);
  const xDividerPos = useRef<number | null>(null);

  // 按下左鍵
  const onMouseHoldDown: MouseEventHandler = (event) => {
    yDividerPos.current = event.clientY;
    xDividerPos.current = event.clientX;
  };

  // 放開左鍵
  const onMouseHoldUp = () => {
    yDividerPos.current = null;
    xDividerPos.current = null;
  };

  // 按者左鍵移動滑鼠
  const onMouseHoldMove: EventListener = (event) => {
    if (yDividerPos.current === null || xDividerPos.current === null) {
      return;
    }
    const mouseEvent = event as MouseEvent;
    clientHeight &&
      setClientHeight(clientHeight + mouseEvent.clientY - yDividerPos.current);
    clientWidth &&
      setClientWidth(clientWidth + mouseEvent.clientX - xDividerPos.current);
    yDividerPos.current = mouseEvent.clientY;
    xDividerPos.current = mouseEvent.clientX;
  };

  useEffect(() => {
    document.addEventListener('mouseup', onMouseHoldUp);
    document.addEventListener('mousemove', onMouseHoldMove);

    return () => {
      document.removeEventListener('mouseup', onMouseHoldUp);
      document.removeEventListener('mousemove', onMouseHoldMove);
    };
  });

  return (
    <div {...props}>
      <SplitPaneContext.Provider
        value={{
          clientHeight,
          setClientHeight,
          clientWidth,
          setClientWidth,
          onMouseHoldDown,
        }}>
        {children}
      </SplitPaneContext.Provider>
    </div>
  );
}

interface ClassNameProps {
  className: string;
}

export const Divider = (props: ClassNameProps) => {
  const { onMouseHoldDown } = useContext(SplitPaneContext);

  return <div {...props} onMouseDown={onMouseHoldDown} />;
};

export const SplitPaneTop = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const { clientHeight, setClientHeight } = useContext(SplitPaneContext);
  const { contents, currContent, setCurrContent } = useContext(ContentContext);

  useEffect(() => {
    if (clientHeight === null && topRef.current) {
      setClientHeight(topRef.current.clientHeight);
      return;
    }

    if (topRef.current) {
      topRef.current.style.minHeight = clientHeight + 'px';
      topRef.current.style.maxHeight = clientHeight + 'px';
    }
  }, [clientHeight, setClientHeight]);

  return (
    <div
      className="flex flex-col items-center justify-center gap-5"
      ref={topRef}>
      <h2 className="flex w-full items-center justify-center text-2xl font-semibold text-teal-700">
        ChatGPT Prompts 主題:
      </h2>
      <ul
        className="
          grid cursor-pointer grid-flow-row grid-cols-1
          gap-5 md:grid-flow-col md:grid-rows-2">
        {contents.map((element) => {
          return (
            <li key={element.id} className="md:w-[320px]">
              <div
                className="text-xl text-gray-800 hover:underline hover:decoration-teal-400 hover:underline-offset-4"
                // href=""
                onClick={() => setCurrContent(element.id)}>
                {element.subject}

                {currContent === element.id && (
                  <div className="inline-block align-middle">
                    <TbTargetArrow className="ml-2 text-2xl text-red-600" />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const SplitPaneBottom = () => {
  const { contents, currContent } = useContext(ContentContext);
  const content = contents.find((element) => element.id === currContent)!;

  function pageContent() {
    if (content.description === 'delimiter') {
      return <Delimiter />;
    } else if (content.description === 'output-format') {
      return <StructureFormat />;
    } else if (content.description === 'condition') {
      return <Condition />;
    } else if (content.description === 'imitate') {
      return <Imitate />;
    } else {
      // pass
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="flex w-full items-center justify-center text-2xl font-semibold text-teal-700 md:mt-10">
        聊天機器人模板說明與練習場:
      </h2>
      <div className="no-scrollbar h-full overflow-y-scroll">
        {pageContent()}
      </div>
    </div>
  );
};

interface SplitPaneLeftProps {
  children: ReactNode;
}

export const SplitPaneLeft = (children: SplitPaneLeftProps) => {
  const topRef = useRef<HTMLDivElement>(null);
  const { clientWidth, setClientWidth } = useContext(SplitPaneContext);

  useEffect(() => {
    if (clientWidth === null && topRef.current) {
      setClientWidth(topRef.current.clientWidth / 2);
      return;
    }
    if (topRef.current) {
      topRef.current.style.minWidth = clientWidth + 'px';
      topRef.current.style.maxWidth = clientWidth + 'px';
    }
  }, [clientWidth, setClientWidth]);

  return <div {...children} className="flex-1 overflow-hidden" ref={topRef} />;
};

interface SplitPaneRightProps {
  children: ReactNode;
}

export const SplitPaneRight = ({ children }: SplitPaneRightProps) => {
  return <div className="flex-1 overflow-auto">{children}</div>;
};

export default SplitPane;
