export interface UniqueColorsInPng {
  [key: string]: { r: number; g: number; b: number; a: number };
}

function getUniqueColorsInPNG(pngString: string) {
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
      const uniqueColors = new Set();

      for (let i = 0; i < pixels.length; i += 4) {
        const red = pixels[i];
        const green = pixels[i + 1];
        const blue = pixels[i + 2];
        const alpha = pixels[i + 3];

        const color = { r: red, g: green, b: blue, a: alpha };
        const colorString = JSON.stringify(color);
        uniqueColors.add(colorString);
      }
      const output: UniqueColorsInPng = {};
      uniqueColors.forEach((uniqueColor) => {
        const value = JSON.parse(uniqueColor as string);
        const key = `${value.r}_${value.g}_${value.b}_${value.a}`;
        output[key] = value;
      });

      resolve(output);
    };

    image.onerror = function () {
      reject(new Error('Failed to load the PNG image.'));
    };
  });
}

export default getUniqueColorsInPNG;
