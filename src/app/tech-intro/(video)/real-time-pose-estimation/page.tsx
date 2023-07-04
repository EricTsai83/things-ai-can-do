'use client';
import React, { useRef, useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';
import { drawKeypoints, drawSkeleton } from './utils';

function Page() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function runPosenet(): Promise<void> {
      const modelConfig: posenet.ModelConfig = {
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: { width: 640, height: 480 },
      };

      const net = await posenet.load(modelConfig);

      setInterval(() => {
        detect(net);
      }, 100);
    }

    async function detect(net: posenet.PoseNet): Promise<void> {
      if (
        typeof webcamRef.current !== 'undefined' &&
        webcamRef.current !== null &&
        webcamRef.current.video !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        const pose = await net.estimateSinglePose(video);

        drawCanvas(pose, video, videoWidth, videoHeight);
      }
    }

    const drawCanvas = (
      pose: posenet.Pose,
      video: HTMLVideoElement,
      videoWidth: number,
      videoHeight: number,
    ): void => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = videoWidth;
        canvas.height = videoHeight;

        drawKeypoints(pose.keypoints, 0.6, ctx);
        drawSkeleton(pose.keypoints, 0.7, ctx);
      }
    };

    runPosenet();
  }, []);

  return (
    <div className="pt-16">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default Page;
