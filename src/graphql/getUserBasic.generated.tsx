import * as Types from './types.generated';

import { BasicUserFragment } from './fragments/basicUser.generated';
import gql from 'graphql-tag';
import { BasicUserFragmentDoc } from './fragments/basicUser.generated';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


export type GetUserBasicQueryVariables = {};


export type GetUserBasicQuery = (
  { __typename: 'RootQueryType' }
  & { me: Types.Maybe<(
    { __typename: 'Me' }
    & Pick<Types.Me, 'email'>
    & { user: (
      { __typename: 'User' }
      & BasicUserFragment
    ) }
  )> }
);


export const GetUserBasicDocument = gql`
    query getUserBasic {
  me {
    email
    user {
      ...BasicUser
    }
  }
}
    ${BasicUserFragmentDoc}`;
export type GetUserBasicComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserBasicQuery, GetUserBasicQueryVariables>, 'query'>;

    export const GetUserBasicComponent = (props: GetUserBasicComponentProps) => (
      <ApolloReactComponents.Query<GetUserBasicQuery, GetUserBasicQueryVariables> query={GetUserBasicDocument} {...props} />
    );
    
export type GetUserBasicProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetUserBasicQuery, GetUserBasicQueryVariables> & TChildProps;
export function withGetUserBasic<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserBasicQuery,
  GetUserBasicQueryVariables,
  GetUserBasicProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserBasicQuery, GetUserBasicQueryVariables, GetUserBasicProps<TChildProps>>(GetUserBasicDocument, {
      alias: 'getUserBasic',
      ...operationOptions
    });
};

/**
 * __useGetUserBasicQuery__
 *
 * To run a query within a React component, call `useGetUserBasicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserBasicQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserBasicQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserBasicQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserBasicQuery, GetUserBasicQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserBasicQuery, GetUserBasicQueryVariables>(GetUserBasicDocument, baseOptions);
      }
export function useGetUserBasicLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserBasicQuery, GetUserBasicQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserBasicQuery, GetUserBasicQueryVariables>(GetUserBasicDocument, baseOptions);
        }
export type GetUserBasicQueryHookResult = ReturnType<typeof useGetUserBasicQuery>;
export type GetUserBasicLazyQueryHookResult = ReturnType<typeof useGetUserBasicLazyQuery>;
export type GetUserBasicQueryResult = ApolloReactCommon.QueryResult<GetUserBasicQuery, GetUserBasicQueryVariables>;


export interface GetUserBasicQueryOperation {
  operationName: 'getUserBasic'
  result: GetUserBasicQuery
  variables: GetUserBasicQueryVariables
  type: 'query'
}
