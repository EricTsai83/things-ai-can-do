import { createContext } from 'react';

interface Quote {
  id: number;
  author: string;
  description: string;
}

interface QuoteContextProps {
  quotes: Quote[];
  currQuote: number;
  setCurrQuote: (quoteId: number) => void;
}

const QuoteContext = createContext<QuoteContextProps>({} as QuoteContextProps);

export default QuoteContext;
