// View a Profile
import { Trans } from '@lingui/macro';
import { useGetUserQuery, GetUserDocument } from 'graphql/getUser.generated';
import {
  ActivityPreviewHOC,
  ActivityPreviewCtx
} from 'HOC/modules/ActivityPreview/activityPreviewHOC';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { TabPanel, Tabs } from 'react-tabs';
import media from 'styled-media-query';
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
import HeroComp from './Hero';

interface Props {}

const CommunitiesFeatured: React.SFC<Props> = () => {
  const query = useGetUserQuery({
    variables: {
      limitComm: 15,
      limitColl: 15,
      limitTimeline: 15
    }
  });
  const { data, loading, error /* , fetchMore */, refetch, variables } = query;
  React.useEffect(() => {
    refetch();
  }, []);
  return (
    <MainContainer>
      <HomeBox>
        {loading ? (
          <WrapperCont>
            <Wrapper>
              <Loader />
            </Wrapper>
          </WrapperCont>
        ) : error || !data || !data.me ? (
          <WrapperCont>
            <Wrapper>
              <span>
                <Trans>Error loading user</Trans>
              </span>
            </Wrapper>
          </WrapperCont>
        ) : (
          <>
            <WrapperCont>
              <Wrapper>
                <HeroComp user={data.me.user} />
                <WrapperTab>
                  <OverlayTab>
                    <Tabs>
                      <SuperTabList>
                        <SuperTab>
                          <h5>
                            <Trans>Timeline</Trans>
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
                        <ActivityPreviewCtx.Provider
                          value={{
                            refetchQueries: [
                              { query: GetUserDocument, variables }
                            ]
                          }}
                        >
                          {/* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                          data.me.user.outbox!.edges!.map(
                            t =>
                              t && (
                                <ActivityPreviewHOC
                                  activityId={t.node.id}
                                  key={t.node.id}
                                />
                              )
                          )}
                          {/*  <LoadMoreTimeline
                            me
                            fetchMore={fetchMore}
                            community={data.me.user}
                          /> */}
                        </ActivityPreviewCtx.Provider>
                      </TabPanel>
                      <TabPanel>
                        <ListCollections>
                          {/* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                          data.me.user.followedCollections!.edges.map(
                            (coll, i) =>
                              coll && (
                                <div key={i}>
                                  <CollectionPreview
                                    icon={coll.node.collection.icon!}
                                    name={coll.node.collection.name}
                                    summary={coll.node.collection.summary!}
                                    link={{
                                      url:
                                        'collections/' +
                                        coll.node.collection.id,
                                      external: false
                                    }}
                                    totalResources={
                                      coll.node.collection.resources!.totalCount
                                    }
                                  />
                                </div>
                                // <CollectionCard
                                //   key={i}
                                //   collection={collection.node.collection}
                                // />
                              )
                          )}
                        </ListCollections>
                        {/* <FollowingCollectionsLoadMore
                          collections={data.me.user.followedCollections}
                          fetchMore={fetchMore}
                          me
                        /> */}
                      </TabPanel>
                      <TabPanel style={{ height: '100%' }}>
                        <>
                          <List>
                            {/* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                            data.me.user.followedCommunities!.edges.map(
                              (community, i) =>
                                community &&
                                community && (
                                  <CommunityCard
                                    key={i}
                                    summary={
                                      community.node.community.summary || ''
                                    }
                                    title={community.node.community.name || ''}
                                    collectionsCount={
                                      /* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                                      community.node.community.collections!
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
                                    threadsCount={
                                      /* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                                      community.node.community.threads!
                                        .totalCount
                                    }
                                  />
                                )
                            )}
                          </List>
                          {/* <JoinedCommunitiesLoadMore
                            me
                            communities={data.me.user.followedCommunities}
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
          <Settings to="/settings">
            <Trans>Settings</Trans>
          </Settings>
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

const Settings = styled(NavLink)`
  color: ${props => props.theme.colors.orange};
  display: block;
  width: 100%;
  background: #fbfbf9;
  border: 2px solid ${props => props.theme.colors.orange};
  cursor: pointer;
  height: 40px;
  text-align: center;
  line-height: 36px;
  text-decoration: none;
  font-weight: 800;
  font-size: 14px;
  border-radius: 2px;
`;

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  padding: 16px;
  padding-top: 8px;
  ${media.lessThan('medium')`
  grid-template-columns: 1fr;
  grid-column-gap: 0px;
`};
`;

export const ListCollections = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  margin-top: 16px;
`;

export default CommunitiesFeatured;
