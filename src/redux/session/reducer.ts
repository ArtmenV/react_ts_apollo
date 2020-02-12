import * as Sess from '../session';
import { Reducer } from 'redux';

export const defaultInitialState: Sess.State = {
  me: null
};

export const reducer = (
  initialState = defaultInitialState
): Reducer<Sess.State> => (old = initialState, action) => {
  if (Sess.login.is(action)) {
    return {
      me: action.payload
    };
  } else if (Sess.logout.is(action)) {
    return {
      me: null
    };
  }
  return old;
};
