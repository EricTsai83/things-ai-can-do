import { useRef } from 'react';
import { RiFileCopyFill } from 'react-icons/ri';

export function JSONFormat() {
  return (
    <div className="rounded-2xl bg-gray-500 text-gray-100">
      <div className="p-6">
        <p>
          Generate a list of three made-up book titles along with their authors
          and genres. Provide them in JSON format with the following keys:
          book_id, title, author, genre.
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
          Generate a list of three made-up book titles along with their authors
          and genres. Provide them in csv format with the following keys:
          book_id, title, author, genre.
        </p>
      </div>
    </div>
  );
}

function StructureFormat() {
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
        <p>直接告訴模型準確要產出的資料格式</p>
      </div>
      <br />
      <h3 className="text-lg text-gray-800">🟢 情境一: JSON</h3>
      <br />
      <div className="relative">
        <button
          className="absolute right-3 top-2 cursor-pointer text-gray-200 active:text-white"
          onClick={() => copyToClipboard(tactic1Ref)}>
          <RiFileCopyFill className="text-2xl" />
        </button>
        <div ref={tactic1Ref}>
          <JSONFormat />
        </div>
      </div>

      <br />
      <br />
      <h3 className="text-lg text-gray-800">🟢 情境二: CSV</h3>
      <br />
      <div className="relative">
        <button
          className="absolute right-3 top-2 cursor-pointer text-gray-200 active:text-white"
          onClick={() => copyToClipboard(tactic2Ref)}>
          <RiFileCopyFill className="text-2xl" />
        </button>
        <div ref={tactic2Ref}>
          <CSVFormat />
        </div>
      </div>
    </div>
  );
}
export default StructureFormat;
