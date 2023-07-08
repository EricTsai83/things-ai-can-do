import { useRef, useState } from 'react';

function LoadingButton({ loading, getFacialRecognition }: any) {
  return (
    <button
      // className="search-button"
      disabled={loading}
      className={`
      ${loading ? 'cursor-not-allowed' : ''}
      flex h-12 w-40 items-center justify-center rounded
      bg-red-500 text-lg text-gray-900 transition-all
      hover:bg-red-400 active:bg-red-300
      `}
      onClick={() => {
        getFacialRecognition();
      }}>
      <div
        className={`${loading ? '' : 'hidden'}
        h-6 w-6 animate-spin rounded-full border-4 border-gray-400
        border-e-white
        `}></div>
      <h3 className={`${loading ? 'hidden' : ''}`}>模型推論</h3>
    </button>
  );
}

export default LoadingButton;
