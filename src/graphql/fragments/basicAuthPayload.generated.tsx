import * as Types from '../types.generated';

import { BasicUserFragment } from './basicUser.generated';
import gql from 'graphql-tag';
import { BasicUserFragmentDoc } from './basicUser.generated';


export type BasicAuthPayloadFragment = (
  { __typename: 'AuthPayload' }
  & Pick<Types.AuthPayload, 'token'>
  & { me: (
    { __typename: 'Me' }
    & Pick<Types.Me, 'email' | 'isConfirmed' | 'isInstanceAdmin' | 'wantsEmailDigest' | 'wantsNotifications'>
    & { user: (
      { __typename: 'User' }
      & BasicUserFragment
    ) }
  ) }
);

export const BasicAuthPayloadFragmentDoc = gql`
    fragment BasicAuthPayload on AuthPayload {
  token
  me {
    email
    isConfirmed
    isInstanceAdmin
    wantsEmailDigest
    wantsNotifications
    user {
      ...BasicUser
    }
  }
}
    ${BasicUserFragmentDoc}`;
