import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type UsernameAvailableQueryVariables = {
  username: Types.Scalars['String']
};


export type UsernameAvailableQuery = (
  { __typename: 'RootQueryType' }
  & Pick<Types.RootQueryType, 'usernameAvailable'>
);


export const UsernameAvailableDocument = gql`
    query usernameAvailable($username: String!) {
  usernameAvailable(username: $username)
}
    `;
export type UsernameAvailableComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<UsernameAvailableQuery, UsernameAvailableQueryVariables>, 'query'> & ({ variables: UsernameAvailableQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const UsernameAvailableComponent = (props: UsernameAvailableComponentProps) => (
      <ApolloReactComponents.Query<UsernameAvailableQuery, UsernameAvailableQueryVariables> query={UsernameAvailableDocument} {...props} />
    );
    
export type UsernameAvailableProps<TChildProps = {}> = ApolloReactHoc.DataProps<UsernameAvailableQuery, UsernameAvailableQueryVariables> & TChildProps;
export function withUsernameAvailable<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UsernameAvailableQuery,
  UsernameAvailableQueryVariables,
  UsernameAvailableProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, UsernameAvailableQuery, UsernameAvailableQueryVariables, UsernameAvailableProps<TChildProps>>(UsernameAvailableDocument, {
      alias: 'usernameAvailable',
      ...operationOptions
    });
};

/**
 * __useUsernameAvailableQuery__
 *
 * To run a query within a React component, call `useUsernameAvailableQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsernameAvailableQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsernameAvailableQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUsernameAvailableQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsernameAvailableQuery, UsernameAvailableQueryVariables>) {
        return ApolloReactHooks.useQuery<UsernameAvailableQuery, UsernameAvailableQueryVariables>(UsernameAvailableDocument, baseOptions);
      }
export function useUsernameAvailableLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsernameAvailableQuery, UsernameAvailableQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsernameAvailableQuery, UsernameAvailableQueryVariables>(UsernameAvailableDocument, baseOptions);
        }
export type UsernameAvailableQueryHookResult = ReturnType<typeof useUsernameAvailableQuery>;
export type UsernameAvailableLazyQueryHookResult = ReturnType<typeof useUsernameAvailableLazyQuery>;
export type UsernameAvailableQueryResult = ApolloReactCommon.QueryResult<UsernameAvailableQuery, UsernameAvailableQueryVariables>;


export interface UsernameAvailableQueryOperation {
  operationName: 'usernameAvailable'
  result: UsernameAvailableQuery
  variables: UsernameAvailableQueryVariables
  type: 'query'
}
