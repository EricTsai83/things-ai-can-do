'use client';

import Image from 'next/image';
import useDragger from '@/hook/useDragger';
import { MouseEventHandler, useRef } from 'react';
import type { TileObject } from '../split-image';

function DifficultPuzzle({ imgBlobs }: { imgBlobs: TileObject }) {
  const zIndexCounter = useRef(1); // Use it to calculate which puzzle must be above than other.
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
    document.body.addEventListener('scroll', disableScroll);

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
    const style = window.getComputedStyle(target);

    const top = parseInt(style.getPropertyValue('top'));
    const left = parseInt(style.getPropertyValue('left'));

    const answerTopStart = parseInt(
      target.getAttribute('data-answertopstart')!,
    );
    const answerTopEnd = parseInt(target.getAttribute('data-answertopend')!);
    const answerLeftStart = parseInt(
      target.getAttribute('data-answerleftstart')!,
    );
    const answerLeftEnd = parseInt(target.getAttribute('data-answerleftend')!);

    const tileId = target.getAttribute('data-answertile')!;
    const id = target.getAttribute('id')!;

    if (
      answerTopStart <= top &&
      top <= answerTopEnd &&
      answerLeftStart <= left &&
      left <= answerLeftEnd
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
            data-answertile={`tile_${i}_${j}`}
            data-answertopstart={`${j * imgHeight - imgHeight * 0.15}`}
            data-answertopend={`${j * imgHeight + imgHeight * 0.15}`}
            data-answerleftstart={`${i * imgWidth - imgWidth * 0.15}`}
            data-answerleftend={`${i * imgWidth + imgWidth * 0.15}`}
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
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
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

export default DifficultPuzzle;
