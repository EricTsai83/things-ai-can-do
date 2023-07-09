import { useRef } from 'react';
import { RiFileCopyFill } from 'react-icons/ri';
import copyToClipboard from './copy-to-clipboard';

export function WithStepDesc() {
  return (
    <div className="rounded-2xl bg-gray-500 text-gray-100">
      <div className="whitespace-normal p-8">
        <p>
          {`You will be provided with text delimited by triple quotes. If it\
          contains a sequence of instructions, re-write those instructions in\
          the following format:\
          `}
        </p>
        <p>{`\nStep 1 - ...`}</p>
        <p>{`\nStep 2 - …`}</p>
        <p>{`\n…`}</p>
        <p>{`\nStep N - …`}</p>
        <p>
          {`\nIf the text does not contain a sequence of instructions, then simply\
          write "No steps provided."`}
        </p>
        <p>
          {`\n"""Making a cup of tea is easy! First, you need to get\
          some water boiling. While that&apos;s happening, grab a cup and put a\
          tea bag in it. Once the water is hot enough, just pour it over the tea\
          bag. Let it sit for a bit so the tea can steep. After a few minutes,\
          take out the tea bag. If you like, you can add some sugar or milk to\
          taste. And that&apos;s it! You&apos;ve got yourself a delicious cup of\
          tea to enjoy."""`}
        </p>
      </div>
    </div>
  );
}

export function WithoutStepDesc() {
  return (
    <div className="rounded-2xl bg-gray-500 text-gray-100">
      <div className="whitespace-normal p-8">
        <p>
          {`You will be provided with text delimited by triple quotes. If it\
          contains a sequence of instructions, re-write those instructions in\
          the following format:`}
        </p>
        <p>{`\nStep 1 - ...`}</p>
        <p> {`\nStep 2 - …`} </p>
        <p>{`\n…`} </p>
        <p>{`\nStep N - …`}</p>
        <p>
          {`\nIf the text does not contain a sequence of instructions, then simply\
          write "No steps provided."`}
        </p>
        <br />
        <p>
          {`
          """The sun is shining brightly today, and the birds are\
          singing. It&apos;s a beautiful day to go for a walk in the park. The\
          flowers are blooming, and the trees are swaying gently in the breeze.\
          People are out and about, enjoying the lovely weather. Some are having\
          picnics, while others are playing games or simply relaxing on the\
          grass. It&apos;s a perfect day to spend time outdoors and appreciate\
          the beauty of nature."""`}
        </p>
      </div>
    </div>
  );
}

function Condition() {
  const tactic1Ref = useRef<HTMLDivElement | null>(null);
  const tactic2Ref = useRef<HTMLDivElement | null>(null);

  function renderPromptHeader(tacticRef: any) {
    return (
      <div className="absolute -top-5 w-full rounded-2xl bg-gray-700 p-2 text-gray-200">
        <div className="pl-3">prompt</div>
        <button
          className="absolute right-3 top-2 cursor-pointer text-gray-200 active:text-white"
          onClick={() => copyToClipboard(tacticRef)}>
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
          可以透過給定條件來讓模型判斷並給出相應的結果。以下第一部分的 prompt
          給的是有順序的描述，請 chatGPT
          做收斂成有序的階段順序;第二部分則給的是無階段順序的描述。如果是有步驟的就救回傳成給定的格式，若沒有就回傳
          No steps provided.
        </p>
      </div>
      <br />
      <h3 className="mt-6 text-lg text-gray-800">
        🟢 情境一: 有步驟順序的描述
      </h3>
      <br />
      <div className="relative mt-8">
        {renderPromptHeader(tactic1Ref)}
        <div ref={tactic1Ref}>
          <WithStepDesc />
        </div>
      </div>

      <h3 className="mt-6 text-lg text-gray-800">
        🟢 情境二: 沒有步驟順序的描述
      </h3>
      <div className="relative mt-8">
        {renderPromptHeader(tactic2Ref)}
        <div ref={tactic2Ref}>
          <WithoutStepDesc />
        </div>
      </div>
    </div>
  );
}
export default Condition;
