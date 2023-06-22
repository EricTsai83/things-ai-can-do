'use client';
import { useState } from 'react';
import { useImmer } from 'use-immer';

const PuzzleLayout = ({ output }: { output: string }) => {
  let initialState: any = [
    { id: 0, position: 0, style: [0, 0] },
    { id: 1, position: 1, style: [-200, 0] },
    { id: 2, position: 2, style: [-400, 0] },
    { id: 3, position: 3, style: [0, -200] },
    { id: 4, position: 4, style: [-200, -200] },
    { id: 5, position: 5, style: [-400, -200] },
    { id: 6, position: 6, style: [0, -400] },
    { id: 7, position: 7, style: [-200, -400] },
    { id: 8, position: 8, style: [-400, -400] },
  ];
  const [positionConfig, setPositionConfig] = useImmer<any>(initialState);

  function shuffleArray() {
    let newArray = positionConfig.map((e: any) => e);

    let length = newArray.length;
    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * (length - 1));
      let randomitemArray = newArray.splice(random, 1);
      newArray.push(randomitemArray[0]);
    }
    setPositionConfig(newArray);
  }

  return (
    <div className="w-[602px] grid grid-cols-3 gap-px">
      {positionConfig.map((element: any) => {
        return (
          <div
            key={element.id}
            className="w-[200px] h-[200px] relative
            transition ease-in-out delay-150
            hover:-translate-y-1 hover:scale-110
            duration-300 
            ">
            <div
              className="absolute inset-0 bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage: `url(${output})`,
                backgroundPosition: `${element.style[0]}px ${element.style[1]}px`,
                backgroundSize: '600px 600px',
              }}
            />
          </div>
        );
      })}
      <button
        onClick={() => {
          shuffleArray();
        }}>
        shuffle
      </button>
    </div>
  );
};

export default PuzzleLayout;
