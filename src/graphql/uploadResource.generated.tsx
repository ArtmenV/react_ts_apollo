import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type UploadResourceMutationVariables = {
  contextId: Types.Scalars['ID'],
  upload: Types.Scalars['Upload']
};


export type UploadResourceMutation = (
  { __typename: 'RootMutationType' }
  & { uploadResource: Types.Maybe<(
    { __typename: 'FileUpload' }
    & Pick<Types.FileUpload, 'id' | 'url'>
    & { metadata: Types.Maybe<(
      { __typename: 'FileMetadata' }
      & Pick<Types.FileMetadata, 'heightPx' | 'widthPx'>
    )> }
  )> }
);


export const UploadResourceDocument = gql`
    mutation uploadResource($contextId: ID!, $upload: Upload!) {
  uploadResource(contextId: $contextId, upload: $upload) {
    id
    metadata {
      heightPx
      widthPx
    }
    url
  }
}
    `;
export type UploadResourceMutationFn = ApolloReactCommon.MutationFunction<UploadResourceMutation, UploadResourceMutationVariables>;
export type UploadResourceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UploadResourceMutation, UploadResourceMutationVariables>, 'mutation'>;

    export const UploadResourceComponent = (props: UploadResourceComponentProps) => (
      <ApolloReactComponents.Mutation<UploadResourceMutation, UploadResourceMutationVariables> mutation={UploadResourceDocument} {...props} />
    );
    
export type UploadResourceProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UploadResourceMutation, UploadResourceMutationVariables> & TChildProps;
export function withUploadResource<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UploadResourceMutation,
  UploadResourceMutationVariables,
  UploadResourceProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UploadResourceMutation, UploadResourceMutationVariables, UploadResourceProps<TChildProps>>(UploadResourceDocument, {
      alias: 'uploadResource',
      ...operationOptions
    });
};

/**
 * __useUploadResourceMutation__
 *
 * To run a mutation, you first call `useUploadResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadResourceMutation, { data, loading, error }] = useUploadResourceMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *      upload: // value for 'upload'
 *   },
 * });
 */
export function useUploadResourceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadResourceMutation, UploadResourceMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadResourceMutation, UploadResourceMutationVariables>(UploadResourceDocument, baseOptions);
      }
export type UploadResourceMutationHookResult = ReturnType<typeof useUploadResourceMutation>;
export type UploadResourceMutationResult = ApolloReactCommon.MutationResult<UploadResourceMutation>;
export type UploadResourceMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadResourceMutation, UploadResourceMutationVariables>;


export interface UploadResourceMutationOperation {
  operationName: 'uploadResource'
  result: UploadResourceMutation
  variables: UploadResourceMutationVariables
  type: 'mutation'
}
