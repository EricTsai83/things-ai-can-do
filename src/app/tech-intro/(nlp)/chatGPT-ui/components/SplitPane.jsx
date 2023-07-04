import { useContext, useEffect, useRef, useState } from 'react';
import QuoteContext from '../context/QuoteContext';
import SplitPaneContext from '../context/SplitPaneContext';

// ...props: 可以方便你重用組建時，取不一樣的props
function SplitPane({ children, ...props }) {
  const [clientHeight, setClientHeight] = useState(null);
  const [clientWidth, setClientWidth] = useState(null);
  const yDividerPos = useRef(null);
  const xDividerPos = useRef(null);

  // 按下左鍵
  const onMouseHoldDown = (e) => {
    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
  };

  // 放開左鍵
  const onMouseHoldUp = () => {
    yDividerPos.current = null;
    xDividerPos.current = null;
  };

  // 按者左鍵移動滑鼠
  const onMouseHoldMove = (e) => {
    if (!yDividerPos.current && !xDividerPos.current) {
      return;
    }

    setClientHeight(clientHeight + e.clientY - yDividerPos.current);
    setClientWidth(clientWidth + e.clientX - xDividerPos.current);

    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
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

export const Divider = (props) => {
  const { onMouseHoldDown } = useContext(SplitPaneContext);

  return <div {...props} onMouseDown={onMouseHoldDown} />;
};

export const SplitPaneTop = (props) => {
  const topRef = useRef();
  const { clientHeight, setClientHeight } = useContext(SplitPaneContext);
  const { quotes, setCurrQuote } = useContext(QuoteContext);

  useEffect(() => {
    if (!clientHeight) {
      setClientHeight(topRef.current.clientHeight);
      return;
    }

    topRef.current.style.minHeight = clientHeight + 'px';
    topRef.current.style.maxHeight = clientHeight + 'px';
  }, [clientHeight]);

  return (
    <div {...props} className="flex-1 overflow-hidden text-left" ref={topRef}>
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

export const SplitPaneBottom = (props) => {
  // const { currQuote } = useContext(QuoteContext);

  const { quotes, currQuote } = useContext(QuoteContext);
  const quote = quotes.find((element) => element.id === currQuote);

  return (
    <div {...props} className="flex-1 overflow-hidden text-left">
      <b>Prompt 結構</b>: {quote.description}
    </div>
  );
};

export const SplitPaneLeft = (props) => {
  const topRef = useRef();
  const { clientWidth, setClientWidth } = useContext(SplitPaneContext);

  useEffect(() => {
    if (!clientWidth) {
      setClientWidth(topRef.current.clientWidth / 2);
      console.log(props);
      return;
    }

    topRef.current.style.minWidth = clientWidth + 'px';
    topRef.current.style.maxWidth = clientWidth + 'px';
  }, [clientWidth]);

  return <div {...props} className="flex-1 overflow-hidden" ref={topRef} />;
};

export const SplitPaneRight = ({ children, ...props }) => {
  const { quotes, currQuote } = useContext(QuoteContext);
  const quote = quotes.find((el) => el.id === currQuote);

  return (
    <div {...props} className="flex-1 overflow-hidden">
      {children}
    </div>
  );
};

export default SplitPane;
