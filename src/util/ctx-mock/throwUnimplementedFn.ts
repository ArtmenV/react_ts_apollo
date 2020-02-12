export const throwUnimplementedFn = <Fn extends (...args: any[]) => any>(
  name: string
): Fn =>
  ((() => {
    throw new Error(`FATAL: Function ${name} not implemented.`);
  }) as unknown) as Fn;
