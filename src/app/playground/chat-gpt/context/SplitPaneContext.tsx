import { createContext } from 'react';

interface SplitPaneContextProps {
  clientHeight: number | null;
  setClientHeight: React.Dispatch<React.SetStateAction<number | null>>;
  clientWidth: number | null;
  setClientWidth: React.Dispatch<React.SetStateAction<number | null>>;
  onMouseHoldDown: React.MouseEventHandler;
}

const SplitPaneContext = createContext<SplitPaneContextProps>(
  {} as SplitPaneContextProps,
);

export default SplitPaneContext;
