import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type CreateUserMutationMutationVariables = {
  user: Types.RegistrationInput
};


export type CreateUserMutationMutation = (
  { __typename: 'RootMutationType' }
  & { createUser: Types.Maybe<(
    { __typename: 'Me' }
    & Pick<Types.Me, 'email' | 'wantsEmailDigest' | 'wantsNotifications' | 'isConfirmed'>
    & { user: (
      { __typename: 'User' }
      & Pick<Types.User, 'id' | 'preferredUsername' | 'name' | 'summary' | 'location' | 'website'>
    ) }
  )> }
);


export const CreateUserMutationDocument = gql`
    mutation createUserMutation($user: RegistrationInput!) {
  createUser(user: $user) {
    email
    wantsEmailDigest
    wantsNotifications
    isConfirmed
    user {
      id
      preferredUsername
      name
      summary
      location
      website
    }
  }
}
    `;
export type CreateUserMutationMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutationMutation, CreateUserMutationMutationVariables>;
export type CreateUserMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateUserMutationMutation, CreateUserMutationMutationVariables>, 'mutation'>;

    export const CreateUserMutationComponent = (props: CreateUserMutationComponentProps) => (
      <ApolloReactComponents.Mutation<CreateUserMutationMutation, CreateUserMutationMutationVariables> mutation={CreateUserMutationDocument} {...props} />
    );
    
export type CreateUserMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateUserMutationMutation, CreateUserMutationMutationVariables> & TChildProps;
export function withCreateUserMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateUserMutationMutation,
  CreateUserMutationMutationVariables,
  CreateUserMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateUserMutationMutation, CreateUserMutationMutationVariables, CreateUserMutationProps<TChildProps>>(CreateUserMutationDocument, {
      alias: 'createUserMutation',
      ...operationOptions
    });
};

/**
 * __useCreateUserMutationMutation__
 *
 * To run a mutation, you first call `useCreateUserMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutationMutation, { data, loading, error }] = useCreateUserMutationMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateUserMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutationMutation, CreateUserMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutationMutation, CreateUserMutationMutationVariables>(CreateUserMutationDocument, baseOptions);
      }
export type CreateUserMutationMutationHookResult = ReturnType<typeof useCreateUserMutationMutation>;
export type CreateUserMutationMutationResult = ApolloReactCommon.MutationResult<CreateUserMutationMutation>;
export type CreateUserMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutationMutation, CreateUserMutationMutationVariables>;


export interface CreateUserMutationMutationOperation {
  operationName: 'createUserMutation'
  result: CreateUserMutationMutation
  variables: CreateUserMutationMutationVariables
  type: 'mutation'
}
