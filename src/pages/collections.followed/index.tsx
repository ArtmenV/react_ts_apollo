import { Trans } from '@lingui/macro';
import { useGetFollowedCollectionsQuery } from 'graphql/getFollowedCollections.generated';
import * as React from 'react';
import CollectionCard from '../../components/elements/Collection/Collection';
import Loader from '../../components/elements/Loader/Loader';
// import CollectionsLoadMore from '../../components/elements/Loadmore/followingCollections';
// import { APP_NAME } from '../../constants';
import styled from '../../themes/styled';

export const FollowingCollectionsComponent: React.SFC = () => {
  const { data, error, loading } = useGetFollowedCollectionsQuery({
    variables: {
      limit: 15
    }
  });

  return (!data && !loading) || error ? (
    <span>
      <Trans>Error loading collections</Trans>
    </span>
  ) : !data || loading ? (
    <Loader />
  ) : (
    <>
      {/* <Helmet>
          <title>{APP_NAME} > Followed collections</title>
        </Helmet> */}
      <ListWrapper>
        <List>
          {/* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
          data.me &&
            data.me.user.followedCollections &&
            data.me.user.followedCollections &&
            data.me.user.followedCollections.edges.map(
              (collection, i) =>
                collection && (
                  <CollectionCard
                    key={i}
                    collection={collection.node.collection}
                  />
                )
            )}
        </List>
        {/* <CollectionsLoadMore
            fetchMore={data.fetchMore}
            collections={data.me.user.followedCollections}
            me
          /> */}
      </ListWrapper>
    </>
  );
};

const ListWrapper = styled.div``;

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding-top: 0;
`;
