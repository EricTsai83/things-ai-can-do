import { MouseEventHandler, useRef } from 'react';
import useDragger from '@/hook/useDragger';
import Image from 'next/image';
import type { TileObject } from '@/utils/split-image';

function ImagePuzzle({ imgBlobs }: { imgBlobs: TileObject }) {
  const zIndexCounter = useRef(1);
  const imgWidth = 200;
  const imgHeight = 200;
  const ids: string[] = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      ids.push(`piece_${i}_${j}`);
    }
  }

  useDragger(`piece_0_0`);
  useDragger(`piece_0_1`);
  useDragger(`piece_0_2`);
  useDragger(`piece_1_0`);
  useDragger(`piece_1_1`);
  useDragger(`piece_1_2`);
  useDragger(`piece_2_0`);
  useDragger(`piece_2_1`);
  useDragger(`piece_2_2`);

  function disableScroll(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const mouseDownAct: MouseEventHandler = (event) => {
    event.preventDefault();
    document.body.addEventListener('scroll', disableScroll); // 不給滾
    // document.body.style.overflow = 'hidden'; // 讓滾動條消失
    const target = event.target as HTMLElement;
    if (target) {
      zIndexCounter.current++;
      target.style.zIndex = zIndexCounter.current.toString();
      console.log(event.target);
    }
  };

  const mouseUpAct: MouseEventHandler = (event) => {
    event.preventDefault();
    document.body.removeEventListener('scroll', disableScroll);

    const target = event.target as HTMLElement;
    // document.body.style.overflow = 'auto';
    const style = window.getComputedStyle(target);
    // console.log(style);
    const top = parseInt(style.getPropertyValue('top'));
    const left = parseInt(style.getPropertyValue('left'));
    // console.log(top);
    const anwserTopStart = parseInt(
      target.getAttribute('data-anwsertopstart')!,
    );
    const anwserTopEnd = parseInt(target.getAttribute('data-anwsertopend')!);
    const anwserLeftStart = parseInt(
      target.getAttribute('data-anwserleftstart')!,
    );
    const anwserLeftEnd = parseInt(target.getAttribute('data-anwserleftend')!);
    const tileId = target.getAttribute('data-anwsertile')!;
    const id = target.getAttribute('id')!;

    if (
      anwserTopStart <= top &&
      top <= anwserTopEnd &&
      anwserLeftStart <= left &&
      left <= anwserLeftEnd
    ) {
      const tile = document.getElementById(tileId);
      if (tile) {
        console.log(tile);
        tile.style.backgroundImage = `url(${imgBlobs[id]})`;
        target.style.display = 'none';
      }
    }
  };

  function renderPuzzlePieces() {
    const puzzlePieces = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        console.log(imgBlobs);
        const puzzlePieceSrc = imgBlobs[`piece_${i}_${j}`];
        const puzzlePieceAlt = `Puzzle Piece piece_${i}_${j}`;

        puzzlePieces.push(
          <Image
            data-anwsertile={`tile_${i}_${j}`}
            data-anwsertopstart={`${j * imgHeight - imgHeight * 0.15}`}
            data-anwsertopend={`${j * imgHeight + imgHeight * 0.15}`}
            data-anwserleftstart={`${i * imgWidth - imgWidth * 0.15}`}
            data-anwserleftend={`${i * imgWidth + imgWidth * 0.15}`}
            id={`piece_${i}_${j}`}
            key={`piece_${i}_${j}`}
            src={puzzlePieceSrc}
            alt={puzzlePieceAlt}
            style={{
              position: 'absolute',
              top: `${Math.random() * 400}px`,
              left: `${Math.random() * 600}px`,
              height: `${imgHeight}px`,
              width: `${imgWidth}px`,
              cursor: 'pointer',
              zIndex: 1,
            }}
            onMouseDown={mouseDownAct}
            onMouseUp={mouseUpAct}
            width={imgWidth}
            height={imgHeight}
          />,
        );
      }
    }
    return puzzlePieces;
  }

  function renderPuzzleTableCell() {
    const gridItems = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gridItems.push(
          <div
            className="bg-white"
            key={`tile_${i}_${j}`}
            id={`tile_${i}_${j}`}
            style={{
              backgroundImage: '',
              backgroundSize: '100% 100%' /* <------ */,
              backgroundRepeat: 'no-repeat',
              backgroundPosition:
                'center center' /* optional, center the image */,
            }}></div>,
        );
      }
    }

    return gridItems;
  }

  return (
    <div
      className="grid h-[600px] w-[600px] grid-flow-col grid-cols-3 grid-rows-3 gap-px bg-black"
      style={{
        position: 'relative',
        width: '600px',
        height: '600px',
        border: 'balck',
      }}>
      {renderPuzzlePieces()}
      {renderPuzzleTableCell()}
    </div>
  );
}

export default ImagePuzzle;
