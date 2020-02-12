import * as Types from '../types.generated';

import { BasicUserFragment } from './basicUser.generated';
import gql from 'graphql-tag';
import { BasicUserFragmentDoc } from './basicUser.generated';


export type BasicResourceFragment = (
  { __typename: 'Resource' }
  & Pick<Types.Resource, 'id' | 'name' | 'summary' | 'icon' | 'url' | 'canonicalUrl' | 'license' | 'createdAt' | 'updatedAt'>
  & { myLike: Types.Maybe<(
    { __typename: 'Like' }
    & Pick<Types.Like, 'id'>
  )>, myFlag: Types.Maybe<(
    { __typename: 'Flag' }
    & Pick<Types.Flag, 'id'>
  )>, likes: Types.Maybe<(
    { __typename: 'LikesEdges' }
    & Pick<Types.LikesEdges, 'totalCount'>
  )>, creator: Types.Maybe<(
    { __typename: 'User' }
    & BasicUserFragment
  )>, collection: Types.Maybe<(
    { __typename: 'Collection' }
    & Pick<Types.Collection, 'id' | 'name' | 'preferredUsername' | 'isLocal' | 'isPublic' | 'isDisabled'>
    & { community: Types.Maybe<(
      { __typename: 'Community' }
      & Pick<Types.Community, 'id' | 'canonicalUrl' | 'isLocal'>
    )> }
  )> }
);

export const BasicResourceFragmentDoc = gql`
    fragment BasicResource on Resource {
  id
  name
  summary
  icon
  url
  canonicalUrl
  license
  createdAt
  updatedAt
  myLike {
    id
  }
  myFlag {
    id
  }
  likes {
    totalCount
  }
  creator {
    ...BasicUser
  }
  collection {
    id
    name
    preferredUsername
    isLocal
    isPublic
    isDisabled
    community {
      id
      canonicalUrl
      isLocal
    }
  }
}
    ${BasicUserFragmentDoc}`;
