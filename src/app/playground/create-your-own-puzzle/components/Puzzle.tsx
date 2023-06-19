import React from 'react';
import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib';
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css';

const Puzzle = ({ output }: { output: string }) => {
  return (
    <>
      <div className="puzzle-container w-[600px]">
        <JigsawPuzzle
          imageSrc={output}
          rows={2}
          columns={2}
          onSolved={() => alert('Resulto')}
        />
      </div>
    </>
  );
};

export default Puzzle;
