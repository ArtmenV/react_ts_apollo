import React from 'react';
import store from '../../redux/store';
import { createContext } from 'react';

export type StoreContextT = ReturnType<typeof store>;
export const StoreContext = createContext<StoreContextT>({} as StoreContextT);

interface Props {
  store: StoreContextT;
}
export const ProvideStoreCtx: React.FC<Props> = ({ children, store }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
