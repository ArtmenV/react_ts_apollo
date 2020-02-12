import * as Types from './types.generated';

import { BasicCommunityFragment } from './fragments/basicCommunity.generated';
import { BasicUserFragment } from './fragments/basicUser.generated';
import gql from 'graphql-tag';
import { BasicUserFragmentDoc } from './fragments/basicUser.generated';
import { BasicCommunityFragmentDoc } from './fragments/basicCommunity.generated';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;



export type GetFeaturedCommunitiesQueryVariables = {};


export type GetFeaturedCommunitiesQuery = (
  { __typename: 'RootQueryType' }
  & { instance: Types.Maybe<(
    { __typename: 'Instance' }
    & { featuredCommunities: Types.Maybe<(
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
          )>, context: Types.Maybe<{ __typename: 'Collection' } | (
            { __typename: 'Community' }
            & BasicCommunityFragment
          )> }
        ) }
      )>> }
    )> }
  )> }
);


export const GetFeaturedCommunitiesDocument = gql`
    query getFeaturedCommunities {
  instance {
    featuredCommunities {
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
            ... on Community {
              ...BasicCommunity
            }
          }
        }
      }
    }
  }
}
    ${BasicUserFragmentDoc}
${BasicCommunityFragmentDoc}`;
export type GetFeaturedCommunitiesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetFeaturedCommunitiesQuery, GetFeaturedCommunitiesQueryVariables>, 'query'>;

    export const GetFeaturedCommunitiesComponent = (props: GetFeaturedCommunitiesComponentProps) => (
      <ApolloReactComponents.Query<GetFeaturedCommunitiesQuery, GetFeaturedCommunitiesQueryVariables> query={GetFeaturedCommunitiesDocument} {...props} />
    );
    
export type GetFeaturedCommunitiesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetFeaturedCommunitiesQuery, GetFeaturedCommunitiesQueryVariables> & TChildProps;
export function withGetFeaturedCommunities<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetFeaturedCommunitiesQuery,
  GetFeaturedCommunitiesQueryVariables,
  GetFeaturedCommunitiesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetFeaturedCommunitiesQuery, GetFeaturedCommunitiesQueryVariables, GetFeaturedCommunitiesProps<TChildProps>>(GetFeaturedCommunitiesDocument, {
      alias: 'getFeaturedCommunities',
      ...operationOptions
    });
};

/**
 * __useGetFeaturedCommunitiesQuery__
 *
 * To run a query within a React component, call `useGetFeaturedCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeaturedCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeaturedCommunitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFeaturedCommunitiesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetFeaturedCommunitiesQuery, GetFeaturedCommunitiesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetFeaturedCommunitiesQuery, GetFeaturedCommunitiesQueryVariables>(GetFeaturedCommunitiesDocument, baseOptions);
      }
export function useGetFeaturedCommunitiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetFeaturedCommunitiesQuery, GetFeaturedCommunitiesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetFeaturedCommunitiesQuery, GetFeaturedCommunitiesQueryVariables>(GetFeaturedCommunitiesDocument, baseOptions);
        }
export type GetFeaturedCommunitiesQueryHookResult = ReturnType<typeof useGetFeaturedCommunitiesQuery>;
export type GetFeaturedCommunitiesLazyQueryHookResult = ReturnType<typeof useGetFeaturedCommunitiesLazyQuery>;
export type GetFeaturedCommunitiesQueryResult = ApolloReactCommon.QueryResult<GetFeaturedCommunitiesQuery, GetFeaturedCommunitiesQueryVariables>;


export interface GetFeaturedCommunitiesQueryOperation {
  operationName: 'getFeaturedCommunities'
  result: GetFeaturedCommunitiesQuery
  variables: GetFeaturedCommunitiesQueryVariables
  type: 'query'
}
