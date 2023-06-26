'use client';
import Image from 'next/image';
const Mask: React.FC = ({ segmentations }: any) => {
  return (
    <div className="flex flex-row gap-x-10">
      {segmentations &&
        segmentations.map((segmentation: any, id: any) => {
          return (
            <Image
              key={id}
              src={`data:image/png;base64,${segmentation.mask}`}
              alt="Decoded Image"
              style={{ opacity: '0.5' }} // Adjust the opacity value as desired (0.0 to 1.0)
              width={100}
              height={100}
            />
          );
        })}
    </div>
  );
};

export default Mask;
