'use client';
import Image from 'next/image';
import replaceColorInPNG from '@/utils/replace-color-in-png';
import { useState, useEffect } from 'react';

const ColorMask: React.FC = ({ segmentations, maskUniqueColors }: any) => {
  const [pngStrAfterColorChange, setPngStrAfterColorChange] = useState<any[]>(
    [],
  );

  function generateHighlyDistinctRGBs(n: any) {
    const results = [];

    for (let i = 0; i < n; i++) {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);

      // 確保與先前生成的顏色差異很大
      for (let j = 0; j < i; j++) {
        const prevColor = results[j];
        const prevR = prevColor[0];
        const prevG = prevColor[1];
        const prevB = prevColor[2];

        // 檢查與先前顏色的差異程度
        const difference =
          Math.abs(r - prevR) + Math.abs(g - prevG) + Math.abs(b - prevB);

        // 如果與先前顏色的差異太小，重新生成顏色
        if (difference < 200) {
          r = Math.floor(Math.random() * 256);
          g = Math.floor(Math.random() * 256);
          b = Math.floor(Math.random() * 256);

          // 重新檢查與之前的所有顏色的差異
          j = -1;
        }
      }

      results.push([r, g, b]);
    }

    return results;
  }

  useEffect(() => {
    if (maskUniqueColors) {
      console.log(segmentations);

      const randomRGB = generateHighlyDistinctRGBs(segmentations.length);
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

        replaceColorInPNG(segmentation.mask, colorMappings)
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
  }, [maskUniqueColors]);

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
