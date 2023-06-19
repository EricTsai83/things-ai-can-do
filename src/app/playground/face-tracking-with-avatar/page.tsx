'use client';
import './page.css';

import { useEffect, useState } from 'react';
import {
  FaceLandmarker,
  FaceLandmarkerOptions,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import { Color, Euler, Matrix4 } from 'three';
import { Canvas } from '@react-three/fiber';
import { useDropzone } from 'react-dropzone';
import Avatar from './components/Avatar';

let video: HTMLVideoElement;
let faceLandmarker: FaceLandmarker;
let lastVideoTime = -1;

const options: FaceLandmarkerOptions = {
  baseOptions: {
    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
    delegate: 'GPU',
  },
  numFaces: 1,
  runningMode: 'VIDEO',
  outputFaceBlendshapes: true,
  outputFacialTransformationMatrixes: true,
};

function App() {
  const [blendshapes, setBlendshapes] = useState<any[]>([]);
  const [rotation, setRotation] = useState<Euler>();

  // https://models.readyplayer.me/648ef0aef2caada0866fd637.glb
  // https://models.readyplayer.me/649068aea1051fa7234fdbdf.glb
  // https://models.readyplayer.me/6490655e99211a8c97fc395f.glb
  // https://models.readyplayer.me/6490674099211a8c97fc3ee9.glb
  const [url, setUrl] = useState<string>(
    'https://models.readyplayer.me/649068aea1051fa7234fdbdf.glb',
  );
  const { getRootProps } = useDropzone({
    onDrop: (files) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
  });

  const setup = async () => {
    const filesetResolver = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm',
    );
    faceLandmarker = await FaceLandmarker.createFromOptions(
      filesetResolver,
      options,
    );

    video = document.getElementById('video') as HTMLVideoElement;
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1280, height: 720 },
        audio: false,
      })
      .then(function (stream) {
        video.srcObject = stream;
        video.addEventListener('loadeddata', predict);
      });
  };

  const predict = async () => {
    let nowInMs = Date.now();
    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;
      const faceLandmarkerResult = faceLandmarker.detectForVideo(
        video,
        nowInMs,
      );

      if (
        faceLandmarkerResult.faceBlendshapes &&
        faceLandmarkerResult.faceBlendshapes.length > 0 &&
        faceLandmarkerResult.faceBlendshapes[0].categories
      ) {
        const blendshapesData =
          faceLandmarkerResult.faceBlendshapes[0].categories;
        setBlendshapes(blendshapesData);
        const matrix = new Matrix4().fromArray(
          faceLandmarkerResult.facialTransformationMatrixes![0].data,
        );
        const rotationData = new Euler().setFromRotationMatrix(matrix);
        setRotation(rotationData);
      }
    }

    window.requestAnimationFrame(predict);
  };

  const handleOnChange = (event: any) => {
    setUrl(`${event.target.value}`);
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <div className="App">
      {/* <div {...getRootProps({ className: 'dropzone' })}>
        <p>Drag & drop RPM avatar GLB file here</p>
      </div> */}
      <input
        className="url"
        type="text"
        placeholder="Paste RPM avatar URL"
        onChange={handleOnChange}
      />
      <video className="camera-feed" id="video" autoPlay></video>
      <Canvas style={{ height: 380 }} camera={{ fov: 25 }} shadows>
        <ambientLight intensity={0.5} />
        <pointLight
          position={[10, 10, 10]}
          color={new Color(1, 1, 0)}
          intensity={0.5}
          castShadow
        />
        <pointLight
          position={[-10, 0, 10]}
          color={new Color(1, 0, 0)}
          intensity={0.5}
          castShadow
        />
        <pointLight position={[0, 0, 10]} intensity={0.5} castShadow />
        {rotation && (
          <Avatar url={url} blendshapes={blendshapes} rotation={rotation} />
        )}
      </Canvas>
    </div>
  );
}

export default App;
