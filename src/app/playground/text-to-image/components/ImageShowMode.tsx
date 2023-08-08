import { RadioGroup } from '@headlessui/react';
import type { Dispatch, SetStateAction } from 'react';
import CheckIcon from '@/components/CheckIcon';
import { ModeSelected } from '../types';
import { plans } from './plans';
import type { Plan } from './plans';

interface Props {
  modeSelected: ModeSelected;
  setModeSelected: Dispatch<SetStateAction<ModeSelected>>;
  setShowImage: Dispatch<SetStateAction<boolean>>;
  getPuzzle: () => void;
  setShowDifficultPuzzle: Dispatch<SetStateAction<boolean>>;
  setShowEasyPuzzle: Dispatch<SetStateAction<boolean>>;
}

enum GameMode {
  DIFFICULT = '拼圖遊戲(困難)',
  EASY = '拼圖遊戲(簡單)',
  DIRECT_DISPLAY = '直接顯示圖片',
}

export default function ImageShowMode({
  modeSelected,
  setModeSelected,
  setShowImage,
  getPuzzle,
  setShowDifficultPuzzle,
  setShowEasyPuzzle,
}: Props) {
  function showPuzzleGame(plan: Plan) {
    if (
      plan.title === GameMode.DIFFICULT &&
      modeSelected.title !== GameMode.DIFFICULT
    ) {
      setShowEasyPuzzle(false);
      setShowImage(false);
      getPuzzle();
    } else if (
      plan.title === GameMode.EASY &&
      modeSelected.title !== GameMode.EASY
    ) {
      setShowDifficultPuzzle(false);
      setShowImage(false);
      setShowEasyPuzzle(true);
    } else if (
      plan.title === GameMode.DIRECT_DISPLAY &&
      modeSelected.title !== GameMode.DIRECT_DISPLAY
    ) {
      setShowDifficultPuzzle(false);
      setShowEasyPuzzle(false);
      setShowImage(true);
    }
  }

  return (
    <div className="w-full px-4">
      <div className="mx-auto w-full">
        <RadioGroup value={modeSelected} onChange={setModeSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="flex flex-col justify-center gap-3 space-y-2 md:flex-row md:gap-10">
            {plans.map((plan) => (
              <RadioGroup.Option
                onClick={() => showPuzzleGame(plan)}
                key={plan.title}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active &&
                    'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                  }
                  ${
                    checked
                      ? 'bg-cyan-800 bg-opacity-75 text-white'
                      : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }>
                {({ checked }) => (
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-base">
                        <RadioGroup.Label
                          as="p"
                          className={`${
                            checked ? 'text-white' : 'text-gray-900'
                          } font-medium `}>
                          {plan.title}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`${
                            checked ? 'text-sky-100' : 'text-gray-500'
                          }`}>
                          <span>
                            {plan.description1}/{plan.description2}
                          </span>
                          <span aria-hidden="true">&middot;</span>
                          <span>{plan.description3}</span>
                        </RadioGroup.Description>
                      </div>
                    </div>
                    {checked && (
                      <CheckIcon className="h-6 w-6 shrink-0 text-white" />
                    )}
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
