import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type DeleteMutationMutationVariables = {
  contextId: Types.Scalars['String']
};


export type DeleteMutationMutation = (
  { __typename: 'RootMutationType' }
  & { delete: Types.Maybe<{ __typename: 'Collection' } | { __typename: 'Comment' } | { __typename: 'Community' } | { __typename: 'Feature' } | { __typename: 'Follow' } | { __typename: 'Like' } | { __typename: 'Resource' } | { __typename: 'Thread' } | { __typename: 'User' }> }
);


export const DeleteMutationDocument = gql`
    mutation deleteMutation($contextId: String!) {
  delete(contextId: $contextId) {
    __typename
  }
}
    `;
export type DeleteMutationMutationFn = ApolloReactCommon.MutationFunction<DeleteMutationMutation, DeleteMutationMutationVariables>;
export type DeleteMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteMutationMutation, DeleteMutationMutationVariables>, 'mutation'>;

    export const DeleteMutationComponent = (props: DeleteMutationComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteMutationMutation, DeleteMutationMutationVariables> mutation={DeleteMutationDocument} {...props} />
    );
    
export type DeleteMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteMutationMutation, DeleteMutationMutationVariables> & TChildProps;
export function withDeleteMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteMutationMutation,
  DeleteMutationMutationVariables,
  DeleteMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteMutationMutation, DeleteMutationMutationVariables, DeleteMutationProps<TChildProps>>(DeleteMutationDocument, {
      alias: 'deleteMutation',
      ...operationOptions
    });
};

/**
 * __useDeleteMutationMutation__
 *
 * To run a mutation, you first call `useDeleteMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMutationMutation, { data, loading, error }] = useDeleteMutationMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *   },
 * });
 */
export function useDeleteMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMutationMutation, DeleteMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteMutationMutation, DeleteMutationMutationVariables>(DeleteMutationDocument, baseOptions);
      }
export type DeleteMutationMutationHookResult = ReturnType<typeof useDeleteMutationMutation>;
export type DeleteMutationMutationResult = ApolloReactCommon.MutationResult<DeleteMutationMutation>;
export type DeleteMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMutationMutation, DeleteMutationMutationVariables>;


export interface DeleteMutationMutationOperation {
  operationName: 'deleteMutation'
  result: DeleteMutationMutation
  variables: DeleteMutationMutationVariables
  type: 'mutation'
}
