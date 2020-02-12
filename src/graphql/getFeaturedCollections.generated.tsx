import * as Types from './types.generated';

import { BasicCollectionFragment } from './fragments/basicCollection.generated';
import { BasicUserFragment } from './fragments/basicUser.generated';
import gql from 'graphql-tag';
import { BasicUserFragmentDoc } from './fragments/basicUser.generated';
import { BasicCollectionFragmentDoc } from './fragments/basicCollection.generated';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;



export type GetFeaturedCollectionsQueryVariables = {};


export type GetFeaturedCollectionsQuery = (
  { __typename: 'RootQueryType' }
  & { instance: Types.Maybe<(
    { __typename: 'Instance' }
    & { featuredCollections: Types.Maybe<(
      { __typename: 'FeaturesEdges' }
      & Pick<Types.FeaturesEdges, 'totalCount'>
      & { pageInfo: Types.Maybe<(
        { __typename: 'PageInfo' }
        & Pick<Types.PageInfo, 'startCursor' | 'endCursor'>
      )>, edges: Array<Types.Maybe<(
        { __typename: 'FeaturesEdge' }
        & Pick<Types.FeaturesEdge, 'cursor'>
        & { node: (
          { __typename: 'Feature' }
          & Pick<Types.Feature, 'id' | 'canonicalUrl' | 'isLocal' | 'createdAt'>
          & { creator: Types.Maybe<(
            { __typename: 'User' }
            & BasicUserFragment
          )>, context: Types.Maybe<(
            { __typename: 'Collection' }
            & BasicCollectionFragment
          ) | { __typename: 'Community' }> }
        ) }
      )>> }
    )> }
  )> }
);


export const GetFeaturedCollectionsDocument = gql`
    query getFeaturedCollections {
  instance {
    featuredCollections {
      pageInfo {
        startCursor
        endCursor
      }
      totalCount
      edges {
        cursor
        node {
          id
          canonicalUrl
          isLocal
          createdAt
          creator {
            ...BasicUser
          }
          context {
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
    ${BasicUserFragmentDoc}
${BasicCollectionFragmentDoc}`;
export type GetFeaturedCollectionsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetFeaturedCollectionsQuery, GetFeaturedCollectionsQueryVariables>, 'query'>;

    export const GetFeaturedCollectionsComponent = (props: GetFeaturedCollectionsComponentProps) => (
      <ApolloReactComponents.Query<GetFeaturedCollectionsQuery, GetFeaturedCollectionsQueryVariables> query={GetFeaturedCollectionsDocument} {...props} />
    );
    
export type GetFeaturedCollectionsProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetFeaturedCollectionsQuery, GetFeaturedCollectionsQueryVariables> & TChildProps;
export function withGetFeaturedCollections<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetFeaturedCollectionsQuery,
  GetFeaturedCollectionsQueryVariables,
  GetFeaturedCollectionsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetFeaturedCollectionsQuery, GetFeaturedCollectionsQueryVariables, GetFeaturedCollectionsProps<TChildProps>>(GetFeaturedCollectionsDocument, {
      alias: 'getFeaturedCollections',
      ...operationOptions
    });
};

/**
 * __useGetFeaturedCollectionsQuery__
 *
 * To run a query within a React component, call `useGetFeaturedCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeaturedCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeaturedCollectionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFeaturedCollectionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetFeaturedCollectionsQuery, GetFeaturedCollectionsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetFeaturedCollectionsQuery, GetFeaturedCollectionsQueryVariables>(GetFeaturedCollectionsDocument, baseOptions);
      }
export function useGetFeaturedCollectionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetFeaturedCollectionsQuery, GetFeaturedCollectionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetFeaturedCollectionsQuery, GetFeaturedCollectionsQueryVariables>(GetFeaturedCollectionsDocument, baseOptions);
        }
export type GetFeaturedCollectionsQueryHookResult = ReturnType<typeof useGetFeaturedCollectionsQuery>;
export type GetFeaturedCollectionsLazyQueryHookResult = ReturnType<typeof useGetFeaturedCollectionsLazyQuery>;
export type GetFeaturedCollectionsQueryResult = ApolloReactCommon.QueryResult<GetFeaturedCollectionsQuery, GetFeaturedCollectionsQueryVariables>;


export interface GetFeaturedCollectionsQueryOperation {
  operationName: 'getFeaturedCollections'
  result: GetFeaturedCollectionsQuery
  variables: GetFeaturedCollectionsQueryVariables
  type: 'query'
}
