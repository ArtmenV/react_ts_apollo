import * as Types from '../types.generated';

import { BasicResourceFragment } from './basicResource.generated';
import gql from 'graphql-tag';
import { BasicResourceFragmentDoc } from './basicResource.generated';


export type BasicResourcesEdgesFragment = (
  { __typename: 'ResourcesEdges' }
  & Pick<Types.ResourcesEdges, 'totalCount'>
  & { pageInfo: Types.Maybe<(
    { __typename: 'PageInfo' }
    & Pick<Types.PageInfo, 'endCursor' | 'startCursor'>
  )>, edges: Array<Types.Maybe<(
    { __typename: 'ResourcesEdge' }
    & { node: (
      { __typename: 'Resource' }
      & BasicResourceFragment
    ) }
  )>> }
);

export const BasicResourcesEdgesFragmentDoc = gql`
    fragment BasicResourcesEdges on ResourcesEdges {
  totalCount
  pageInfo {
    endCursor
    startCursor
  }
  edges {
    node {
      ...BasicResource
    }
  }
}
    ${BasicResourceFragmentDoc}`;
