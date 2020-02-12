import * as Types from './types.generated';

import { BasicCommunityFragment } from './fragments/basicCommunity.generated';
import gql from 'graphql-tag';
import { BasicCommunityFragmentDoc } from './fragments/basicCommunity.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


export type CreateCommunityMutationMutationVariables = {
  community: Types.CommunityInput
};


export type CreateCommunityMutationMutation = (
  { __typename: 'RootMutationType' }
  & { createCommunity: Types.Maybe<(
    { __typename: 'Community' }
    & BasicCommunityFragment
  )> }
);


export const CreateCommunityMutationDocument = gql`
    mutation createCommunityMutation($community: CommunityInput!) {
  createCommunity(community: $community) {
    ...BasicCommunity
  }
}
    ${BasicCommunityFragmentDoc}`;
export type CreateCommunityMutationMutationFn = ApolloReactCommon.MutationFunction<CreateCommunityMutationMutation, CreateCommunityMutationMutationVariables>;
export type CreateCommunityMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateCommunityMutationMutation, CreateCommunityMutationMutationVariables>, 'mutation'>;

    export const CreateCommunityMutationComponent = (props: CreateCommunityMutationComponentProps) => (
      <ApolloReactComponents.Mutation<CreateCommunityMutationMutation, CreateCommunityMutationMutationVariables> mutation={CreateCommunityMutationDocument} {...props} />
    );
    
export type CreateCommunityMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateCommunityMutationMutation, CreateCommunityMutationMutationVariables> & TChildProps;
export function withCreateCommunityMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateCommunityMutationMutation,
  CreateCommunityMutationMutationVariables,
  CreateCommunityMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateCommunityMutationMutation, CreateCommunityMutationMutationVariables, CreateCommunityMutationProps<TChildProps>>(CreateCommunityMutationDocument, {
      alias: 'createCommunityMutation',
      ...operationOptions
    });
};

/**
 * __useCreateCommunityMutationMutation__
 *
 * To run a mutation, you first call `useCreateCommunityMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommunityMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommunityMutationMutation, { data, loading, error }] = useCreateCommunityMutationMutation({
 *   variables: {
 *      community: // value for 'community'
 *   },
 * });
 */
export function useCreateCommunityMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCommunityMutationMutation, CreateCommunityMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCommunityMutationMutation, CreateCommunityMutationMutationVariables>(CreateCommunityMutationDocument, baseOptions);
      }
export type CreateCommunityMutationMutationHookResult = ReturnType<typeof useCreateCommunityMutationMutation>;
export type CreateCommunityMutationMutationResult = ApolloReactCommon.MutationResult<CreateCommunityMutationMutation>;
export type CreateCommunityMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCommunityMutationMutation, CreateCommunityMutationMutationVariables>;


export interface CreateCommunityMutationMutationOperation {
  operationName: 'createCommunityMutation'
  result: CreateCommunityMutationMutation
  variables: CreateCommunityMutationMutationVariables
  type: 'mutation'
}
