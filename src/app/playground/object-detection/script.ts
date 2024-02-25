// Copyright 2023 The MediaPipe Authors.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//      http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// Import the required package.
// @ts-nocheck
import {
  Detection,
  FilesetResolver,
  ObjectDetector,
} from '@mediapipe/tasks-vision';

// Create required variables.
let objectDetector: ObjectDetector;
let runningMode = 'IMAGE';

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

const imageContainers = document.getElementsByClassName('detectOnClick');

for (const imageContainer of imageContainers) {
  imageContainer.children[0].addEventListener('click', handleClick);
}

/**
 * Detect objects in still images on click
 */
async function handleClick(event) {
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

function displayImageDetections(result, resultElement: HTMLElement) {
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
  enableWebcamButton?.addEventListener('click', enableCam);
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
  const detections = await objectDetector.detectForVideo(video, startTimeMs);

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
