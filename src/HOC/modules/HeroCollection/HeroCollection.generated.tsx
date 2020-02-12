import * as Types from '../../../graphql/types.generated';

import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type HeroCollectionQueryVariables = {
  collectionId: Types.Scalars['String']
};


export type HeroCollectionQuery = (
  { __typename: 'RootQueryType' }
  & { collection: Types.Maybe<(
    { __typename: 'Collection' }
    & HeroCollectionDataFragment
  )> }
);

export type HeroCollectionDataFragment = (
  { __typename: 'Collection' }
  & Pick<Types.Collection, 'id' | 'name' | 'displayUsername' | 'summary' | 'icon'>
  & { community: Types.Maybe<(
    { __typename: 'Community' }
    & Pick<Types.Community, 'id' | 'name' | 'icon'>
  )>, followers: Types.Maybe<(
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

export const HeroCollectionDataFragmentDoc = gql`
    fragment HeroCollectionData on Collection {
  id
  name
  displayUsername
  summary
  icon
  community {
    id
    name
    icon
  }
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
export const HeroCollectionDocument = gql`
    query heroCollection($collectionId: String!) {
  collection(collectionId: $collectionId) {
    ...HeroCollectionData
  }
}
    ${HeroCollectionDataFragmentDoc}`;
export type HeroCollectionComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<HeroCollectionQuery, HeroCollectionQueryVariables>, 'query'> & ({ variables: HeroCollectionQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const HeroCollectionComponent = (props: HeroCollectionComponentProps) => (
      <ApolloReactComponents.Query<HeroCollectionQuery, HeroCollectionQueryVariables> query={HeroCollectionDocument} {...props} />
    );
    
export type HeroCollectionProps<TChildProps = {}> = ApolloReactHoc.DataProps<HeroCollectionQuery, HeroCollectionQueryVariables> & TChildProps;
export function withHeroCollection<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  HeroCollectionQuery,
  HeroCollectionQueryVariables,
  HeroCollectionProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, HeroCollectionQuery, HeroCollectionQueryVariables, HeroCollectionProps<TChildProps>>(HeroCollectionDocument, {
      alias: 'heroCollection',
      ...operationOptions
    });
};

/**
 * __useHeroCollectionQuery__
 *
 * To run a query within a React component, call `useHeroCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useHeroCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHeroCollectionQuery({
 *   variables: {
 *      collectionId: // value for 'collectionId'
 *   },
 * });
 */
export function useHeroCollectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HeroCollectionQuery, HeroCollectionQueryVariables>) {
        return ApolloReactHooks.useQuery<HeroCollectionQuery, HeroCollectionQueryVariables>(HeroCollectionDocument, baseOptions);
      }
export function useHeroCollectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HeroCollectionQuery, HeroCollectionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<HeroCollectionQuery, HeroCollectionQueryVariables>(HeroCollectionDocument, baseOptions);
        }
export type HeroCollectionQueryHookResult = ReturnType<typeof useHeroCollectionQuery>;
export type HeroCollectionLazyQueryHookResult = ReturnType<typeof useHeroCollectionLazyQuery>;
export type HeroCollectionQueryResult = ApolloReactCommon.QueryResult<HeroCollectionQuery, HeroCollectionQueryVariables>;


export interface HeroCollectionQueryOperation {
  operationName: 'heroCollection'
  result: HeroCollectionQuery
  variables: HeroCollectionQueryVariables
  type: 'query'
}
