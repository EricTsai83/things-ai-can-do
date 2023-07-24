'use client';

import Image from 'next/image';
import { Response } from '../../types.d';

function Mask({ segmentations }: { segmentations: Response[] }) {
  return (
    <div className="flex flex-row gap-x-10">
      {segmentations &&
        segmentations.map((segmentation: Response, id: number) => {
          return (
            <Image
              key={id}
              src={`data:image/png;base64,${segmentation.mask}`}
              alt="Decoded Image"
              style={{ opacity: '0.5' }}
              width={100}
              height={100}
            />
          );
        })}
    </div>
  );
}

export default Mask;
