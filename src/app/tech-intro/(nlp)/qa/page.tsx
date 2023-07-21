'use client';
import { useState, useRef } from 'react';
import huggingFaceApi from '@/utils/hugging-face-api';

interface Output {
  [key: string]: string;
}

export default function Content() {
  // WS
  const textForWs = useRef<HTMLInputElement>(null);
  const [wsOutput, setWsOutput] = useState<Output>();
  // NER
  const textForNer = useRef<HTMLInputElement>(null);
  const [nerOutput, setNerOutput] = useState<Output>();
  // POS
  const textForPos = useRef<HTMLInputElement>(null);
  const [posOutput, setPosOutput] = useState<Output>();
  // QA
  const textForContext = useRef<HTMLInputElement>(null);
  const textForQuestion = useRef<HTMLInputElement>(null);
  const [qaOutput, setQaOutput] = useState<Output>();

  async function getChineseWs() {
    try {
      if (textForWs.current) {
        const postData = {
          inputs: textForWs.current.value,
          options: {
            wait_for_model: true,
          },
        };
        const answer = await huggingFaceApi.getChineseWs(postData);
        setWsOutput(answer);
      }
    } catch (err) {
      console.log(err);
      console.log('model is currently loading');
    }
  }

  async function getChinesePos() {
    try {
      if (textForPos.current) {
        const postData = {
          inputs: textForPos.current.value,
          options: {
            wait_for_model: true,
          },
        };
        const answer = await huggingFaceApi.getChinesePos(postData);
        setPosOutput(answer);
      }
    } catch (err) {
      console.log(err);
      console.log('model is currently loading');
    }
  }

  async function getChineseNer() {
    try {
      if (textForNer.current) {
        const postData = {
          inputs: textForNer.current.value,
          options: {
            wait_for_model: true,
          },
        };
        const answer = await huggingFaceApi.getChineseNer(postData);
        setNerOutput(answer);
      }
    } catch (err) {
      console.log(err);
      console.log('model is currently loading');
    }
  }

  async function getChineseQa() {
    try {
      if (textForContext.current && textForQuestion.current) {
        const postData = {
          inputs: {
            question: textForQuestion.current.value,
            context: textForContext.current.value,
          },
          options: {
            wait_for_model: true,
          },
        };
        const answer = await huggingFaceApi.getChineseQa(postData);
        setQaOutput(answer);
      }
    } catch (err) {
      console.log(err);
      console.log('model is currently loading');
    }
  }

  return (
    <main className="pt-16">
      <div>
        <input ref={textForWs} className="border" />
        <button
          onClick={() => {
            textForWs.current && getChineseWs();
            console.log('WS fetch completed.');
          }}>
          WS 按我
        </button>
        <button
          onClick={() => {
            wsOutput && console.log(wsOutput);
          }}>
          WS 呈現結果
        </button>
        <div>{wsOutput && wsOutput.answer}</div>
      </div>

      <div>
        <input ref={textForPos} className="border" />
        <button
          onClick={() => {
            textForPos.current && getChinesePos();
            console.log('POS fetch completed.');
          }}>
          POS 按我
        </button>
        <button
          onClick={() => {
            posOutput && console.log(posOutput);
          }}>
          POS 呈現結果
        </button>
        <div>{posOutput && posOutput.answer}</div>
      </div>

      <div>
        <input ref={textForNer} className="border" />
        <button
          onClick={() => {
            textForNer.current && getChineseNer();
            console.log('NER fetch completed.');
          }}>
          NER 按我
        </button>
        <button
          onClick={() => {
            nerOutput && console.log(nerOutput);
          }}>
          NER 呈現結果
        </button>
        <div>{nerOutput && nerOutput.answer}</div>
      </div>

      <div>
        <input ref={textForContext} className="border" />
        <input ref={textForQuestion} className="border" />
        <button
          onClick={() => {
            if (textForContext.current && textForQuestion.current) {
              getChineseQa();
              console.log('QA fetch completed.');
            }
          }}>
          QA 按我
        </button>
        <button
          onClick={() => {
            qaOutput && console.log(qaOutput);
          }}>
          QA 呈現結果
        </button>
        <div>{qaOutput && qaOutput.answer}</div>
      </div>

      <button
        disabled
        type="button"
        className="mr-2 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg
          aria-hidden="true"
          role="status"
          className="mr-3 inline h-4 w-4 animate-spin text-white"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
        Loading...
      </button>
    </main>
  );
}
