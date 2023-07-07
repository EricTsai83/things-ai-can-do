'use client';
import { useState } from 'react';
import AwsFacialRecognition from './aws-facial-recognition/AwsFacialRecognition';
import AvatarBox from './avatar/AvatarBox';
import Tabs from './components/Tabs';
import type { SearchParams } from './types';
import { Select, SelectOption } from './components/Select';

const options = [
  { label: 'eyeLeft', value: 1 },
  { label: 'eyeRight', value: 2 },
  { label: 'mouthLeft', value: 3 },
  { label: 'mouthRight', value: 4 },
  { label: 'nose', value: 5 },
  { label: 'leftEyeBrowLeft', value: 6 },
  { label: 'leftEyeBrowRight', value: 7 },
  { label: 'leftEyeBrowUp', value: 8 },
  { label: 'rightEyeBrowLeft', value: 9 },
  { label: 'rightEyeBrowRight', value: 10 },
  { label: 'rightEyeBrowUp', value: 11 },
  { label: 'leftEyeLeft', value: 12 },
  { label: 'leftEyeRight', value: 13 },
  { label: 'leftEyeUp', value: 14 },
  { label: 'leftEyeDown', value: 15 },
  { label: 'rightEyeLeft', value: 16 },
  { label: 'rightEyeRight', value: 17 },
  { label: 'rightEyeUp', value: 18 },
  { label: 'rightEyeDown', value: 19 },
  { label: 'noseLeft', value: 20 },
  { label: 'noseRight', value: 21 },
  { label: 'mouthUp', value: 22 },
  { label: 'mouthDown', value: 23 },
  { label: 'leftPupil', value: 24 },
  { label: 'rightPupil', value: 25 },
  { label: 'upperJawlineLeft', value: 26 },
  { label: 'midJawlineLeft', value: 27 },
  { label: 'chinBottom', value: 28 },
  { label: 'midJawlineRight', value: 29 },
  { label: 'upperJawlineRight', value: 30 },
];

function Page({ searchParams }: { searchParams: SearchParams }) {
  const [tabClass, setTabClass] = useState<string>('picture');
  const [facePoints, setFacePoints] = useState<SelectOption[]>([options[0]]);

  return (
    <div className="flex px-2 pt-16">
      {tabClass === 'picture' ? (
        <AwsFacialRecognition searchParams={searchParams} />
      ) : (
        <AvatarBox searchParams={searchParams} />
      )}
      <div>
        {/* <Tabs setTabClass={setTabClass} /> */}
        <Select
          multiple
          options={options}
          value={facePoints}
          onChange={(o) => setFacePoints(o)}
        />
      </div>
    </div>
  );
}

export default Page;
