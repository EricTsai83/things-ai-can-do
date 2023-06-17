import {useState, useRef} from 'react';
import api from '@/utils/api';

const ImageDragAndDrop: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [droppedImages, setDroppedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function getImageSegmentation(data: any) {
    console.log(data);
    const respond = await api.getImageSegmentation(data);
    console.log(respond);
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setImageSrc(imageUrl);
      setDroppedImages(prevImages => [...prevImages, imageUrl]);
      getImageSegmentation(imageFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSmallImageClick = (imageUrl: string) => {
    setImageSrc(imageUrl);
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setImageSrc(imageUrl);
      setDroppedImages(prevImages => [...prevImages, imageUrl]);
      event.target.value = ''; // Reset the file input field

      getImageSegmentation(imageFile);
    }
  };

  return (
    <div>
      <div
        className="border-dashed border-2 border-black w-72 h-72 flex justify-center items-center relative"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleBoxClick}>
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Image"
            className="object-contain w-full h-full absolute top-0 left-0"
          />
        )}
        {!imageSrc && 'Drop image here'}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleUpload}
          className="absolute -left-full"
        />
      </div>
      <div className="flex justify-start items-center mt-4">
        {droppedImages.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Small Image ${index + 1}`}
            className="w-12 h-12 border border-black mr-2 cursor-pointer"
            onClick={() => handleSmallImageClick(imageUrl)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageDragAndDrop;
