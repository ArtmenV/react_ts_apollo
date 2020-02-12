import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type LikeMutationMutationVariables = {
  contextId: Types.Scalars['String']
};


export type LikeMutationMutation = (
  { __typename: 'RootMutationType' }
  & { createLike: Types.Maybe<(
    { __typename: 'Like' }
    & Pick<Types.Like, 'id'>
    & { context: Types.Maybe<{ __typename: 'Collection' } | { __typename: 'Comment' } | { __typename: 'Community' } | { __typename: 'Resource' } | { __typename: 'User' }> }
  )> }
);


export const LikeMutationDocument = gql`
    mutation likeMutation($contextId: String!) {
  createLike(contextId: $contextId) {
    id
    context {
      __typename
    }
  }
}
    `;
export type LikeMutationMutationFn = ApolloReactCommon.MutationFunction<LikeMutationMutation, LikeMutationMutationVariables>;
export type LikeMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LikeMutationMutation, LikeMutationMutationVariables>, 'mutation'>;

    export const LikeMutationComponent = (props: LikeMutationComponentProps) => (
      <ApolloReactComponents.Mutation<LikeMutationMutation, LikeMutationMutationVariables> mutation={LikeMutationDocument} {...props} />
    );
    
export type LikeMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LikeMutationMutation, LikeMutationMutationVariables> & TChildProps;
export function withLikeMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LikeMutationMutation,
  LikeMutationMutationVariables,
  LikeMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, LikeMutationMutation, LikeMutationMutationVariables, LikeMutationProps<TChildProps>>(LikeMutationDocument, {
      alias: 'likeMutation',
      ...operationOptions
    });
};

/**
 * __useLikeMutationMutation__
 *
 * To run a mutation, you first call `useLikeMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutationMutation, { data, loading, error }] = useLikeMutationMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *   },
 * });
 */
export function useLikeMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LikeMutationMutation, LikeMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<LikeMutationMutation, LikeMutationMutationVariables>(LikeMutationDocument, baseOptions);
      }
export type LikeMutationMutationHookResult = ReturnType<typeof useLikeMutationMutation>;
export type LikeMutationMutationResult = ApolloReactCommon.MutationResult<LikeMutationMutation>;
export type LikeMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<LikeMutationMutation, LikeMutationMutationVariables>;


export interface LikeMutationMutationOperation {
  operationName: 'likeMutation'
  result: LikeMutationMutation
  variables: LikeMutationMutationVariables
  type: 'mutation'
}
