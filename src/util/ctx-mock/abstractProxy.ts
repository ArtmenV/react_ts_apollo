export interface AccessHandler {
  (prop: string | number | symbol): any;
}
export const abstractProxy = <T>(accessHandler: AccessHandler): T =>
  //@ts-ignore
  new Proxy(
    {},
    {
      get: (_target, prop) => accessHandler(prop)
    }
  );
