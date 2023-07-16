'use client';
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import {
  FaceLandmarker,
  FaceLandmarkerOptions,
  FilesetResolver,
  DrawingUtils,
  Category,
} from '@mediapipe/tasks-vision';
import { Color, Euler, Matrix4 } from 'three';
import { Canvas } from '@react-three/fiber';
// import { useDropzone } from 'react-dropzone';
import Avatar from './components/Avatar';
import type { SearchParams } from '../types';
import Image from 'next/image';
import readyPlayerMe from './img/ready-player-me.png';
import Link from 'next/link';
import ToolTip from '@/components/ToolTip';

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

function AvatarBox({ searchParams }: { searchParams: SearchParams }) {
  const [blendshapes, setBlendshapes] = useState<Category[]>([]);
  const [rotation, setRotation] = useState<Euler>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  // https://models.readyplayer.me/648ef0aef2caada0866fd637.glb
  // https://models.readyplayer.me/649068aea1051fa7234fdbdf.glb (男)
  // https://models.readyplayer.me/649fb6cd0b339f947f7c5e2b.glb (女)
  // https://models.readyplayer.me/6490655e99211a8c97fc395f.glb
  // https://models.readyplayer.me/6490674099211a8c97fc3ee9.glb
  const [url, setUrl] = useState<string | null>(null);

  function validateURL(url: string): boolean {
    const pattern = /^https:\/\/models\.readyplayer\.me\/.*\.glb$/;
    return pattern.test(url);
  }

  // const { getRootProps } = useDropzone({
  //   onDrop: (files) => {
  //     const file = files[0];
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setUrl(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   },
  // });

  async function setup() {
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
        video: { width: 360, height: 360 },
        audio: false,
      })
      .then(function (stream) {
        video.srcObject = stream;
        video.addEventListener('loadeddata', predict);
      });
  }

  async function drawMaskOnWebcam() {
    const videoWidth = 200;
    const canvasElement = document.getElementById(
      'output_canvas',
    ) as HTMLCanvasElement;
    if (canvasElement.getContext('2d')) {
      const canvasCtx = canvasElement.getContext('2d')!;

      // x!; // 告訴 TS，x 這個變數不會是 null 或 undefined

      const radio = video.videoHeight / video.videoWidth;
      video.style.width = videoWidth + 'px';
      video.style.height = videoWidth * radio + 'px';
      canvasElement.style.width = videoWidth + 'px';
      canvasElement.style.height = videoWidth * radio + 'px';
      canvasElement.width = video.videoWidth;
      canvasElement.height = video.videoHeight;

      // Now let's start detecting the stream.
      let nowInMs = Date.now();
      let results = undefined;
      let lastVideoTime = -1;
      const drawingUtils = new DrawingUtils(canvasCtx);
      if (lastVideoTime !== video.currentTime) {
        lastVideoTime = video.currentTime;
        results = faceLandmarker.detectForVideo(video, nowInMs);
      }
      if (results?.faceLandmarks) {
        for (const landmarks of results.faceLandmarks) {
          drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_TESSELATION,
            { color: '#73be73', lineWidth: 1 },
          );
          drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
            { color: '#4d944d' },
          );
          drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
            { color: '#D3D3D3' },
          );
          drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
            { color: '#4d944d' },
          );
          drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
            { color: '#D3D3D3' },
          );
          drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
            { color: '#73be73' },
          );
          drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_LIPS,
            { color: '#ffcccb' },
          );
          drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
            { color: '#90ee90' },
          );
          drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
            { color: '#90ee90' },
          );
        }
      }
    }
  }

  let myReq: number;
  async function predict() {
    await drawMaskOnWebcam();

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
    myReq = window.requestAnimationFrame(predict);
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key !== 'Enter') return;
    const target = event.target as HTMLInputElement;
    if (validateURL(target.value) && event.key === 'Enter') {
      console.log(target.value);
      setUrl(target.value);
      target.value = '';
    } else {
      window.alert('URL is not right');
    }
  };

  useEffect(() => {
    setup();
    return () => {
      video.removeEventListener('loadeddata', predict);
      window.cancelAnimationFrame(myReq);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if ('gender' in searchParams && 'age' in searchParams) {
      if (searchParams.gender === 'man' && searchParams.age === '40') {
        console.log('gender', searchParams.gender);
        console.log('age', searchParams.age);

        setUrl('https://models.readyplayer.me/649068aea1051fa7234fdbdf.glb');
      } else if (searchParams.gender === 'woman' && searchParams.age === '36') {
        console.log('gender', searchParams.gender);
        console.log('age', searchParams.age);
        setUrl('https://models.readyplayer.me/649fb6cd0b339f947f7c5e2b.glb');
      } else if (searchParams.gender === 'man' && searchParams.age === '28') {
        console.log('gender', searchParams.gender);
        console.log('age', searchParams.age);
        setUrl('https://models.readyplayer.me/648ef0aef2caada0866fd637.glb');
      } else if (searchParams.gender === 'woman' && searchParams.age === '18') {
        console.log('gender', searchParams.gender);
        console.log('age', searchParams.age);
        setUrl('https://models.readyplayer.me/6490674099211a8c97fc3ee9.glb');
      } else {
        console.log('gender', searchParams.gender);
        console.log('age', searchParams.age);
      }
    }
  }, [searchParams.gender, searchParams.age, searchParams, setUrl]);

  return (
    <div className="relative">
      <div className="mx-auto my-0 flex h-[600px] w-[500px] flex-col items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500">
        {/* <div {...getRootProps({ className: 'dropzone' })}>
        <p>Drag & drop RPM avatar GLB file here</p>
      </div> */}
        <input
          ref={inputRef}
          className="mt-4 flex h-8 w-4/5 items-center justify-center rounded-xl bg-stone-100 px-[16px]"
          type="text"
          placeholder="Paste RPM avatar URL"
          onKeyDown={handleKeyDown}
        />
        <div className="relative mt-4 h-[80px] w-full">
          <video
            id="video"
            className="absolute right-3 top-0 h-full rounded-3xl"
            autoPlay
            playsInline></video>
          <canvas
            className="absolute right-3 top-0"
            id="output_canvas"></canvas>
        </div>

        <Canvas style={{ height: 500 }} camera={{ fov: 25 }} shadows>
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
          {rotation && url && (
            <Avatar url={url} blendshapes={blendshapes} rotation={rotation} />
          )}
        </Canvas>
      </div>

      <Link href="https://demo.readyplayer.me/avatar" target="_blank">
        <div className="absolute bottom-0 right-0 flex rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
          <ToolTip tooltip="點我創建屬於自己的虛擬人像">
            <Image
              className="rounded-2xl"
              src={readyPlayerMe}
              alt="ready player me logo"
              width={0}
              height={0}
              style={{
                width: '120px',
                height: 'auto',
              }}
            />
          </ToolTip>
        </div>
      </Link>
    </div>
  );
}

export default AvatarBox;
