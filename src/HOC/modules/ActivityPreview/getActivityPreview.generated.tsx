import * as Types from '../../../graphql/types.generated';

import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type GetActivityPreviewQueryVariables = {
  activityId: Types.Scalars['String']
};


export type GetActivityPreviewQuery = (
  { __typename: 'RootQueryType' }
  & { activity: Types.Maybe<(
    { __typename: 'Activity' }
    & ActivityPreviewDataFragment
  )> }
);

export type ActivityPreviewDataFragment = (
  { __typename: 'Activity' }
  & Pick<Types.Activity, 'createdAt' | 'id' | 'verb'>
  & { user: Types.Maybe<(
    { __typename: 'User' }
    & ActivityPreviewUserCtxFragment
  )>, context: Types.Maybe<(
    { __typename: 'Collection' }
    & ActivityPreviewCollectionCtxFragment
  ) | (
    { __typename: 'Comment' }
    & ActivityPreviewCommentCtxExtendedFragment
  ) | (
    { __typename: 'Community' }
    & ActivityPreviewCommunityCtxFragment
  ) | (
    { __typename: 'Flag' }
    & ActivityPreviewFlagCtxFragment
  ) | (
    { __typename: 'Follow' }
    & ActivityPreviewFollowCtxFragment
  ) | (
    { __typename: 'Like' }
    & ActivityPreviewLikeCtxFragment
  ) | (
    { __typename: 'Resource' }
    & ActivityPreviewResourceCtxFragment
  ) | (
    { __typename: 'User' }
    & ActivityPreviewUserCtxFragment
  )> }
);

export type ActivityPreviewUserCtxFragment = (
  { __typename: 'User' }
  & Pick<Types.User, 'icon' | 'image' | 'isLocal' | 'summary' | 'canonicalUrl'>
  & { userId: Types.User['id'], userName: Types.User['name'] }
  & { myFollow: Types.Maybe<(
    { __typename: 'Follow' }
    & Pick<Types.Follow, 'id'>
  )>, likes: Types.Maybe<(
    { __typename: 'LikesEdges' }
    & Pick<Types.LikesEdges, 'totalCount'>
  )>, myLike: Types.Maybe<(
    { __typename: 'Like' }
    & Pick<Types.Like, 'id'>
  )> }
);

export type ActivityPreviewBaseThreadFragment = (
  { __typename: 'Thread' }
  & Pick<Types.Thread, 'id' | 'isLocal' | 'canonicalUrl'>
);

export type ActivityPreviewCollectionCtxFragment = (
  { __typename: 'Collection' }
  & Pick<Types.Collection, 'id' | 'isLocal' | 'icon' | 'name' | 'summary' | 'canonicalUrl'>
  & { community: Types.Maybe<(
    { __typename: 'Community' }
    & Pick<Types.Community, 'id'>
    & { myFollow: Types.Maybe<(
      { __typename: 'Follow' }
      & Pick<Types.Follow, 'id'>
    )> }
  )>, creator: Types.Maybe<(
    { __typename: 'User' }
    & ActivityPreviewUserCtxFragment
  )>, likes: Types.Maybe<(
    { __typename: 'LikesEdges' }
    & Pick<Types.LikesEdges, 'totalCount'>
  )>, myLike: Types.Maybe<(
    { __typename: 'Like' }
    & Pick<Types.Like, 'id'>
  )> }
);

export type ActivityPreviewCommentCtxExtendedFragment = (
  { __typename: 'Comment' }
  & { inReplyTo: Types.Maybe<(
    { __typename: 'Comment' }
    & ActivityPreviewCommentCtxBaseFragment
  )>, likes: Types.Maybe<(
    { __typename: 'LikesEdges' }
    & Pick<Types.LikesEdges, 'totalCount'>
  )>, myLike: Types.Maybe<(
    { __typename: 'Like' }
    & Pick<Types.Like, 'id'>
  )>, thread: Types.Maybe<(
    { __typename: 'Thread' }
    & ActivityPreviewExtendedThreadFragment
  )> }
  & ActivityPreviewCommentCtxBaseFragment
);

export type ActivityPreviewCommentCtxBaseFragment = (
  { __typename: 'Comment' }
  & Pick<Types.Comment, 'id' | 'isLocal' | 'content' | 'canonicalUrl' | 'createdAt'>
  & { creator: Types.Maybe<(
    { __typename: 'User' }
    & ActivityPreviewUserCtxFragment
  )>, thread: Types.Maybe<(
    { __typename: 'Thread' }
    & ActivityPreviewBaseThreadFragment
  )> }
);

export type ActivityPreviewCommunityCtxFragment = (
  { __typename: 'Community' }
  & Pick<Types.Community, 'id' | 'isLocal' | 'icon' | 'name' | 'summary' | 'canonicalUrl'>
  & { myFollow: Types.Maybe<(
    { __typename: 'Follow' }
    & Pick<Types.Follow, 'id'>
  )>, creator: Types.Maybe<(
    { __typename: 'User' }
    & ActivityPreviewUserCtxFragment
  )>, myLike: Types.Maybe<(
    { __typename: 'Like' }
    & Pick<Types.Like, 'id'>
  )> }
);

export type ActivityPreviewResourceCtxFragment = (
  { __typename: 'Resource' }
  & Pick<Types.Resource, 'id' | 'isLocal' | 'icon' | 'name' | 'summary' | 'canonicalUrl' | 'url'>
  & { collection: Types.Maybe<(
    { __typename: 'Collection' }
    & ActivityPreviewCollectionCtxFragment
  )>, creator: Types.Maybe<(
    { __typename: 'User' }
    & ActivityPreviewUserCtxFragment
  )>, likes: Types.Maybe<(
    { __typename: 'LikesEdges' }
    & Pick<Types.LikesEdges, 'totalCount'>
  )>, myLike: Types.Maybe<(
    { __typename: 'Like' }
    & Pick<Types.Like, 'id'>
  )> }
);

export type ActivityPreviewFlagCtxFragment = (
  { __typename: 'Flag' }
  & Pick<Types.Flag, 'isLocal'>
  & { context: Types.Maybe<(
    { __typename: 'Collection' }
    & ActivityPreviewCollectionCtxFragment
  ) | (
    { __typename: 'Comment' }
    & ActivityPreviewCommentCtxBaseFragment
  ) | (
    { __typename: 'Community' }
    & ActivityPreviewCommunityCtxFragment
  ) | (
    { __typename: 'Resource' }
    & ActivityPreviewResourceCtxFragment
  ) | (
    { __typename: 'User' }
    & ActivityPreviewUserCtxFragment
  )> }
);

export type ActivityPreviewLikeCtxFragment = (
  { __typename: 'Like' }
  & Pick<Types.Like, 'isLocal'>
  & { context: Types.Maybe<(
    { __typename: 'Collection' }
    & ActivityPreviewCollectionCtxFragment
  ) | (
    { __typename: 'Comment' }
    & ActivityPreviewCommentCtxExtendedFragment
  ) | { __typename: 'Community' } | (
    { __typename: 'Resource' }
    & ActivityPreviewResourceCtxFragment
  ) | (
    { __typename: 'User' }
    & ActivityPreviewUserCtxFragment
  )> }
);

export type ActivityPreviewFollowCtxFragment = (
  { __typename: 'Follow' }
  & Pick<Types.Follow, 'isLocal'>
  & { context: Types.Maybe<(
    { __typename: 'Collection' }
    & ActivityPreviewCollectionCtxFragment
  ) | (
    { __typename: 'Community' }
    & ActivityPreviewCommunityCtxFragment
  ) | (
    { __typename: 'Thread' }
    & ActivityPreviewExtendedThreadFragment
  ) | (
    { __typename: 'User' }
    & ActivityPreviewUserCtxFragment
  )> }
);

export type ActivityPreviewExtendedThreadFragment = (
  { __typename: 'Thread' }
  & { context: Types.Maybe<(
    { __typename: 'Collection' }
    & ActivityPreviewCollectionCtxFragment
  ) | (
    { __typename: 'Community' }
    & ActivityPreviewCommunityCtxFragment
  ) | (
    { __typename: 'Flag' }
    & ActivityPreviewFlagCtxFragment
  ) | (
    { __typename: 'Resource' }
    & ActivityPreviewResourceCtxFragment
  )> }
  & ActivityPreviewBaseThreadFragment
);

export type ActivityPreviewLikeMutationVariables = {
  contextId: Types.Scalars['String']
};


export type ActivityPreviewLikeMutation = (
  { __typename: 'RootMutationType' }
  & { createLike: Types.Maybe<(
    { __typename: 'Like' }
    & ActivityPreviewLikeCtxFragment
  )> }
);

export type ActivityPreviewUnlikeMutationVariables = {
  contextId: Types.Scalars['String']
};


export type ActivityPreviewUnlikeMutation = (
  { __typename: 'RootMutationType' }
  & { delete: Types.Maybe<{ __typename: 'Collection' } | { __typename: 'Comment' } | { __typename: 'Community' } | { __typename: 'Feature' } | { __typename: 'Follow' } | { __typename: 'Like' } | { __typename: 'Resource' } | { __typename: 'Thread' } | { __typename: 'User' }> }
);

export type ActivityPreviewCreateReplyMutationVariables = {
  comment: Types.CommentInput,
  inReplyToId: Types.Scalars['String'],
  threadId: Types.Scalars['String']
};


export type ActivityPreviewCreateReplyMutation = (
  { __typename: 'RootMutationType' }
  & { createReply: Types.Maybe<(
    { __typename: 'Comment' }
    & ActivityPreviewCommentCtxBaseFragment
  )> }
);

export type ActivityPreviewCreateThreadMutationVariables = {
  contextId: Types.Scalars['String'],
  comment: Types.CommentInput
};


export type ActivityPreviewCreateThreadMutation = (
  { __typename: 'RootMutationType' }
  & { createThread: Types.Maybe<(
    { __typename: 'Comment' }
    & ActivityPreviewCommentCtxBaseFragment
  )> }
);

export const ActivityPreviewUserCtxFragmentDoc = gql`
    fragment ActivityPreviewUserCtx on User {
  icon
  image
  userId: id
  userName: name
  isLocal
  summary
  canonicalUrl
  myFollow {
    id
  }
  likes {
    totalCount
  }
  myLike {
    id
  }
}
    `;
export const ActivityPreviewCollectionCtxFragmentDoc = gql`
    fragment ActivityPreviewCollectionCtx on Collection {
  id
  isLocal
  icon
  name
  summary
  canonicalUrl
  community {
    id
    myFollow {
      id
    }
  }
  creator {
    ...ActivityPreviewUserCtx
  }
  likes {
    totalCount
  }
  myLike {
    id
  }
}
    ${ActivityPreviewUserCtxFragmentDoc}`;
export const ActivityPreviewBaseThreadFragmentDoc = gql`
    fragment ActivityPreviewBaseThread on Thread {
  id
  isLocal
  canonicalUrl
}
    `;
export const ActivityPreviewCommentCtxBaseFragmentDoc = gql`
    fragment ActivityPreviewCommentCtxBase on Comment {
  id
  isLocal
  content
  canonicalUrl
  createdAt
  creator {
    ...ActivityPreviewUserCtx
  }
  thread {
    ...ActivityPreviewBaseThread
  }
}
    ${ActivityPreviewUserCtxFragmentDoc}
${ActivityPreviewBaseThreadFragmentDoc}`;
export const ActivityPreviewCommunityCtxFragmentDoc = gql`
    fragment ActivityPreviewCommunityCtx on Community {
  id
  isLocal
  icon
  name
  summary
  canonicalUrl
  myFollow {
    id
  }
  creator {
    ...ActivityPreviewUserCtx
  }
  myLike {
    id
  }
}
    ${ActivityPreviewUserCtxFragmentDoc}`;
export const ActivityPreviewResourceCtxFragmentDoc = gql`
    fragment ActivityPreviewResourceCtx on Resource {
  id
  isLocal
  icon
  name
  summary
  canonicalUrl
  url
  collection {
    ...ActivityPreviewCollectionCtx
  }
  creator {
    ...ActivityPreviewUserCtx
  }
  likes {
    totalCount
  }
  myLike {
    id
  }
}
    ${ActivityPreviewCollectionCtxFragmentDoc}
${ActivityPreviewUserCtxFragmentDoc}`;
export const ActivityPreviewFlagCtxFragmentDoc = gql`
    fragment ActivityPreviewFlagCtx on Flag {
  isLocal
  context {
    ... on Collection {
      ...ActivityPreviewCollectionCtx
    }
    ... on Comment {
      ...ActivityPreviewCommentCtxBase
    }
    ... on Community {
      ...ActivityPreviewCommunityCtx
    }
    ... on Resource {
      ...ActivityPreviewResourceCtx
    }
    ... on User {
      ...ActivityPreviewUserCtx
    }
  }
}
    ${ActivityPreviewCollectionCtxFragmentDoc}
${ActivityPreviewCommentCtxBaseFragmentDoc}
${ActivityPreviewCommunityCtxFragmentDoc}
${ActivityPreviewResourceCtxFragmentDoc}
${ActivityPreviewUserCtxFragmentDoc}`;
export const ActivityPreviewExtendedThreadFragmentDoc = gql`
    fragment ActivityPreviewExtendedThread on Thread {
  ...ActivityPreviewBaseThread
  context {
    ... on Collection {
      ...ActivityPreviewCollectionCtx
    }
    ... on Community {
      ...ActivityPreviewCommunityCtx
    }
    ... on Resource {
      ...ActivityPreviewResourceCtx
    }
    ... on Flag {
      ...ActivityPreviewFlagCtx
    }
  }
}
    ${ActivityPreviewBaseThreadFragmentDoc}
${ActivityPreviewCollectionCtxFragmentDoc}
${ActivityPreviewCommunityCtxFragmentDoc}
${ActivityPreviewResourceCtxFragmentDoc}
${ActivityPreviewFlagCtxFragmentDoc}`;
export const ActivityPreviewCommentCtxExtendedFragmentDoc = gql`
    fragment ActivityPreviewCommentCtxExtended on Comment {
  ...ActivityPreviewCommentCtxBase
  inReplyTo {
    ...ActivityPreviewCommentCtxBase
  }
  likes {
    totalCount
  }
  myLike {
    id
  }
  thread {
    ...ActivityPreviewExtendedThread
  }
}
    ${ActivityPreviewCommentCtxBaseFragmentDoc}
${ActivityPreviewExtendedThreadFragmentDoc}`;
export const ActivityPreviewLikeCtxFragmentDoc = gql`
    fragment ActivityPreviewLikeCtx on Like {
  isLocal
  context {
    ... on Collection {
      ...ActivityPreviewCollectionCtx
    }
    ... on Comment {
      ...ActivityPreviewCommentCtxExtended
    }
    ... on Resource {
      ...ActivityPreviewResourceCtx
    }
    ... on User {
      ...ActivityPreviewUserCtx
    }
  }
}
    ${ActivityPreviewCollectionCtxFragmentDoc}
${ActivityPreviewCommentCtxExtendedFragmentDoc}
${ActivityPreviewResourceCtxFragmentDoc}
${ActivityPreviewUserCtxFragmentDoc}`;
export const ActivityPreviewFollowCtxFragmentDoc = gql`
    fragment ActivityPreviewFollowCtx on Follow {
  isLocal
  context {
    ... on Collection {
      ...ActivityPreviewCollectionCtx
    }
    ... on Community {
      ...ActivityPreviewCommunityCtx
    }
    ... on User {
      ...ActivityPreviewUserCtx
    }
    ... on Thread {
      ...ActivityPreviewExtendedThread
    }
  }
}
    ${ActivityPreviewCollectionCtxFragmentDoc}
${ActivityPreviewCommunityCtxFragmentDoc}
${ActivityPreviewUserCtxFragmentDoc}
${ActivityPreviewExtendedThreadFragmentDoc}`;
export const ActivityPreviewDataFragmentDoc = gql`
    fragment ActivityPreviewData on Activity {
  createdAt
  id
  verb
  user {
    ...ActivityPreviewUserCtx
  }
  context {
    __typename
    ... on Collection {
      ...ActivityPreviewCollectionCtx
    }
    ... on Comment {
      ...ActivityPreviewCommentCtxExtended
    }
    ... on Community {
      ...ActivityPreviewCommunityCtx
    }
    ... on Resource {
      ...ActivityPreviewResourceCtx
    }
    ... on Flag {
      ...ActivityPreviewFlagCtx
    }
    ... on Like {
      ...ActivityPreviewLikeCtx
    }
    ... on Follow {
      ...ActivityPreviewFollowCtx
    }
    ... on User {
      ...ActivityPreviewUserCtx
    }
  }
}
    ${ActivityPreviewUserCtxFragmentDoc}
${ActivityPreviewCollectionCtxFragmentDoc}
${ActivityPreviewCommentCtxExtendedFragmentDoc}
${ActivityPreviewCommunityCtxFragmentDoc}
${ActivityPreviewResourceCtxFragmentDoc}
${ActivityPreviewFlagCtxFragmentDoc}
${ActivityPreviewLikeCtxFragmentDoc}
${ActivityPreviewFollowCtxFragmentDoc}`;
export const GetActivityPreviewDocument = gql`
    query getActivityPreview($activityId: String!) {
  activity(activityId: $activityId) {
    ...ActivityPreviewData
  }
}
    ${ActivityPreviewDataFragmentDoc}`;
export type GetActivityPreviewComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetActivityPreviewQuery, GetActivityPreviewQueryVariables>, 'query'> & ({ variables: GetActivityPreviewQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetActivityPreviewComponent = (props: GetActivityPreviewComponentProps) => (
      <ApolloReactComponents.Query<GetActivityPreviewQuery, GetActivityPreviewQueryVariables> query={GetActivityPreviewDocument} {...props} />
    );
    
export type GetActivityPreviewProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetActivityPreviewQuery, GetActivityPreviewQueryVariables> & TChildProps;
export function withGetActivityPreview<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetActivityPreviewQuery,
  GetActivityPreviewQueryVariables,
  GetActivityPreviewProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetActivityPreviewQuery, GetActivityPreviewQueryVariables, GetActivityPreviewProps<TChildProps>>(GetActivityPreviewDocument, {
      alias: 'getActivityPreview',
      ...operationOptions
    });
};

/**
 * __useGetActivityPreviewQuery__
 *
 * To run a query within a React component, call `useGetActivityPreviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivityPreviewQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivityPreviewQuery({
 *   variables: {
 *      activityId: // value for 'activityId'
 *   },
 * });
 */
export function useGetActivityPreviewQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetActivityPreviewQuery, GetActivityPreviewQueryVariables>) {
        return ApolloReactHooks.useQuery<GetActivityPreviewQuery, GetActivityPreviewQueryVariables>(GetActivityPreviewDocument, baseOptions);
      }
export function useGetActivityPreviewLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetActivityPreviewQuery, GetActivityPreviewQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetActivityPreviewQuery, GetActivityPreviewQueryVariables>(GetActivityPreviewDocument, baseOptions);
        }
export type GetActivityPreviewQueryHookResult = ReturnType<typeof useGetActivityPreviewQuery>;
export type GetActivityPreviewLazyQueryHookResult = ReturnType<typeof useGetActivityPreviewLazyQuery>;
export type GetActivityPreviewQueryResult = ApolloReactCommon.QueryResult<GetActivityPreviewQuery, GetActivityPreviewQueryVariables>;
export const ActivityPreviewLikeDocument = gql`
    mutation activityPreviewLike($contextId: String!) {
  createLike(contextId: $contextId) {
    ...ActivityPreviewLikeCtx
  }
}
    ${ActivityPreviewLikeCtxFragmentDoc}`;
export type ActivityPreviewLikeMutationFn = ApolloReactCommon.MutationFunction<ActivityPreviewLikeMutation, ActivityPreviewLikeMutationVariables>;
export type ActivityPreviewLikeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ActivityPreviewLikeMutation, ActivityPreviewLikeMutationVariables>, 'mutation'>;

    export const ActivityPreviewLikeComponent = (props: ActivityPreviewLikeComponentProps) => (
      <ApolloReactComponents.Mutation<ActivityPreviewLikeMutation, ActivityPreviewLikeMutationVariables> mutation={ActivityPreviewLikeDocument} {...props} />
    );
    
export type ActivityPreviewLikeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ActivityPreviewLikeMutation, ActivityPreviewLikeMutationVariables> & TChildProps;
export function withActivityPreviewLike<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ActivityPreviewLikeMutation,
  ActivityPreviewLikeMutationVariables,
  ActivityPreviewLikeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ActivityPreviewLikeMutation, ActivityPreviewLikeMutationVariables, ActivityPreviewLikeProps<TChildProps>>(ActivityPreviewLikeDocument, {
      alias: 'activityPreviewLike',
      ...operationOptions
    });
};

/**
 * __useActivityPreviewLikeMutation__
 *
 * To run a mutation, you first call `useActivityPreviewLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivityPreviewLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activityPreviewLikeMutation, { data, loading, error }] = useActivityPreviewLikeMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *   },
 * });
 */
export function useActivityPreviewLikeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ActivityPreviewLikeMutation, ActivityPreviewLikeMutationVariables>) {
        return ApolloReactHooks.useMutation<ActivityPreviewLikeMutation, ActivityPreviewLikeMutationVariables>(ActivityPreviewLikeDocument, baseOptions);
      }
export type ActivityPreviewLikeMutationHookResult = ReturnType<typeof useActivityPreviewLikeMutation>;
export type ActivityPreviewLikeMutationResult = ApolloReactCommon.MutationResult<ActivityPreviewLikeMutation>;
export type ActivityPreviewLikeMutationOptions = ApolloReactCommon.BaseMutationOptions<ActivityPreviewLikeMutation, ActivityPreviewLikeMutationVariables>;
export const ActivityPreviewUnlikeDocument = gql`
    mutation activityPreviewUnlike($contextId: String!) {
  delete(contextId: $contextId) {
    __typename
  }
}
    `;
export type ActivityPreviewUnlikeMutationFn = ApolloReactCommon.MutationFunction<ActivityPreviewUnlikeMutation, ActivityPreviewUnlikeMutationVariables>;
export type ActivityPreviewUnlikeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ActivityPreviewUnlikeMutation, ActivityPreviewUnlikeMutationVariables>, 'mutation'>;

    export const ActivityPreviewUnlikeComponent = (props: ActivityPreviewUnlikeComponentProps) => (
      <ApolloReactComponents.Mutation<ActivityPreviewUnlikeMutation, ActivityPreviewUnlikeMutationVariables> mutation={ActivityPreviewUnlikeDocument} {...props} />
    );
    
export type ActivityPreviewUnlikeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ActivityPreviewUnlikeMutation, ActivityPreviewUnlikeMutationVariables> & TChildProps;
export function withActivityPreviewUnlike<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ActivityPreviewUnlikeMutation,
  ActivityPreviewUnlikeMutationVariables,
  ActivityPreviewUnlikeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ActivityPreviewUnlikeMutation, ActivityPreviewUnlikeMutationVariables, ActivityPreviewUnlikeProps<TChildProps>>(ActivityPreviewUnlikeDocument, {
      alias: 'activityPreviewUnlike',
      ...operationOptions
    });
};

/**
 * __useActivityPreviewUnlikeMutation__
 *
 * To run a mutation, you first call `useActivityPreviewUnlikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivityPreviewUnlikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activityPreviewUnlikeMutation, { data, loading, error }] = useActivityPreviewUnlikeMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *   },
 * });
 */
export function useActivityPreviewUnlikeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ActivityPreviewUnlikeMutation, ActivityPreviewUnlikeMutationVariables>) {
        return ApolloReactHooks.useMutation<ActivityPreviewUnlikeMutation, ActivityPreviewUnlikeMutationVariables>(ActivityPreviewUnlikeDocument, baseOptions);
      }
export type ActivityPreviewUnlikeMutationHookResult = ReturnType<typeof useActivityPreviewUnlikeMutation>;
export type ActivityPreviewUnlikeMutationResult = ApolloReactCommon.MutationResult<ActivityPreviewUnlikeMutation>;
export type ActivityPreviewUnlikeMutationOptions = ApolloReactCommon.BaseMutationOptions<ActivityPreviewUnlikeMutation, ActivityPreviewUnlikeMutationVariables>;
export const ActivityPreviewCreateReplyDocument = gql`
    mutation activityPreviewCreateReply($comment: CommentInput!, $inReplyToId: String!, $threadId: String!) {
  createReply(comment: $comment, inReplyToId: $inReplyToId, threadId: $threadId) {
    ...ActivityPreviewCommentCtxBase
  }
}
    ${ActivityPreviewCommentCtxBaseFragmentDoc}`;
export type ActivityPreviewCreateReplyMutationFn = ApolloReactCommon.MutationFunction<ActivityPreviewCreateReplyMutation, ActivityPreviewCreateReplyMutationVariables>;
export type ActivityPreviewCreateReplyComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ActivityPreviewCreateReplyMutation, ActivityPreviewCreateReplyMutationVariables>, 'mutation'>;

    export const ActivityPreviewCreateReplyComponent = (props: ActivityPreviewCreateReplyComponentProps) => (
      <ApolloReactComponents.Mutation<ActivityPreviewCreateReplyMutation, ActivityPreviewCreateReplyMutationVariables> mutation={ActivityPreviewCreateReplyDocument} {...props} />
    );
    
export type ActivityPreviewCreateReplyProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ActivityPreviewCreateReplyMutation, ActivityPreviewCreateReplyMutationVariables> & TChildProps;
export function withActivityPreviewCreateReply<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ActivityPreviewCreateReplyMutation,
  ActivityPreviewCreateReplyMutationVariables,
  ActivityPreviewCreateReplyProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ActivityPreviewCreateReplyMutation, ActivityPreviewCreateReplyMutationVariables, ActivityPreviewCreateReplyProps<TChildProps>>(ActivityPreviewCreateReplyDocument, {
      alias: 'activityPreviewCreateReply',
      ...operationOptions
    });
};

/**
 * __useActivityPreviewCreateReplyMutation__
 *
 * To run a mutation, you first call `useActivityPreviewCreateReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivityPreviewCreateReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activityPreviewCreateReplyMutation, { data, loading, error }] = useActivityPreviewCreateReplyMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *      inReplyToId: // value for 'inReplyToId'
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useActivityPreviewCreateReplyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ActivityPreviewCreateReplyMutation, ActivityPreviewCreateReplyMutationVariables>) {
        return ApolloReactHooks.useMutation<ActivityPreviewCreateReplyMutation, ActivityPreviewCreateReplyMutationVariables>(ActivityPreviewCreateReplyDocument, baseOptions);
      }
export type ActivityPreviewCreateReplyMutationHookResult = ReturnType<typeof useActivityPreviewCreateReplyMutation>;
export type ActivityPreviewCreateReplyMutationResult = ApolloReactCommon.MutationResult<ActivityPreviewCreateReplyMutation>;
export type ActivityPreviewCreateReplyMutationOptions = ApolloReactCommon.BaseMutationOptions<ActivityPreviewCreateReplyMutation, ActivityPreviewCreateReplyMutationVariables>;
export const ActivityPreviewCreateThreadDocument = gql`
    mutation activityPreviewCreateThread($contextId: String!, $comment: CommentInput!) {
  createThread(comment: $comment, contextId: $contextId) {
    ...ActivityPreviewCommentCtxBase
  }
}
    ${ActivityPreviewCommentCtxBaseFragmentDoc}`;
export type ActivityPreviewCreateThreadMutationFn = ApolloReactCommon.MutationFunction<ActivityPreviewCreateThreadMutation, ActivityPreviewCreateThreadMutationVariables>;
export type ActivityPreviewCreateThreadComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ActivityPreviewCreateThreadMutation, ActivityPreviewCreateThreadMutationVariables>, 'mutation'>;

    export const ActivityPreviewCreateThreadComponent = (props: ActivityPreviewCreateThreadComponentProps) => (
      <ApolloReactComponents.Mutation<ActivityPreviewCreateThreadMutation, ActivityPreviewCreateThreadMutationVariables> mutation={ActivityPreviewCreateThreadDocument} {...props} />
    );
    
export type ActivityPreviewCreateThreadProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ActivityPreviewCreateThreadMutation, ActivityPreviewCreateThreadMutationVariables> & TChildProps;
export function withActivityPreviewCreateThread<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ActivityPreviewCreateThreadMutation,
  ActivityPreviewCreateThreadMutationVariables,
  ActivityPreviewCreateThreadProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ActivityPreviewCreateThreadMutation, ActivityPreviewCreateThreadMutationVariables, ActivityPreviewCreateThreadProps<TChildProps>>(ActivityPreviewCreateThreadDocument, {
      alias: 'activityPreviewCreateThread',
      ...operationOptions
    });
};

/**
 * __useActivityPreviewCreateThreadMutation__
 *
 * To run a mutation, you first call `useActivityPreviewCreateThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivityPreviewCreateThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activityPreviewCreateThreadMutation, { data, loading, error }] = useActivityPreviewCreateThreadMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useActivityPreviewCreateThreadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ActivityPreviewCreateThreadMutation, ActivityPreviewCreateThreadMutationVariables>) {
        return ApolloReactHooks.useMutation<ActivityPreviewCreateThreadMutation, ActivityPreviewCreateThreadMutationVariables>(ActivityPreviewCreateThreadDocument, baseOptions);
      }
export type ActivityPreviewCreateThreadMutationHookResult = ReturnType<typeof useActivityPreviewCreateThreadMutation>;
export type ActivityPreviewCreateThreadMutationResult = ApolloReactCommon.MutationResult<ActivityPreviewCreateThreadMutation>;
export type ActivityPreviewCreateThreadMutationOptions = ApolloReactCommon.BaseMutationOptions<ActivityPreviewCreateThreadMutation, ActivityPreviewCreateThreadMutationVariables>;


export interface GetActivityPreviewQueryOperation {
  operationName: 'getActivityPreview'
  result: GetActivityPreviewQuery
  variables: GetActivityPreviewQueryVariables
  type: 'query'
}


export interface ActivityPreviewLikeMutationOperation {
  operationName: 'activityPreviewLike'
  result: ActivityPreviewLikeMutation
  variables: ActivityPreviewLikeMutationVariables
  type: 'mutation'
}


export interface ActivityPreviewUnlikeMutationOperation {
  operationName: 'activityPreviewUnlike'
  result: ActivityPreviewUnlikeMutation
  variables: ActivityPreviewUnlikeMutationVariables
  type: 'mutation'
}


export interface ActivityPreviewCreateReplyMutationOperation {
  operationName: 'activityPreviewCreateReply'
  result: ActivityPreviewCreateReplyMutation
  variables: ActivityPreviewCreateReplyMutationVariables
  type: 'mutation'
}


export interface ActivityPreviewCreateThreadMutationOperation {
  operationName: 'activityPreviewCreateThread'
  result: ActivityPreviewCreateThreadMutation
  variables: ActivityPreviewCreateThreadMutationVariables
  type: 'mutation'
}
