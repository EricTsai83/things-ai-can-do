import { Stage, Layer, Line, Text } from 'react-konva';
import Konva from 'konva';
import { useState, useRef, useEffect, SetStateAction, Dispatch } from 'react';
import huggingFaceApi from '@/utils/hugging-face-api';
import dataURItoBlob from '@/utils/dataURItoBlob';
import { IoIosRefreshCircle } from 'react-icons/io';
import LoadingButton from '@/components/LoadingButton';
import { apiNotify } from '@/components/ReactToast';
import { StyledToastContainer } from '@/components/ReactToast';
import type { ApiResponse } from '../types';

interface LineData {
  tool: string;
  points: number[];
}

interface CanvasProps {
  tool: string;
  setApiResponse: Dispatch<SetStateAction<ApiResponse[] | null>>;
}

function Canvas({ tool, setApiResponse }: CanvasProps) {
  const [lines, setLines] = useState<LineData[]>([]);
  const isDrawing = useRef(false);
  const stageRef = useRef<Konva.Stage>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    if (!stage) return;

    isDrawing.current = true;
    const pos = stage.getPointerPosition();
    setLines([...lines, { tool, points: [pos?.x ?? 0, pos?.y ?? 0] }]);
  };

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = event.target.getStage();
    if (!stage) return;

    const point = stage.getPointerPosition();
    const lastLine = { ...lines[lines.length - 1] };
    lastLine.points = lastLine.points.concat([point?.x ?? 0, point?.y ?? 0]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines([...lines]);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleExport = () => {
    const stage = stageRef.current;
    if (!stage) return;
    const uri = stage.toDataURL();
    downloadURI(uri, 'stage.png');
  };

  async function getSketchClassifier() {
    const stage = stageRef.current;
    if (!stage) return;
    try {
      setLoading(true);
      const uri = stage.toDataURL();
      const blobData = dataURItoBlob(uri);
      const respond = await huggingFaceApi.getSketchClassifier(blobData);
      console.log(respond);

      if (respond.error) {
        apiNotify();
      } else {
        setApiResponse(respond);
      }
    } catch (e) {
      apiNotify();
    } finally {
      setLoading(false);
    }
  }

  function downloadURI(uri: string, name: string) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // We can't set the h & w on Stage to 100% it only takes px values so we have to
  // find the parent container's w and h and then manually set those !
  useEffect(() => {
    if (divRef.current?.offsetWidth) {
      if (divRef.current?.offsetWidth >= 1280) {
        setDimensions({
          width: divRef.current.offsetWidth - 240 - 220,
        });
      } else if (divRef.current?.offsetWidth < 1280) {
        setDimensions({
          width: divRef.current.offsetWidth,
        });
      }
    }
  }, []);

  const handleClearCanvas = () => {
    setLines([]);
  };

  return (
    <div ref={divRef} className="relative w-full">
      <button
        onClick={handleClearCanvas}
        className="absolute right-4 top-4 z-10">
        <IoIosRefreshCircle className="text-3xl text-teal-500" />
      </button>
      <Stage
        ref={stageRef}
        width={dimensions.width}
        height={350}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="border">
        <Layer>
          <Text text="在這畫上你的創意 ❤️" x={10} y={30} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
      <div className="mt-5 flex justify-between">
        <button
          onClick={handleExport}
          className="
          flex h-12 w-40 items-center justify-center rounded
        bg-cyan-600 text-lg text-white hover:bg-cyan-500
        active:bg-cyan-400 
">
          下載圖畫
        </button>

        <LoadingButton
          loading={loading}
          executeFunction={getSketchClassifier}
          text="模型推論"
        />
      </div>

      <StyledToastContainer />
    </div>
  );
}

export default Canvas;
