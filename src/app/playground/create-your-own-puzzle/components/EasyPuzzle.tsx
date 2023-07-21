'use client';
import {
  useState,
  useEffect,
  useRef,
  DragEventHandler,
  useCallback,
} from 'react';
import { useImmer } from 'use-immer';
import GlowingBtn from '@/components/GlowingBtn';

interface InitialStates {
  dataId: number;
  style: string;
}

function EasyPuzzle({ imageUrl }: { imageUrl: string }) {
  let initialStates: InitialStates[] = [
    { dataId: 1, style: '-200px 0px' },
    { dataId: 0, style: '0px 0px' }, // 跟上面一行調換位置，避免初始化的時候拼圖就完成了
    { dataId: 2, style: '-400px 0px' },
    { dataId: 3, style: '0px -200px' },
    { dataId: 4, style: '-200px -200px' },
    { dataId: 5, style: '-400px -200px' },
    { dataId: 6, style: '0px -400px' },
    { dataId: 7, style: '-200px -400px' },
    { dataId: 8, style: '-400px -400px' },
  ];

  const [imageArrangement, setImageArrangement] = useImmer(initialStates);
  const [tileBeingDragged, setTileBeingDragged] =
    useState<HTMLDivElement | null>(null);
  const [tileBeingReplaced, setTileBeingReplaced] =
    useState<HTMLDivElement | null>(null);
  const [score, setScore] = useState(0);
  const initialRef = useRef(true);

  const shuffleArray = useCallback(() => {
    let newArray = imageArrangement.map((element) => element);

    let length = newArray.length;
    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * (length - 1));
      let randomitemArray = newArray.splice(random, 1);
      newArray.push(randomitemArray[0]);
    }
    setImageArrangement(newArray);
  }, [imageArrangement, setImageArrangement]);

  useEffect(() => {
    initialRef.current && shuffleArray();
    initialRef.current = false;
  }, [shuffleArray]);

  useEffect(() => {
    let scoreCt: number = 0;
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

  const dragEnd: DragEventHandler<HTMLDivElement> = () => {
    if (tileBeingDragged && tileBeingReplaced) {
      const tileBeingDraggedId = parseInt(
        tileBeingDragged.getAttribute('data-positionid')!,
      );
      const tileBeingReplacedId = parseInt(
        tileBeingReplaced.getAttribute('data-positionid')!,
      );

      setImageArrangement((prev: { dataId: number; style: string }[]) => {
        let styleString: string;
        let backgroundPosition: string;
        let idString: string;

        styleString = tileBeingReplaced.getAttribute('style')!;
        if (styleString) {
          const match = styleString.match(/background-position: ([^;]+)/);
          if (match) {
            backgroundPosition = match[1];
            prev[tileBeingDraggedId].style = backgroundPosition;
          }
        }

        idString = tileBeingReplaced.getAttribute('data-dataid')!;
        prev[tileBeingDraggedId].dataId = parseInt(idString);

        styleString = tileBeingDragged.getAttribute('style')!;
        if (styleString) {
          const match = styleString.match(/background-position: ([^;]+)/);
          if (match) {
            backgroundPosition = match[1];
            prev[tileBeingReplacedId].style = backgroundPosition;
          }
        }

        idString = tileBeingDragged.getAttribute('data-dataid')!;
        prev[tileBeingReplacedId].dataId = parseInt(idString);
      });
    }
  };

  return (
    <div className="relative grid w-[602px] grid-cols-3 gap-px">
      <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-2/3">
        <GlowingBtn executeMethod={shuffleArray} text={'打散圖片'} />
      </div>
      {imageArrangement.map((element, idx) => {
        return (
          <div
            key={idx}
            className="relative h-[200px] w-[200px]
            transition delay-150 duration-300
            ease-in-out hover:-translate-y-1
            hover:scale-110 
            ">
            <div
              data-dataid={element.dataId}
              data-positionid={idx}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: element.style,
                backgroundSize: '600px 600px',
              }}
              draggable="true"
              onDragStart={dragStart}
              onDragOver={(event) => event.preventDefault()}
              onDragEnter={(event) => event.preventDefault()}
              onDragLeave={(event) => event.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          </div>
        );
      })}
    </div>
  );
}

export default EasyPuzzle;
