import * as Types from '../types.generated';

import { BasicCommentWithInReplyToFragment } from './basicComment.generated';
import gql from 'graphql-tag';
import { BasicCommentWithInReplyToFragmentDoc } from './basicComment.generated';


export type BasicThreadFragment = (
  { __typename: 'Thread' }
  & Pick<Types.Thread, 'id' | 'isLocal' | 'createdAt' | 'updatedAt' | 'lastActivity'>
  & { myFollow: Types.Maybe<(
    { __typename: 'Follow' }
    & Pick<Types.Follow, 'id'>
  )>, comments: Types.Maybe<(
    { __typename: 'CommentsEdges' }
    & Pick<Types.CommentsEdges, 'totalCount'>
    & { pageInfo: Types.Maybe<(
      { __typename: 'PageInfo' }
      & Pick<Types.PageInfo, 'startCursor' | 'endCursor'>
    )>, edges: Array<Types.Maybe<(
      { __typename: 'CommentsEdge' }
      & Pick<Types.CommentsEdge, 'cursor'>
      & { node: (
        { __typename: 'Comment' }
        & BasicCommentWithInReplyToFragment
      ) }
    )>> }
  )> }
);

export const BasicThreadFragmentDoc = gql`
    fragment BasicThread on Thread {
  id
  isLocal
  createdAt
  updatedAt
  lastActivity
  myFollow {
    id
  }
  comments {
    totalCount
    pageInfo {
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        ...BasicCommentWithInReplyTo
      }
    }
  }
}
    ${BasicCommentWithInReplyToFragmentDoc}`;
