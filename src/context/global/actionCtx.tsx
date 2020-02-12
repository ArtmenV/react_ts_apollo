import React, { useContext } from 'react';
import { createContext } from 'react';
import { StoreContext } from './storeCtx';

export interface ActionContextT {
  dispatch: (_: any) => unknown;
}
export const ActionContext = createContext<ActionContextT>(
  {} as ActionContextT
);

export const ProvideActionCtx: React.FC = ({ children }) => {
  const { dispatch } = useContext(StoreContext);
  return (
    <ActionContext.Provider value={{ dispatch }}>
      {children}
    </ActionContext.Provider>
  );
};
