import * as Types from '../../../graphql/types.generated';

import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type GetCommunityForEditQueryVariables = {
  communityId: Types.Scalars['String']
};


export type GetCommunityForEditQuery = (
  { __typename: 'RootQueryType' }
  & { community: Types.Maybe<(
    { __typename: 'Community' }
    & Pick<Types.Community, 'id' | 'name' | 'summary' | 'icon'>
  )> }
);


export const GetCommunityForEditDocument = gql`
    query getCommunityForEdit($communityId: String!) {
  community(communityId: $communityId) {
    id
    name
    summary
    icon
  }
}
    `;
export type GetCommunityForEditComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCommunityForEditQuery, GetCommunityForEditQueryVariables>, 'query'> & ({ variables: GetCommunityForEditQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetCommunityForEditComponent = (props: GetCommunityForEditComponentProps) => (
      <ApolloReactComponents.Query<GetCommunityForEditQuery, GetCommunityForEditQueryVariables> query={GetCommunityForEditDocument} {...props} />
    );
    
export type GetCommunityForEditProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetCommunityForEditQuery, GetCommunityForEditQueryVariables> & TChildProps;
export function withGetCommunityForEdit<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetCommunityForEditQuery,
  GetCommunityForEditQueryVariables,
  GetCommunityForEditProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetCommunityForEditQuery, GetCommunityForEditQueryVariables, GetCommunityForEditProps<TChildProps>>(GetCommunityForEditDocument, {
      alias: 'getCommunityForEdit',
      ...operationOptions
    });
};

/**
 * __useGetCommunityForEditQuery__
 *
 * To run a query within a React component, call `useGetCommunityForEditQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommunityForEditQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommunityForEditQuery({
 *   variables: {
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useGetCommunityForEditQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCommunityForEditQuery, GetCommunityForEditQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCommunityForEditQuery, GetCommunityForEditQueryVariables>(GetCommunityForEditDocument, baseOptions);
      }
export function useGetCommunityForEditLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCommunityForEditQuery, GetCommunityForEditQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCommunityForEditQuery, GetCommunityForEditQueryVariables>(GetCommunityForEditDocument, baseOptions);
        }
export type GetCommunityForEditQueryHookResult = ReturnType<typeof useGetCommunityForEditQuery>;
export type GetCommunityForEditLazyQueryHookResult = ReturnType<typeof useGetCommunityForEditLazyQuery>;
export type GetCommunityForEditQueryResult = ApolloReactCommon.QueryResult<GetCommunityForEditQuery, GetCommunityForEditQueryVariables>;


export interface GetCommunityForEditQueryOperation {
  operationName: 'getCommunityForEdit'
  result: GetCommunityForEditQuery
  variables: GetCommunityForEditQueryVariables
  type: 'query'
}
