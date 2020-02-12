import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type UpdateProfileMutationMutationVariables = {
  profile: Types.UpdateProfileInput
};


export type UpdateProfileMutationMutation = (
  { __typename: 'RootMutationType' }
  & { updateProfile: Types.Maybe<(
    { __typename: 'Me' }
    & Pick<Types.Me, 'wantsEmailDigest' | 'wantsNotifications'>
    & { user: (
      { __typename: 'User' }
      & Pick<Types.User, 'id' | 'name' | 'summary' | 'icon' | 'image' | 'location' | 'website'>
    ) }
  )> }
);


export const UpdateProfileMutationDocument = gql`
    mutation updateProfileMutation($profile: UpdateProfileInput!) {
  updateProfile(profile: $profile) {
    wantsEmailDigest
    wantsNotifications
    user {
      id
      name
      summary
      icon
      image
      location
      website
    }
  }
}
    `;
export type UpdateProfileMutationMutationFn = ApolloReactCommon.MutationFunction<UpdateProfileMutationMutation, UpdateProfileMutationMutationVariables>;
export type UpdateProfileMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateProfileMutationMutation, UpdateProfileMutationMutationVariables>, 'mutation'>;

    export const UpdateProfileMutationComponent = (props: UpdateProfileMutationComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateProfileMutationMutation, UpdateProfileMutationMutationVariables> mutation={UpdateProfileMutationDocument} {...props} />
    );
    
export type UpdateProfileMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateProfileMutationMutation, UpdateProfileMutationMutationVariables> & TChildProps;
export function withUpdateProfileMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateProfileMutationMutation,
  UpdateProfileMutationMutationVariables,
  UpdateProfileMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateProfileMutationMutation, UpdateProfileMutationMutationVariables, UpdateProfileMutationProps<TChildProps>>(UpdateProfileMutationDocument, {
      alias: 'updateProfileMutation',
      ...operationOptions
    });
};

/**
 * __useUpdateProfileMutationMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutationMutation, { data, loading, error }] = useUpdateProfileMutationMutation({
 *   variables: {
 *      profile: // value for 'profile'
 *   },
 * });
 */
export function useUpdateProfileMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProfileMutationMutation, UpdateProfileMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateProfileMutationMutation, UpdateProfileMutationMutationVariables>(UpdateProfileMutationDocument, baseOptions);
      }
export type UpdateProfileMutationMutationHookResult = ReturnType<typeof useUpdateProfileMutationMutation>;
export type UpdateProfileMutationMutationResult = ApolloReactCommon.MutationResult<UpdateProfileMutationMutation>;
export type UpdateProfileMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProfileMutationMutation, UpdateProfileMutationMutationVariables>;


export interface UpdateProfileMutationMutationOperation {
  operationName: 'updateProfileMutation'
  result: UpdateProfileMutationMutation
  variables: UpdateProfileMutationMutationVariables
  type: 'mutation'
}
