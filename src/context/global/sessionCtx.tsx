import React, { useContext } from 'react';
import { State as SessionState } from '../../redux/session';
import { createContext } from 'react';
import { StateContext } from './stateCtx';

export type SessionContextT = SessionState;

export const SessionContext = createContext<SessionContextT>({ me: null });

export const ProvideSessionCtx: React.FC = ({ children }) => {
  const { session } = useContext(StateContext);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
