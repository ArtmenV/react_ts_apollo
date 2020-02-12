import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type FollowMutationMutationVariables = {
  contextId: Types.Scalars['String']
};


export type FollowMutationMutation = (
  { __typename: 'RootMutationType' }
  & { createFollow: Types.Maybe<(
    { __typename: 'Follow' }
    & Pick<Types.Follow, 'id'>
  )> }
);


export const FollowMutationDocument = gql`
    mutation followMutation($contextId: String!) {
  createFollow(contextId: $contextId) {
    id
  }
}
    `;
export type FollowMutationMutationFn = ApolloReactCommon.MutationFunction<FollowMutationMutation, FollowMutationMutationVariables>;
export type FollowMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<FollowMutationMutation, FollowMutationMutationVariables>, 'mutation'>;

    export const FollowMutationComponent = (props: FollowMutationComponentProps) => (
      <ApolloReactComponents.Mutation<FollowMutationMutation, FollowMutationMutationVariables> mutation={FollowMutationDocument} {...props} />
    );
    
export type FollowMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<FollowMutationMutation, FollowMutationMutationVariables> & TChildProps;
export function withFollowMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FollowMutationMutation,
  FollowMutationMutationVariables,
  FollowMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, FollowMutationMutation, FollowMutationMutationVariables, FollowMutationProps<TChildProps>>(FollowMutationDocument, {
      alias: 'followMutation',
      ...operationOptions
    });
};

/**
 * __useFollowMutationMutation__
 *
 * To run a mutation, you first call `useFollowMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutationMutation, { data, loading, error }] = useFollowMutationMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *   },
 * });
 */
export function useFollowMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FollowMutationMutation, FollowMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<FollowMutationMutation, FollowMutationMutationVariables>(FollowMutationDocument, baseOptions);
      }
export type FollowMutationMutationHookResult = ReturnType<typeof useFollowMutationMutation>;
export type FollowMutationMutationResult = ApolloReactCommon.MutationResult<FollowMutationMutation>;
export type FollowMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<FollowMutationMutation, FollowMutationMutationVariables>;


export interface FollowMutationMutationOperation {
  operationName: 'followMutation'
  result: FollowMutationMutation
  variables: FollowMutationMutationVariables
  type: 'mutation'
}
