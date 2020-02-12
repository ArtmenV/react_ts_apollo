import { Trans } from '@lingui/macro';
import {
  ActivityPreviewHOC,
  ActivityPreviewCtx
} from 'HOC/modules/ActivityPreview/activityPreviewHOC';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Empty from '../../components/elements/Empty';
import Loader from '../../components/elements/Loader/Loader';

import { CreateReplyMutationMutationOperation } from '../../graphql/createReply.generated';
import { DeleteMutationMutationOperation } from '../../graphql/delete.generated';
import {
  useGetMeInboxQuery,
  GetMeInboxDocument
} from '../../graphql/getMeInbox.generated';
import { LikeMutationMutationOperation } from '../../graphql/like.generated';
import { HomeBox, MainContainer } from '../../sections/layoutUtils';
import { Text } from 'rebass/styled-components';
import {
  Nav,
  NavItem,
  Panel,
  PanelTitle,
  WrapperPanel
} from 'ui/elements/Panel';
import { useDynamicLinkOpResult } from '../../util/apollo/dynamicLink';
import { Wrapper, WrapperCont } from '../communities.all/CommunitiesAll';

interface Props {}

const Home: React.FC<Props> = () => {
  const {
    data,
    loading,
    error,
    /* fetchMore, */ refetch,
    variables
  } = useGetMeInboxQuery({
    variables: {
      limit: 15
    }
  });
  useEffect(() => {
    refetch();
  }, []);
  useDynamicLinkOpResult<CreateReplyMutationMutationOperation>(
    'createReplyMutation',
    () => {
      refetch();
    },
    [refetch]
  );
  useDynamicLinkOpResult<LikeMutationMutationOperation>(
    'likeMutation',
    () => {
      refetch();
    },
    [refetch]
  );
  useDynamicLinkOpResult<DeleteMutationMutationOperation>(
    'deleteMutation',
    () => {
      refetch();
    },
    [refetch]
  );

  return (
    <MainContainer>
      <HomeBox>
        <WrapperCont>
          <Wrapper>
            <Text
              mb={3}
              sx={{ borderBottom: '1px solid #dadada' }}
              p={3}
              variant="suptitle"
            >
              <Trans>My MoodleNet timeline</Trans>
            </Text>

            {error ? (
              <Empty>
                <Trans>Error loading moodlenet timeline</Trans>
              </Empty>
            ) : loading ? (
              <Loader />
            ) : (
              data &&
              data.me && (
                <ActivityPreviewCtx.Provider
                  value={{
                    refetchQueries: [{ query: GetMeInboxDocument, variables }]
                  }}
                >
                  <div>
                    {/* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                    data.me.user.inbox!.edges!.map(
                      userActivityEdge =>
                        userActivityEdge && (
                          <ActivityPreviewHOC
                            activityId={userActivityEdge.node.id}
                            key={userActivityEdge.node.id}
                          />
                        )
                    )}
                    {/* data &&
                          data.me && (
                            <LoadMoreTimeline
                              fetchMore={fetchMore}
                              community={data.me.user}
                            />
                          ) */}
                  </div>
                </ActivityPreviewCtx.Provider>
              )
            )}
          </Wrapper>
        </WrapperCont>
      </HomeBox>
      <WrapperPanel>
        <Panel>
          <PanelTitle fontSize={0} fontWeight={'bold'}>
            <Trans>Browse Home instance</Trans>
          </PanelTitle>
          <Nav>
            <NavItem mb={4} fontSize={1} fontWeight={'bold'}>
              <NavLink to="/mycommunities">
                <Trans>My communities</Trans>
              </NavLink>
            </NavItem>
            <NavItem fontSize={1} fontWeight={'bold'}>
              <NavLink to="/mycollections">
                <Trans>My collections</Trans>
              </NavLink>
            </NavItem>
          </Nav>
        </Panel>
      </WrapperPanel>
    </MainContainer>
  );
};

export default Home;
