// function drawLandmarksOnImage(
//   faceUrls: string,
//   faceDetail: any,
//   marksUsed: string[],
//   radius: number,
// ) {
//   return new Promise((resolve, reject) => {
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d')!;
//     const usedLandmarks = faceDetail.Landmarks.filter(
//       (landmark: { Type: string; X: number; Y: number }) =>
//         marksUsed.includes(landmark.Type),
//     );

//     const image = new Image();
//     image.onload = function () {
//       canvas.width = image.naturalWidth;
//       canvas.height = image.naturalHeight;
//       context.drawImage(image, 0, 0);

//       usedLandmarks.forEach((circle: any) => {
//         const { X, Y } = circle;

//         context.beginPath();
//         context.arc(X, Y, radius, 0, 2 * Math.PI, false);
//         context.fillStyle = 'green';
//         context.fill();
//       });

//       canvas.toBlob((blob: any) => {
//         const url = URL.createObjectURL(blob);
//         resolve(url);
//       }, 'image/png');
//     };
//   });
// }

// import { createCanvas, CanvasRenderingContext2D } from 'canvas';

async function drawLandmarksOnImage(
  faceUrls: string,
  faceDetail: any,
  marksUsed: string[],
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const image = new Image();
    const usedLandmarks = faceDetail.Landmarks.filter(
      (landmark: { Type: string; X: number; Y: number }) =>
        marksUsed.includes(landmark.Type),
    );
    image.onerror = reject;
    image.src = faceUrls;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the original image
      ctx.drawImage(image, 0, 0);

      // Draw the green circle
      ctx.beginPath();
      ctx.arc(usedLandmarks[0].X, usedLandmarks[0].Y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = 'green';
      ctx.fill();

      // Convert the canvas to a new image URL
      const newImageUrl = canvas.toDataURL('image/png');

      resolve(newImageUrl);
    };
  });
}

export default drawLandmarksOnImage;
