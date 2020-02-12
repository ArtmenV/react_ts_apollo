import * as Types from './types.generated';

import { BasicCollectionFragment } from './fragments/basicCollection.generated';
import gql from 'graphql-tag';
import { BasicCollectionFragmentDoc } from './fragments/basicCollection.generated';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


export type GetFollowedCollectionsQueryVariables = {
  limit?: Types.Maybe<Types.Scalars['Int']>,
  endColl?: Types.Maybe<Types.Scalars['String']>
};


export type GetFollowedCollectionsQuery = (
  { __typename: 'RootQueryType' }
  & { me: Types.Maybe<(
    { __typename: 'Me' }
    & { user: (
      { __typename: 'User' }
      & Pick<Types.User, 'id' | 'canonicalUrl'>
      & { followedCollections: Types.Maybe<(
        { __typename: 'FollowedCollectionsEdges' }
        & { pageInfo: Types.Maybe<(
          { __typename: 'PageInfo' }
          & Pick<Types.PageInfo, 'startCursor' | 'endCursor'>
        )>, edges: Array<Types.Maybe<(
          { __typename: 'FollowedCollectionsEdge' }
          & { node: (
            { __typename: 'FollowedCollection' }
            & { follow: (
              { __typename: 'Follow' }
              & Pick<Types.Follow, 'id' | 'canonicalUrl'>
            ), collection: (
              { __typename: 'Collection' }
              & BasicCollectionFragment
            ) }
          ) }
        )>> }
      )> }
    ) }
  )> }
);


export const GetFollowedCollectionsDocument = gql`
    query getFollowedCollections($limit: Int, $endColl: String) {
  me {
    user {
      id
      canonicalUrl
      followedCollections(limit: $limit, after: $endColl) {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          node {
            follow {
              id
              canonicalUrl
            }
            collection {
              __typename
              ... on Collection {
                ...BasicCollection
              }
            }
          }
        }
      }
    }
  }
}
    ${BasicCollectionFragmentDoc}`;
export type GetFollowedCollectionsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetFollowedCollectionsQuery, GetFollowedCollectionsQueryVariables>, 'query'>;

    export const GetFollowedCollectionsComponent = (props: GetFollowedCollectionsComponentProps) => (
      <ApolloReactComponents.Query<GetFollowedCollectionsQuery, GetFollowedCollectionsQueryVariables> query={GetFollowedCollectionsDocument} {...props} />
    );
    
export type GetFollowedCollectionsProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetFollowedCollectionsQuery, GetFollowedCollectionsQueryVariables> & TChildProps;
export function withGetFollowedCollections<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetFollowedCollectionsQuery,
  GetFollowedCollectionsQueryVariables,
  GetFollowedCollectionsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetFollowedCollectionsQuery, GetFollowedCollectionsQueryVariables, GetFollowedCollectionsProps<TChildProps>>(GetFollowedCollectionsDocument, {
      alias: 'getFollowedCollections',
      ...operationOptions
    });
};

/**
 * __useGetFollowedCollectionsQuery__
 *
 * To run a query within a React component, call `useGetFollowedCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowedCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowedCollectionsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      endColl: // value for 'endColl'
 *   },
 * });
 */
export function useGetFollowedCollectionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetFollowedCollectionsQuery, GetFollowedCollectionsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetFollowedCollectionsQuery, GetFollowedCollectionsQueryVariables>(GetFollowedCollectionsDocument, baseOptions);
      }
export function useGetFollowedCollectionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetFollowedCollectionsQuery, GetFollowedCollectionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetFollowedCollectionsQuery, GetFollowedCollectionsQueryVariables>(GetFollowedCollectionsDocument, baseOptions);
        }
export type GetFollowedCollectionsQueryHookResult = ReturnType<typeof useGetFollowedCollectionsQuery>;
export type GetFollowedCollectionsLazyQueryHookResult = ReturnType<typeof useGetFollowedCollectionsLazyQuery>;
export type GetFollowedCollectionsQueryResult = ApolloReactCommon.QueryResult<GetFollowedCollectionsQuery, GetFollowedCollectionsQueryVariables>;


export interface GetFollowedCollectionsQueryOperation {
  operationName: 'getFollowedCollections'
  result: GetFollowedCollectionsQuery
  variables: GetFollowedCollectionsQueryVariables
  type: 'query'
}
