import Image from 'next/image';
import Link from 'next/link';
import subjectImages from '../subjectImages';

interface Props {
  subject: string | null;
}

function Animated3dFlipCard({ subject }: Props) {
  return (
    <div className="group h-full w-full cursor-pointer bg-transparent perspective">
      <div className="relative h-full w-full duration-700 preserve-3d group-hover:my-rotate-y-180">
        <div className="absolute h-full w-full border-2 backface-hidden">
          {subject && (
            <Image
              className="h-full w-full"
              src={subjectImages[subject]}
              alt=""
              width={100}
              height={100}
            />
          )}
        </div>
        <div className="absolute h-full w-full overflow-hidden bg-gray-100 my-rotate-y-180 backface-hidden">
          <div className="flex h-full flex-col items-center justify-center px-2 pb-12 text-center text-gray-800">
            <h1 className="text-2xl font-medium text-teal-600">{subject}</h1>

            <Link
              target="_blank"
              rel="noreferrer noopenner"
              href={`https://www.google.com/search?q=${subject}&tbm=isch`}
              className="
                absolute -bottom-20 scale-0 rounded-full bg-teal-500 px-6 py-2
                font-semibold text-white delay-300 duration-700 
                group-hover:bottom-10 group-hover:scale-100">
              Google 搜尋
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Animated3dFlipCard;
