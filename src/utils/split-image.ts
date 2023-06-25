interface TileObject {
  [key: string]: string;
}

const splitImage = (dataUrl: any): Promise<TileObject> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = dataUrl;
    image.style.width = '600px';
    image.style.height = '600px';

    const tileWidth = image.naturalWidth / 3;
    const tileHeight = image.naturalHeight / 3;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = tileWidth;
    canvas.height = tileHeight;

    let tileObj: TileObject = {};

    const promises: Promise<void>[] = [];

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        context.clearRect(0, 0, tileWidth, tileHeight);
        context.drawImage(
          image,
          row * tileWidth,
          col * tileHeight,
          tileWidth,
          tileHeight,
          0,
          0,
          tileWidth,
          tileHeight,
        );

        const promise = new Promise<void>((resolve) => {
          canvas.toBlob((blob: any) => {
            const objectUrl = URL.createObjectURL(blob);
            tileObj[`piece_${row}_${col}`] = objectUrl;
            resolve();
          }, 'image/png');
        });

        promises.push(promise);
      }
    }

    Promise.all(promises)
      .then(() => {
        resolve(tileObj);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default splitImage;
