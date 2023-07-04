import { useState, useRef } from 'react';
import huggingFaceApi from '@/utils/hugging-face-api';
import Image from 'next/image';

const ImageDragAndDrop: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [droppedImages, setDroppedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function getCatsAndDogClassifier(data: File) {
    console.log(data);
    const respond = await huggingFaceApi.getCatsAndDogClass(data);
    console.log(respond);
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setImageSrc(imageUrl);
      setDroppedImages((prevImages) => [...prevImages, imageUrl]);
      getCatsAndDogClassifier(imageFile);
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
      setDroppedImages((prevImages) => [...prevImages, imageUrl]);
      event.target.value = ''; // Reset the file input field

      getCatsAndDogClassifier(imageFile);
    }
  };

  return (
    <div>
      <div
        className="relative flex h-72 w-72 items-center justify-center border-2 border-dashed border-black"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleBoxClick}>
        {imageSrc && (
          <Image
            src={imageSrc}
            alt="Image"
            className="absolute left-0 top-0 h-full w-full object-contain"
            width={600}
            height={600}
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
      <div className="mt-4 flex items-center justify-start">
        {droppedImages.map((imageUrl, index) => (
          <Image
            key={index}
            src={imageUrl}
            alt={`Small Image ${index + 1}`}
            className="mr-2 h-12 w-12 cursor-pointer border border-black"
            onClick={() => handleSmallImageClick(imageUrl)}
            width={600}
            height={600}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageDragAndDrop;
