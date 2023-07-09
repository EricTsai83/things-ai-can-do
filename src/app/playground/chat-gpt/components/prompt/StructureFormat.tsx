import { useRef } from 'react';
import { RiFileCopyFill } from 'react-icons/ri';
import { copyRefToClipboard } from '@/utils/copy-to-clipboard';

export function JSONFormat() {
  return (
    <div className="rounded-2xl bg-gray-500 text-gray-100">
      <div className="whitespace-normal p-8">
        <p>
          {`Generate a list of three made-up book titles along with their authors\
          and genres. Provide them in JSON format with the following keys:\
          book_id, title, author, genre.`}
        </p>
      </div>
    </div>
  );
}

export function CSVFormat() {
  return (
    <div className="rounded-2xl bg-gray-500 text-gray-100">
      <div className="p-6">
        <p>
          {`Generate a list of three made-up book titles along with their authors\
          and genres. Provide them in csv format with the following keys:\
          book_id, title, author, genre.`}
        </p>
      </div>
    </div>
  );
}

function StructureFormat() {
  const tactic1Ref = useRef<HTMLDivElement | null>(null);
  const tactic2Ref = useRef<HTMLDivElement | null>(null);

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
        <p>直接告訴模型準確要產出的資料格式</p>
      </div>
      <h3 className="mt-6 text-lg text-gray-800">🟢 情境一: JSON</h3>
      <div className="relative mt-8">
        {renderPromptHeader(tactic1Ref)}
        <div ref={tactic1Ref}>
          <JSONFormat />
        </div>
      </div>
      <h3 className="mt-6 text-lg text-gray-800">🟢 情境二: CSV</h3>
      <div className="relative mt-8">
        {renderPromptHeader(tactic2Ref)}
        <div ref={tactic2Ref}>
          <CSVFormat />
        </div>
      </div>
    </div>
  );
}
export default StructureFormat;
