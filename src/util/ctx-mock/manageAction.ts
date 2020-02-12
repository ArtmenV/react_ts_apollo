import { abstractProxy } from './abstractProxy';
import { stringifyAction } from './stringifyAction';

export interface Shower {
  (_: string): unknown;
}
export const showAction = <T>(shower: Shower) =>
  abstractProxy<T>(prop => (...args: any[]) =>
    shower(stringifyAction(prop, ...args))
  );
