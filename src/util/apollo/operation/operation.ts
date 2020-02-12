import { ApolloLink, FetchResult, Operation } from 'apollo-link';
import {
  OperationDefinitionNode,
  OperationTypeNode,
  FieldNode,
  DocumentNode
} from 'graphql';
import {
  OperationDef,
  OpRequestHandler,
  Result,
  VarsOperation,
  Name
} from './types';

export function isOp<D extends OperationDef>(
  operationName: Name<D>,
  operation: Operation
): operation is VarsOperation<D> {
  return operation.operationName === operationName;
}

export class ApolloLinkOp<D extends OperationDef> extends ApolloLink {
  constructor(operationName: Name<D>, reqHandl: OpRequestHandler<D>) {
    super((operation, nextLink) => {
      if (isOp<D>(operationName, operation)) {
        return reqHandl(operation, nextLink);
      } else {
        return nextLink(operation);
      }
    });
  }
}

export const apolloLinkOp = <D extends OperationDef>(
  operationName: Name<D>,
  reqHandl: OpRequestHandler<D>
) => new ApolloLinkOp<D>(operationName, reqHandl);

export type OpFetchResult<D extends OperationDef> = FetchResult<Result<D>>;
export type OpResultWatcher<D extends OperationDef> = (
  result: OpFetchResult<D>
) => OpFetchResult<D> | undefined | void;
export const apolloLinkOpResult = <D extends OperationDef>(
  operationName: Name<D>,
  watcher: OpResultWatcher<D>
) =>
  apolloLinkOp<D>(operationName, (op, next) =>
    next(op).map(resp => {
      const watcherResp = watcher(resp);
      return typeof watcherResp === 'undefined' ? resp : watcherResp;
    })
  );

export const getOpType = (op: Operation) => {
  const maybeOpDefNode = op.query.definitions.find<OperationDefinitionNode>(
    (def): def is OperationDefinitionNode =>
      def.kind === 'OperationDefinition' &&
      !!def.name &&
      def.name.value === op.operationName
  );

  return maybeOpDefNode && maybeOpDefNode.operation;
};

export const getOperationNameAndType = <OperationName extends string = string>(
  query: DocumentNode
): [OperationName, OperationTypeNode] | [] => {
  const opDefNodes = query.definitions.filter(
    (def): def is OperationDefinitionNode => def.kind === 'OperationDefinition'
  );

  const maybeOperationNameAndType = opDefNodes.reduce<
    [OperationName, OperationTypeNode] | null
  >((found, opDefNode) => {
    if (!found) {
      const maybeFieldNode =
        opDefNode.selectionSet.selections.find(
          (selNode): selNode is FieldNode => selNode.kind === 'Field'
        ) || null;
      const opType = opDefNode.operation;
      found =
        maybeFieldNode &&
        ([maybeFieldNode.name.value, opType] as [
          OperationName,
          OperationTypeNode
        ]);
    }
    return found;
  }, null);

  return maybeOperationNameAndType || [];
};
