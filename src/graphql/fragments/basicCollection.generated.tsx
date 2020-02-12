import * as Types from '../types.generated';

import { BasicResourcesEdgesFragment } from './basicResourcesEdges.generated';
import { BasicUserFragment } from './basicUser.generated';
import gql from 'graphql-tag';
import { BasicUserFragmentDoc } from './basicUser.generated';
import { BasicResourcesEdgesFragmentDoc } from './basicResourcesEdges.generated';



export type BasicCollectionFragment = (
  { __typename: 'Collection' }
  & Pick<Types.Collection, 'id' | 'canonicalUrl' | 'preferredUsername' | 'name' | 'summary' | 'icon' | 'isLocal' | 'isPublic' | 'createdAt'>
  & { creator: Types.Maybe<(
    { __typename: 'User' }
    & BasicUserFragment
  )>, myLike: Types.Maybe<(
    { __typename: 'Like' }
    & Pick<Types.Like, 'id'>
  )>, myFollow: Types.Maybe<(
    { __typename: 'Follow' }
    & Pick<Types.Follow, 'id'>
  )>, myFlag: Types.Maybe<(
    { __typename: 'Flag' }
    & Pick<Types.Flag, 'id'>
  )>, community: Types.Maybe<(
    { __typename: 'Community' }
    & Pick<Types.Community, 'id' | 'canonicalUrl' | 'isLocal' | 'isPublic' | 'name' | 'icon'>
    & { myFollow: Types.Maybe<(
      { __typename: 'Follow' }
      & Pick<Types.Follow, 'id'>
    )>, myFlag: Types.Maybe<(
      { __typename: 'Flag' }
      & Pick<Types.Flag, 'id'>
    )> }
  )>, resources: Types.Maybe<(
    { __typename: 'ResourcesEdges' }
    & BasicResourcesEdgesFragment
  )>, followers: Types.Maybe<(
    { __typename: 'FollowsEdges' }
    & Pick<Types.FollowsEdges, 'totalCount'>
  )>, threads: Types.Maybe<(
    { __typename: 'ThreadsEdges' }
    & Pick<Types.ThreadsEdges, 'totalCount'>
  )>, outbox: Types.Maybe<(
    { __typename: 'ActivitiesEdges' }
    & Pick<Types.ActivitiesEdges, 'totalCount'>
  )> }
);

export const BasicCollectionFragmentDoc = gql`
    fragment BasicCollection on Collection {
  id
  canonicalUrl
  preferredUsername
  name
  summary
  creator {
    ...BasicUser
  }
  icon
  isLocal
  isPublic
  createdAt
  myLike {
    id
  }
  myFollow {
    id
  }
  myFlag {
    id
  }
  community {
    id
    canonicalUrl
    isLocal
    isPublic
    name
    icon
    myFollow {
      id
    }
    myFlag {
      id
    }
  }
  resources {
    ...BasicResourcesEdges
  }
  followers {
    totalCount
  }
  threads {
    totalCount
  }
  outbox {
    totalCount
  }
}
    ${BasicUserFragmentDoc}
${BasicResourcesEdgesFragmentDoc}`;
