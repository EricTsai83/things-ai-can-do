interface Category {
  id: number;
  title: string;
  desc: string;
  subject: string;
  class: string;
  sampleImgQuery: string;
}

interface Categories {
  [key: string]: Category[];
}

const categories: Categories = {
  picture: [
    {
      id: 1,
      title: '範例 1',
      desc: '多個人臉',
      subject: '黃仁勳與蘇姿丰',
      class: '照片',
      sampleImgQuery: '?img=sample-img-1',
    },
    {
      id: 2,
      title: '範例 2',
      desc: '單一人臉',
      subject: 'AWS 範例圖',
      class: '照片',
      sampleImgQuery: '?img=sample-img-2',
    },
  ],
  avatar: [
    {
      id: 1,
      title: '搖滾巨星',
      desc: '男',
      subject: '永遠年輕，永遠熱淚盈眶',
      class: '虛擬人像',
      sampleImgQuery: '?gender=man&age=40',
    },
    {
      id: 2,
      title: '時尚達人',
      desc: '女',
      subject: '我就是時尚的代言人',
      class: '虛擬人像',
      sampleImgQuery: '?gender=woman&age=36',
    },
    {
      id: 3,
      title: '傑出青年',
      desc: '男',
      subject: '我不去和別人比較，我要創造自己的歷史，繼續超越自己',
      class: '虛擬人像',
      sampleImgQuery: '?gender=man&age=28',
    },
    {
      id: 4,
      title: '傑出女性',
      desc: '女',
      subject: '權力不是被給予的，而是自己爭取來的',
      class: '虛擬人像',
      sampleImgQuery: '?gender=woman&age=18',
    },
  ],
};

export default categories;
