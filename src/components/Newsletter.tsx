import Image from 'next/image';
import { GiRobotGolem } from 'react-icons/gi';
import { GiArtificialHive } from 'react-icons/gi';
import smallRobot from '@/components/small-robot.png';
import EmailInput from './EmailInput';

function Newsletter() {
  return (
    <div className="mt-32 flex w-full">
      <section className="relative w-full pb-10 pt-20 md:pb-20">
        <GiArtificialHive className="absolute left-5 top-5 text-6xl text-teal-700" />
        <div className="relative mt-5 items-center justify-between gap-12 px-4 md:flex md:px-8">
          <h3 className="max-w-[60%] font-bold md:max-w-[80%]">
            <div className="text-xl text-gray-700 md:text-2xl">
              現在訂閱電子報，獲取最新 AI 智能應用的第一手資訊吧。
            </div>
            <div className="mt-7 text-2xl text-gray-700 md:text-3xl">
              一起讓 AI 成為你人生的助力吧！
            </div>
          </h3>

          <div className="mt-6 md:mt-0">
            <EmailInput />
          </div>
        </div>
        <div
          className="absolute inset-0 -z-10 h-full w-full rounded-3xl"
          style={{
            background:
              'linear-gradient(to left, rgb(153, 246, 228), rgb(217, 249, 157))',
          }}>
          <div className="mb-3 hidden text-lg text-gray-500 md:absolute md:bottom-0 md:right-8 md:flex">
            <GiRobotGolem className="text-6xl text-indigo-700" />
            <div className="ml-5 flex items-end">
              Know what AI can do, and make AI do things for you.
            </div>
          </div>
        </div>

        <Image
          className="absolute bottom-3 right-10 -z-10 md:bottom-16"
          src={smallRobot}
          width={200}
          height={200}
          alt=""
        />
      </section>
    </div>
  );
}

export default Newsletter;
