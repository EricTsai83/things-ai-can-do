import Image from 'next/image';
import Link from 'next/link';
import { SiAlwaysdata } from 'react-icons/si';
import PageTitle from '@/components/PageTitle';
import articles from './articles';

export const metadata = {
  title: 'Library',
};

function Page() {
  return (
    <div className="flex h-screen w-screen flex-col px-8 pt-24 xl:w-[calc(100vw-240px)]">
      <PageTitle
        title="資料科學"
        content="
          當我們提到資料科學時，我們指的是使用數據來發現規律、洞察趨勢，
          並從中找到有價值的資訊，以便做出聰明的決策。這包括探索和處理大量的數據，
          應用統計和機器學習技術，並用直觀的方式將結果呈現給其他人。
          資料科學在各個領域中扮演著重要角色，幫助我們更好地了解世界、改進業務，
          以及解決現實生活中的問題。以下蒐集了一些文章，提供想要深入了解資料科學的朋友們參考。">
        <div className="flex items-center justify-center gap-1">
          <SiAlwaysdata className="flex items-center justify-center text-4xl text-teal-700" />
        </div>
      </PageTitle>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-10">
        {articles.map((article, idx) => {
          return (
            <div
              key={idx}
              className="group relative h-80 w-[485px] overflow-hidden rounded-3xl border-4 border-teal-600">
              <Image
                className="h-full w-full rounded-2xl object-cover"
                src={article.img}
                width={0}
                height={0}
                alt={`${article.title}`}
              />
              <div
                className="
                  absolute -right-full top-0 flex h-full w-full
                  flex-col justify-center rounded-2xl bg-sky-900/60 p-7
                text-white backdrop-blur-md backdrop-sepia-0 duration-1000 ease-in-out
                  group-hover:right-0">
                <h1 className="text-xl font-bold ssm:text-3xl">
                  {article.title}
                </h1>
                <p className="text-sm">{article.hashTag}</p>
                <p className="hidden ssm:my-5 ssm:block ssm:leading-7">
                  {article.desc}
                </p>
                <div className="my-5 flex justify-center ssm:my-0">
                  <Link
                    target="_blank"
                    href={article.url}
                    rel="noreferrer noopenner">
                    <button className="cursor-pointer rounded bg-teal-600 px-5 py-2.5 font-medium text-white">
                      前往文章
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Page;
