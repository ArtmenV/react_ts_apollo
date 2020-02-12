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


export type CreateThreadMutationMutationVariables = {
  contextId: Types.Scalars['String'],
  comment: Types.CommentInput
};


export type CreateThreadMutationMutation = (
  { __typename: 'RootMutationType' }
  & { createThread: Types.Maybe<(
    { __typename: 'Comment' }
    & Pick<Types.Comment, 'id' | 'canonicalUrl' | 'content' | 'isLocal' | 'isPublic' | 'isHidden' | 'createdAt' | 'updatedAt'>
    & { inReplyTo: Types.Maybe<(
      { __typename: 'Comment' }
      & BasicCommentWithInReplyToFragment
    )>, creator: Types.Maybe<(
      { __typename: 'User' }
      & Pick<Types.User, 'name' | 'icon'>
    )>, thread: Types.Maybe<(
      { __typename: 'Thread' }
      & Pick<Types.Thread, 'id'>
    )> }
  )> }
);


export const CreateThreadMutationDocument = gql`
    mutation createThreadMutation($contextId: String!, $comment: CommentInput!) {
  createThread(contextId: $contextId, comment: $comment) {
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
    creator {
      name
      icon
    }
    thread {
      id
    }
  }
}
    ${BasicCommentWithInReplyToFragmentDoc}`;
export type CreateThreadMutationMutationFn = ApolloReactCommon.MutationFunction<CreateThreadMutationMutation, CreateThreadMutationMutationVariables>;
export type CreateThreadMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateThreadMutationMutation, CreateThreadMutationMutationVariables>, 'mutation'>;

    export const CreateThreadMutationComponent = (props: CreateThreadMutationComponentProps) => (
      <ApolloReactComponents.Mutation<CreateThreadMutationMutation, CreateThreadMutationMutationVariables> mutation={CreateThreadMutationDocument} {...props} />
    );
    
export type CreateThreadMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateThreadMutationMutation, CreateThreadMutationMutationVariables> & TChildProps;
export function withCreateThreadMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateThreadMutationMutation,
  CreateThreadMutationMutationVariables,
  CreateThreadMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateThreadMutationMutation, CreateThreadMutationMutationVariables, CreateThreadMutationProps<TChildProps>>(CreateThreadMutationDocument, {
      alias: 'createThreadMutation',
      ...operationOptions
    });
};

/**
 * __useCreateThreadMutationMutation__
 *
 * To run a mutation, you first call `useCreateThreadMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateThreadMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createThreadMutationMutation, { data, loading, error }] = useCreateThreadMutationMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCreateThreadMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateThreadMutationMutation, CreateThreadMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateThreadMutationMutation, CreateThreadMutationMutationVariables>(CreateThreadMutationDocument, baseOptions);
      }
export type CreateThreadMutationMutationHookResult = ReturnType<typeof useCreateThreadMutationMutation>;
export type CreateThreadMutationMutationResult = ApolloReactCommon.MutationResult<CreateThreadMutationMutation>;
export type CreateThreadMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateThreadMutationMutation, CreateThreadMutationMutationVariables>;


export interface CreateThreadMutationMutationOperation {
  operationName: 'createThreadMutation'
  result: CreateThreadMutationMutation
  variables: CreateThreadMutationMutationVariables
  type: 'mutation'
}
