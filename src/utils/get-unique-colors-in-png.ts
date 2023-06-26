function getUniqueColorsInPNG(pngString: any) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const image = new Image();
  image.src = 'data:image/png;base64,' + pngString;

  return new Promise((resolve, reject) => {
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      // @ts-ignore
      context.drawImage(image, 0, 0);
      // @ts-ignore
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      const uniqueColors = new Set();

      // In this example, each group of four consecutive values
      // represents a single pixel. The first group [255, 0, 0, 255]
      // corresponds to the red pixel, the second group [0, 255, 0, 255]
      // corresponds to the green pixel, and so on.
      // =============== example ====================
      // pixels = [255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255, ...]
      for (let i = 0; i < pixels.length; i += 4) {
        const red = pixels[i];
        const green = pixels[i + 1];
        const blue = pixels[i + 2];
        const alpha = pixels[i + 3];

        const color = { r: red, g: green, b: blue, a: alpha };
        const colorString = JSON.stringify(color);
        uniqueColors.add(colorString); // Convert color object to string for uniqueness
      }
      // `${red}_${green}_${blue}_${alpha}`
      const output = {};
      uniqueColors.forEach((uniqueColor: any) => {
        const value = JSON.parse(uniqueColor);
        const key = `${value.r}_${value.g}_${value.b}_${value.a}`;
        // @ts-ignore
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
