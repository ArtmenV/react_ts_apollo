import * as Types from '../../../graphql/types.generated';

import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type CollectionPreviewQueryVariables = {
  id: Types.Scalars['String']
};


export type CollectionPreviewQuery = (
  { __typename: 'RootQueryType' }
  & { collection: Types.Maybe<(
    { __typename: 'Collection' }
    & CollectionPreviewDataFragment
  )> }
);

export type CollectionPreviewDataFragment = (
  { __typename: 'Collection' }
  & Pick<Types.Collection, 'id' | 'canonicalUrl' | 'icon' | 'name' | 'summary' | 'isLocal' | 'followerCount' | 'resourceCount'>
  & { followers: Types.Maybe<(
    { __typename: 'FollowsEdges' }
    & { edges: Array<Types.Maybe<(
      { __typename: 'FollowsEdge' }
      & { node: (
        { __typename: 'Follow' }
        & { creator: Types.Maybe<(
          { __typename: 'User' }
          & Pick<Types.User, 'name' | 'icon' | 'image' | 'id'>
        )> }
      ) }
    )>> }
  )> }
);

export const CollectionPreviewDataFragmentDoc = gql`
    fragment CollectionPreviewData on Collection {
  id
  canonicalUrl
  icon
  name
  summary
  isLocal
  followerCount
  resourceCount
  followers {
    edges {
      node {
        creator {
          name
          icon
          image
          id
        }
      }
    }
  }
}
    `;
export const CollectionPreviewDocument = gql`
    query collectionPreview($id: String!) {
  collection(collectionId: $id) {
    ...CollectionPreviewData
  }
}
    ${CollectionPreviewDataFragmentDoc}`;
export type CollectionPreviewComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<CollectionPreviewQuery, CollectionPreviewQueryVariables>, 'query'> & ({ variables: CollectionPreviewQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const CollectionPreviewComponent = (props: CollectionPreviewComponentProps) => (
      <ApolloReactComponents.Query<CollectionPreviewQuery, CollectionPreviewQueryVariables> query={CollectionPreviewDocument} {...props} />
    );
    
export type CollectionPreviewProps<TChildProps = {}> = ApolloReactHoc.DataProps<CollectionPreviewQuery, CollectionPreviewQueryVariables> & TChildProps;
export function withCollectionPreview<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CollectionPreviewQuery,
  CollectionPreviewQueryVariables,
  CollectionPreviewProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, CollectionPreviewQuery, CollectionPreviewQueryVariables, CollectionPreviewProps<TChildProps>>(CollectionPreviewDocument, {
      alias: 'collectionPreview',
      ...operationOptions
    });
};

/**
 * __useCollectionPreviewQuery__
 *
 * To run a query within a React component, call `useCollectionPreviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionPreviewQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionPreviewQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCollectionPreviewQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CollectionPreviewQuery, CollectionPreviewQueryVariables>) {
        return ApolloReactHooks.useQuery<CollectionPreviewQuery, CollectionPreviewQueryVariables>(CollectionPreviewDocument, baseOptions);
      }
export function useCollectionPreviewLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CollectionPreviewQuery, CollectionPreviewQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CollectionPreviewQuery, CollectionPreviewQueryVariables>(CollectionPreviewDocument, baseOptions);
        }
export type CollectionPreviewQueryHookResult = ReturnType<typeof useCollectionPreviewQuery>;
export type CollectionPreviewLazyQueryHookResult = ReturnType<typeof useCollectionPreviewLazyQuery>;
export type CollectionPreviewQueryResult = ApolloReactCommon.QueryResult<CollectionPreviewQuery, CollectionPreviewQueryVariables>;


export interface CollectionPreviewQueryOperation {
  operationName: 'collectionPreview'
  result: CollectionPreviewQuery
  variables: CollectionPreviewQueryVariables
  type: 'query'
}
