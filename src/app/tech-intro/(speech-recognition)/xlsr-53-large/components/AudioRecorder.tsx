// Declares the UI for the audio recorder components
// Receives microphone permissions from the browser using the getMicrophonePermission function
// Sets MediaStream received from the navigator.mediaDevices.getUserMedia function to the stream state variable (we’ll get to using that soon)
import {useState, useRef} from 'react';
import huggingFaceApi from '@/utils/hugging-face-api';
import dataURItoBlob from '@/utils/dataURItoBlob';

const mimeType = 'audio/webm';

const AudioRecorder = (): JSX.Element => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState('inactive');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audio, setAudio] = useState<string | null>(null);
  const [audioBlobData, setAudioBlobData] = useState<Blob | null>(null);

  const getMicrophonePermission = async (): Promise<void> => {
    if ('MediaRecorder' in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err: any) {
        alert(err.message);
      }
    } else {
      alert('The MediaRecorder API is not supported in your browser.');
    }
  };

  const startRecording = (): void => {
    setRecordingStatus('recording');
    // create new MediaRecorder instance using the stream and mimeType
    const media = new MediaRecorder(stream!, {mimeType});
    // set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    // invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = (): void => {
    setRecordingStatus('inactive');
    // stops the recording instance
    mediaRecorder.current!.stop();
    mediaRecorder.current!.onstop = () => {
      // creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, {type: mimeType});
      setAudioBlobData(audioBlob);
      // creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
  };

  async function getSpeechRecognition() {
    console.log(audioBlobData);
    if (audioBlobData) {
      const respond = await huggingFaceApi.getSpeechRecognition(audioBlobData);
      console.log(respond);
    }
  }

  return (
    <div className="audio-controls">
      {!permission ? (
        <button onClick={getMicrophonePermission} type="button">
          Get Microphone
        </button>
      ) : null}
      {permission && recordingStatus === 'inactive' ? (
        <button onClick={startRecording} type="button">
          Start Recording
        </button>
      ) : null}
      {recordingStatus === 'recording' ? (
        <button onClick={stopRecording} type="button">
          Stop Recording
        </button>
      ) : null}

      {audio ? (
        <div className="audio-container">
          <audio src={audio} controls></audio>
          <a download href={audio}>
            Download Recording
          </a>
        </div>
      ) : null}

      <button
        onClick={() => {
          audioBlobData && getSpeechRecognition();
        }}>
        來打個ＡＰＩ吧
      </button>
    </div>
  );
};

export default AudioRecorder;
