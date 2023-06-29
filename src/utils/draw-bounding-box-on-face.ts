const drawBoundingBoxOnFace = (
  imageSrc: string,
  faceDetail: any,
  marksUsed: string[],
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const drawGreenCircle = () => {
      canvas.width = faceDetail.BoundingBox.Width * image.naturalWidth;
      canvas.height = faceDetail.BoundingBox.Height * image.naturalHeight;

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

      // Draw the green circle
      if (marksUsed.length !== 0) {
        const usedLandmarks = faceDetail.Landmarks.filter(
          (landmark: { Type: string; X: number; Y: number }) =>
            marksUsed.includes(landmark.Type),
        );

        usedLandmarks.forEach((usedLandmark: { X: number; Y: number }) => {
          context.beginPath();
          context.arc(
            usedLandmark.X * image.naturalWidth -
              faceDetail.BoundingBox.Left * image.naturalWidth,
            usedLandmark.Y * image.naturalHeight -
              faceDetail.BoundingBox.Top * image.naturalHeight,
            4,
            0,
            2 * Math.PI,
          );
          context.fillStyle = '#90EE90';
          context.fill();
        });
      }

      // Convert the canvas to a new image URL
      const newImageUrl = canvas.toDataURL('image/png');
      resolve(newImageUrl);
    };

    image.onload = drawGreenCircle;
    image.onerror = reject;
    image.src = imageSrc;
  });
};

export default drawBoundingBoxOnFace;
