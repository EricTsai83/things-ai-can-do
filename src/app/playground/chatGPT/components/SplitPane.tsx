import { useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode, MouseEventHandler } from 'react';
import QuoteContext from '../context/QuoteContext';
import SplitPaneContext from '../context/SplitPaneContext';

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
  const { quotes, setCurrQuote } = useContext(QuoteContext);

  useEffect(() => {
    if (clientHeight === null && topRef.current) {
      setClientHeight(topRef.current.clientHeight);
      return;
    }
    if (topRef.current) {
      topRef.current.style.minHeight = clientHeight + 'px';
      topRef.current.style.maxHeight = clientHeight + 'px';
    }
  }, [clientHeight]);

  return (
    <div className="flex-1 overflow-hidden text-left" ref={topRef}>
      <h1 className="text-2xl">ChatGPT Prompts Template:</h1>
      <ul className="list-inside list-disc">
        {quotes.map((el, i) => {
          return (
            <li className="m-0.5" key={i}>
              <a
                className="text-xl underline decoration-sky-600 hover:decoration-blue-400"
                href="#"
                onClick={() => setCurrQuote(el.id)}>
                {el.author}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const SplitPaneBottom = () => {
  // const { currQuote } = useContext(QuoteContext);

  const { quotes, currQuote } = useContext(QuoteContext);
  const quote = quotes.find((element) => element.id === currQuote)!;

  return (
    <div className="flex-1 overflow-hidden text-left">
      <b>Prompt 結構</b>: {quote.description}
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
  }, [clientWidth]);

  return <div {...children} className="flex-1 overflow-hidden" ref={topRef} />;
};

interface SplitPaneRightProps {
  children: ReactNode;
}

export const SplitPaneRight = ({ children }: SplitPaneRightProps) => {
  // const { quotes, currQuote } = useContext(QuoteContext);
  // const quote = quotes.find((element) => element.id === currQuote);

  return <div className="flex-1 overflow-hidden">{children}</div>;
};

export default SplitPane;
