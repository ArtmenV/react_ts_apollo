export const stringifyAction = (prop: any, ...args: any) => `:: ${String(
  prop
)} (
    ${args.map((_: any) => JSON.stringify(_, null, 2)).join(`\n`)}
    )`;
