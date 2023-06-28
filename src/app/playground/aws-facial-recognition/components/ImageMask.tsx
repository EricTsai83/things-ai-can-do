const ImageMask = ({ imageBase64String, faceDetails }: any) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const image = new Image();
  image.src = 'data:image/png;base64,' + imageBase64String;
  image.style.width = '600px';
  image.style.height = '600px';

  return <></>;
};

export default ImageMask;
