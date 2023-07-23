import { RadioGroup } from '@headlessui/react';
import type { Dispatch, SetStateAction } from 'react';
import CheckIcon from '@/components/CheckIcon';
import { Selected } from '../types.d';
import { plans } from './plans';

interface Props {
  selected: Selected;
  setSelected: Dispatch<SetStateAction<Selected>>;
  setShowImage: Dispatch<SetStateAction<boolean>>;
  getPuzzle: () => void;
  setShowDifficultPuzzle: Dispatch<SetStateAction<boolean>>;
  setShowEasyPuzzle: Dispatch<SetStateAction<boolean>>;
}

export default function ImageShowMode({
  selected,
  setSelected,
  setShowImage,
  getPuzzle,
  setShowDifficultPuzzle,
  setShowEasyPuzzle,
}: Props) {
  return (
    <div className="w-full px-4">
      <div className="mx-auto w-full">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="flex flex-col justify-center gap-3 space-y-2 md:flex-row md:gap-10">
            {plans.map((plan) => (
              <RadioGroup.Option
                onClick={() => {
                  if (
                    plan.title === '拼圖遊戲(困難)' &&
                    selected.title !== '拼圖遊戲(困難)'
                  ) {
                    setShowEasyPuzzle(false);
                    setShowImage(false);
                    getPuzzle();
                  } else if (
                    plan.title === '拼圖遊戲(簡單)' &&
                    selected.title !== '拼圖遊戲(簡單)'
                  ) {
                    setShowDifficultPuzzle(false);
                    setShowImage(false);
                    setShowEasyPuzzle(true);
                  } else if (
                    plan.title === '直接顯示圖片' &&
                    selected.title !== '直接顯示圖片'
                  ) {
                    setShowDifficultPuzzle(false);
                    setShowEasyPuzzle(false);
                    setShowImage(true);
                  }
                }}
                key={plan.title}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                      : ''
                  }
                  ${
                    checked
                      ? 'bg-cyan-800 bg-opacity-75 text-white'
                      : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }>
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-base">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}>
                            {plan.title}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}>
                            <span>
                              {plan.description1}/{plan.description2}
                            </span>{' '}
                            <span aria-hidden="true">&middot;</span>{' '}
                            <span>{plan.description3}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
