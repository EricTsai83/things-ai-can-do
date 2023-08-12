import dataScienceImg from './img/data-science.jpg';
import dataVisualizationImg from './img/data-visualization.jpg';
import nlpImg from './img/nlp.jpg';
import pandasImg from './img/pandas.webp';
import parallelComputingImg from './img/parallel-computing.webp';

const articles = [
  {
    img: dataScienceImg,
    url: 'https://medium.com/@erictsai492718/透過-bias-和-variance-判斷模型是否有overfitting-或-underfitting-4294284e54a7',
    title: '資料科學',
    hashTag: '#機器學習、#統計學、#Python',
    desc: `最近在上 Coursera 的課程，裡面提到了用 Bias 和 Variance
    去辨別是否有 overfitting 和
    underfitting，沒有用明確指標去輔助模型的建置...`,
  },
  {
    img: dataVisualizationImg,
    url: 'https://medium.com/geekculture/create-an-interactive-report-by-using-plotly-981a513fdec4',
    title: '資料視覺化',
    hashTag: '#資料視覺化、#plotly',
    desc: `
      If your company doesn’t want to develop a dashboard
      but needs you to monitor complex data for a long time.
      Maybe this is a way to help you...`,
  },
  {
    img: nlpImg,
    url: 'https://erictsai492718.medium.com/exploratory-data-analysis-with-nlp-project-6f8c31aae2f1',
    title: '自然語言處理',
    hashTag: '#NLP、#EDA',
    desc: `
    I hope this article can help someone who interesting in 
    natural language processing (NLP)...`,
  },
  {
    img: parallelComputingImg,
    url: 'https://erictsai492718.medium.com/understanding-python-multithreading-and-multiprocessing-by-visualization-41e529f2da6a',
    title: '平行運算',
    hashTag: '#multiprocessing、#multithreading',
    desc: `
    I think the direct reason is we can use computational resources sufficiently on our
    machines. It is meant to reduce the overall processing time. But not every task is
    suitable for parallel processing...`,
  },

  {
    img: pandasImg,
    url: 'https://medium.com/@erictsai492718/使用-pandas-dataframe-常用的-26-個基本技巧-acf83105dcf4',
    title: '資料處理',
    hashTag: '#dataframe、#pandas',
    desc: `
    本篇文章主要分四個部分，第一個部分是 dataframe 的基本操作，第二是過濾資料或找特定資料的方法，
    第三是 dataframe 資料分組的操作，最後一個部分則是我個人常用到的資料處理技巧...`,
  },
];

export default articles;
