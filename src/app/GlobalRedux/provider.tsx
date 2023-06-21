// 因為 next.js 13 之後，所有 component 預設都變成 client side，所以不能直接在 layout 那邊加 provider
// 因此在這裡我們要建一個 client side 的 component `Providers` 去替代 redux 的 `Provider`
'use client';

import { Provider } from 'react-redux';
import { store } from './store';

export function ReduxProviders({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}
