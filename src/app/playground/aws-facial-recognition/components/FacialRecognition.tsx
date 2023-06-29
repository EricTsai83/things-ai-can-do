import { useState } from 'react';

const FacialRecognition = ({ faceDetails }: any) => {
  return (
    <>
      {faceDetails &&
        faceDetails.map((faceDetail: any) => {
          return (
            '年齡: ' +
            faceDetail.AgeRange.Low.toString() +
            '~' +
            faceDetail.AgeRange.High.toString() +
            '鬍子' +
            faceDetail.Beard.Value.toString() +
            '心情' +
            faceDetail.Emotions.toString() +
            '眼鏡' +
            faceDetail.Eyeglasses.Value.toString() +
            '眼睛張開' +
            faceDetail.EyesOpen.Value.toString() +
            '眼睛鼻子與嘴角是否有被偵測' + // FaceOccluded should return "true" with a high confidence score if a detected face’s eyes, nose, and mouth are partially captured
            faceDetail.FaceOccluded.Value.toString() +
            '性別' +
            faceDetail.Gender.Value.toString() +
            '張開嘴巴' +
            faceDetail.MouthOpen.Value.toString() +
            '鬍子' +
            faceDetail.Mustache.Value.toString() +
            '上下仰角' +
            faceDetail.Pose.Pitch.toString() +
            '整顆頭右偏左偏' +
            faceDetail.Pose.Roll.toString() +
            '臉右轉左轉' +
            faceDetail.Pose.Yaw.toString() +
            '有沒有笑' +
            faceDetail.Smile.Value.toString() +
            '太陽眼鏡' +
            faceDetail.Sunglasses.Value.toString()
          );
        })}
    </>
  );
};

export default FacialRecognition;
