'use client';
import {useState} from 'react';
import AudioRecorder from './components/AudioRecorder';

const Content = () => {
  return (
    <div>
      <h1 className="text-6xl">React Media Recorder</h1>
      <div className="button-flex"></div>
      <div>
        <AudioRecorder />
      </div>
    </div>
  );
};
export default Content;
