import PageTitle from '@/components/PageTitle';
import { IoCutSharp } from 'react-icons/io5';
import ImageSegmentationWithColor from './image-segmentation-with-color/ImageSegmentationWithColor';

function Page() {
  return (
    <div className="flex w-screen flex-col px-16 pt-24 xl:w-[calc(100vw-240px)]">
      <PageTitle
        title="圖像分割"
        content="
          圖像分割是計算機視覺領域的關鍵技術，用於將圖像分解成區域，提供獨立的語義信息。
          它廣泛應用於圖像處理、醫學診斷、自動駕駛等領域，為這些應用提供準確的物體識別和定位。
          深度學習的發展推動了圖像分割的進步，使得分割算法更準確、高效。
          圖像分割在虛擬現實和擴增現實中扮演重要角色，創造更真實、沉浸式的視覺體驗。
          未來，圖像分割將繼續創新，為我們帶來更準確、智能的圖像分析和應用。
          它將推動科學、醫學、工程等領域的突破和進步，改變我們的生活方式和視覺體驗。
          在此，我們用這項技術來實現圖像去背功能。">
        <div className="flex items-center justify-center gap-1">
          <IoCutSharp className="flex items-center justify-center text-6xl text-teal-700" />
        </div>
      </PageTitle>
      <ImageSegmentationWithColor />
    </div>
  );
}

export default Page;
