import * as Types from './types.generated';

import { BasicResourceFragment } from './fragments/basicResource.generated';
import gql from 'graphql-tag';
import { BasicResourceFragmentDoc } from './fragments/basicResource.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


export type CreateResourceMutationMutationVariables = {
  collectionId: Types.Scalars['String'],
  resource: Types.ResourceInput
};


export type CreateResourceMutationMutation = (
  { __typename: 'RootMutationType' }
  & { createResource: Types.Maybe<(
    { __typename: 'Resource' }
    & BasicResourceFragment
  )> }
);


export const CreateResourceMutationDocument = gql`
    mutation createResourceMutation($collectionId: String!, $resource: ResourceInput!) {
  createResource(collectionId: $collectionId, resource: $resource) {
    ...BasicResource
  }
}
    ${BasicResourceFragmentDoc}`;
export type CreateResourceMutationMutationFn = ApolloReactCommon.MutationFunction<CreateResourceMutationMutation, CreateResourceMutationMutationVariables>;
export type CreateResourceMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateResourceMutationMutation, CreateResourceMutationMutationVariables>, 'mutation'>;

    export const CreateResourceMutationComponent = (props: CreateResourceMutationComponentProps) => (
      <ApolloReactComponents.Mutation<CreateResourceMutationMutation, CreateResourceMutationMutationVariables> mutation={CreateResourceMutationDocument} {...props} />
    );
    
export type CreateResourceMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateResourceMutationMutation, CreateResourceMutationMutationVariables> & TChildProps;
export function withCreateResourceMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateResourceMutationMutation,
  CreateResourceMutationMutationVariables,
  CreateResourceMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateResourceMutationMutation, CreateResourceMutationMutationVariables, CreateResourceMutationProps<TChildProps>>(CreateResourceMutationDocument, {
      alias: 'createResourceMutation',
      ...operationOptions
    });
};

/**
 * __useCreateResourceMutationMutation__
 *
 * To run a mutation, you first call `useCreateResourceMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateResourceMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createResourceMutationMutation, { data, loading, error }] = useCreateResourceMutationMutation({
 *   variables: {
 *      collectionId: // value for 'collectionId'
 *      resource: // value for 'resource'
 *   },
 * });
 */
export function useCreateResourceMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateResourceMutationMutation, CreateResourceMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateResourceMutationMutation, CreateResourceMutationMutationVariables>(CreateResourceMutationDocument, baseOptions);
      }
export type CreateResourceMutationMutationHookResult = ReturnType<typeof useCreateResourceMutationMutation>;
export type CreateResourceMutationMutationResult = ApolloReactCommon.MutationResult<CreateResourceMutationMutation>;
export type CreateResourceMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateResourceMutationMutation, CreateResourceMutationMutationVariables>;


export interface CreateResourceMutationMutationOperation {
  operationName: 'createResourceMutation'
  result: CreateResourceMutationMutation
  variables: CreateResourceMutationMutationVariables
  type: 'mutation'
}
