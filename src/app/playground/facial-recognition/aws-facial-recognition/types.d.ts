export interface FaceDetail {
  AgeRange: { [key: string]: number };
  Beard: { Confidence: number; Value: boolean };
  BoundingBox: { [key: string]: number };
  Emotions: Array<{ Type: string; Confidence: number }>;
  Eyeglasses: { Confidence: number; Value: boolean };
  EyesOpen: { Confidence: number; Value: boolean };
  FaceOccluded: { Confidence: number; Value: boolean };
  Gender: { Confidence: number; Value: boolean };
  Landmarks: Array<{ Type: string; X: number; Y: number }>;
  MouthOpen: { Confidence: number; Value: boolean };
  Mustache: { Confidence: number; Value: boolean };
  Pose: { [key: string]: number };
  Quality: { [key: string]: number };
  Smile: { Confidence: number; Value: boolean };
  Sunglasses: { Confidence: number; Value: boolean };
}
