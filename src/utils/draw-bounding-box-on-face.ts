const drawBoundingBoxOnFace = (
  imageSrc: string,
  faceDetail: any,
  // faceId: number,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    console.log(imageSrc);
    image.src = imageSrc;
    image.style.width = '600px';
    image.style.height = '600px';
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = faceDetail.BoundingBox.Width * image.naturalWidth;
    canvas.height = faceDetail.BoundingBox.Height * image.naturalHeight;

    context.clearRect(0, 0, image.naturalWidth, image.naturalHeight);
    context.drawImage(
      image,
      faceDetail.BoundingBox.Left * image.naturalWidth, // source image: left
      faceDetail.BoundingBox.Top * image.naturalHeight, // source image: top
      faceDetail.BoundingBox.Width * image.naturalWidth, // source image: width
      faceDetail.BoundingBox.Height * image.naturalHeight, // source image: height
      0, // destination canvas: left
      0, // destination canvas: top
      faceDetail.BoundingBox.Width * image.naturalWidth, // destination canvas: width
      faceDetail.BoundingBox.Height * image.naturalHeight, // destination canvas: height
    );
    let imageUrl: string;
    // toBlob 是非同步行為，先包成 promise
    const promise = new Promise<void>((resolve) => {
      canvas.toBlob((blob: any) => {
        console.log(blob);
        imageUrl = URL.createObjectURL(blob);
        resolve();
      }, 'image/png');
    });

    promise
      .then(() => {
        resolve(imageUrl);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default drawBoundingBoxOnFace;
