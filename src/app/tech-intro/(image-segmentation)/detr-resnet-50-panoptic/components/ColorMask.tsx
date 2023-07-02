'use client';
import Image from 'next/image';
import replaceColorsInPNG from '@/utils/replace-color-in-png';
import { useState, useEffect } from 'react';
import generateHighlyDistinctRGB from '@/utils/generate-highly-distinct-rgb';
const ColorMask: React.FC = ({ segmentations, maskUniqueColors }: any) => {
  const [pngStrAfterColorChange, setPngStrAfterColorChange] = useState<any[]>(
    [],
  );

  useEffect(() => {
    if (maskUniqueColors) {
      console.log(segmentations);

      const randomRGB = generateHighlyDistinctRGB(segmentations.length);
      let arrays: any = [];
      segmentations.forEach((segmentation: any, idx: any) => {
        const colorMappings = [
          {
            targetColor: maskUniqueColors['255_255_255_255'],
            replacementColor: {
              r: Math.floor(randomRGB[idx][0]),
              g: Math.floor(randomRGB[idx][1]),
              b: Math.floor(randomRGB[idx][2]),
              a: 300,
            },
          },
          {
            targetColor: maskUniqueColors['0_0_0_255'],
            replacementColor: { r: 0, g: 0, b: 0, a: 0 },
          },
        ];

        replaceColorsInPNG(segmentation.mask, colorMappings)
          .then((modifiedPNGString) => {
            arrays.push(modifiedPNGString);
          })
          .catch((error) => {
            console.error(error);
          });
      });
      console.log(arrays);
      setPngStrAfterColorChange(arrays);
    }
  }, [segmentations, maskUniqueColors]);

  return (
    <div className="relative z-10">
      {pngStrAfterColorChange &&
        pngStrAfterColorChange.map((pngStr: any, id: any) => {
          // console.log(element.label);
          // console.log(maskUniqueColors);
          // console.log('=========');
          // console.log(pngStr);
          return (
            <Image
              className="absolute"
              key={id}
              src={pngStr}
              alt="Decoded Image"
              style={{ opacity: '0.5' }} // Adjust the opacity value as desired (0.0 to 1.0)
              width={600}
              height={600}
            />
          );
        })}
    </div>
  );
};

export default ColorMask;
