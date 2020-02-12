import { ApolloLink } from 'apollo-link';
import { createContext, useContext, useEffect, useMemo } from 'react';
import {
  apolloLinkOp,
  apolloLinkOpResult,
  Name,
  OperationDef,
  OpRequestHandler,
  OpResultWatcher
} from '../operation';
export interface DynamicLinkSrv {
  addLink: (link: ApolloLink) => () => void;
  addLinkOpResult: <D extends OperationDef>(
    operationName: Name<D>,
    resWatcher: OpResultWatcher<D>
  ) => () => void;
  addLinkOp: <D extends OperationDef>(
    operationName: D['operationName'],
    reqHandl: OpRequestHandler<D>
  ) => () => void;
}

export const ApolloDynamicLinkContext = createContext<DynamicLinkSrv>(
  {} as DynamicLinkSrv
);
export const useDynamicLink = (link: ApolloLink, deps = []) => {
  const dynLinkCtx = useContext(ApolloDynamicLinkContext);
  const unsubscribe = useMemo(() => dynLinkCtx.addLink(link), [
    dynLinkCtx.addLink,
    ...deps
  ]);

  useEffect(() => unsubscribe, [unsubscribe]);
  return unsubscribe;
};

export const useDynamicLinkOpResult = <D extends OperationDef>(
  opName: Name<D>,
  resWatcher: OpResultWatcher<D>,
  deps: any[] = []
) => {
  const dynLinkCtx = useContext(ApolloDynamicLinkContext);
  const unsubscribe = useMemo(
    () => dynLinkCtx.addLinkOpResult(opName, resWatcher),
    [dynLinkCtx.addLink, ...deps]
  );

  useEffect(() => unsubscribe, [unsubscribe]);
  return unsubscribe;
};

export const createDynamicLinkEnv = () => {
  const dynamicLinksSet = new Set<ApolloLink>();

  const link = new ApolloLink((operation, nextLink) =>
    ApolloLink.from(Array.from(dynamicLinksSet)).request(operation, nextLink)
  );

  const addLink = (link: ApolloLink) => {
    dynamicLinksSet.add(link);
    return () => {
      dynamicLinksSet.delete(link);
    };
  };

  const addLinkOpResult = <D extends OperationDef>(
    operationName: Name<D>,
    resWatcher: OpResultWatcher<D>
  ) => addLink(apolloLinkOpResult<D>(operationName, resWatcher));

  const addLinkOp = <D extends OperationDef>(
    operationName: Name<D>,
    reqHandl: OpRequestHandler<D>
  ) => addLink(apolloLinkOp<D>(operationName, reqHandl));

  const srv: DynamicLinkSrv = {
    addLink,
    addLinkOpResult,
    addLinkOp
  };

  return {
    srv,
    link
  };
};
