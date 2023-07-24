'use client';
import Image from 'next/image';
import { Respond } from '../ImageSegmentationWithColor';

function Mask({ segmentations }: { segmentations: Respond[] }) {
  return (
    <div className="flex flex-row gap-x-10">
      {segmentations &&
        segmentations.map((segmentation: Respond, id: number) => {
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
