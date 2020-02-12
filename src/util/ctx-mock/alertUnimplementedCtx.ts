import { abstractProxy } from './abstractProxy';

export const alertUnimplementedCtx = <T>(name: string) =>
  abstractProxy<T>(prop =>
    alert(
      `ALERT: CTX [ ${name} ]
    access to unimplemented ctx prop [${typeof prop}] : ${String(prop)}
    `
    )
  );
