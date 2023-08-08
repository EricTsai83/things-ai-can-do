'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { BsFiletypeJson } from 'react-icons/bs';
import { MdCleaningServices } from 'react-icons/md';
import LoadingAnimation from '@/components/LoadingAnimation';
import TooltipContainer from '@/components/TooltipContainer';

function ChatGPT() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [response, setResponse] = useState('');
  const [reformatToggle, setReformatToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function getChatGPTResponse(data: string) {
    const response = await fetch(`/api/chatGPT`, {
      method: 'POST',
      body: JSON.stringify({ input: data }),
    });
    const body = response.body!;
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let wordBuffer = '';

    async function handleWords(words: string[]) {
      for (const word of words) {
        if (word === '') continue;
        wordBuffer += word + ' ';
        setResponse((prevResponse) => prevResponse + wordBuffer);
        await delay(100);
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
      setResponse('');
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
            p-2 text-center text-lg text-gray-200 ssm:text-2xl">
          ChatGPT
        </div>

        <div className="absolute right-16 top-3">
          <TooltipContainer
            tooltips="將 ChatGPT 回傳的資料格式轉為可閱讀的格式。"
            tooltipsStyle={`absolute top-0 w-40
            hidden rounded-xl 
            bg-white px-3 py-5 text-sm
            font-semibold text-white shadow-2xl
            before:absolute before:-bottom-1.5
            before:left-[50%] before:h-4 before:w-4
            before:-translate-x-1/2 
            before:rotate-45
            group-hover:-top-32
            group-hover:z-40
            group-hover:block
          group-hover:bg-teal-600
            group-hover:opacity-100
            group-hover:drop-shadow-md
          before:group-hover:bg-teal-600
            `}>
            <BsFiletypeJson
              onClick={() => {
                setReformatToggle((prev) => !prev);
              }}
              className="cursor-pointer text-2xl text-gray-200 active:text-white"
            />
          </TooltipContainer>
        </div>
        <div className="absolute right-5 top-3">
          <TooltipContainer
            tooltips="清除回覆"
            tooltipsStyle={`absolute top-0 w-20
            hidden rounded-xl 
            bg-white px-3 py-5 text-sm
            font-semibold text-white shadow-2xl
            before:absolute before:-bottom-1.5
            before:left-[50%] before:h-4 before:w-4
            before:-translate-x-1/2 
            before:rotate-45
            group-hover:-top-24
            group-hover:z-40
            group-hover:block
          group-hover:bg-teal-600
            group-hover:opacity-100
            group-hover:drop-shadow-md
          before:group-hover:bg-teal-600
            `}>
            <MdCleaningServices
              onClick={() => {
                setReformatToggle(false);
                setResponse('');
              }}
              className="cursor-pointer text-2xl text-gray-200 active:text-white"
            />
          </TooltipContainer>
        </div>
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
      <div className="absolute bottom-0 w-full px-4 ssm:px-8">
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
        <p className="mt-1.5 hidden px-10 text-xs text-gray-200 ssm:block">
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
