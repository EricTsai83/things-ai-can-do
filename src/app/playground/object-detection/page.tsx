// @ts-nocheck
'use client';

import Image from 'next/image';
import { FilesetResolver, ObjectDetector } from '@mediapipe/tasks-vision';
import type { Detection } from '@mediapipe/tasks-vision/vision.d';
import { useEffect } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import PageTitle from '@/components/PageTitle';
import aci from './img/aci.jpeg';
import tikka from './img/tikka.jpeg';
import './style.css';

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

type RunningMode = 'IMAGE' | 'VIDEO';

interface DetectionResult {
  /** A list of Detections. */
  detections: Detection[];
}

function Page() {
  useEffect(() => {
    // Create required variables.
    let objectDetector: ObjectDetector;
    let runningMode: RunningMode | undefined = 'IMAGE';

    // Initialize the object detector.
    async function initializeObjectDetector() {
      const visionFilesetResolver = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm',
      );
      objectDetector = await ObjectDetector.createFromOptions(
        visionFilesetResolver,
        {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite`,
            delegate: 'GPU',
          },
          scoreThreshold: 0.5,
          runningMode: runningMode,
        },
      );
    }
    initializeObjectDetector();

    const imageContainers = Array.from(
      document.getElementsByClassName('detectOnClick'),
    );

    imageContainers.forEach((imageContainer) =>
      imageContainer.children[0].addEventListener('click', handleClick),
    );

    /**
     * Detect objects in still images on click
     */
    async function handleClick(event: any) {
      const highlighters =
        event.target.parentNode.getElementsByClassName('highlighter');
      while (highlighters[0]) {
        highlighters[0].parentNode.removeChild(highlighters[0]);
      }

      const infos = event.target.parentNode.getElementsByClassName('info');
      while (infos[0]) {
        infos[0].parentNode.removeChild(infos[0]);
      }

      // Verify object detector is initialized and choose the correct running mode.
      if (!objectDetector) {
        alert('Object Detector still loading. Please try again');
        return;
      }

      if (runningMode === 'VIDEO') {
        runningMode = 'IMAGE';
        await objectDetector.setOptions({ runningMode: runningMode });
      }

      // Run object detection.
      const detections = objectDetector.detect(event.target);

      // Call the displayImageDetections() function.
      displayImageDetections(detections, event.target);
    }

    function displayImageDetections(result: DetectionResult, resultElement) {
      // Display object detection results.
      const ratio = resultElement.height / resultElement.naturalHeight;

      for (const detection of result.detections) {
        // Description text
        const p = document.createElement('p');
        p.setAttribute('class', 'info');
        p.innerText =
          detection.categories[0].categoryName +
          ' - with ' +
          Math.round(parseFloat(detection.categories[0].score) * 100) +
          '% confidence.';
        // Positioned at the top left of the bounding box.
        // Height is whatever the text takes up.
        // Width subtracts text padding in CSS so fits perfectly.
        p.style =
          'left: ' +
          detection.boundingBox.originX * ratio +
          'px;' +
          'top: ' +
          detection.boundingBox.originY * ratio +
          'px; ' +
          'width: ' +
          (detection.boundingBox.width * ratio - 10) +
          'px;';
        const highlighter = document.createElement('div');
        highlighter.setAttribute('class', 'highlighter');
        highlighter.style =
          'left: ' +
          detection.boundingBox.originX * ratio +
          'px;' +
          'top: ' +
          detection.boundingBox.originY * ratio +
          'px;' +
          'width: ' +
          detection.boundingBox.width * ratio +
          'px;' +
          'height: ' +
          detection.boundingBox.height * ratio +
          'px;';

        resultElement.parentNode.appendChild(highlighter);
        resultElement.parentNode.appendChild(p);
      }
    }

    /********************************************************************
     *   Continuously grab image from webcam stream and detect it.
     ********************************************************************/

    let video = document.getElementById('webcam');
    const liveView = document.getElementById('liveView');
    let enableWebcamButton: HTMLButtonElement;
    // Check if webcam access is supported.
    function hasGetUserMedia() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    // Keep a reference of all the child elements we create
    // so we can remove them easilly on each render.
    let children: HTMLElement = [];

    // If webcam supported, add event listener to button for when user
    // wants to activate it.
    if (hasGetUserMedia()) {
      enableWebcamButton = document.getElementById('webcamButton');
      enableWebcamButton.addEventListener('click', enableCam);
    } else {
      console.warn('getUserMedia() is not supported by your browser');
    }

    // Enable the live webcam view and start detection.
    async function enableCam(event) {
      if (!objectDetector) {
        console.log('Wait! objectDetector not loaded yet.');
        return;
      }

      // Hide the button.
      enableWebcamButton.classList.add('removed');

      // getUsermedia parameters
      const constraints = {
        video: true,
      };

      // Activate the webcam stream.
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          video.srcObject = stream;
          video.addEventListener('loadeddata', predictWebcam);
        })
        .catch((err) => {
          console.error(err);
          /* handle the error */
        });
    }

    async function predictWebcam() {
      // Run video object detection.
      // if image mode is initialized, create a new classifier with video runningMode
      if (runningMode === 'IMAGE') {
        runningMode = 'VIDEO';
        await objectDetector.setOptions({ runningMode: runningMode });
      }
      let startTimeMs = performance.now();

      // Detect objects using detectForVideo
      const detections = await objectDetector.detectForVideo(
        video,
        startTimeMs,
      );

      displayVideoDetections(detections);

      // Call this function again to keep predicting when the browser is ready
      window.requestAnimationFrame(predictWebcam);
    }

    function displayVideoDetections(result) {
      // Remove any highlighting from previous frame.
      for (let child of children) {
        liveView.removeChild(child);
      }
      children.splice(0);
      // Iterate through predictions and draw them to the live view
      for (let detection of result.detections) {
        const p = document.createElement('p');
        p.innerText =
          detection.categories[0].categoryName +
          ' - with ' +
          Math.round(parseFloat(detection.categories[0].score) * 100) +
          '% confidence.';
        p.style =
          'left: ' +
          (video.offsetWidth -
            detection.boundingBox.width -
            detection.boundingBox.originX) +
          'px;' +
          'top: ' +
          detection.boundingBox.originY +
          'px; ' +
          'width: ' +
          (detection.boundingBox.width - 10) +
          'px;';

        const highlighter = document.createElement('div');
        highlighter.setAttribute('class', 'highlighter');
        highlighter.style =
          'left: ' +
          (video.offsetWidth -
            detection.boundingBox.width -
            detection.boundingBox.originX) +
          'px;' +
          'top: ' +
          detection.boundingBox.originY +
          'px;' +
          'width: ' +
          (detection.boundingBox.width - 10) +
          'px;' +
          'height: ' +
          detection.boundingBox.height +
          'px;';

        liveView.appendChild(highlighter);
        liveView.appendChild(p);

        // Store drawn objects in memory so they are queued to delete at next call
        children.push(highlighter);
        children.push(p);
      }
    }
  }, []);

  return (
    <div className="flex w-screen flex-col px-4 pt-24 ssm:px-16 xl:w-[calc(100vw-240px)]">
      <PageTitle
        title="物件偵測"
        content="
          物件偵測就像是給電腦一雙神奇的眼睛，讓它可以在圖片或影片中找出並辨識不同的物體。
          這項技術使用深度學習模型，讓電腦學習如何辨識各種物件的特徵，好比是讓電腦成為視覺大師。
          這樣的功能可以應用在很多地方，像是協助自駕車辨識路上的障礙物、在監視系統中追蹤物體，
          甚至在醫學影像中協助醫生診斷。簡而言之，物件偵測就是賦予電腦超強的視覺能力，讓它可以看懂世界！">
        <div className="flex items-center justify-center gap-1">
          <BiCurrentLocation className="flex items-center justify-center text-6xl text-teal-700" />
        </div>
      </PageTitle>
      <h2>Demo: Detecting Doggies</h2>
      <p>
        <b>Click on an image below</b> to detect my dogs in the image.
      </p>

      <div className="detectOnClick relative z-0 float-left m-3 w-2/5 cursor-pointer">
        <Image
          src={tikka}
          width={400}
          crossOrigin="anonymous"
          title="Click to get classification!"
          alt=""
        />
      </div>
      <div className="detectOnClick relative z-0 float-left m-3 w-2/5 cursor-pointer">
        <Image
          src={aci}
          width={400}
          crossOrigin="anonymous"
          title="Click to get classification!"
          alt=""
        />
      </div>

      <h2>Demo: Dog lookalike contest using webcam continuous detection</h2>
      <p>
        Do you have a dog that looks like mine? Place your dog in front of your
        webcam to get a real-time doggie detection! When ready click
        &quot;enable webcam&quot; below and accept access to the webcam.
      </p>
      <div
        id="liveView"
        className="videoView relative float-left m-3 w-9/12 cursor-pointer">
        <button id="webcamButton" className="mdc-button mdc-button--raised">
          <span className="mdc-button__ripple"></span>
          <span className="mdc-button__label">ENABLE WEBCAM</span>
        </button>
        <video
          id="webcam"
          className="clear-both block my-rotate-y-180"
          autoPlay
          playsInline></video>
      </div>
    </div>
  );
}

export default Page;
