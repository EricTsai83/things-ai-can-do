import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';
import { RiFileCopyFill } from 'react-icons/ri';
import { copyTextToClipboard } from '@/utils/copy-to-clipboard';
import { prompts } from './prompts';
import type { Prompt } from './prompts';

function PromptSearchBox() {
  const [selected, setSelected] = useState(prompts[0]);
  const [query, setQuery] = useState('');

  const optionList =
    query === ''
      ? prompts
      : prompts.filter((prompt) =>
          prompt.text
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        );

  function getOptionTemplate(
    prompt: Prompt,
    selected: boolean,
    active: boolean,
  ) {
    return (
      <>
        <span
          className={`block truncate ${
            selected ? 'font-medium' : 'font-normal'
          }`}>
          {prompt.text}
        </span>
        {selected ? (
          <span
            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
              active ? 'text-white' : 'text-teal-600'
            }`}>
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        ) : null}
      </>
    );
  }

  function getEmptyOptionTemplate() {
    return (
      <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
        Nothing found.
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center">
      <button
        className="mr-2 flex cursor-pointer items-center justify-center text-gray-700 active:text-white"
        onClick={() => copyTextToClipboard(selected.text)}>
        <RiFileCopyFill className="text-3xl" />
      </button>

      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1 grow">
          <div
            className="
              relative w-full cursor-default overflow-hidden rounded-lg
            bg-white text-left shadow-md
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white
              focus-visible:ring-opacity-75 focus-visible:ring-offset-2
            focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(prompt: Prompt) => prompt.text}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}>
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {optionList.length === 0 && query !== ''
                ? getEmptyOptionTemplate()
                : optionList.map((prompt) => (
                    <Combobox.Option
                      key={prompt.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-teal-600 text-white' : 'text-gray-900'
                        }`
                      }
                      value={prompt}>
                      {({ selected, active }) =>
                        getOptionTemplate(prompt, selected, active)
                      }
                    </Combobox.Option>
                  ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

export default PromptSearchBox;
