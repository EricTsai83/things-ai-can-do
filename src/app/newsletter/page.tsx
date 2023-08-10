import Image from 'next/image';
import { GiArtificialHive, GiRobotGolem } from 'react-icons/gi';
import EmailInput from './components/EmailInput';
import robotPeekImg from './robot-peek.png';

function Page() {
  return (
    <div
      className="
        flex h-[calc(100vh-64px)] w-screen flex-col items-center justify-center
        px-4 pt-24 ssm:px-16 xl:w-[calc(100vw-240px)]">
      <div className="w-full max-w-3xl">
        <section className="relative py-24">
          <GiArtificialHive className="absolute left-5 top-5 text-6xl text-teal-700" />
          <div className="relative mx-auto mt-5 max-w-screen-2xl items-center justify-between gap-10 px-8 md:flex">
            <div className="max-w-[90%] md:max-w-none">
              <h3 className="text-3xl font-bold">
                <div className="text-lg text-gray-700 ssm:text-xl md:text-2xl">
                  現在訂閱電子報，即時獲取 AI 應用的第一手資訊。
                </div>
                <div className="mt-5 text-lg text-gray-700 ssm:text-2xl md:text-3xl">
                  一起讓 AI 成為你人生的助力吧！
                </div>
              </h3>
            </div>
            <div className="mt-5 min-w-[45%] md:mt-0">
              <EmailInput />
            </div>
          </div>
          <div
            className="absolute inset-0 -z-10 h-full w-full rounded-3xl"
            style={{
              background:
                'linear-gradient(to right, rgb(153, 246, 228), rgb(217, 249, 157))',
            }}>
            <div className="absolute bottom-1 right-0 px-5 text-lg text-gray-500">
              <div className="my-3 flex">
                <GiRobotGolem className="text-6xl text-indigo-700" />
                <div className="ml-5 hidden items-end ssm:flex">
                  Know what AI can do, and make AI do things for you.
                </div>
              </div>
            </div>
          </div>
          <Image
            className="absolute right-0 top-0 -z-10 hidden translate-x-52 ssm:block"
            src={robotPeekImg}
            width={300}
            height={300}
            alt="newsletter's decorated image"
          />
        </section>
      </div>
    </div>
  );
}

export default Page;
