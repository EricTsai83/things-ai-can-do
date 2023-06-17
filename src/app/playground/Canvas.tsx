import {Stage, Layer, Line, Text} from 'react-konva';
import Konva from 'konva';
import {useState, useRef} from 'react';
import api from '@/utils/api';
import dataURItoBlob from '@/utils/dataURItoBlob';

interface LineData {
  tool: string;
  points: number[];
}

interface CanvasProps {
  tool: string;
}

function downloadURI(uri: string, name: string) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function Canvas({tool}: CanvasProps) {
  const [lines, setLines] = useState<LineData[]>([]);
  const isDrawing = useRef(false);
  const stageRef = useRef<Konva.Stage>(null);

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    if (!stage) return;

    isDrawing.current = true;
    const pos = stage.getPointerPosition();

    // these expressions allow you to safely access the x and y properties
    // of pos by providing default values (0) in case pos is null or undefined.
    // This helps prevent potential runtime errors when attempting to access
    // properties of a null or undefined value.
    setLines([...lines, {tool, points: [pos?.x ?? 0, pos?.y ?? 0]}]);
  };

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = event.target.getStage();
    if (!stage) return;

    const point = stage.getPointerPosition();
    const lastLine = {...lines[lines.length - 1]};
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
    console.log(uri);
    downloadURI(uri, 'stage.png');
  };

  async function getSketchClassifier() {
    const stage = stageRef.current;
    if (!stage) return;

    const uri = stage.toDataURL();
    const blobData = dataURItoBlob(uri);
    const respond = await api.getSketchClassifier(blobData);
    console.log(respond);
  }

  return (
    <>
      <Stage
        ref={stageRef}
        width={400}
        height={400}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="border">
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
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
      <button onClick={handleExport}>Click here to log stage data URL</button>
      <br />
      <button
        onClick={() => {
          getSketchClassifier();
        }}>
        點我打ＡＰＩ
      </button>
    </>
  );
}

export default Canvas;
