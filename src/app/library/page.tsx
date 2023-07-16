import PageTitle from '@/components/PageTitle';
import Image from 'next/image';
import { SiAlwaysdata } from 'react-icons/si';
import dataScience from './img/data-science.jpg';
import dataVisualization from './img/data-visualization.jpg';
import nlp from './img/NLP.jpg';
import parallelComputing from './img/parallel-computing.webp';
import pandas from './img/pandas.webp';

import Link from 'next/link';

function CardWithSliderInfoCover() {
  const articles = [
    {
      img: dataScience,
      url: 'https://medium.com/@erictsai492718/透過-bias-和-variance-判斷模型是否有overfitting-或-underfitting-4294284e54a7',
      title: '資料科學',
      hashTag: '#機器學習、#統計學、#Python',
      desc: `最近在上 Coursera 的課程，裡面提到了用 Bias 和 Variance
      去辨別是否有 overfitting 和
      underfitting，沒有用明確指標去輔助模型的建置...`,
    },
    {
      img: dataVisualization,
      url: 'https://medium.com/geekculture/create-an-interactive-report-by-using-plotly-981a513fdec4',
      title: '資料視覺化',
      hashTag: '#資料視覺化、#plotly',
      desc: `
        If your company doesn’t want to develop a dashboard
        but needs you to monitor complex data for a long time.
        Maybe this is a way to help you...`,
    },
    {
      img: nlp,
      url: 'https://erictsai492718.medium.com/exploratory-data-analysis-with-nlp-project-6f8c31aae2f1',
      title: '自然語言處理',
      hashTag: '#NLP、#EDA',
      desc: `
      I hope this article can help someone who interesting in 
      natural language processing (NLP)...`,
    },
    {
      img: parallelComputing,
      url: 'https://erictsai492718.medium.com/understanding-python-multithreading-and-multiprocessing-by-visualization-41e529f2da6a',
      title: '平行運算',
      hashTag: '#multiprocessing、#multithreading',
      desc: `
      I think the direct reason is we can use computational resources sufficiently on our
      machines. It is meant to reduce the overall processing time. But not every task is
      suitable for parallel processing. Even it is feasible, ways of parallel processing
      have different timing to apply...`,
    },

    {
      img: pandas,
      url: 'https://medium.com/@erictsai492718/使用-pandas-dataframe-常用的-26-個基本技巧-acf83105dcf4',
      title: '資料處理',
      hashTag: '#dataframe、#pandas',
      desc: `
      本篇文章主要分四個部分，第一個部分是 dataframe 的基本操作，第二是過濾資料或找特定資料的方法，
      第三是 dataframe 資料分組的操作，最後一個部分則是我個人常用到的資料處理技巧...`,
    },
  ];
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
      <div className="flex flex-wrap items-center justify-center gap-10">
        {articles.map((article) => {
          return (
            <div className="group relative h-80 w-[500px] overflow-hidden rounded-3xl border-4 border-teal-600">
              <Image
                className="h-full w-full rounded-2xl object-cover"
                src={article.img}
                width={0}
                height={0}
                alt=""
              />
              <div
                className="
            absolute -right-full top-0 flex h-full w-full
            flex-col justify-center rounded-2xl bg-sky-900/60 p-7
          text-white backdrop-blur-md backdrop-sepia-0 duration-1000 ease-in-out
            group-hover:right-0">
                <h1 className="text-3xl font-bold">{article.title}</h1>
                <p className="text-sm">{article.hashTag}</p>
                <p className="my-5 leading-7">{article.desc}</p>
                <div className="flex justify-center">
                  <Link target="_blank" href={article.url}>
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

export default CardWithSliderInfoCover;
