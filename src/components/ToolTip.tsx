import { ReactNode, useRef } from 'react';

interface Props {
  children: ReactNode;
  tooltip?: string;
}

function ToolTip({ children, tooltip }: Props) {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      className="group relative inline-block"
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current?.getBoundingClientRect();

        tooltipRef.current.style.left = clientX - left + 'px';
      }}>
      {children}
      {tooltip ? (
        <span
          ref={tooltipRef}
          className="
          invisible absolute top-full mt-2
          whitespace-nowrap rounded-xl bg-teal-500 p-1 text-white 
          opacity-0 transition
          group-hover:visible group-hover:z-10 group-hover:opacity-100
        ">
          {tooltip}
        </span>
      ) : null}
    </div>
  );
}

export default ToolTip;
