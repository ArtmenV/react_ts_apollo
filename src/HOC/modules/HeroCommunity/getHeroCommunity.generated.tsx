import * as Types from '../../../graphql/types.generated';

import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type GetHeroCommunityQueryVariables = {
  communityId: Types.Scalars['String']
};


export type GetHeroCommunityQuery = (
  { __typename: 'RootQueryType' }
  & { community: Types.Maybe<(
    { __typename: 'Community' }
    & HeroCommunityDataFragment
  )> }
);

export type HeroCommunityDataFragment = (
  { __typename: 'Community' }
  & Pick<Types.Community, 'id' | 'displayUsername' | 'name' | 'summary' | 'icon'>
  & { followers: Types.Maybe<(
    { __typename: 'FollowsEdges' }
    & Pick<Types.FollowsEdges, 'totalCount'>
  )>, myFollow: Types.Maybe<(
    { __typename: 'Follow' }
    & Pick<Types.Follow, 'id'>
  )>, creator: Types.Maybe<(
    { __typename: 'User' }
    & Pick<Types.User, 'id'>
  )> }
);

export const HeroCommunityDataFragmentDoc = gql`
    fragment HeroCommunityData on Community {
  id
  displayUsername
  name
  summary
  icon
  followers {
    totalCount
  }
  myFollow {
    id
  }
  creator {
    id
  }
}
    `;
export const GetHeroCommunityDocument = gql`
    query getHeroCommunity($communityId: String!) {
  community(communityId: $communityId) {
    ...HeroCommunityData
  }
}
    ${HeroCommunityDataFragmentDoc}`;
export type GetHeroCommunityComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetHeroCommunityQuery, GetHeroCommunityQueryVariables>, 'query'> & ({ variables: GetHeroCommunityQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetHeroCommunityComponent = (props: GetHeroCommunityComponentProps) => (
      <ApolloReactComponents.Query<GetHeroCommunityQuery, GetHeroCommunityQueryVariables> query={GetHeroCommunityDocument} {...props} />
    );
    
export type GetHeroCommunityProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetHeroCommunityQuery, GetHeroCommunityQueryVariables> & TChildProps;
export function withGetHeroCommunity<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetHeroCommunityQuery,
  GetHeroCommunityQueryVariables,
  GetHeroCommunityProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetHeroCommunityQuery, GetHeroCommunityQueryVariables, GetHeroCommunityProps<TChildProps>>(GetHeroCommunityDocument, {
      alias: 'getHeroCommunity',
      ...operationOptions
    });
};

/**
 * __useGetHeroCommunityQuery__
 *
 * To run a query within a React component, call `useGetHeroCommunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHeroCommunityQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHeroCommunityQuery({
 *   variables: {
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useGetHeroCommunityQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetHeroCommunityQuery, GetHeroCommunityQueryVariables>) {
        return ApolloReactHooks.useQuery<GetHeroCommunityQuery, GetHeroCommunityQueryVariables>(GetHeroCommunityDocument, baseOptions);
      }
export function useGetHeroCommunityLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetHeroCommunityQuery, GetHeroCommunityQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetHeroCommunityQuery, GetHeroCommunityQueryVariables>(GetHeroCommunityDocument, baseOptions);
        }
export type GetHeroCommunityQueryHookResult = ReturnType<typeof useGetHeroCommunityQuery>;
export type GetHeroCommunityLazyQueryHookResult = ReturnType<typeof useGetHeroCommunityLazyQuery>;
export type GetHeroCommunityQueryResult = ApolloReactCommon.QueryResult<GetHeroCommunityQuery, GetHeroCommunityQueryVariables>;


export interface GetHeroCommunityQueryOperation {
  operationName: 'getHeroCommunity'
  result: GetHeroCommunityQuery
  variables: GetHeroCommunityQueryVariables
  type: 'query'
}
