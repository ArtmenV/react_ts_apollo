import * as Types from './types.generated';

import { BasicCollectionFragment } from './fragments/basicCollection.generated';
import { ActivityPreviewDataFragment } from '../HOC/modules/ActivityPreview/getActivityPreview.generated';
import { BasicCommunityFragment } from './fragments/basicCommunity.generated';
import { BasicUserFragment } from './fragments/basicUser.generated';
import gql from 'graphql-tag';
import { BasicUserFragmentDoc } from './fragments/basicUser.generated';
import { BasicCommunityFragmentDoc } from './fragments/basicCommunity.generated';
import { ActivityPreviewDataFragmentDoc } from '../HOC/modules/ActivityPreview/getActivityPreview.generated';
import { BasicCollectionFragmentDoc } from './fragments/basicCollection.generated';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;





export type GetUserQueryVariables = {
  limitComm?: Types.Maybe<Types.Scalars['Int']>,
  endComm?: Types.Maybe<Types.Scalars['String']>,
  limitColl?: Types.Maybe<Types.Scalars['Int']>,
  endColl?: Types.Maybe<Types.Scalars['String']>,
  limitTimeline?: Types.Maybe<Types.Scalars['Int']>,
  endTimeline?: Types.Maybe<Types.Scalars['String']>
};


export type GetUserQuery = (
  { __typename: 'RootQueryType' }
  & { me: Types.Maybe<(
    { __typename: 'Me' }
    & { user: (
      { __typename: 'User' }
      & { followedCommunities: Types.Maybe<(
        { __typename: 'FollowedCommunitiesEdges' }
        & { pageInfo: Types.Maybe<(
          { __typename: 'PageInfo' }
          & Pick<Types.PageInfo, 'startCursor' | 'endCursor'>
        )>, edges: Array<Types.Maybe<(
          { __typename: 'FollowedCommunitiesEdge' }
          & { node: (
            { __typename: 'FollowedCommunity' }
            & { follow: (
              { __typename: 'Follow' }
              & Pick<Types.Follow, 'id' | 'canonicalUrl'>
            ), community: (
              { __typename: 'Community' }
              & BasicCommunityFragment
            ) }
          ) }
        )>> }
      )>, outbox: Types.Maybe<(
        { __typename: 'ActivitiesEdges' }
        & { pageInfo: Types.Maybe<(
          { __typename: 'PageInfo' }
          & Pick<Types.PageInfo, 'startCursor' | 'endCursor'>
        )>, edges: Types.Maybe<Array<Types.Maybe<(
          { __typename: 'ActivitiesEdge' }
          & { node: (
            { __typename: 'Activity' }
            & ActivityPreviewDataFragment
          ) }
        )>>> }
      )>, followedCollections: Types.Maybe<(
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
      & BasicUserFragment
    ) }
  )> }
);


export const GetUserDocument = gql`
    query getUser($limitComm: Int, $endComm: String, $limitColl: Int, $endColl: String, $limitTimeline: Int, $endTimeline: String) {
  me {
    user {
      ...BasicUser
      followedCommunities(limit: $limitComm, after: $endComm) {
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
            community {
              __typename
              ... on Community {
                ...BasicCommunity
              }
            }
          }
        }
      }
      outbox(limit: $limitTimeline, after: $endTimeline) {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          node {
            ...ActivityPreviewData
          }
        }
      }
      followedCollections(limit: $limitColl, after: $endColl) {
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
    ${BasicUserFragmentDoc}
${BasicCommunityFragmentDoc}
${ActivityPreviewDataFragmentDoc}
${BasicCollectionFragmentDoc}`;
export type GetUserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserQuery, GetUserQueryVariables>, 'query'>;

    export const GetUserComponent = (props: GetUserComponentProps) => (
      <ApolloReactComponents.Query<GetUserQuery, GetUserQueryVariables> query={GetUserDocument} {...props} />
    );
    
export type GetUserProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetUserQuery, GetUserQueryVariables> & TChildProps;
export function withGetUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserQuery,
  GetUserQueryVariables,
  GetUserProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserQuery, GetUserQueryVariables, GetUserProps<TChildProps>>(GetUserDocument, {
      alias: 'getUser',
      ...operationOptions
    });
};

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      limitComm: // value for 'limitComm'
 *      endComm: // value for 'endComm'
 *      limitColl: // value for 'limitColl'
 *      endColl: // value for 'endColl'
 *      limitTimeline: // value for 'limitTimeline'
 *      endTimeline: // value for 'endTimeline'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;


export interface GetUserQueryOperation {
  operationName: 'getUser'
  result: GetUserQuery
  variables: GetUserQueryVariables
  type: 'query'
}
