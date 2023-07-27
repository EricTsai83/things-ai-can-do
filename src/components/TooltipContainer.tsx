import { ReactNode } from 'react';

interface Props {
  tooltips: string;
  tooltipsStyle?: string;
  children: ReactNode;
}

function TooltipContainer({ tooltips, tooltipsStyle, children }: Props) {
  return (
    <div className="group relative flex w-fit flex-col items-center justify-center">
      <div
        className={
          tooltipsStyle
            ? tooltipsStyle
            : `absolute top-0
          hidden rounded-xl 
          bg-white px-3 py-5 text-sm
          font-semibold text-white shadow-2xl
          before:absolute before:-bottom-1.5
          before:left-[50%] before:h-4 before:w-4
          before:-translate-x-1/2 
          before:rotate-45
          group-hover:-top-40
          group-hover:z-40
          group-hover:block
        group-hover:bg-teal-600
          group-hover:opacity-100
          group-hover:drop-shadow-md
        before:group-hover:bg-teal-600
          `
        }>
        {tooltips}
      </div>
      <div className="z-10">{children}</div>
    </div>
  );
}

export default TooltipContainer;
