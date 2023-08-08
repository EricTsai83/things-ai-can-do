import { FaceDetail } from '../types';

const cutFaceOnImage = (
  imageSrc: string,
  faceDetail: FaceDetail,
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
        faceDetail.BoundingBox.Left * image.naturalWidth,
        faceDetail.BoundingBox.Top * image.naturalHeight,
        faceDetail.BoundingBox.Width * image.naturalWidth,
        faceDetail.BoundingBox.Height * image.naturalHeight,
        0,
        0,
        faceDetail.BoundingBox.Width * image.naturalWidth,
        faceDetail.BoundingBox.Height * image.naturalHeight,
      );

      const newImageUrl = canvas.toDataURL('image/png');
      resolve(newImageUrl);
    };

    image.onload = drawGreenCircle;
    image.onerror = reject;
    image.src = imageSrc;
  });
};

export default cutFaceOnImage;
