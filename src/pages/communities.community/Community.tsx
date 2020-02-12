import { Trans } from '@lingui/macro';
import { ActivityPreviewHOC } from 'HOC/modules/ActivityPreview/activityPreviewHOC';
import React, { SFC, useState } from 'react';
import { TabPanel, Tabs } from 'react-tabs';
import { Button, Flex } from 'rebass/styled-components';
import { CreateCollectionPanelHOC } from '../../HOC/modules/CreateCollectionPanel/createCollectionPanelHOC';
// import LoadMoreTimeline from '../../components/elements/Loadmore/timeline';
// import { SocialText } from '../../components/elements/SocialText';
import { SuperTab, SuperTabList } from '../../components/elements/SuperTab';
import FeedItem from '../../components/elements/Comment/Comment';
// import { useCreateThreadMutationMutation } from '../../graphql/createThread.generated';
import { GetCommunityQueryQuery } from '../../graphql/getCommunity.generated';
import styled from '../../themes/styled';
import Modal from 'ui/modules/Modal';

interface Props {
  collections: any;
  followed: boolean;
  id: string;
  fetchMore: any;
  community: GetCommunityQueryQuery['community'];
  refetch: () => unknown;
}

const CommunityPage: SFC<Props> = ({
  collections,
  id,
  followed,
  community,
  fetchMore,
  refetch
}) => {
  const [isOpen, onOpen] = useState(false);

  return (
    community && (
      <WrapperTab>
        <OverlayTab>
          <Tabs defaultIndex={1}>
            <SuperTabList>
              <SuperTab>
                <h5>
                  <Trans>Recent activities</Trans>
                </h5>
              </SuperTab>
              <SuperTab>
                <h5>
                  <Trans>Collections</Trans>
                </h5>
              </SuperTab>
              <SuperTab>
                <h5>
                  <Trans>Discussions</Trans>
                </h5>
              </SuperTab>
            </SuperTabList>
            <TabPanel>
              <div>
                {/* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                community.outbox!.edges!.map(
                  (t, i) =>
                    t && (
                      <ActivityPreviewHOC
                        activityId={t.node.id}
                        key={t.node.id}
                      />
                    )
                )}
                {/* <LoadMoreTimeline fetchMore={fetchMore} community={community} /> */}
              </div>
            </TabPanel>
            <TabPanel>
              {followed ? (
                <ButtonWrapper>
                  <CreateCollection p={3} onClick={() => onOpen(true)} m={3}>
                    <Trans>Create a new collection</Trans>
                  </CreateCollection>
                </ButtonWrapper>
              ) : null}
              <div>{collections}</div>
            </TabPanel>
            <TabPanel>
              <div>
                {community.threads &&
                  community.threads.edges &&
                  community.threads.edges.map(
                    (t, i) =>
                      t &&
                      (t.node.comments &&
                        t.node.comments.edges.map(
                          edge =>
                            edge &&
                            edge.node &&
                            edge.node.inReplyTo == null && (
                              <FeedItem
                                key={
                                  /* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                                  edge.node.thread!.id
                                }
                                comment={edge.node}
                              />
                            )
                        ))
                  )}
                {/* <LoadMoreTimeline fetchMore={fetchMore} community={community} /> */}
              </div>
            </TabPanel>
          </Tabs>
        </OverlayTab>
        {isOpen && (
          <Modal closeModal={() => onOpen(false)}>
            <CreateCollectionPanelHOC
              communityId={id}
              done={() => onOpen(false)}
            />
          </Modal>
        )}
      </WrapperTab>
    )
  );
};

export const Footer = styled.div`
  height: 30px;
  line-height: 30px;
  font-weight: 600;
  text-align: center;
  background: #ffefd9;
  font-size: 13px;
  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
  color: #544f46;
`;

const ButtonWrapper = styled(Flex)`
  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
`;

const CreateCollection = styled(Button)`
  flex: 1;
  background: none;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
  border: 1px solid ${props => props.theme.colors.lightgray} !important;
  background: none;
  font-weight: 600;
  color: ${props => props.theme.colors.darkgray} !important;
  cursor: pointer;
  height: 50px;
  text-transform: uppercase;
  font-size: 14px !important;
  &:hover {
    background: ${props => props.theme.colors.lightgray};
  }
`;

export const WrapperTab = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  border-radius: 6px;
  height: 100%;
  box-sizing: border-box;
  background: #fff;
`;
export const OverlayTab = styled.div`
  height: 100%;
  width: 100%;
  & > div {
    flex: 1;
    height: 100%;
  }
`;

export default CommunityPage;
