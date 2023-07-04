'use client';
// 不是很懂，細讀一下
import { useState, useRef } from 'react';

function ChatGPT() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [response, setResponse] = useState('');

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
    if (inputRef.current) {
      setResponse(''); // Clear previous response
      await getChatGPTResponse(inputRef.current.value);
    }
  }

  return (
    <div className="pt-16">
      <textarea className="border" ref={inputRef} />
      <button onClick={handleSendClick}>Send</button>
      {response && <div className="response">{response}</div>}
    </div>
  );
}

export default ChatGPT;
