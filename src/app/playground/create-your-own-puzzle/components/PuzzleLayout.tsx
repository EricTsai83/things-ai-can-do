'use client';
import { useImmer } from 'use-immer';
import { useState, useEffect, SetStateAction, DragEventHandler } from 'react';

const PuzzleLayout = ({ output }: { output: string }) => {
  let initialStates: any = [
    { dataId: 0, style: '0px 0px' },
    { dataId: 1, style: '-200px 0px' },
    { dataId: 2, style: '-400px 0px' },
    { dataId: 3, style: '0px -200px' },
    { dataId: 4, style: '-200px -200px' },
    { dataId: 5, style: '-400px -200px' },
    { dataId: 6, style: '0px -400px' },
    { dataId: 7, style: '-200px -400px' },
    { dataId: 8, style: '-400px -400px' },
  ];
  const [imageArrangement, setImageArrangement] = useImmer<any>(initialStates);
  const [tileBeingDragged, setTileBeingDragged] = useState<any>(null);
  const [tileBeingReplaced, setTileBeingReplaced] = useState<any>(null);
  const [score, setScore] = useState(null);

  function shuffleArray() {
    let newArray = imageArrangement.map((e: any) => e);

    let length = newArray.length;
    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * (length - 1));
      let randomitemArray = newArray.splice(random, 1);
      newArray.push(randomitemArray[0]);
    }
    setImageArrangement(newArray);
  }

  useEffect(() => {
    shuffleArray();
  }, []);

  useEffect(() => {
    let scoreCt: any = 0;
    for (let i = 0; i < 9; i++) {
      if (imageArrangement[i].dataId === i) {
        scoreCt += 1;
      }
    }
    setScore(scoreCt);

    scoreCt === 9 && window.alert('well done');
  }, [imageArrangement]);

  const dragStart: DragEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement;
    setTileBeingDragged(target);
  };

  const dragDrop: DragEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement;
    setTileBeingReplaced(target);
  };

  const dragEnd = () => {
    const tileBeingDraggedId = parseInt(
      tileBeingDragged.getAttribute('data-positionid'),
    );
    const tileBeingReplacedId = parseInt(
      tileBeingReplaced.getAttribute('data-positionid'),
    );

    setImageArrangement((prev: { dataId: number; style: string }[]) => {
      let styleString;
      let backgroundPosition;
      let idString;

      styleString = tileBeingReplaced.getAttribute('style');
      backgroundPosition = styleString.match(/background-position: ([^;]+)/)[1];
      prev[tileBeingDraggedId].style = backgroundPosition;

      idString = tileBeingReplaced.getAttribute('data-dataid');
      prev[tileBeingDraggedId].dataId = parseInt(idString);

      styleString = tileBeingDragged.getAttribute('style');
      backgroundPosition = styleString.match(/background-position: ([^;]+)/)[1];
      prev[tileBeingReplacedId].style = backgroundPosition;

      idString = tileBeingDragged.getAttribute('data-dataid');
      prev[tileBeingReplacedId].dataId = parseInt(idString);
    });
  };

  return (
    <div className="w-[602px] grid grid-cols-3 gap-px">
      {imageArrangement.map((element: any, idx: any) => {
        return (
          <div
            key={idx}
            className="w-[200px] h-[200px] relative
            transition ease-in-out delay-150
            hover:-translate-y-1 hover:scale-110
            duration-300 
            ">
            <div
              data-dataid={element.dataId}
              data-positionid={idx}
              className="absolute inset-0 bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage: `url(${output})`,
                backgroundPosition: element.style,
                backgroundSize: '600px 600px',
              }}
              draggable="true"
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
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
      <div>{score}</div>
    </div>
  );
};

export default PuzzleLayout;
