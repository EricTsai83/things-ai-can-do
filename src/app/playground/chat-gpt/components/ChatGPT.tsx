'use client';
import { Fragment } from 'react';
// 不是很懂，細讀一下
import { useState, useRef } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { MdCleaningServices } from 'react-icons/md';
import { BsFiletypeJson } from 'react-icons/bs';

function ChatGPT() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [response, setResponse] = useState('');
  const [reformatToggle, setReformatToggle] = useState(false);

  async function getChatGPTResponse(data: string) {
    const response = await fetch(`/api/chatGPT`, {
      method: 'POST',
      body: JSON.stringify({ input: data }),
    }); // get all response
    const body = response.body!;
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let wordBuffer = '';

    async function handleWords(words: string[]) {
      for (const word of words) {
        if (word === '') continue;
        wordBuffer += word + ' ';
        setResponse((prevResponse) => prevResponse + wordBuffer); // Update response state
        await delay(100); // Delay for 0.1 second
        wordBuffer = '';
      }
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      const words = chunk.split(' ');
      await handleWords(words);
    }
  }

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function handleSendClick() {
    if (inputRef.current?.value) {
      setReformatToggle(false);
      setResponse(''); // Clear previous response
      await getChatGPTResponse(inputRef.current.value);
    }
  }

  const resizeTextarea = (event: any) => {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  function formatString(inputString: string) {
    let res;
    res = inputString
      .slice(1)
      .slice(0, -2)
      .replace(/\\n/g, '\n')
      .replace(/\\/g, '');
    return res;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="relative w-full">
        <div
          className="
          absolute left-0 top-0 w-full rounded-lg bg-gray-700
          p-2 text-center text-2xl text-gray-200">
          ChatGPT
        </div>
        <BsFiletypeJson
          onClick={() => {
            console.log(response);
            setReformatToggle(true);
          }}
          className="absolute right-16 top-3 cursor-pointer text-2xl text-gray-200 active:text-white"
        />
        <MdCleaningServices
          onClick={() => {
            setReformatToggle(false);
            setResponse('');
          }}
          className="absolute right-5 top-3 cursor-pointer text-2xl text-gray-200 active:text-white"
        />
      </div>
      <div className="w-full">
        {response && (
          <div className="mx-4 mt-14 text-gray-200">
            {reformatToggle ? (
              <pre>{formatString(response)}</pre>
            ) : (
              response.slice(1).slice(0, -2)
            )}
          </div>
        )}
      </div>
      <div className="fixed bottom-6 px-12">
        <div className="relative">
          <textarea
            onInput={resizeTextarea}
            placeholder="輸入訊息"
            className="
              flex w-full items-center overflow-hidden
              rounded-lg border border-gray-400
              p-4 pr-10 placeholder:text-slate-400
            focus:border-gray-500"
            ref={inputRef}
          />
          <AiOutlineSend
            onClick={handleSendClick}
            className="absolute bottom-8 right-4 cursor-pointer text-xl active:text-gray-200"
          />
        </div>
        <p className="mt-1.5 px-10 text-xs text-gray-200">
          Free Research Preview. ChatGPT may produce inaccurate information
          about people, places, or facts.
          <a
            className="underline decoration-1"
            href="https://platform.openai.com/docs/guides/gpt/chat-completions-api"
            target="_blank">
            gpt-3.5-turbo
          </a>
        </p>
      </div>
    </div>
  );
}

export default ChatGPT;
