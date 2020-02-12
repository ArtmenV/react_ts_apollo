import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type UpdateCommunityMutationMutationVariables = {
  community: Types.CommunityUpdateInput,
  communityId: Types.Scalars['String']
};


export type UpdateCommunityMutationMutation = (
  { __typename: 'RootMutationType' }
  & { updateCommunity: Types.Maybe<(
    { __typename: 'Community' }
    & Pick<Types.Community, 'id' | 'canonicalUrl' | 'preferredUsername' | 'name' | 'summary' | 'icon' | 'createdAt' | 'updatedAt'>
  )> }
);


export const UpdateCommunityMutationDocument = gql`
    mutation updateCommunityMutation($community: CommunityUpdateInput!, $communityId: String!) {
  updateCommunity(communityId: $communityId, community: $community) {
    id
    canonicalUrl
    preferredUsername
    name
    summary
    icon
    createdAt
    updatedAt
  }
}
    `;
export type UpdateCommunityMutationMutationFn = ApolloReactCommon.MutationFunction<UpdateCommunityMutationMutation, UpdateCommunityMutationMutationVariables>;
export type UpdateCommunityMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateCommunityMutationMutation, UpdateCommunityMutationMutationVariables>, 'mutation'>;

    export const UpdateCommunityMutationComponent = (props: UpdateCommunityMutationComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateCommunityMutationMutation, UpdateCommunityMutationMutationVariables> mutation={UpdateCommunityMutationDocument} {...props} />
    );
    
export type UpdateCommunityMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateCommunityMutationMutation, UpdateCommunityMutationMutationVariables> & TChildProps;
export function withUpdateCommunityMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateCommunityMutationMutation,
  UpdateCommunityMutationMutationVariables,
  UpdateCommunityMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateCommunityMutationMutation, UpdateCommunityMutationMutationVariables, UpdateCommunityMutationProps<TChildProps>>(UpdateCommunityMutationDocument, {
      alias: 'updateCommunityMutation',
      ...operationOptions
    });
};

/**
 * __useUpdateCommunityMutationMutation__
 *
 * To run a mutation, you first call `useUpdateCommunityMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommunityMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommunityMutationMutation, { data, loading, error }] = useUpdateCommunityMutationMutation({
 *   variables: {
 *      community: // value for 'community'
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useUpdateCommunityMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCommunityMutationMutation, UpdateCommunityMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCommunityMutationMutation, UpdateCommunityMutationMutationVariables>(UpdateCommunityMutationDocument, baseOptions);
      }
export type UpdateCommunityMutationMutationHookResult = ReturnType<typeof useUpdateCommunityMutationMutation>;
export type UpdateCommunityMutationMutationResult = ApolloReactCommon.MutationResult<UpdateCommunityMutationMutation>;
export type UpdateCommunityMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCommunityMutationMutation, UpdateCommunityMutationMutationVariables>;


export interface UpdateCommunityMutationMutationOperation {
  operationName: 'updateCommunityMutation'
  result: UpdateCommunityMutationMutation
  variables: UpdateCommunityMutationMutationVariables
  type: 'mutation'
}
