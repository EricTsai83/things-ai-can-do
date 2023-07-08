import { useRef } from 'react';
import { RiFileCopyFill } from 'react-icons/ri';

export function DelimiterTactic1() {
  return (
    <div className="rounded-2xl bg-gray-500 text-gray-100">
      <div className="p-6">
        <p>
          Summarize the text delimited by triple backticks into a single
          sentence.
        </p>
        <p>
          ``` You should express what you want a model to do by providing
          instructions that are as clear and specific as you can possibly make
          them. This will guide the model towards the desired output, and reduce
          the chances of receiving irrelevant or incorrect responses. Don&#39;t
          confuse writing a clear prompt with writing a short prompt. In many
          cases, longer prompts provide more clarity and context for the model,
          which can lead to more detailed and relevant outputs. ```
        </p>
      </div>
    </div>
  );
}

export function DelimiterTactic2() {
  return (
    <div className="rounded-2xl bg-gray-500 text-gray-100">
      <div className="p-6">
        <p>
          Summarize the text delimited by triple backticks into a single
          sentence.
        </p>
        <p>
          You should express what you want a model to do by providing
          instructions that are as clear and specific as you can possibly make
          them. This will guide the model towards the desired output, and reduce
          the chances of receiving irrelevant or incorrect responses. Don&#39;t
          confuse writing a clear prompt with writing a short prompt. In many
          cases, longer prompts provide more clarity and context for the model,
          which can lead to more detailed and relevant outputs.
        </p>
      </div>
    </div>
  );
}

function Delimiter() {
  const tactic1Ref = useRef<HTMLDivElement | null>(null);
  const tactic2Ref = useRef<HTMLDivElement | null>(null);
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
          使用 ```、&quot;&quot;&quot;、 &lt; &gt;、&lt;tag&gt; &lt;/tag&gt;和 :
          等分隔符號，讓模型知道要將符號內的文字視為指示還是僅為參考內容
        </p>
      </div>
      <br />
      <h3 className="text-lg text-gray-800">
        🟢 情境一: 使用 ``` 區隔指示與參考內容
      </h3>
      <br />
      <div className="relative">
        <button
          className="absolute right-3 top-2 cursor-pointer text-gray-200 active:text-white"
          onClick={() => copyToClipboard(tactic1Ref)}>
          <RiFileCopyFill className="text-2xl" />
        </button>
        <div ref={tactic1Ref}>
          <DelimiterTactic1 />
        </div>
      </div>

      <br />
      <br />
      <h3 className="text-lg text-gray-800">
        🟢 情境二: 移除 ``` 後，模型誤認需要總結的內容為指示
      </h3>
      <br />
      <div className="relative">
        <button
          className="absolute right-3 top-2 cursor-pointer text-gray-200 active:text-white"
          onClick={() => copyToClipboard(tactic2Ref)}>
          <RiFileCopyFill className="text-2xl" />
        </button>
        <div ref={tactic2Ref}>
          <DelimiterTactic2 />
        </div>
      </div>
    </div>
  );
}
export default Delimiter;
