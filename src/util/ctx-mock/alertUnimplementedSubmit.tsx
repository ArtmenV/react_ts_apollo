export const alertRejectUnimplementedService = (name: string) => (...args) => {
  const msg = `ALERT: access to unimplemented submitFnCtx [ ${name} ] :
args:${JSON.stringify(args, null, 2)}  
`;
  alert(msg);
  console.error(msg);
  return Promise.reject(msg);
};
