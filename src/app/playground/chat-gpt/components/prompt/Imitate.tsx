import { useRef } from 'react';
import { RiFileCopyFill } from 'react-icons/ri';
import { copyRefToClipboard } from '@/utils/copy-to-clipboard';

export function ImitateTactic1() {
  return (
    <div className="rounded-2xl bg-gray-500 text-gray-100">
      <div className="whitespace-normal p-8">
        <p>Your task is to answer in a consistent style.</p>
        <br />
        <p>{'<child>: Teach me about patience.'}</p>
        <p>
          {`\n<grandparent>: The river that carves the deepest valley\
          flows from a modest spring; the grandest symphony originates\
          from a single note; the most intricate tapestry begins with\
          a solitary thread.`}
        </p>
        <p>{`\n<child>: Teach me about resilience.`}</p>
      </div>
    </div>
  );
}

function Imitate() {
  const tactic1Ref = useRef<HTMLDivElement | null>(null);
  function renderPromptHeader(tacticRef: any) {
    return (
      <div className="absolute -top-5 w-full rounded-2xl bg-gray-700 p-2 text-gray-200">
        <div className="pl-3">prompt</div>
        <button
          className="absolute right-3 top-2 cursor-pointer text-gray-200 active:text-white"
          onClick={() => copyRefToClipboard(tacticRef)}>
          <RiFileCopyFill className="text-2xl" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-scroll whitespace-pre-line text-left">
      <div className="text-lg text-gray-800">📝 應用技巧</div>
      <div className="mt-3 text-gray-600">
        <p>
          提供一些對話樣本，要求模型學習這種對話模式，並讓其推論兩人接續的對話內容
        </p>
      </div>

      <h3 className="mt-6 text-lg text-gray-800">
        🟢 情境一:
        小孩問祖父(母)的問題，然後祖父(母)是用隱喻的方式回答，並請模型用相同的對話風格回覆
      </h3>

      <div className="relative mt-8">
        {renderPromptHeader(tactic1Ref)}
        <div ref={tactic1Ref}>
          <ImitateTactic1 />
        </div>
      </div>
    </div>
  );
}
export default Imitate;
