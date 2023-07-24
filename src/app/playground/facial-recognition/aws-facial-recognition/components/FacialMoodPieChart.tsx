import { useEffect, useState } from 'react';
import { ReactECharts } from '@/components/Echarts';
import type { ReactEChartsProps } from '@/components/Echarts';
import type { FaceDetail } from '../types';

interface Data {
  value?: number;
  name?: string;
}
interface Props {
  faceAnalysis: FaceDetail | null;
}

function FacialMoodPieChart({ faceAnalysis }: Props) {
  const [pieChartOption, setPieChartOption] = useState<
    ReactEChartsProps['option'] | null
  >(null);

  useEffect(() => {
    let data: Data;
    if (faceAnalysis) {
      const option: ReactEChartsProps['option'] = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            name: '情緒',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: faceAnalysis.Emotions.map((element) => {
              data = {};
              data['value'] = element.Confidence;
              data['name'] = element.Type;
              return data;
            }),
          },
        ],
      };

      setPieChartOption(option);
    }
  }, [faceAnalysis, setPieChartOption]);

  return (
    <div>
      {pieChartOption && (
        <ReactECharts
          style={{
            width: '450px',
            height: '480px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          option={pieChartOption}
        />
      )}
    </div>
  );
}

export default FacialMoodPieChart;
