import { createContext } from 'react';

interface contents {
  id: number;
  subject: string;
  description: string;
}

interface ContentContextProps {
  contents: contents[];
  currContent: number;
  setCurrContent: (quoteId: number) => void;
}

const ContentContext = createContext<ContentContextProps>(
  {} as ContentContextProps,
);

export default ContentContext;
