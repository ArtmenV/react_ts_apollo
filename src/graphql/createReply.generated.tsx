import * as Types from './types.generated';

import { BasicCommentWithInReplyToFragment } from './fragments/basicComment.generated';
import gql from 'graphql-tag';
import { BasicCommentWithInReplyToFragmentDoc } from './fragments/basicComment.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


export type CreateReplyMutationMutationVariables = {
  comment: Types.CommentInput,
  inReplyToId: Types.Scalars['String'],
  threadId: Types.Scalars['String']
};


export type CreateReplyMutationMutation = (
  { __typename: 'RootMutationType' }
  & { createReply: Types.Maybe<(
    { __typename: 'Comment' }
    & Pick<Types.Comment, 'id' | 'canonicalUrl' | 'content' | 'isLocal' | 'isPublic' | 'isHidden' | 'createdAt' | 'updatedAt'>
    & { inReplyTo: Types.Maybe<(
      { __typename: 'Comment' }
      & BasicCommentWithInReplyToFragment
    )>, myLike: Types.Maybe<(
      { __typename: 'Like' }
      & Pick<Types.Like, 'id'>
    )>, creator: Types.Maybe<(
      { __typename: 'User' }
      & Pick<Types.User, 'id' | 'preferredUsername' | 'canonicalUrl' | 'isLocal' | 'isPublic' | 'isDisabled' | 'icon' | 'name'>
    )> }
  )> }
);


export const CreateReplyMutationDocument = gql`
    mutation createReplyMutation($comment: CommentInput!, $inReplyToId: String!, $threadId: String!) {
  createReply(comment: $comment, inReplyToId: $inReplyToId, threadId: $threadId) {
    id
    canonicalUrl
    inReplyTo {
      ...BasicCommentWithInReplyTo
    }
    content
    isLocal
    isPublic
    isHidden
    createdAt
    updatedAt
    myLike {
      id
    }
    creator {
      id
      preferredUsername
      canonicalUrl
      isLocal
      isPublic
      isDisabled
      icon
      name
    }
  }
}
    ${BasicCommentWithInReplyToFragmentDoc}`;
export type CreateReplyMutationMutationFn = ApolloReactCommon.MutationFunction<CreateReplyMutationMutation, CreateReplyMutationMutationVariables>;
export type CreateReplyMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateReplyMutationMutation, CreateReplyMutationMutationVariables>, 'mutation'>;

    export const CreateReplyMutationComponent = (props: CreateReplyMutationComponentProps) => (
      <ApolloReactComponents.Mutation<CreateReplyMutationMutation, CreateReplyMutationMutationVariables> mutation={CreateReplyMutationDocument} {...props} />
    );
    
export type CreateReplyMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateReplyMutationMutation, CreateReplyMutationMutationVariables> & TChildProps;
export function withCreateReplyMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateReplyMutationMutation,
  CreateReplyMutationMutationVariables,
  CreateReplyMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateReplyMutationMutation, CreateReplyMutationMutationVariables, CreateReplyMutationProps<TChildProps>>(CreateReplyMutationDocument, {
      alias: 'createReplyMutation',
      ...operationOptions
    });
};

/**
 * __useCreateReplyMutationMutation__
 *
 * To run a mutation, you first call `useCreateReplyMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReplyMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReplyMutationMutation, { data, loading, error }] = useCreateReplyMutationMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *      inReplyToId: // value for 'inReplyToId'
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useCreateReplyMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateReplyMutationMutation, CreateReplyMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateReplyMutationMutation, CreateReplyMutationMutationVariables>(CreateReplyMutationDocument, baseOptions);
      }
export type CreateReplyMutationMutationHookResult = ReturnType<typeof useCreateReplyMutationMutation>;
export type CreateReplyMutationMutationResult = ApolloReactCommon.MutationResult<CreateReplyMutationMutation>;
export type CreateReplyMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateReplyMutationMutation, CreateReplyMutationMutationVariables>;


export interface CreateReplyMutationMutationOperation {
  operationName: 'createReplyMutation'
  result: CreateReplyMutationMutation
  variables: CreateReplyMutationMutationVariables
  type: 'mutation'
}
