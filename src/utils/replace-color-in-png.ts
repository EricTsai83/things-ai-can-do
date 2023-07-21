import type { ColorMappingItem } from '../app/playground/image-segmentation/image-segmentation-with-color/components/ColorMask';
function replaceColorsInPNG(
  pngString: string,
  colorMappings: ColorMappingItem[],
) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;

  const image = new Image();
  image.src = 'data:image/png;base64,' + pngString;

  return new Promise((resolve, reject) => {
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;

      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      for (let i = 0; i < pixels.length; i += 4) {
        const red = pixels[i];
        const green = pixels[i + 1];
        const blue = pixels[i + 2];
        const alpha = pixels[i + 3];

        for (const { targetColor, replacementColor } of colorMappings) {
          if (targetColor) {
            if (
              red === targetColor.r &&
              green === targetColor.g &&
              blue === targetColor.b &&
              alpha === targetColor.a
            ) {
              pixels[i] = replacementColor.r;
              pixels[i + 1] = replacementColor.g;
              pixels[i + 2] = replacementColor.b;
              pixels[i + 3] = replacementColor.a;
            }
          }
        }
      }
      context.putImageData(imageData, 0, 0);

      const modifiedPNGString = canvas.toDataURL('image/png');
      resolve(modifiedPNGString);
    };

    image.onerror = function () {
      reject(new Error('Failed to load the PNG image.'));
    };
  });
}

export default replaceColorsInPNG;
