// View a Community (with list of collections)

import { Trans } from '@lingui/macro';
import { useGetAgentQueryQuery } from 'graphql/getAgent.generated';
import { ActivityPreviewHOC } from 'HOC/modules/ActivityPreview/activityPreviewHOC';
import * as React from 'react';
import { TabPanel, Tabs } from 'react-tabs';
import { Button } from 'rebass/styled-components';
// import CollectionCard from '../../components/elements/Collection/Collection';
import { CollectionPreview } from 'ui/modules/CollectionPreview';
import CommunityCard from '../../components/elements/Community/Community';
import Loader from '../../components/elements/Loader/Loader';
// import FollowingCollectionsLoadMore from '../../components/elements/Loadmore/followingCollections';
// import JoinedCommunitiesLoadMore from '../../components/elements/Loadmore/joinedCommunities';
// import LoadMoreTimeline from '../../components/elements/Loadmore/timelineoutbox';
import { SuperTab, SuperTabList } from '../../components/elements/SuperTab';
import { HomeBox, MainContainer } from '../../sections/layoutUtils';
import { Nav, Panel, PanelTitle, WrapperPanel } from 'ui/elements/Panel';
import styled from '../../themes/styled';
import { Wrapper, WrapperCont } from '../communities.all/CommunitiesAll';
import { OverlayTab, WrapperTab } from '../communities.community/Community';
import { List, ListCollections } from '../Profile';
import HeroComp from '../Profile/Hero';
import { useFollowMutationMutation } from 'graphql/follow.generated';
import { useDeleteMutationMutation } from 'graphql/delete.generated';

const Follow = styled(Button)`
  color: ${props => props.theme.colors.orange};
  display: block;
  width: 100%;
  background: ${props => props.theme.colors.lighter};
  border: 2px solid ${props => props.theme.colors.orange};
  cursor: pointer;
`;

enum TabsEnum {
  Overview = 'Overview',
  Communities = 'Joined communities',
  Collections = 'Followed collections'
}

interface Props {
  userId: string;
}

const CommunitiesFeatured: React.SFC<Props> = ({ userId }) => {
  const query = useGetAgentQueryQuery({
    variables: {
      userId: userId,
      limitComm: 15,
      limitColl: 15,
      limitTimeline: 15
    }
  });
  const { /* fetchMore, */ data, loading, error } = query;
  const [follow, followStatus] = useFollowMutationMutation();
  const [unfollow, unfollowStatus] = useDeleteMutationMutation();
  const togglingFollow = followStatus.loading || unfollowStatus.loading;
  const toggleFollow = React.useCallback(
    () => {
      if (!(!togglingFollow && query.data && query.data.user)) {
        return;
      }
      if (query.data.user.myFollow) {
        unfollow({
          variables: { contextId: query.data.user.myFollow.id }
        }).then(() => query.refetch());
      } else {
        follow({ variables: { contextId: query.data.user.id } }).then(() =>
          query.refetch()
        );
      }
    },
    [query.data, togglingFollow]
  );
  return (
    <MainContainer>
      <HomeBox>
        {loading ? (
          <Loader />
        ) : error || !data || !data.user ? (
          <span>
            <Trans>Error loading user</Trans>
          </span>
        ) : (
          <>
            <WrapperCont>
              <Wrapper>
                <HeroComp user={data.user} />

                <WrapperTab>
                  <OverlayTab>
                    <Tabs>
                      <SuperTabList>
                        <SuperTab>
                          <h5>
                            <Trans>Recent activities</Trans>
                          </h5>
                        </SuperTab>
                        <SuperTab>
                          <h5>
                            <Trans>Followed Collections</Trans>
                          </h5>
                        </SuperTab>
                        <SuperTab>
                          <h5>
                            <Trans>Joined Communities</Trans>
                          </h5>
                        </SuperTab>
                      </SuperTabList>
                      <TabPanel>
                        <div>
                          {/* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                          data.user.outbox!.edges!.map(
                            (t, i) =>
                              t && (
                                <ActivityPreviewHOC
                                  activityId={t.node.id}
                                  key={t.node.id}
                                />
                              )
                          )}
                          {/* <LoadMoreTimeline
                            fetchMore={fetchMore}
                            community={data.user}
                          /> */}
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <>
                          <ListCollections>
                            {/* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                            data.user.followedCollections!.edges.map(
                              (edge, i) =>
                                edge && (
                                  <div key={i}>
                                    <CollectionPreview
                                      icon={edge.node.collection.icon!}
                                      name={edge.node.collection.name}
                                      summary={edge.node.collection.summary!}
                                      link={{
                                        url:
                                          '/collections/' +
                                          edge.node.collection.id,
                                        external: false
                                      }}
                                      totalResources={
                                        edge.node.collection.resources!
                                          .totalCount
                                      }
                                    />
                                  </div>
                                )
                            )}
                          </ListCollections>
                          {/* <FollowingCollectionsLoadMore
                            collections={data.user.followedCollections}
                            fetchMore={fetchMore}
                          /> */}
                        </>
                      </TabPanel>
                      <TabPanel
                        label={`${TabsEnum.Communities}`}
                        key={TabsEnum.Communities}
                        style={{ height: '100%' }}
                      >
                        <>
                          <List>
                            {/* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                            data.user.followedCommunities!.edges.map(
                              (community, i) =>
                                community && (
                                  <CommunityCard
                                    key={i}
                                    summary={
                                      community.node.community.summary || ''
                                    }
                                    title={community.node.community.name}
                                    collectionsCount={
                                      /* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                                      community.node.community.collections!
                                        .totalCount
                                    }
                                    threadsCount={
                                      /* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                                      community.node.community.threads!
                                        .totalCount
                                    }
                                    icon={community.node.community.icon || ''}
                                    followed={
                                      !!community.node.community.myFollow
                                    }
                                    id={community.node.community.id}
                                    externalId={
                                      community.node.community.canonicalUrl ||
                                      ''
                                    }
                                    followersCount={
                                      /* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                                      community.node.community.followers!
                                        .totalCount
                                    }
                                  />
                                )
                            )}
                          </List>
                          {/* <JoinedCommunitiesLoadMore
                            communities={data.user.followedCommunities}
                            fetchMore={fetchMore}
                          /> */}
                        </>
                      </TabPanel>
                    </Tabs>
                  </OverlayTab>
                </WrapperTab>
              </Wrapper>
            </WrapperCont>
          </>
        )}
      </HomeBox>
      <WrapperPanel>
        <Panel>
          {data && data.user ? (
            <Follow variant={'outline'} onClick={toggleFollow}>
              {data.user.myFollow ? (
                <Trans>Unfollow</Trans>
              ) : (
                <Trans>Follow</Trans>
              )}
            </Follow>
          ) : null}
        </Panel>
        <Panel>
          <PanelTitle fontSize={0} fontWeight={'bold'}>
            <Trans>Links</Trans>
          </PanelTitle>
          <Nav />
        </Panel>
      </WrapperPanel>
    </MainContainer>
  );
};

export default CommunitiesFeatured;
