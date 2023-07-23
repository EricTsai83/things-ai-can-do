import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import type { DataTableFilterMetaData } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { FormEvent, useEffect, useState } from 'react';
import type { FaceDetail } from '../types';

interface TableData {
  id: number;
  feature: string;
  result: string | number;
}

interface Filters {
  [key: string]: DataTableFilterMetaData;
}

function FacialFeatureTable({
  faceAnalysis,
}: {
  faceAnalysis: FaceDetail | null;
}) {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [filters, setFilters] = useState<Filters>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  function round(num: number) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }

  function dataProcessing() {
    if (faceAnalysis) {
      const dataArry: TableData[] = [
        {
          id: 1,
          feature: '年齡',
          result: `${faceAnalysis.AgeRange.Low} ~ ${faceAnalysis.AgeRange.High}`,
        },
        {
          id: 2,
          feature: '鬍鬚',
          result: `${faceAnalysis.Beard.Value ? '✓' : '✗'}`,
        },
        {
          id: 3,
          feature: '眼鏡',
          result: `${faceAnalysis.Eyeglasses.Value ? '✓' : '✗'}`,
        },
        {
          id: 4,
          feature: '眼睛張開',
          result: `${faceAnalysis.EyesOpen.Value ? '✓' : '✗'}`,
        },
        {
          id: 5,
          feature: '是否有完整人臉',
          result: `${faceAnalysis.FaceOccluded.Value ? '✓' : '✗'}`,
        },
        {
          id: 6,
          feature: '性別',
          result: `${faceAnalysis.Gender.Value ? '✓' : '✗'}`,
        },
        {
          id: 7,
          feature: '張開嘴巴',
          result: `${faceAnalysis.MouthOpen.Value ? '✓' : '✗'}`,
        },
        {
          id: 8,
          feature: '鬍子',
          result: `${faceAnalysis.Beard.Value ? '✓' : '✗'}`,
        },
        { id: 9, feature: '上下仰角', result: round(faceAnalysis.Pose.Pitch) },
        {
          id: 10,
          feature: '頭右偏/左偏(-/+)',
          result: round(faceAnalysis.Pose.Roll),
        },
        {
          id: 11,
          feature: '臉右轉/左轉(-/+)',
          result: round(faceAnalysis.Pose.Yaw),
        },
        {
          id: 12,
          feature: '是否有笑容',
          result: `${faceAnalysis.Smile.Value ? '✓' : '✗'}`,
        },
        {
          id: 13,
          feature: '太陽眼鏡',
          result: `${faceAnalysis.Sunglasses.Value ? '✓' : '✗'}`,
        },
      ];
      setTableData(dataArry);
    }
  }

  useEffect(() => {
    dataProcessing();
  }, [faceAnalysis]);

  return (
    <div className="mt-3">
      <InputText
        className="h-8"
        placeholder="輸入臉部特徵"
        onInput={(event: FormEvent<HTMLInputElement>) => {
          const inputElement = event.target as HTMLInputElement;
          setFilters({
            global: {
              value: inputElement.value,
              matchMode: FilterMatchMode.CONTAINS,
            },
          });
        }}
      />

      <DataTable
        value={tableData}
        sortMode="multiple"
        filters={filters}
        paginator
        rows={5}>
        <Column field="id" header="編號" sortable />
        <Column field="feature" header="特徵" sortable />
        <Column field="result" header="結果" />
      </DataTable>
    </div>
  );
}

export default FacialFeatureTable;
