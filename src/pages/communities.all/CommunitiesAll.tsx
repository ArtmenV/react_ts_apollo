import { Trans } from '@lingui/macro';
import {
  useGetCommunitiesQueryQuery,
  GetCommunitiesQueryDocument
} from 'graphql/getCommunities.generated';
import * as React from 'react';
import { TabPanel, Tabs } from 'react-tabs';
import { Button, Flex } from 'rebass/styled-components';
import media from 'styled-media-query';
import Modal from 'ui/modules/Modal';
import CommunityCard from '../../components/elements/Community/Community';
import Loader from '../../components/elements/Loader/Loader';
// import CommunitiesLoadMore from '../../components/elements/Loadmore/community';
import { SuperTab, SuperTabList } from '../../components/elements/SuperTab';
import {
  CreateCommunityPanelHOC,
  CreateCommunityPanelCtx
} from '../../HOC/modules/CreateCommunityPanel/createCommunityPanelHOC';
import { HomeBox, MainContainer } from '../../sections/layoutUtils';
import { WrapperPanel } from '../../sections/panel';
import styled from '../../themes/styled';

interface Props {
  loggedin: boolean;
}

export const CommunitiesAll: React.SFC<Props> = ({ loggedin }) => {
  const {
    data,
    error,
    loading,
    variables,
    refetch
  } = useGetCommunitiesQueryQuery({
    variables: {
      limit: 15
    }
  });
  const [isOpenCommunity, onOpenCommunity] = React.useState(false);
  const handleNewCommunity = React.useCallback(
    () => onOpenCommunity(!isOpenCommunity),
    [isOpenCommunity]
  );
  React.useEffect(() => {
    refetch();
  }, []);
  return (
    <CreateCommunityPanelCtx.Provider
      value={{
        refetchQueries: [{ query: GetCommunitiesQueryDocument, variables }]
      }}
    >
      <MainContainer>
        <HomeBox>
          <WrapperCont>
            <Wrapper>
              <Tabs>
                <SuperTabList>
                  <SuperTab>
                    <h5>
                      <Trans>All communities</Trans>
                    </h5>
                  </SuperTab>
                </SuperTabList>
                <TabPanel>
                  {(!data && !loading) || error ? (
                    <span>
                      <Trans>Error loading communities</Trans>
                    </span>
                  ) : loading || !data ? (
                    <Loader />
                  ) : (
                    <>
                      {loggedin && (
                        <ButtonWrapper>
                          <CreateCollection
                            p={3}
                            onClick={() => handleNewCommunity()}
                            m={3}
                          >
                            <Trans>Create a new community</Trans>
                          </CreateCollection>
                        </ButtonWrapper>
                      )}
                      <List>
                        {data &&
                          data.communities.nodes &&
                          data.communities.nodes.map((community, i) => {
                            return (
                              community &&
                              /* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                              (!community.followers ||
                              !community.collections ||
                              !community.threads ? null : (
                                <CommunityCard
                                  key={i}
                                  summary={community.summary || ''}
                                  title={community.name}
                                  icon={community.icon || ''}
                                  id={community.id}
                                  followed={!!community.myFollow}
                                  followersCount={
                                    community.followers.totalCount
                                  }
                                  collectionsCount={
                                    community.collections.totalCount
                                  }
                                  externalId={community.id}
                                  threadsCount={community.threads.totalCount}
                                />
                              ))
                            );
                          })}
                      </List>
                      {/* <CommunitiesLoadMore
                        fetchMore={data.fetchMore}
                        communities={data.communities}
                      /> */}
                    </>
                  )}
                </TabPanel>
              </Tabs>
            </Wrapper>
          </WrapperCont>
        </HomeBox>
        <WrapperPanel />
        {isOpenCommunity && (
          <Modal closeModal={() => handleNewCommunity()}>
            <CreateCommunityPanelHOC done={() => handleNewCommunity()} />
          </Modal>
        )}
      </MainContainer>
    </CreateCommunityPanelCtx.Provider>
  );
};

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
export const WrapperCont = styled(Flex)`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  background: white;
  border-radius: 4px;
  z-index: 0;
`;

export const Wrapper = styled(Flex)`
  display: flex;
  flex-direction: column;
  flex: 1;
  & ul {
    display: block;

    & li {
      display: inline-block;

      & h5 {
        font-size: 13px;
        font-weight: 500;
      }
    }
  }
  & h4 {
    margin: 0;
    font-weight: 400 !important;
    font-size: 14px !important;
    color: #151b26;
    line-height: 40px;
  }
`;
export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  padding-top: 0;
  padding: 16px;
  ${media.lessThan('medium')`
  grid-template-columns: 1fr;
  `};
`;
