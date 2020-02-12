import * as React from 'react';
import { SFC } from 'react';
import { Trans } from '@lingui/macro';
import { LoadMore } from './timeline';
import { LocalActivitiesQuery } from '../../../graphql/localActivities.generated';

interface Props {
  outbox: any;
  fetchMore: any;
}

const TimelineLoadMore: SFC<Props> = ({ fetchMore, outbox }) =>
  outbox.pageInfo && (
    <LoadMore
      onClick={() =>
        fetchMore({
          fetchPolicy: 'cache-first',
          variables: {
            end: outbox.pageInfo.endCursor
          },
          updateQuery: (
            previousLocalActivityQ: LocalActivitiesQuery,
            { fetchMoreResult }
          ) => {
            const newNodes = fetchMoreResult.instance.outbox.edges;
            const pageInfo = fetchMoreResult.instance.outbox.pageInfo;
            const newLocalActQ: LocalActivitiesQuery = newNodes.length
              ? {
                  __typename: 'RootQueryType',
                  // Put the new comments at the end of the list and update `pageInfo`
                  // so we have the new `endCursor` and `hasNextPage` values
                  ...previousLocalActivityQ,
                  instance: {
                    __typename: 'Instance',
                    ...previousLocalActivityQ.instance,
                    outbox: {
                      __typename: 'ActivitiesEdges',
                      ...(previousLocalActivityQ.instance &&
                        previousLocalActivityQ.instance.outbox),
                      edges: [
                        ...(previousLocalActivityQ.instance &&
                          //FIXME https://gitlab.com/moodlenet/meta/issues/185
                          previousLocalActivityQ.instance.outbox!.edges),
                        ...newNodes
                      ],
                      pageInfo
                    }
                  }
                }
              : previousLocalActivityQ;
            return newLocalActQ;
          }
        })
      }
    >
      <Trans>Load more</Trans>
    </LoadMore>
  );

export default TimelineLoadMore;
