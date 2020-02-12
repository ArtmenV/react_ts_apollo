import * as Types from '../types.generated';

import { BasicUserFragment } from './basicUser.generated';
import gql from 'graphql-tag';
import { BasicUserFragmentDoc } from './basicUser.generated';


export type BasicCommunityFragment = (
  { __typename: 'Community' }
  & Pick<Types.Community, 'id' | 'canonicalUrl' | 'preferredUsername' | 'name' | 'summary' | 'icon' | 'createdAt' | 'updatedAt' | 'lastActivity' | 'isLocal' | 'isPublic' | 'isDisabled'>
  & { creator: Types.Maybe<(
    { __typename: 'User' }
    & BasicUserFragment
  )>, myFollow: Types.Maybe<(
    { __typename: 'Follow' }
    & Pick<Types.Follow, 'id'>
  )>, myFlag: Types.Maybe<(
    { __typename: 'Flag' }
    & Pick<Types.Flag, 'id'>
  )>, collections: Types.Maybe<(
    { __typename: 'CollectionsEdges' }
    & Pick<Types.CollectionsEdges, 'totalCount'>
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

export const BasicCommunityFragmentDoc = gql`
    fragment BasicCommunity on Community {
  id
  canonicalUrl
  preferredUsername
  name
  summary
  creator {
    ...BasicUser
  }
  icon
  createdAt
  updatedAt
  lastActivity
  isLocal
  isPublic
  isDisabled
  myFollow {
    id
  }
  myFlag {
    id
  }
  collections {
    totalCount
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
    ${BasicUserFragmentDoc}`;
