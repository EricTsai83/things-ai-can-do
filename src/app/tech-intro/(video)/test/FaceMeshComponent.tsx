'use client';
import { FaceMesh } from '@mediapipe/face_mesh';
import { useEffect } from 'react';

const faceMesh = new FaceMesh({
  locateFile: (file) => {
    return `[https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}](https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/$%7Bfile%7D)`;
  },
});

const FaceMeshComponent = () => {
  useEffect(() => {
    console.log('This is the facemesh instance', faceMesh);
  }, []);

  return <div>...</div>;
};

export default FaceMeshComponent;
