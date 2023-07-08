import { useEffect, useRef, useState } from 'react';

export type SelectOption = {
  label: string;
  value: string | number;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export function Select({ multiple, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }

  function selectOption(option: SelectOption) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option === value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return;
      switch (e.code) {
        case 'Enter':
        case 'Space':
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case 'ArrowUp':
        case 'ArrowDown': {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case 'Escape':
          setIsOpen(false);
          break;
      }
    };
    containerRef.current?.addEventListener('keydown', handler);

    return () => {
      containerRef.current?.removeEventListener('keydown', handler);
    };
  }, [isOpen, highlightedIndex, options]);

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className="
        relative flex w-full items-center gap-1
        rounded-lg border border-gray-400 p-1
      focus:border-gray-500">
      <span className="flex max-h-96 grow flex-wrap gap-1.5 overflow-y-auto">
        {multiple
          ? value.map((v) => (
              <button
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
                className="
                  group flex cursor-pointer items-center gap-1.5
                  rounded-lg border border-gray-300
                  px-2 py-1 text-sm text-gray-600
                hover:bg-rose-100 hover:text-gray-800">
                {v.label}
                <span className="text-gray-600 group-hover:text-gray-800">
                  &times;
                </span>
              </button>
            ))
          : value?.label}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className="
          h-10 cursor-pointer text-2xl
        text-gray-500 hover:text-slate-800 focus:text-gray-500">
        &times;
      </button>

      <div className="ml-2 w-0.5 self-stretch bg-zinc-300"></div>

      <div
        className="
        translate-x-0 translate-y-1/4
        border-8 border-transparent border-t-zinc-300"></div>
      <ul
        className={`
          ${isOpen ? 'block' : 'hidden'}
          absolute left-0 top-[calc(100%+8px)] z-10
          max-h-52 w-full overflow-y-auto rounded-lg
          border-2 border-gray-300 bg-white text-gray-500`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option.value}
            className={`cursor-pointer px-2 py-0.5 ${
              isOptionSelected(option) ? 'bg-teal-100 text-gray-800' : ''
            } ${
              index === highlightedIndex ? 'bg-teal-100 text-gray-800' : ''
            }`}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
