import { RefObject, useRef } from 'react';
import { RiFileCopyFill } from 'react-icons/ri';
import { copyRefToClipboard } from '@/utils/copy-to-clipboard';

export function DelimiterTactic1() {
  return (
    <div className="rounded-2xl bg-gray-500 text-gray-100">
      <div className="whitespace-normal p-8">
        <p>
          {`\
          \`\`\`You should express what you want a model to do by providing\
          instructions that are as clear and specific as you can possibly make\
          them. This will guide the model towards the desired output, and reduce\
          the chances of receiving irrelevant or incorrect responses. Don't\
          confuse writing a clear prompt with writing a short prompt. In many\
          cases, longer prompts provide more clarity and context for the model,\
          which can lead to more detailed and relevant outputs.\`\`\`
        `}
        </p>
        <p>
          {`\nSummarize the text delimited by triple backticks into a single sentence.`}
        </p>
      </div>
    </div>
  );
}

export function DelimiterTactic2() {
  return (
    <div className="rounded-2xl bg-gray-500 text-gray-100">
      <div className="whitespace-normal p-8">
        <p>
          {`You should express what you want a model to do by providing\
          instructions that are as clear and specific as you can possibly make\
          them. This will guide the model towards the desired output, and reduce\
          the chances of receiving irrelevant or incorrect responses. Don't\
          confuse writing a clear prompt with writing a short prompt. In many\
          cases, longer prompts provide more clarity and context for the model,\
          which can lead to more detailed and relevant outputs.`}
        </p>
        <p>{`\nSummarize the text.`}</p>
      </div>
    </div>
  );
}

function Delimiter() {
  const tactic1Ref = useRef<HTMLDivElement | null>(null);
  const tactic2Ref = useRef<HTMLDivElement | null>(null);

  function renderPromptHeader(tacticRef: RefObject<HTMLDivElement>) {
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
          使用 ```、&quot;&quot;&quot;、 &lt; &gt;、&lt;tag&gt; &lt;/tag&gt;和 :
          等分隔符號，讓模型知道要將符號內的文字視為指示還是僅為參考內容
        </p>
      </div>
      <h3 className="mt-6 text-lg text-gray-800">
        🟢 情境一: 使用 ``` 區隔指示與參考內容
      </h3>
      <div className="relative mt-8">
        {renderPromptHeader(tactic1Ref)}
        <div ref={tactic1Ref}>
          <DelimiterTactic1 />
        </div>
      </div>
      <h3 className="mt-6 text-lg text-gray-800">
        🟢 情境二: 移除 ``` 後，模型無法清楚知道你希望它總結的內容在哪裡
      </h3>
      <div className="relative mt-8">
        {renderPromptHeader(tactic2Ref)}
        <div ref={tactic2Ref}>
          <DelimiterTactic2 />
        </div>
      </div>
    </div>
  );
}
export default Delimiter;
