interface BoundingBoxType {
  Width: number;
  Height: number;
  Left: number;
  Top: number;
}

interface FaceDetail {
  BoundingBox: BoundingBoxType;
  Landmarks: any[];
}

interface Landmark {
  Type: string;
  X: number;
  Y: number;
}

const drawFacialResultOnImg = (
  imageSrc: string,
  faceDetails: any,
  marksUsed: string[],
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const drawGreenCircle = () => {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.drawImage(
        image,
        0, // source image: left
        0, // source image: top
        image.naturalWidth, // source image: width
        image.naturalHeight, // source image: height
      );

      faceDetails.forEach((faceDetail: FaceDetail) => {
        // Draw the green circle
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

      // Convert the canvas to a new image URL
      const newImageUrl = canvas.toDataURL('image/png');
      resolve(newImageUrl);
    };

    image.onload = drawGreenCircle;
    image.onerror = reject;
    image.src = imageSrc;
  });
};

export default drawFacialResultOnImg;
