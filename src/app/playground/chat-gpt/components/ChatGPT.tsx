'use client';
// 不是很懂，細讀一下
import { useState, useRef, FormEventHandler, ChangeEvent } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { MdCleaningServices } from 'react-icons/md';
import { BsFiletypeJson } from 'react-icons/bs';
import LoadingAnimation from '@/components/LoadingAnimation';

function ChatGPT() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [response, setResponse] = useState('');
  const [reformatToggle, setReformatToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    if (inputRef.current?.value) {
      setReformatToggle(false);
      setReformatToggle(false);
      setResponse(''); // Clear previous response
      await getChatGPTResponse(inputRef.current.value);
    }

    setIsLoading(false);
  }

  const resizeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
    <div className="relative flex min-h-full w-full flex-col items-center justify-start bg-gray-500">
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
            setReformatToggle((prev) => !prev);
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
          <div className="mx-4 mt-14 overflow-x-hidden pb-48 text-gray-200">
            {reformatToggle ? (
              <pre>{formatString(response)}</pre>
            ) : (
              response.slice(1).slice(0, -2)
            )}
          </div>
        )}
      </div>
      <div className="flex-1"></div>
      <div className="absolute bottom-0 px-12">
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
          {!isLoading && (
            <AiOutlineSend
              onClick={handleSendClick}
              className="absolute bottom-8 right-4 cursor-pointer text-xl active:text-gray-200"
            />
          )}
          <div className="absolute bottom-8 right-4">
            {isLoading && <LoadingAnimation />}
          </div>
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
