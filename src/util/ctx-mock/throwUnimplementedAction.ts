import { abstractProxy } from './abstractProxy';

export const throwUnimplementedAction = <T>() =>
  abstractProxy<T>(prop => (...args: any[]) => {
    throw new Error(`ERROR: 
    call to unimplemented action prop [${typeof prop}] :

    ${String(prop)}

    with arguments

    ${args.join(`,`)}
    `);
  });
