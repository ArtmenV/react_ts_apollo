import * as Types from '../../graphql/types.generated';

import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type SearchHostIndexAndMyFollowingsQueryVariables = {};


export type SearchHostIndexAndMyFollowingsQuery = (
  { __typename: 'RootQueryType' }
  & { instance: Types.Maybe<(
    { __typename: 'Instance' }
    & SearchInstanceFragment
  )>, me: Types.Maybe<(
    { __typename: 'Me' }
    & SearchMeFragment
  )> }
);

export type SearchFollowLocalMutationVariables = {
  contextId: Types.Scalars['String']
};


export type SearchFollowLocalMutation = (
  { __typename: 'RootMutationType' }
  & { createFollow: Types.Maybe<(
    { __typename: 'Follow' }
    & Pick<Types.Follow, 'id'>
  )> }
);

export type SearchFollowRemoteMutationVariables = {
  url: Types.Scalars['String']
};


export type SearchFollowRemoteMutation = (
  { __typename: 'RootMutationType' }
  & { followRemoteActor: Types.Maybe<(
    { __typename: 'Follow' }
    & Pick<Types.Follow, 'id'>
  )> }
);

export type SearchUnfollowMutationVariables = {
  contextId: Types.Scalars['String']
};


export type SearchUnfollowMutation = (
  { __typename: 'RootMutationType' }
  & { delete: Types.Maybe<{ __typename: 'Collection' } | { __typename: 'Comment' } | { __typename: 'Community' } | { __typename: 'Feature' } | { __typename: 'Follow' } | { __typename: 'Like' } | { __typename: 'Resource' } | { __typename: 'Thread' } | { __typename: 'User' }> }
);

export type SearchInstanceFragment = (
  { __typename: 'Instance' }
  & Pick<Types.Instance, 'hostname'>
);

export type SearchMeFragment = (
  { __typename: 'Me' }
  & { user: (
    { __typename: 'User' }
    & Pick<Types.User, 'id'>
    & { followedCollections: Types.Maybe<(
      { __typename: 'FollowedCollectionsEdges' }
      & { edges: Array<Types.Maybe<(
        { __typename: 'FollowedCollectionsEdge' }
        & { node: (
          { __typename: 'FollowedCollection' }
          & SearchFollowedCollectionFragment
        ) }
      )>> }
    )>, followedCommunities: Types.Maybe<(
      { __typename: 'FollowedCommunitiesEdges' }
      & { edges: Array<Types.Maybe<(
        { __typename: 'FollowedCommunitiesEdge' }
        & { node: (
          { __typename: 'FollowedCommunity' }
          & SearchFollowedCommunityFragment
        ) }
      )>> }
    )> }
  ) }
);

export type SearchFollowedCommunityFragment = (
  { __typename: 'FollowedCommunity' }
  & { follow: (
    { __typename: 'Follow' }
    & Pick<Types.Follow, 'id'>
  ), community: (
    { __typename: 'Community' }
    & Pick<Types.Community, 'id' | 'canonicalUrl'>
  ) }
);

export type SearchFollowedCollectionFragment = (
  { __typename: 'FollowedCollection' }
  & { follow: (
    { __typename: 'Follow' }
    & Pick<Types.Follow, 'id'>
  ), collection: (
    { __typename: 'Collection' }
    & Pick<Types.Collection, 'id' | 'canonicalUrl'>
  ) }
);

export const SearchInstanceFragmentDoc = gql`
    fragment SearchInstance on Instance {
  hostname
}
    `;
export const SearchFollowedCollectionFragmentDoc = gql`
    fragment SearchFollowedCollection on FollowedCollection {
  follow {
    id
  }
  collection {
    id
    canonicalUrl
  }
}
    `;
export const SearchFollowedCommunityFragmentDoc = gql`
    fragment SearchFollowedCommunity on FollowedCommunity {
  follow {
    id
  }
  community {
    id
    canonicalUrl
  }
}
    `;
export const SearchMeFragmentDoc = gql`
    fragment SearchMe on Me {
  user {
    id
    followedCollections {
      edges {
        node {
          ...SearchFollowedCollection
        }
      }
    }
    followedCommunities {
      edges {
        node {
          ...SearchFollowedCommunity
        }
      }
    }
  }
}
    ${SearchFollowedCollectionFragmentDoc}
${SearchFollowedCommunityFragmentDoc}`;
export const SearchHostIndexAndMyFollowingsDocument = gql`
    query SearchHostIndexAndMyFollowings {
  instance {
    ...SearchInstance
  }
  me {
    ...SearchMe
  }
}
    ${SearchInstanceFragmentDoc}
${SearchMeFragmentDoc}`;
export type SearchHostIndexAndMyFollowingsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SearchHostIndexAndMyFollowingsQuery, SearchHostIndexAndMyFollowingsQueryVariables>, 'query'>;

    export const SearchHostIndexAndMyFollowingsComponent = (props: SearchHostIndexAndMyFollowingsComponentProps) => (
      <ApolloReactComponents.Query<SearchHostIndexAndMyFollowingsQuery, SearchHostIndexAndMyFollowingsQueryVariables> query={SearchHostIndexAndMyFollowingsDocument} {...props} />
    );
    
export type SearchHostIndexAndMyFollowingsProps<TChildProps = {}> = ApolloReactHoc.DataProps<SearchHostIndexAndMyFollowingsQuery, SearchHostIndexAndMyFollowingsQueryVariables> & TChildProps;
export function withSearchHostIndexAndMyFollowings<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SearchHostIndexAndMyFollowingsQuery,
  SearchHostIndexAndMyFollowingsQueryVariables,
  SearchHostIndexAndMyFollowingsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, SearchHostIndexAndMyFollowingsQuery, SearchHostIndexAndMyFollowingsQueryVariables, SearchHostIndexAndMyFollowingsProps<TChildProps>>(SearchHostIndexAndMyFollowingsDocument, {
      alias: 'searchHostIndexAndMyFollowings',
      ...operationOptions
    });
};

/**
 * __useSearchHostIndexAndMyFollowingsQuery__
 *
 * To run a query within a React component, call `useSearchHostIndexAndMyFollowingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchHostIndexAndMyFollowingsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchHostIndexAndMyFollowingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSearchHostIndexAndMyFollowingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchHostIndexAndMyFollowingsQuery, SearchHostIndexAndMyFollowingsQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchHostIndexAndMyFollowingsQuery, SearchHostIndexAndMyFollowingsQueryVariables>(SearchHostIndexAndMyFollowingsDocument, baseOptions);
      }
export function useSearchHostIndexAndMyFollowingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchHostIndexAndMyFollowingsQuery, SearchHostIndexAndMyFollowingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchHostIndexAndMyFollowingsQuery, SearchHostIndexAndMyFollowingsQueryVariables>(SearchHostIndexAndMyFollowingsDocument, baseOptions);
        }
export type SearchHostIndexAndMyFollowingsQueryHookResult = ReturnType<typeof useSearchHostIndexAndMyFollowingsQuery>;
export type SearchHostIndexAndMyFollowingsLazyQueryHookResult = ReturnType<typeof useSearchHostIndexAndMyFollowingsLazyQuery>;
export type SearchHostIndexAndMyFollowingsQueryResult = ApolloReactCommon.QueryResult<SearchHostIndexAndMyFollowingsQuery, SearchHostIndexAndMyFollowingsQueryVariables>;
export const SearchFollowLocalDocument = gql`
    mutation searchFollowLocal($contextId: String!) {
  createFollow(contextId: $contextId) {
    id
  }
}
    `;
export type SearchFollowLocalMutationFn = ApolloReactCommon.MutationFunction<SearchFollowLocalMutation, SearchFollowLocalMutationVariables>;
export type SearchFollowLocalComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SearchFollowLocalMutation, SearchFollowLocalMutationVariables>, 'mutation'>;

    export const SearchFollowLocalComponent = (props: SearchFollowLocalComponentProps) => (
      <ApolloReactComponents.Mutation<SearchFollowLocalMutation, SearchFollowLocalMutationVariables> mutation={SearchFollowLocalDocument} {...props} />
    );
    
export type SearchFollowLocalProps<TChildProps = {}> = ApolloReactHoc.MutateProps<SearchFollowLocalMutation, SearchFollowLocalMutationVariables> & TChildProps;
export function withSearchFollowLocal<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SearchFollowLocalMutation,
  SearchFollowLocalMutationVariables,
  SearchFollowLocalProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, SearchFollowLocalMutation, SearchFollowLocalMutationVariables, SearchFollowLocalProps<TChildProps>>(SearchFollowLocalDocument, {
      alias: 'searchFollowLocal',
      ...operationOptions
    });
};

/**
 * __useSearchFollowLocalMutation__
 *
 * To run a mutation, you first call `useSearchFollowLocalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSearchFollowLocalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [searchFollowLocalMutation, { data, loading, error }] = useSearchFollowLocalMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *   },
 * });
 */
export function useSearchFollowLocalMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SearchFollowLocalMutation, SearchFollowLocalMutationVariables>) {
        return ApolloReactHooks.useMutation<SearchFollowLocalMutation, SearchFollowLocalMutationVariables>(SearchFollowLocalDocument, baseOptions);
      }
export type SearchFollowLocalMutationHookResult = ReturnType<typeof useSearchFollowLocalMutation>;
export type SearchFollowLocalMutationResult = ApolloReactCommon.MutationResult<SearchFollowLocalMutation>;
export type SearchFollowLocalMutationOptions = ApolloReactCommon.BaseMutationOptions<SearchFollowLocalMutation, SearchFollowLocalMutationVariables>;
export const SearchFollowRemoteDocument = gql`
    mutation searchFollowRemote($url: String!) {
  followRemoteActor(url: $url) {
    id
  }
}
    `;
export type SearchFollowRemoteMutationFn = ApolloReactCommon.MutationFunction<SearchFollowRemoteMutation, SearchFollowRemoteMutationVariables>;
export type SearchFollowRemoteComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SearchFollowRemoteMutation, SearchFollowRemoteMutationVariables>, 'mutation'>;

    export const SearchFollowRemoteComponent = (props: SearchFollowRemoteComponentProps) => (
      <ApolloReactComponents.Mutation<SearchFollowRemoteMutation, SearchFollowRemoteMutationVariables> mutation={SearchFollowRemoteDocument} {...props} />
    );
    
export type SearchFollowRemoteProps<TChildProps = {}> = ApolloReactHoc.MutateProps<SearchFollowRemoteMutation, SearchFollowRemoteMutationVariables> & TChildProps;
export function withSearchFollowRemote<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SearchFollowRemoteMutation,
  SearchFollowRemoteMutationVariables,
  SearchFollowRemoteProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, SearchFollowRemoteMutation, SearchFollowRemoteMutationVariables, SearchFollowRemoteProps<TChildProps>>(SearchFollowRemoteDocument, {
      alias: 'searchFollowRemote',
      ...operationOptions
    });
};

/**
 * __useSearchFollowRemoteMutation__
 *
 * To run a mutation, you first call `useSearchFollowRemoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSearchFollowRemoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [searchFollowRemoteMutation, { data, loading, error }] = useSearchFollowRemoteMutation({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useSearchFollowRemoteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SearchFollowRemoteMutation, SearchFollowRemoteMutationVariables>) {
        return ApolloReactHooks.useMutation<SearchFollowRemoteMutation, SearchFollowRemoteMutationVariables>(SearchFollowRemoteDocument, baseOptions);
      }
export type SearchFollowRemoteMutationHookResult = ReturnType<typeof useSearchFollowRemoteMutation>;
export type SearchFollowRemoteMutationResult = ApolloReactCommon.MutationResult<SearchFollowRemoteMutation>;
export type SearchFollowRemoteMutationOptions = ApolloReactCommon.BaseMutationOptions<SearchFollowRemoteMutation, SearchFollowRemoteMutationVariables>;
export const SearchUnfollowDocument = gql`
    mutation searchUnfollow($contextId: String!) {
  delete(contextId: $contextId) {
    __typename
  }
}
    `;
export type SearchUnfollowMutationFn = ApolloReactCommon.MutationFunction<SearchUnfollowMutation, SearchUnfollowMutationVariables>;
export type SearchUnfollowComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SearchUnfollowMutation, SearchUnfollowMutationVariables>, 'mutation'>;

    export const SearchUnfollowComponent = (props: SearchUnfollowComponentProps) => (
      <ApolloReactComponents.Mutation<SearchUnfollowMutation, SearchUnfollowMutationVariables> mutation={SearchUnfollowDocument} {...props} />
    );
    
export type SearchUnfollowProps<TChildProps = {}> = ApolloReactHoc.MutateProps<SearchUnfollowMutation, SearchUnfollowMutationVariables> & TChildProps;
export function withSearchUnfollow<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SearchUnfollowMutation,
  SearchUnfollowMutationVariables,
  SearchUnfollowProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, SearchUnfollowMutation, SearchUnfollowMutationVariables, SearchUnfollowProps<TChildProps>>(SearchUnfollowDocument, {
      alias: 'searchUnfollow',
      ...operationOptions
    });
};

/**
 * __useSearchUnfollowMutation__
 *
 * To run a mutation, you first call `useSearchUnfollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSearchUnfollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [searchUnfollowMutation, { data, loading, error }] = useSearchUnfollowMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *   },
 * });
 */
export function useSearchUnfollowMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SearchUnfollowMutation, SearchUnfollowMutationVariables>) {
        return ApolloReactHooks.useMutation<SearchUnfollowMutation, SearchUnfollowMutationVariables>(SearchUnfollowDocument, baseOptions);
      }
export type SearchUnfollowMutationHookResult = ReturnType<typeof useSearchUnfollowMutation>;
export type SearchUnfollowMutationResult = ApolloReactCommon.MutationResult<SearchUnfollowMutation>;
export type SearchUnfollowMutationOptions = ApolloReactCommon.BaseMutationOptions<SearchUnfollowMutation, SearchUnfollowMutationVariables>;


export interface SearchHostIndexAndMyFollowingsQueryOperation {
  operationName: 'SearchHostIndexAndMyFollowings'
  result: SearchHostIndexAndMyFollowingsQuery
  variables: SearchHostIndexAndMyFollowingsQueryVariables
  type: 'query'
}


export interface SearchFollowLocalMutationOperation {
  operationName: 'searchFollowLocal'
  result: SearchFollowLocalMutation
  variables: SearchFollowLocalMutationVariables
  type: 'mutation'
}


export interface SearchFollowRemoteMutationOperation {
  operationName: 'searchFollowRemote'
  result: SearchFollowRemoteMutation
  variables: SearchFollowRemoteMutationVariables
  type: 'mutation'
}


export interface SearchUnfollowMutationOperation {
  operationName: 'searchUnfollow'
  result: SearchUnfollowMutation
  variables: SearchUnfollowMutationVariables
  type: 'mutation'
}
