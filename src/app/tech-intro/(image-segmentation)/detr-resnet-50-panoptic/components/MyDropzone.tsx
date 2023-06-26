import { useState, useRef } from 'react';
import { useImmer } from 'use-immer';
import huggingFaceApi from '@/utils/hugging-face-api';
import Image from 'next/image'; // the img element will automatically be assigned the position: "absolute" style.

const ImageDragAndDrop: React.FC = () => {
  const [imageBlob, setImageBlob] = useImmer<any>({});
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [droppedImages, setDroppedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function getImageSegmentation(data: any) {
    console.log(data);
    const respond = await huggingFaceApi.getImageSegmentation(data);
    console.log(respond);
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setImageBlob((draft: any) => {
        draft[imageUrl] = imageFile;
        return draft;
      });
      setImageSrc(imageUrl);
      setDroppedImages((prevImages) => [...prevImages, imageUrl]);
      getImageSegmentation(imageFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSmallImageClick = (imageUrl: string) => {
    setImageSrc(imageUrl);
    // Revert back to the image file
    console.log(imageBlob);
    console.log(imageBlob[imageUrl]);

    getImageSegmentation(imageBlob[imageUrl]);
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

      getImageSegmentation(imageFile);
    }
  };

  return (
    <div>
      <div
        className="object-contain border-dashed border-2 border-black w-[900px] h-[600px] flex justify-center items-center relative"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleBoxClick}>
        {imageSrc && (
          <Image
            src={imageSrc}
            alt="Image"
            className="object-contain w-full h-full"
            fill={true}
            object-fit="contain"
          />
        )}
        {!imageSrc && 'Drop image or click here to uploag image'}
        {/* <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleUpload}
          className="absolute -left-full"
        /> */}
      </div>
      <div className="border-black w-20 h-20 flex justify-center items-center relative object-contain">
        {droppedImages.map((imageUrl, index) => (
          <Image
            key={index}
            src={imageUrl} // next js required
            alt={`Small Image ${index + 1}`} // next js required
            className="border border-black mr-2 cursor-pointer"
            fill={true}
            onClick={() => handleSmallImageClick(imageUrl)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageDragAndDrop;
