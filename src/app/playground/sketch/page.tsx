'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Note: react-konva is designed to work in the client-side.
// On the server side, it will render just empty div. So it
// doesn't make much sense to use react-konva for server-side rendering.
const NoSSRComponent = dynamic(() => import('./components/Canvas'), {
  ssr: false,
});

export default function TestsPage() {
  const [tool, setTool] = useState('pen');

  return (
    <div>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}>
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>

      <NoSSRComponent tool={tool} />
    </div>
  );
}
