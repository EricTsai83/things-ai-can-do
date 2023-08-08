import { FaceDetail } from '../types.d';

interface Landmark {
  Type: string;
  X: number;
  Y: number;
}

const drawFacialResultOnImg = (
  imageSrc: string,
  faceDetails: FaceDetail[],
  marksUsed: string[],
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const drawGreenCircle = () => {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

      faceDetails.forEach((faceDetail: FaceDetail) => {
        const usedLandmarks = faceDetail.Landmarks.filter(
          (landmark: Landmark) => marksUsed.includes(landmark.Type),
        );
        context.beginPath();
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.strokeRect(
          faceDetail.BoundingBox.Left * image.naturalWidth,
          faceDetail.BoundingBox.Top * image.naturalHeight,
          faceDetail.BoundingBox.Width * image.naturalWidth,
          faceDetail.BoundingBox.Height * image.naturalHeight,
        );

        usedLandmarks.forEach((usedLandmark) => {
          context.beginPath();
          context.arc(
            usedLandmark.X * image.naturalWidth,
            usedLandmark.Y * image.naturalHeight,
            4,
            0,
            2 * Math.PI,
          );
          context.fillStyle = '#90EE90';
          context.fill();
        });
      });

      const newImageUrl = canvas.toDataURL('image/png');
      resolve(newImageUrl);
    };

    image.onload = drawGreenCircle;
    image.onerror = reject;
    image.src = imageSrc;
  });
};

export default drawFacialResultOnImg;
