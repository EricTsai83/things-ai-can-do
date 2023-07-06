import type { FaceDetail } from '../types';

function FacialRecognition({
  faceAnalysis,
}: {
  faceAnalysis: FaceDetail | null;
}) {
  return (
    <>
      {faceAnalysis && (
        <div>
          <div>
            年齡: {faceAnalysis.AgeRange.Low} ~ {faceAnalysis.AgeRange.High}
          </div>
          <div>鬍子: {faceAnalysis.Beard.Value}</div>
          <div>眼鏡: {faceAnalysis.Eyeglasses.Value.toString()}</div>
          <div>眼睛張開: {faceAnalysis.EyesOpen.Value.toString()}</div>
          <div>
            {/* // FaceOccluded should return "true" with a high confidence score if a detected face’s eyes, nose, and mouth are partially captured */}
            眼睛鼻子與嘴角是否有被偵測:{' '}
            {faceAnalysis.FaceOccluded.Value.toString()}
          </div>
          <div>性別: {faceAnalysis.Gender.Value.toString()}</div>
          <div>張開嘴巴: {faceAnalysis.MouthOpen.Value.toString()}</div>
          <div>鬍子: {faceAnalysis.Mustache.Value.toString()}</div>
          <div>上下仰角: {faceAnalysis.Pose.Pitch.toString()}</div>
          <div>整顆頭右偏左偏: {faceAnalysis.Pose.Roll.toString()}</div>
          <div>臉右轉左轉: {faceAnalysis.Pose.Yaw.toString()}</div>
          <div>有沒有笑: {faceAnalysis.Smile.Value.toString()}</div>
          <div>太陽眼鏡: {faceAnalysis.Sunglasses.Value.toString()}</div>
        </div>
      )}
    </>
  );
}

export default FacialRecognition;
