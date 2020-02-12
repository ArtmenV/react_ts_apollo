import React, { useContext, useState, useEffect } from 'react';
import { createContext } from 'react';
import { StoreContext } from './storeCtx';
import { State } from '../../redux/store';

export type StateContextT = State;
export const StateContext = createContext<StateContextT>({} as StateContextT);

export const ProvideStateCtx: React.FC = ({ children }) => {
  const store = useContext(StoreContext);
  const [state, setState] = useState(store.getState());

  useEffect(() => store.subscribe(() => setState(store.getState())), [store]);
  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};
