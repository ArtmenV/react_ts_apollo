import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type FetchResourceMutationVariables = {
  url: Types.Scalars['String']
};


export type FetchResourceMutation = (
  { __typename: 'RootMutationType' }
  & { fetchWebMetadata: Types.Maybe<(
    { __typename: 'WebMetadata' }
    & Pick<Types.WebMetadata, 'image' | 'title' | 'author' | 'source' | 'resourceType' | 'summary' | 'embedCode' | 'language'>
  )> }
);


export const FetchResourceDocument = gql`
    mutation fetchResource($url: String!) {
  fetchWebMetadata(url: $url) {
    image
    title
    author
    source
    resourceType
    summary
    embedCode
    language
  }
}
    `;
export type FetchResourceMutationFn = ApolloReactCommon.MutationFunction<FetchResourceMutation, FetchResourceMutationVariables>;
export type FetchResourceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<FetchResourceMutation, FetchResourceMutationVariables>, 'mutation'>;

    export const FetchResourceComponent = (props: FetchResourceComponentProps) => (
      <ApolloReactComponents.Mutation<FetchResourceMutation, FetchResourceMutationVariables> mutation={FetchResourceDocument} {...props} />
    );
    
export type FetchResourceProps<TChildProps = {}> = ApolloReactHoc.MutateProps<FetchResourceMutation, FetchResourceMutationVariables> & TChildProps;
export function withFetchResource<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FetchResourceMutation,
  FetchResourceMutationVariables,
  FetchResourceProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, FetchResourceMutation, FetchResourceMutationVariables, FetchResourceProps<TChildProps>>(FetchResourceDocument, {
      alias: 'fetchResource',
      ...operationOptions
    });
};

/**
 * __useFetchResourceMutation__
 *
 * To run a mutation, you first call `useFetchResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFetchResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fetchResourceMutation, { data, loading, error }] = useFetchResourceMutation({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useFetchResourceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FetchResourceMutation, FetchResourceMutationVariables>) {
        return ApolloReactHooks.useMutation<FetchResourceMutation, FetchResourceMutationVariables>(FetchResourceDocument, baseOptions);
      }
export type FetchResourceMutationHookResult = ReturnType<typeof useFetchResourceMutation>;
export type FetchResourceMutationResult = ApolloReactCommon.MutationResult<FetchResourceMutation>;
export type FetchResourceMutationOptions = ApolloReactCommon.BaseMutationOptions<FetchResourceMutation, FetchResourceMutationVariables>;


export interface FetchResourceMutationOperation {
  operationName: 'fetchResource'
  result: FetchResourceMutation
  variables: FetchResourceMutationVariables
  type: 'mutation'
}
