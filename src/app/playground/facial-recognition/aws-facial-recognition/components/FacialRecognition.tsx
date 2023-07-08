import type { FaceDetail } from '../types';

function FacialRecognition({
  faceAnalysis,
}: {
  faceAnalysis: FaceDetail | null;
}) {
  return (
    <>
      {faceAnalysis && (
        <ul className="mt-4 flex list-inside list-disc flex-col gap-1">
          <li>
            年齡: {faceAnalysis.AgeRange.Low} ~ {faceAnalysis.AgeRange.High}
          </li>
          <li>鬍子: {faceAnalysis.Beard.Value.toString()}</li>
          <li>眼鏡: {faceAnalysis.Eyeglasses.Value.toString()}</li>
          <li>眼睛張開: {faceAnalysis.EyesOpen.Value.toString()}</li>
          <li>
            {/* // FaceOccluded should return "true" with a high confidence score if a detected face’s eyes, nose, and mouth are partially captured */}
            眼睛鼻子與嘴角是否有被偵測:
            {faceAnalysis.FaceOccluded.Value.toString()}
          </li>
          <li>性別: {faceAnalysis.Gender.Value.toString()}</li>
          <li>張開嘴巴: {faceAnalysis.MouthOpen.Value.toString()}</li>
          <li>鬍子: {faceAnalysis.Mustache.Value.toString()}</li>
          <li>上下仰角: {faceAnalysis.Pose.Pitch.toString()}</li>
          <li>整顆頭右偏左偏: {faceAnalysis.Pose.Roll.toString()}</li>
          <li>臉右轉左轉: {faceAnalysis.Pose.Yaw.toString()}</li>
          <li>有沒有笑: {faceAnalysis.Smile.Value.toString()}</li>
          <li>太陽眼鏡: {faceAnalysis.Sunglasses.Value.toString()}</li>
        </ul>
      )}
    </>
  );
}

export default FacialRecognition;
