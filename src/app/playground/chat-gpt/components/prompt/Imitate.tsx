import { useRef } from 'react';
import { RiFileCopyFill } from 'react-icons/ri';

export function ImitateTactic1() {
  return (
    <div className="rounded-2xl bg-gray-500 text-gray-100">
      <div className="p-6">
        <p>Your task is to answer in a consistent style.</p>
        <br />
        <p>{'<child>: Teach me about patience.'}</p>
        <br />
        <p>
          {`<grandparent>: The river that carves the deepest valley\
          flows from a modest spring; the grandest symphony originates\
          from a single note; the most intricate tapestry begins with\
          a solitary thread.`}
        </p>
        <br />
        <p>{`<child>: Teach me about resilience.`}</p>
      </div>
    </div>
  );
}

function Imitate() {
  const tactic1Ref = useRef<HTMLDivElement | null>(null);
  const copyToClipboard = (divRef: any) => {
    const textToCopy = divRef.current?.textContent as string;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying text:', error);
      });
  };

  return (
    <div className="flex-1 overflow-y-scroll whitespace-pre-line text-left">
      <div className="text-lg text-gray-800">📝 應用技巧</div>
      <div className="text-gray-600">
        <p>
          提供一些對話樣本，要求模型學習這種對話模式，並讓其推論兩人接續的對話內容
        </p>
      </div>
      <br />
      <h3 className="text-lg text-gray-800">
        🟢 情境一:
        小孩問祖父(母)的問題，然後祖父(母)是用隱喻的方式回答，並請模型用相同的對話風格回覆
      </h3>
      <br />
      <div className="relative">
        <button
          className="absolute right-3 top-2 cursor-pointer text-gray-200 active:text-white"
          onClick={() => copyToClipboard(tactic1Ref)}>
          <RiFileCopyFill className="text-2xl" />
        </button>
        <div ref={tactic1Ref}>
          <ImitateTactic1 />
        </div>
      </div>
    </div>
  );
}
export default Imitate;
