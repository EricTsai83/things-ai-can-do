import { render, screen } from '@testing-library/react';
import SideNavbar from '../SideNavbar';

describe('(component) SideNavbar', () => {
  interface Links {
    name: string;
    url: string;
  }
  const links: Links[] = [
    { name: '首頁', url: '/' },
    {
      name: '臉部識別',
      url: '/playground/facial-recognition',
    },
    { name: '聊天機器人', url: '/playground/chat-gpt' },
    {
      name: '文字生成圖片',
      url: '/playground/text-to-image',
    },
    {
      name: '圖像分割',
      url: '/playground/image-segmentation',
    },
    {
      name: '圖片分類',
      url: '/playground/image-classification',
    },
    { name: '資料科學', url: '/library/data-science' },
    { name: '訂閱電子報', url: '/newsletter' },
  ];

  test.each(links)('should renders 首頁 link correctly', (obj) => {
    render(<SideNavbar />);
    const linkElement = screen.getByRole('link', { name: obj.name });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toBe(`${obj.url}`);
  });
});
