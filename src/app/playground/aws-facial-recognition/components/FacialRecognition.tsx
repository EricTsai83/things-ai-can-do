const FacialRecognition = ({ faceDetails }: any) => {
  return (
    <>
      {faceDetails &&
        faceDetails.map((faceDetail: any) => {
          return (
            '年齡: ' +
            faceDetail.AgeRange['Low'].toString() +
            '~' +
            faceDetail.AgeRange['High'].toString() +
            '有沒有鬍子' +
            faceDetail.Beard['Value'].toString()
          );
        })}
    </>
  );
};

export default FacialRecognition;
