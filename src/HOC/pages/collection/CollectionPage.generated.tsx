import * as Types from '../../../graphql/types.generated';

import { ActivityPreviewDataFragment, ActivityPreviewResourceCtxFragment, ActivityPreviewLikeCtxFragment, ActivityPreviewCommentCtxBaseFragment, ActivityPreviewResourceCtxFragmentDoc, ActivityPreviewLikeCtxFragmentDoc, ActivityPreviewCommentCtxBaseFragmentDoc } from '../../modules/ActivityPreview/getActivityPreview.generated';
import { HeroCollectionDataFragment } from '../../modules/HeroCollection/HeroCollection.generated';
import gql from 'graphql-tag';
import { HeroCollectionDataFragmentDoc } from '../../modules/HeroCollection/HeroCollection.generated';
import { ActivityPreviewDataFragmentDoc } from '../../modules/ActivityPreview/getActivityPreview.generated';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;



export type CollectionPageQueryVariables = {
  collectionId: Types.Scalars['String']
};


export type CollectionPageQuery = (
  { __typename: 'RootQueryType' }
  & { collection: Types.Maybe<(
    { __typename: 'Collection' }
    & Pick<Types.Collection, 'resourceCount'>
    & { community: Types.Maybe<(
      { __typename: 'Community' }
      & Pick<Types.Community, 'id'>
      & { myFollow: Types.Maybe<(
        { __typename: 'Follow' }
        & Pick<Types.Follow, 'id'>
      )> }
    )>, resources: Types.Maybe<(
      { __typename: 'ResourcesEdges' }
      & { edges: Array<Types.Maybe<(
        { __typename: 'ResourcesEdge' }
        & { node: (
          { __typename: 'Resource' }
          & Pick<Types.Resource, 'createdAt'>
          & CollectionPageResourceFragment
        ) }
      )>> }
    )>, outbox: Types.Maybe<(
      { __typename: 'ActivitiesEdges' }
      & { edges: Types.Maybe<Array<Types.Maybe<(
        { __typename: 'ActivitiesEdge' }
        & { node: (
          { __typename: 'Activity' }
          & ActivityPreviewDataFragment
        ) }
      )>>> }
    )> }
    & HeroCollectionDataFragment
  )> }
);

export type CollectionPageResourceFragment = (
  { __typename: 'Resource' }
  & Pick<Types.Resource, 'createdAt'>
  & ActivityPreviewResourceCtxFragment
);

export type CollectionPageResourceLikeMutationVariables = {
  contextId: Types.Scalars['String']
};


export type CollectionPageResourceLikeMutation = (
  { __typename: 'RootMutationType' }
  & { createLike: Types.Maybe<(
    { __typename: 'Like' }
    & ActivityPreviewLikeCtxFragment
  )> }
);

export type CollectionPageResourceUnlikeMutationVariables = {
  contextId: Types.Scalars['String']
};


export type CollectionPageResourceUnlikeMutation = (
  { __typename: 'RootMutationType' }
  & { delete: Types.Maybe<{ __typename: 'Collection' } | { __typename: 'Comment' } | { __typename: 'Community' } | { __typename: 'Feature' } | { __typename: 'Follow' } | { __typename: 'Like' } | { __typename: 'Resource' } | { __typename: 'Thread' } | { __typename: 'User' }> }
);

export type CollectionPageResourceCreateThreadMutationVariables = {
  contextId: Types.Scalars['String'],
  comment: Types.CommentInput
};


export type CollectionPageResourceCreateThreadMutation = (
  { __typename: 'RootMutationType' }
  & { createThread: Types.Maybe<(
    { __typename: 'Comment' }
    & ActivityPreviewCommentCtxBaseFragment
  )> }
);

export const CollectionPageResourceFragmentDoc = gql`
    fragment CollectionPageResource on Resource {
  ...ActivityPreviewResourceCtx
  createdAt
}
    ${ActivityPreviewResourceCtxFragmentDoc}`;
export const CollectionPageDocument = gql`
    query collectionPage($collectionId: String!) {
  collection(collectionId: $collectionId) {
    ...HeroCollectionData
    resourceCount
    community {
      id
      myFollow {
        id
      }
    }
    resources {
      edges {
        node {
          ...CollectionPageResource
          createdAt
        }
      }
    }
    outbox {
      edges {
        node {
          ...ActivityPreviewData
        }
      }
    }
  }
}
    ${HeroCollectionDataFragmentDoc}
${CollectionPageResourceFragmentDoc}
${ActivityPreviewDataFragmentDoc}`;
export type CollectionPageComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<CollectionPageQuery, CollectionPageQueryVariables>, 'query'> & ({ variables: CollectionPageQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const CollectionPageComponent = (props: CollectionPageComponentProps) => (
      <ApolloReactComponents.Query<CollectionPageQuery, CollectionPageQueryVariables> query={CollectionPageDocument} {...props} />
    );
    
export type CollectionPageProps<TChildProps = {}> = ApolloReactHoc.DataProps<CollectionPageQuery, CollectionPageQueryVariables> & TChildProps;
export function withCollectionPage<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CollectionPageQuery,
  CollectionPageQueryVariables,
  CollectionPageProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, CollectionPageQuery, CollectionPageQueryVariables, CollectionPageProps<TChildProps>>(CollectionPageDocument, {
      alias: 'collectionPage',
      ...operationOptions
    });
};

/**
 * __useCollectionPageQuery__
 *
 * To run a query within a React component, call `useCollectionPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionPageQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionPageQuery({
 *   variables: {
 *      collectionId: // value for 'collectionId'
 *   },
 * });
 */
export function useCollectionPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CollectionPageQuery, CollectionPageQueryVariables>) {
        return ApolloReactHooks.useQuery<CollectionPageQuery, CollectionPageQueryVariables>(CollectionPageDocument, baseOptions);
      }
export function useCollectionPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CollectionPageQuery, CollectionPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CollectionPageQuery, CollectionPageQueryVariables>(CollectionPageDocument, baseOptions);
        }
export type CollectionPageQueryHookResult = ReturnType<typeof useCollectionPageQuery>;
export type CollectionPageLazyQueryHookResult = ReturnType<typeof useCollectionPageLazyQuery>;
export type CollectionPageQueryResult = ApolloReactCommon.QueryResult<CollectionPageQuery, CollectionPageQueryVariables>;
export const CollectionPageResourceLikeDocument = gql`
    mutation collectionPageResourceLike($contextId: String!) {
  createLike(contextId: $contextId) {
    ...ActivityPreviewLikeCtx
  }
}
    ${ActivityPreviewLikeCtxFragmentDoc}`;
export type CollectionPageResourceLikeMutationFn = ApolloReactCommon.MutationFunction<CollectionPageResourceLikeMutation, CollectionPageResourceLikeMutationVariables>;
export type CollectionPageResourceLikeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CollectionPageResourceLikeMutation, CollectionPageResourceLikeMutationVariables>, 'mutation'>;

    export const CollectionPageResourceLikeComponent = (props: CollectionPageResourceLikeComponentProps) => (
      <ApolloReactComponents.Mutation<CollectionPageResourceLikeMutation, CollectionPageResourceLikeMutationVariables> mutation={CollectionPageResourceLikeDocument} {...props} />
    );
    
export type CollectionPageResourceLikeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CollectionPageResourceLikeMutation, CollectionPageResourceLikeMutationVariables> & TChildProps;
export function withCollectionPageResourceLike<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CollectionPageResourceLikeMutation,
  CollectionPageResourceLikeMutationVariables,
  CollectionPageResourceLikeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CollectionPageResourceLikeMutation, CollectionPageResourceLikeMutationVariables, CollectionPageResourceLikeProps<TChildProps>>(CollectionPageResourceLikeDocument, {
      alias: 'collectionPageResourceLike',
      ...operationOptions
    });
};

/**
 * __useCollectionPageResourceLikeMutation__
 *
 * To run a mutation, you first call `useCollectionPageResourceLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCollectionPageResourceLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [collectionPageResourceLikeMutation, { data, loading, error }] = useCollectionPageResourceLikeMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *   },
 * });
 */
export function useCollectionPageResourceLikeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CollectionPageResourceLikeMutation, CollectionPageResourceLikeMutationVariables>) {
        return ApolloReactHooks.useMutation<CollectionPageResourceLikeMutation, CollectionPageResourceLikeMutationVariables>(CollectionPageResourceLikeDocument, baseOptions);
      }
export type CollectionPageResourceLikeMutationHookResult = ReturnType<typeof useCollectionPageResourceLikeMutation>;
export type CollectionPageResourceLikeMutationResult = ApolloReactCommon.MutationResult<CollectionPageResourceLikeMutation>;
export type CollectionPageResourceLikeMutationOptions = ApolloReactCommon.BaseMutationOptions<CollectionPageResourceLikeMutation, CollectionPageResourceLikeMutationVariables>;
export const CollectionPageResourceUnlikeDocument = gql`
    mutation collectionPageResourceUnlike($contextId: String!) {
  delete(contextId: $contextId) {
    __typename
  }
}
    `;
export type CollectionPageResourceUnlikeMutationFn = ApolloReactCommon.MutationFunction<CollectionPageResourceUnlikeMutation, CollectionPageResourceUnlikeMutationVariables>;
export type CollectionPageResourceUnlikeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CollectionPageResourceUnlikeMutation, CollectionPageResourceUnlikeMutationVariables>, 'mutation'>;

    export const CollectionPageResourceUnlikeComponent = (props: CollectionPageResourceUnlikeComponentProps) => (
      <ApolloReactComponents.Mutation<CollectionPageResourceUnlikeMutation, CollectionPageResourceUnlikeMutationVariables> mutation={CollectionPageResourceUnlikeDocument} {...props} />
    );
    
export type CollectionPageResourceUnlikeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CollectionPageResourceUnlikeMutation, CollectionPageResourceUnlikeMutationVariables> & TChildProps;
export function withCollectionPageResourceUnlike<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CollectionPageResourceUnlikeMutation,
  CollectionPageResourceUnlikeMutationVariables,
  CollectionPageResourceUnlikeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CollectionPageResourceUnlikeMutation, CollectionPageResourceUnlikeMutationVariables, CollectionPageResourceUnlikeProps<TChildProps>>(CollectionPageResourceUnlikeDocument, {
      alias: 'collectionPageResourceUnlike',
      ...operationOptions
    });
};

/**
 * __useCollectionPageResourceUnlikeMutation__
 *
 * To run a mutation, you first call `useCollectionPageResourceUnlikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCollectionPageResourceUnlikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [collectionPageResourceUnlikeMutation, { data, loading, error }] = useCollectionPageResourceUnlikeMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *   },
 * });
 */
export function useCollectionPageResourceUnlikeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CollectionPageResourceUnlikeMutation, CollectionPageResourceUnlikeMutationVariables>) {
        return ApolloReactHooks.useMutation<CollectionPageResourceUnlikeMutation, CollectionPageResourceUnlikeMutationVariables>(CollectionPageResourceUnlikeDocument, baseOptions);
      }
export type CollectionPageResourceUnlikeMutationHookResult = ReturnType<typeof useCollectionPageResourceUnlikeMutation>;
export type CollectionPageResourceUnlikeMutationResult = ApolloReactCommon.MutationResult<CollectionPageResourceUnlikeMutation>;
export type CollectionPageResourceUnlikeMutationOptions = ApolloReactCommon.BaseMutationOptions<CollectionPageResourceUnlikeMutation, CollectionPageResourceUnlikeMutationVariables>;
export const CollectionPageResourceCreateThreadDocument = gql`
    mutation collectionPageResourceCreateThread($contextId: String!, $comment: CommentInput!) {
  createThread(comment: $comment, contextId: $contextId) {
    ...ActivityPreviewCommentCtxBase
  }
}
    ${ActivityPreviewCommentCtxBaseFragmentDoc}`;
export type CollectionPageResourceCreateThreadMutationFn = ApolloReactCommon.MutationFunction<CollectionPageResourceCreateThreadMutation, CollectionPageResourceCreateThreadMutationVariables>;
export type CollectionPageResourceCreateThreadComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CollectionPageResourceCreateThreadMutation, CollectionPageResourceCreateThreadMutationVariables>, 'mutation'>;

    export const CollectionPageResourceCreateThreadComponent = (props: CollectionPageResourceCreateThreadComponentProps) => (
      <ApolloReactComponents.Mutation<CollectionPageResourceCreateThreadMutation, CollectionPageResourceCreateThreadMutationVariables> mutation={CollectionPageResourceCreateThreadDocument} {...props} />
    );
    
export type CollectionPageResourceCreateThreadProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CollectionPageResourceCreateThreadMutation, CollectionPageResourceCreateThreadMutationVariables> & TChildProps;
export function withCollectionPageResourceCreateThread<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CollectionPageResourceCreateThreadMutation,
  CollectionPageResourceCreateThreadMutationVariables,
  CollectionPageResourceCreateThreadProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CollectionPageResourceCreateThreadMutation, CollectionPageResourceCreateThreadMutationVariables, CollectionPageResourceCreateThreadProps<TChildProps>>(CollectionPageResourceCreateThreadDocument, {
      alias: 'collectionPageResourceCreateThread',
      ...operationOptions
    });
};

/**
 * __useCollectionPageResourceCreateThreadMutation__
 *
 * To run a mutation, you first call `useCollectionPageResourceCreateThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCollectionPageResourceCreateThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [collectionPageResourceCreateThreadMutation, { data, loading, error }] = useCollectionPageResourceCreateThreadMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCollectionPageResourceCreateThreadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CollectionPageResourceCreateThreadMutation, CollectionPageResourceCreateThreadMutationVariables>) {
        return ApolloReactHooks.useMutation<CollectionPageResourceCreateThreadMutation, CollectionPageResourceCreateThreadMutationVariables>(CollectionPageResourceCreateThreadDocument, baseOptions);
      }
export type CollectionPageResourceCreateThreadMutationHookResult = ReturnType<typeof useCollectionPageResourceCreateThreadMutation>;
export type CollectionPageResourceCreateThreadMutationResult = ApolloReactCommon.MutationResult<CollectionPageResourceCreateThreadMutation>;
export type CollectionPageResourceCreateThreadMutationOptions = ApolloReactCommon.BaseMutationOptions<CollectionPageResourceCreateThreadMutation, CollectionPageResourceCreateThreadMutationVariables>;


export interface CollectionPageQueryOperation {
  operationName: 'collectionPage'
  result: CollectionPageQuery
  variables: CollectionPageQueryVariables
  type: 'query'
}


export interface CollectionPageResourceLikeMutationOperation {
  operationName: 'collectionPageResourceLike'
  result: CollectionPageResourceLikeMutation
  variables: CollectionPageResourceLikeMutationVariables
  type: 'mutation'
}


export interface CollectionPageResourceUnlikeMutationOperation {
  operationName: 'collectionPageResourceUnlike'
  result: CollectionPageResourceUnlikeMutation
  variables: CollectionPageResourceUnlikeMutationVariables
  type: 'mutation'
}


export interface CollectionPageResourceCreateThreadMutationOperation {
  operationName: 'collectionPageResourceCreateThread'
  result: CollectionPageResourceCreateThreadMutation
  variables: CollectionPageResourceCreateThreadMutationVariables
  type: 'mutation'
}
