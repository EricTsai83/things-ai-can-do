'use client'; // This is a client component
import getChatGPTApi from '@/utils/openai-api';
import {useRef} from 'react';

export default function Content() {
  const inputRef = useRef<HTMLInputElement>(null);

  async function sendMessage() {
    if (inputRef.current) {
      const response = await getChatGPTApi(inputRef.current.value);
      console.log(response);
    }
  }

  return (
    <main>
      <input type="text" ref={inputRef} className="border" />
      <button
        onClick={() => {
          sendMessage();
        }}
        className="border">
        點我！！
      </button>
    </main>
  );
}
