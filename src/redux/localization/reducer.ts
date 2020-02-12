import * as Loc from '.';
import { Reducer } from 'redux';

export const makeReducer = (initialState: Loc.State): Reducer<Loc.State> => (
  old = initialState,
  action
) => {
  if (Loc.setLang.is(action)) {
    return {
      ...old,
      locale: action.payload
    };
  }
  return old;
};
