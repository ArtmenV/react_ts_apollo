import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type UploadIconMutationVariables = {
  contextId: Types.Scalars['ID'],
  upload: Types.Scalars['Upload']
};


export type UploadIconMutation = (
  { __typename: 'RootMutationType' }
  & { uploadIcon: Types.Maybe<(
    { __typename: 'FileUpload' }
    & Pick<Types.FileUpload, 'id' | 'url'>
    & { metadata: Types.Maybe<(
      { __typename: 'FileMetadata' }
      & Pick<Types.FileMetadata, 'heightPx' | 'widthPx'>
    )> }
  )> }
);


export const UploadIconDocument = gql`
    mutation uploadIcon($contextId: ID!, $upload: Upload!) {
  uploadIcon(contextId: $contextId, upload: $upload) {
    id
    metadata {
      heightPx
      widthPx
    }
    url
  }
}
    `;
export type UploadIconMutationFn = ApolloReactCommon.MutationFunction<UploadIconMutation, UploadIconMutationVariables>;
export type UploadIconComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UploadIconMutation, UploadIconMutationVariables>, 'mutation'>;

    export const UploadIconComponent = (props: UploadIconComponentProps) => (
      <ApolloReactComponents.Mutation<UploadIconMutation, UploadIconMutationVariables> mutation={UploadIconDocument} {...props} />
    );
    
export type UploadIconProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UploadIconMutation, UploadIconMutationVariables> & TChildProps;
export function withUploadIcon<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UploadIconMutation,
  UploadIconMutationVariables,
  UploadIconProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UploadIconMutation, UploadIconMutationVariables, UploadIconProps<TChildProps>>(UploadIconDocument, {
      alias: 'uploadIcon',
      ...operationOptions
    });
};

/**
 * __useUploadIconMutation__
 *
 * To run a mutation, you first call `useUploadIconMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadIconMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadIconMutation, { data, loading, error }] = useUploadIconMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *      upload: // value for 'upload'
 *   },
 * });
 */
export function useUploadIconMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadIconMutation, UploadIconMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadIconMutation, UploadIconMutationVariables>(UploadIconDocument, baseOptions);
      }
export type UploadIconMutationHookResult = ReturnType<typeof useUploadIconMutation>;
export type UploadIconMutationResult = ApolloReactCommon.MutationResult<UploadIconMutation>;
export type UploadIconMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadIconMutation, UploadIconMutationVariables>;


export interface UploadIconMutationOperation {
  operationName: 'uploadIcon'
  result: UploadIconMutation
  variables: UploadIconMutationVariables
  type: 'mutation'
}
