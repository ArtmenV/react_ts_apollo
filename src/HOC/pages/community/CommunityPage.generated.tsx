import * as Types from '../../../graphql/types.generated';

import { ActivityPreviewDataFragment, ActivityPreviewCommentCtxExtendedFragment, ActivityPreviewExtendedThreadFragment, ActivityPreviewLikeCtxFragment, ActivityPreviewCommentCtxBaseFragment, ActivityPreviewExtendedThreadFragmentDoc, ActivityPreviewCommentCtxExtendedFragmentDoc, ActivityPreviewLikeCtxFragmentDoc, ActivityPreviewCommentCtxBaseFragmentDoc } from '../../modules/ActivityPreview/getActivityPreview.generated';
import { CollectionPreviewDataFragment } from '../../modules/CollectionPreview/CollectionPreview.generated';
import { HeroCommunityDataFragment } from '../../modules/HeroCommunity/getHeroCommunity.generated';
import gql from 'graphql-tag';
import { HeroCommunityDataFragmentDoc } from '../../modules/HeroCommunity/getHeroCommunity.generated';
import { CollectionPreviewDataFragmentDoc } from '../../modules/CollectionPreview/CollectionPreview.generated';
import { ActivityPreviewDataFragmentDoc } from '../../modules/ActivityPreview/getActivityPreview.generated';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;




export type CommunityPageQueryVariables = {
  id: Types.Scalars['String']
};


export type CommunityPageQuery = (
  { __typename: 'RootQueryType' }
  & { community: Types.Maybe<(
    { __typename: 'Community' }
    & { collections: Types.Maybe<(
      { __typename: 'CollectionsEdges' }
      & { edges: Array<Types.Maybe<(
        { __typename: 'CollectionsEdge' }
        & { node: (
          { __typename: 'Collection' }
          & CollectionPreviewDataFragment
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
    )>, threads: Types.Maybe<(
      { __typename: 'ThreadsEdges' }
      & { edges: Types.Maybe<Array<Types.Maybe<(
        { __typename: 'ThreadsEdge' }
        & { node: (
          { __typename: 'Thread' }
          & ComunityPageThreadFragment
        ) }
      )>>> }
    )> }
    & HeroCommunityDataFragment
  )> }
);

export type ComunityPageThreadFragment = (
  { __typename: 'Thread' }
  & { comments: Types.Maybe<(
    { __typename: 'CommentsEdges' }
    & { edges: Array<Types.Maybe<(
      { __typename: 'CommentsEdge' }
      & { node: (
        { __typename: 'Comment' }
        & Pick<Types.Comment, 'createdAt'>
        & ActivityPreviewCommentCtxExtendedFragment
      ) }
    )>> }
  )> }
  & ActivityPreviewExtendedThreadFragment
);

export type CommunityPageCreateThreadMutationVariables = {
  contextId: Types.Scalars['String'],
  comment: Types.CommentInput
};


export type CommunityPageCreateThreadMutation = (
  { __typename: 'RootMutationType' }
  & { createThread: Types.Maybe<(
    { __typename: 'Comment' }
    & { thread: Types.Maybe<(
      { __typename: 'Thread' }
      & Pick<Types.Thread, 'id'>
    )> }
  )> }
);

export type CommunityPageThreadLikeMutationVariables = {
  contextId: Types.Scalars['String']
};


export type CommunityPageThreadLikeMutation = (
  { __typename: 'RootMutationType' }
  & { createLike: Types.Maybe<(
    { __typename: 'Like' }
    & ActivityPreviewLikeCtxFragment
  )> }
);

export type CommunityPageThreadUnlikeMutationVariables = {
  contextId: Types.Scalars['String']
};


export type CommunityPageThreadUnlikeMutation = (
  { __typename: 'RootMutationType' }
  & { delete: Types.Maybe<{ __typename: 'Collection' } | { __typename: 'Comment' } | { __typename: 'Community' } | { __typename: 'Feature' } | { __typename: 'Follow' } | { __typename: 'Like' } | { __typename: 'Resource' } | { __typename: 'Thread' } | { __typename: 'User' }> }
);

export type CommunityPageThreadCreateReplyMutationVariables = {
  comment: Types.CommentInput,
  inReplyToId: Types.Scalars['String'],
  threadId: Types.Scalars['String']
};


export type CommunityPageThreadCreateReplyMutation = (
  { __typename: 'RootMutationType' }
  & { createReply: Types.Maybe<(
    { __typename: 'Comment' }
    & ActivityPreviewCommentCtxBaseFragment
  )> }
);

export const ComunityPageThreadFragmentDoc = gql`
    fragment ComunityPageThread on Thread {
  ...ActivityPreviewExtendedThread
  comments {
    edges {
      node {
        ...ActivityPreviewCommentCtxExtended
        createdAt
      }
    }
  }
}
    ${ActivityPreviewExtendedThreadFragmentDoc}
${ActivityPreviewCommentCtxExtendedFragmentDoc}`;
export const CommunityPageDocument = gql`
    query communityPage($id: String!) {
  community(communityId: $id) {
    ...HeroCommunityData
    collections {
      edges {
        node {
          ...CollectionPreviewData
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
    threads(limit: 1) {
      edges {
        node {
          ...ComunityPageThread
        }
      }
    }
  }
}
    ${HeroCommunityDataFragmentDoc}
${CollectionPreviewDataFragmentDoc}
${ActivityPreviewDataFragmentDoc}
${ComunityPageThreadFragmentDoc}`;
export type CommunityPageComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<CommunityPageQuery, CommunityPageQueryVariables>, 'query'> & ({ variables: CommunityPageQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const CommunityPageComponent = (props: CommunityPageComponentProps) => (
      <ApolloReactComponents.Query<CommunityPageQuery, CommunityPageQueryVariables> query={CommunityPageDocument} {...props} />
    );
    
export type CommunityPageProps<TChildProps = {}> = ApolloReactHoc.DataProps<CommunityPageQuery, CommunityPageQueryVariables> & TChildProps;
export function withCommunityPage<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CommunityPageQuery,
  CommunityPageQueryVariables,
  CommunityPageProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, CommunityPageQuery, CommunityPageQueryVariables, CommunityPageProps<TChildProps>>(CommunityPageDocument, {
      alias: 'communityPage',
      ...operationOptions
    });
};

/**
 * __useCommunityPageQuery__
 *
 * To run a query within a React component, call `useCommunityPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityPageQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCommunityPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CommunityPageQuery, CommunityPageQueryVariables>) {
        return ApolloReactHooks.useQuery<CommunityPageQuery, CommunityPageQueryVariables>(CommunityPageDocument, baseOptions);
      }
export function useCommunityPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CommunityPageQuery, CommunityPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CommunityPageQuery, CommunityPageQueryVariables>(CommunityPageDocument, baseOptions);
        }
export type CommunityPageQueryHookResult = ReturnType<typeof useCommunityPageQuery>;
export type CommunityPageLazyQueryHookResult = ReturnType<typeof useCommunityPageLazyQuery>;
export type CommunityPageQueryResult = ApolloReactCommon.QueryResult<CommunityPageQuery, CommunityPageQueryVariables>;
export const CommunityPageCreateThreadDocument = gql`
    mutation communityPageCreateThread($contextId: String!, $comment: CommentInput!) {
  createThread(comment: $comment, contextId: $contextId) {
    thread {
      id
    }
  }
}
    `;
export type CommunityPageCreateThreadMutationFn = ApolloReactCommon.MutationFunction<CommunityPageCreateThreadMutation, CommunityPageCreateThreadMutationVariables>;
export type CommunityPageCreateThreadComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CommunityPageCreateThreadMutation, CommunityPageCreateThreadMutationVariables>, 'mutation'>;

    export const CommunityPageCreateThreadComponent = (props: CommunityPageCreateThreadComponentProps) => (
      <ApolloReactComponents.Mutation<CommunityPageCreateThreadMutation, CommunityPageCreateThreadMutationVariables> mutation={CommunityPageCreateThreadDocument} {...props} />
    );
    
export type CommunityPageCreateThreadProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CommunityPageCreateThreadMutation, CommunityPageCreateThreadMutationVariables> & TChildProps;
export function withCommunityPageCreateThread<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CommunityPageCreateThreadMutation,
  CommunityPageCreateThreadMutationVariables,
  CommunityPageCreateThreadProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CommunityPageCreateThreadMutation, CommunityPageCreateThreadMutationVariables, CommunityPageCreateThreadProps<TChildProps>>(CommunityPageCreateThreadDocument, {
      alias: 'communityPageCreateThread',
      ...operationOptions
    });
};

/**
 * __useCommunityPageCreateThreadMutation__
 *
 * To run a mutation, you first call `useCommunityPageCreateThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommunityPageCreateThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [communityPageCreateThreadMutation, { data, loading, error }] = useCommunityPageCreateThreadMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCommunityPageCreateThreadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CommunityPageCreateThreadMutation, CommunityPageCreateThreadMutationVariables>) {
        return ApolloReactHooks.useMutation<CommunityPageCreateThreadMutation, CommunityPageCreateThreadMutationVariables>(CommunityPageCreateThreadDocument, baseOptions);
      }
export type CommunityPageCreateThreadMutationHookResult = ReturnType<typeof useCommunityPageCreateThreadMutation>;
export type CommunityPageCreateThreadMutationResult = ApolloReactCommon.MutationResult<CommunityPageCreateThreadMutation>;
export type CommunityPageCreateThreadMutationOptions = ApolloReactCommon.BaseMutationOptions<CommunityPageCreateThreadMutation, CommunityPageCreateThreadMutationVariables>;
export const CommunityPageThreadLikeDocument = gql`
    mutation communityPageThreadLike($contextId: String!) {
  createLike(contextId: $contextId) {
    ...ActivityPreviewLikeCtx
  }
}
    ${ActivityPreviewLikeCtxFragmentDoc}`;
export type CommunityPageThreadLikeMutationFn = ApolloReactCommon.MutationFunction<CommunityPageThreadLikeMutation, CommunityPageThreadLikeMutationVariables>;
export type CommunityPageThreadLikeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CommunityPageThreadLikeMutation, CommunityPageThreadLikeMutationVariables>, 'mutation'>;

    export const CommunityPageThreadLikeComponent = (props: CommunityPageThreadLikeComponentProps) => (
      <ApolloReactComponents.Mutation<CommunityPageThreadLikeMutation, CommunityPageThreadLikeMutationVariables> mutation={CommunityPageThreadLikeDocument} {...props} />
    );
    
export type CommunityPageThreadLikeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CommunityPageThreadLikeMutation, CommunityPageThreadLikeMutationVariables> & TChildProps;
export function withCommunityPageThreadLike<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CommunityPageThreadLikeMutation,
  CommunityPageThreadLikeMutationVariables,
  CommunityPageThreadLikeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CommunityPageThreadLikeMutation, CommunityPageThreadLikeMutationVariables, CommunityPageThreadLikeProps<TChildProps>>(CommunityPageThreadLikeDocument, {
      alias: 'communityPageThreadLike',
      ...operationOptions
    });
};

/**
 * __useCommunityPageThreadLikeMutation__
 *
 * To run a mutation, you first call `useCommunityPageThreadLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommunityPageThreadLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [communityPageThreadLikeMutation, { data, loading, error }] = useCommunityPageThreadLikeMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *   },
 * });
 */
export function useCommunityPageThreadLikeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CommunityPageThreadLikeMutation, CommunityPageThreadLikeMutationVariables>) {
        return ApolloReactHooks.useMutation<CommunityPageThreadLikeMutation, CommunityPageThreadLikeMutationVariables>(CommunityPageThreadLikeDocument, baseOptions);
      }
export type CommunityPageThreadLikeMutationHookResult = ReturnType<typeof useCommunityPageThreadLikeMutation>;
export type CommunityPageThreadLikeMutationResult = ApolloReactCommon.MutationResult<CommunityPageThreadLikeMutation>;
export type CommunityPageThreadLikeMutationOptions = ApolloReactCommon.BaseMutationOptions<CommunityPageThreadLikeMutation, CommunityPageThreadLikeMutationVariables>;
export const CommunityPageThreadUnlikeDocument = gql`
    mutation communityPageThreadUnlike($contextId: String!) {
  delete(contextId: $contextId) {
    __typename
  }
}
    `;
export type CommunityPageThreadUnlikeMutationFn = ApolloReactCommon.MutationFunction<CommunityPageThreadUnlikeMutation, CommunityPageThreadUnlikeMutationVariables>;
export type CommunityPageThreadUnlikeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CommunityPageThreadUnlikeMutation, CommunityPageThreadUnlikeMutationVariables>, 'mutation'>;

    export const CommunityPageThreadUnlikeComponent = (props: CommunityPageThreadUnlikeComponentProps) => (
      <ApolloReactComponents.Mutation<CommunityPageThreadUnlikeMutation, CommunityPageThreadUnlikeMutationVariables> mutation={CommunityPageThreadUnlikeDocument} {...props} />
    );
    
export type CommunityPageThreadUnlikeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CommunityPageThreadUnlikeMutation, CommunityPageThreadUnlikeMutationVariables> & TChildProps;
export function withCommunityPageThreadUnlike<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CommunityPageThreadUnlikeMutation,
  CommunityPageThreadUnlikeMutationVariables,
  CommunityPageThreadUnlikeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CommunityPageThreadUnlikeMutation, CommunityPageThreadUnlikeMutationVariables, CommunityPageThreadUnlikeProps<TChildProps>>(CommunityPageThreadUnlikeDocument, {
      alias: 'communityPageThreadUnlike',
      ...operationOptions
    });
};

/**
 * __useCommunityPageThreadUnlikeMutation__
 *
 * To run a mutation, you first call `useCommunityPageThreadUnlikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommunityPageThreadUnlikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [communityPageThreadUnlikeMutation, { data, loading, error }] = useCommunityPageThreadUnlikeMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *   },
 * });
 */
export function useCommunityPageThreadUnlikeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CommunityPageThreadUnlikeMutation, CommunityPageThreadUnlikeMutationVariables>) {
        return ApolloReactHooks.useMutation<CommunityPageThreadUnlikeMutation, CommunityPageThreadUnlikeMutationVariables>(CommunityPageThreadUnlikeDocument, baseOptions);
      }
export type CommunityPageThreadUnlikeMutationHookResult = ReturnType<typeof useCommunityPageThreadUnlikeMutation>;
export type CommunityPageThreadUnlikeMutationResult = ApolloReactCommon.MutationResult<CommunityPageThreadUnlikeMutation>;
export type CommunityPageThreadUnlikeMutationOptions = ApolloReactCommon.BaseMutationOptions<CommunityPageThreadUnlikeMutation, CommunityPageThreadUnlikeMutationVariables>;
export const CommunityPageThreadCreateReplyDocument = gql`
    mutation communityPageThreadCreateReply($comment: CommentInput!, $inReplyToId: String!, $threadId: String!) {
  createReply(comment: $comment, inReplyToId: $inReplyToId, threadId: $threadId) {
    ...ActivityPreviewCommentCtxBase
  }
}
    ${ActivityPreviewCommentCtxBaseFragmentDoc}`;
export type CommunityPageThreadCreateReplyMutationFn = ApolloReactCommon.MutationFunction<CommunityPageThreadCreateReplyMutation, CommunityPageThreadCreateReplyMutationVariables>;
export type CommunityPageThreadCreateReplyComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CommunityPageThreadCreateReplyMutation, CommunityPageThreadCreateReplyMutationVariables>, 'mutation'>;

    export const CommunityPageThreadCreateReplyComponent = (props: CommunityPageThreadCreateReplyComponentProps) => (
      <ApolloReactComponents.Mutation<CommunityPageThreadCreateReplyMutation, CommunityPageThreadCreateReplyMutationVariables> mutation={CommunityPageThreadCreateReplyDocument} {...props} />
    );
    
export type CommunityPageThreadCreateReplyProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CommunityPageThreadCreateReplyMutation, CommunityPageThreadCreateReplyMutationVariables> & TChildProps;
export function withCommunityPageThreadCreateReply<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CommunityPageThreadCreateReplyMutation,
  CommunityPageThreadCreateReplyMutationVariables,
  CommunityPageThreadCreateReplyProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CommunityPageThreadCreateReplyMutation, CommunityPageThreadCreateReplyMutationVariables, CommunityPageThreadCreateReplyProps<TChildProps>>(CommunityPageThreadCreateReplyDocument, {
      alias: 'communityPageThreadCreateReply',
      ...operationOptions
    });
};

/**
 * __useCommunityPageThreadCreateReplyMutation__
 *
 * To run a mutation, you first call `useCommunityPageThreadCreateReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommunityPageThreadCreateReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [communityPageThreadCreateReplyMutation, { data, loading, error }] = useCommunityPageThreadCreateReplyMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *      inReplyToId: // value for 'inReplyToId'
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useCommunityPageThreadCreateReplyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CommunityPageThreadCreateReplyMutation, CommunityPageThreadCreateReplyMutationVariables>) {
        return ApolloReactHooks.useMutation<CommunityPageThreadCreateReplyMutation, CommunityPageThreadCreateReplyMutationVariables>(CommunityPageThreadCreateReplyDocument, baseOptions);
      }
export type CommunityPageThreadCreateReplyMutationHookResult = ReturnType<typeof useCommunityPageThreadCreateReplyMutation>;
export type CommunityPageThreadCreateReplyMutationResult = ApolloReactCommon.MutationResult<CommunityPageThreadCreateReplyMutation>;
export type CommunityPageThreadCreateReplyMutationOptions = ApolloReactCommon.BaseMutationOptions<CommunityPageThreadCreateReplyMutation, CommunityPageThreadCreateReplyMutationVariables>;


export interface CommunityPageQueryOperation {
  operationName: 'communityPage'
  result: CommunityPageQuery
  variables: CommunityPageQueryVariables
  type: 'query'
}


export interface CommunityPageCreateThreadMutationOperation {
  operationName: 'communityPageCreateThread'
  result: CommunityPageCreateThreadMutation
  variables: CommunityPageCreateThreadMutationVariables
  type: 'mutation'
}


export interface CommunityPageThreadLikeMutationOperation {
  operationName: 'communityPageThreadLike'
  result: CommunityPageThreadLikeMutation
  variables: CommunityPageThreadLikeMutationVariables
  type: 'mutation'
}


export interface CommunityPageThreadUnlikeMutationOperation {
  operationName: 'communityPageThreadUnlike'
  result: CommunityPageThreadUnlikeMutation
  variables: CommunityPageThreadUnlikeMutationVariables
  type: 'mutation'
}


export interface CommunityPageThreadCreateReplyMutationOperation {
  operationName: 'communityPageThreadCreateReply'
  result: CommunityPageThreadCreateReplyMutation
  variables: CommunityPageThreadCreateReplyMutationVariables
  type: 'mutation'
}
