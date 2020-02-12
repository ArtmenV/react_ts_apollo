import * as Types from './types.generated';

import { ActivityPreviewDataFragment } from '../HOC/modules/ActivityPreview/getActivityPreview.generated';
import { BasicUserFragment } from './fragments/basicUser.generated';
import gql from 'graphql-tag';
import { BasicUserFragmentDoc } from './fragments/basicUser.generated';
import { ActivityPreviewDataFragmentDoc } from '../HOC/modules/ActivityPreview/getActivityPreview.generated';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;



export type GetMeInboxQueryVariables = {
  limit?: Types.Maybe<Types.Scalars['Int']>,
  end?: Types.Maybe<Types.Scalars['String']>
};


export type GetMeInboxQuery = (
  { __typename: 'RootQueryType' }
  & { me: Types.Maybe<(
    { __typename: 'Me' }
    & { user: (
      { __typename: 'User' }
      & { inbox: Types.Maybe<(
        { __typename: 'ActivitiesEdges' }
        & { pageInfo: Types.Maybe<(
          { __typename: 'PageInfo' }
          & Pick<Types.PageInfo, 'startCursor' | 'endCursor'>
        )>, edges: Types.Maybe<Array<Types.Maybe<(
          { __typename: 'ActivitiesEdge' }
          & { node: (
            { __typename: 'Activity' }
            & ActivityPreviewDataFragment
          ) }
        )>>> }
      )> }
      & BasicUserFragment
    ) }
  )> }
);


export const GetMeInboxDocument = gql`
    query getMeInbox($limit: Int, $end: String) {
  me {
    user {
      ...BasicUser
      inbox(limit: $limit, after: $end) {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          node {
            ...ActivityPreviewData
          }
        }
      }
    }
  }
}
    ${BasicUserFragmentDoc}
${ActivityPreviewDataFragmentDoc}`;
export type GetMeInboxComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMeInboxQuery, GetMeInboxQueryVariables>, 'query'>;

    export const GetMeInboxComponent = (props: GetMeInboxComponentProps) => (
      <ApolloReactComponents.Query<GetMeInboxQuery, GetMeInboxQueryVariables> query={GetMeInboxDocument} {...props} />
    );
    
export type GetMeInboxProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetMeInboxQuery, GetMeInboxQueryVariables> & TChildProps;
export function withGetMeInbox<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMeInboxQuery,
  GetMeInboxQueryVariables,
  GetMeInboxProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetMeInboxQuery, GetMeInboxQueryVariables, GetMeInboxProps<TChildProps>>(GetMeInboxDocument, {
      alias: 'getMeInbox',
      ...operationOptions
    });
};

/**
 * __useGetMeInboxQuery__
 *
 * To run a query within a React component, call `useGetMeInboxQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeInboxQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeInboxQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetMeInboxQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMeInboxQuery, GetMeInboxQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMeInboxQuery, GetMeInboxQueryVariables>(GetMeInboxDocument, baseOptions);
      }
export function useGetMeInboxLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMeInboxQuery, GetMeInboxQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMeInboxQuery, GetMeInboxQueryVariables>(GetMeInboxDocument, baseOptions);
        }
export type GetMeInboxQueryHookResult = ReturnType<typeof useGetMeInboxQuery>;
export type GetMeInboxLazyQueryHookResult = ReturnType<typeof useGetMeInboxLazyQuery>;
export type GetMeInboxQueryResult = ApolloReactCommon.QueryResult<GetMeInboxQuery, GetMeInboxQueryVariables>;


export interface GetMeInboxQueryOperation {
  operationName: 'getMeInbox'
  result: GetMeInboxQuery
  variables: GetMeInboxQueryVariables
  type: 'query'
}
