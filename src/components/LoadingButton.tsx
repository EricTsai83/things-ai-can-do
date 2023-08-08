interface Props {
  isLoading: boolean;
  executeFunction: () => void;
  text: string;
}

function LoadingButton({ isLoading, executeFunction, text }: Props) {
  return (
    <button
      disabled={isLoading}
      className={`
        ${isLoading ? 'cursor-not-allowed' : ''}
        flex h-12 w-40 items-center justify-center rounded
        bg-red-500 text-lg text-white transition-all
        hover:bg-red-400 active:bg-red-300`}
      onClick={() => executeFunction()}>
      <div
        className={`${isLoading ? '' : 'hidden'}
          h-6 w-6 animate-spin rounded-full border-4 border-gray-400
          border-e-white`}></div>
      <h3 className={`${isLoading ? 'hidden' : ''}`}>{text}</h3>
    </button>
  );
}

export default LoadingButton;
