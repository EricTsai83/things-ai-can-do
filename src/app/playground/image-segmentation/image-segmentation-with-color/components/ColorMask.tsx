'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import replaceColorsInPNG from '@/utils/replace-color-in-png';
import generateHighlyDistinctRGB from '@/utils/generate-highly-distinct-rgb';
import type { UniqueColorsInPng } from '@/utils/get-unique-colors-in-png';

interface Segmentation {
  score: number;
  label: string;
  mask: string;
}

interface Props {
  segmentations: Segmentation[];
  maskUniqueColors: UniqueColorsInPng;
}

export interface ColorMappingItem {
  targetColor: { r: number; g: number; b: number; a: number };
  replacementColor: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

function ColorMask({ segmentations, maskUniqueColors }: Props) {
  const [pngStrAfterColorChange, setPngStrAfterColorChange] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (maskUniqueColors) {
      console.log(segmentations);

      const randomRGB = generateHighlyDistinctRGB(segmentations.length);
      let arrays: string[] = [];
      segmentations.forEach((segmentation: Segmentation, idx: number) => {
        const colorMappings: ColorMappingItem[] = [
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
          .then((modifiedPNGString): void => {
            const pngStr = modifiedPNGString as string;
            modifiedPNGString && arrays.push(pngStr);
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
        pngStrAfterColorChange.map((pngStr: string, id: number) => {
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
}

export default ColorMask;
