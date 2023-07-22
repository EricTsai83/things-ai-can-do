interface Props {
  executeFunction: () => void;
  cover: boolean;
  toggleTexts: { positive: string; negative: string };
}

function MirrorReflectionBtn({ executeFunction, cover, toggleTexts }: Props) {
  return (
    <button
      className={`${
        cover ? 'bg-teal-500 text-white ' : 'bg-gray-300 text-gray-600 '
      }
      relative h-8 w-20
      overflow-hidden rounded-3xl text-lg
      transition duration-300 ease-in-out
      before:absolute before:left-0 before:top-0 
      before:h-6 before:w-full before:-translate-x-full 
      before:rotate-45 before:rounded-3xl
    before:bg-white before:duration-300
      hover:before:translate-x-full hover:before:rotate-45
      `}
      onClick={() => executeFunction()}>
      {cover ? toggleTexts['positive'] : toggleTexts['negative']}
    </button>
  );
}

export default MirrorReflectionBtn;
