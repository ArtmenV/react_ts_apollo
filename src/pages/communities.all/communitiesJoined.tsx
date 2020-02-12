import { Trans } from '@lingui/macro';
import * as React from 'react';
import { TabPanel, Tabs } from 'react-tabs';
import Modal from 'ui/modules/Modal';
import { SuperTab, SuperTabList } from '../../components/elements/SuperTab';
import {
  CreateCommunityPanelHOC,
  CreateCommunityPanelCtx
} from '../../HOC/modules/CreateCommunityPanel/createCommunityPanelHOC';
import { HomeBox, MainContainer } from '../../sections/layoutUtils';
import { WrapperPanel } from '../../sections/panel';
import { CommunitiesJoined } from '../communities.joined';
import { Wrapper, WrapperCont } from './CommunitiesAll';
import {
  useGetFollowedCommunitiesQueryQuery,
  GetFollowedCommunitiesQueryDocument
} from 'graphql/getFollowedCommunities.generated';

interface Props {
  handleNewCommunity(): boolean;
  isOpenCommunity: boolean;
}

export const CommunitiesYours: React.SFC<Props> = () => {
  const queryResult = useGetFollowedCommunitiesQueryQuery({
    variables: {
      limit: 15
    }
  });
  const { variables, refetch } = queryResult;
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
        refetchQueries: [
          { query: GetFollowedCommunitiesQueryDocument, variables }
        ]
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
                      <Trans>Joined communities</Trans>
                    </h5>
                  </SuperTab>
                </SuperTabList>
                <TabPanel>
                  <CommunitiesJoined
                    queryRes={queryResult}
                    handleNewCommunity={handleNewCommunity}
                  />
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
        {/* <NewCommunityModal
          toggleModal={handleNewCommunity}
          modalIsOpen={isOpenCommunity}
        /> */}
      </MainContainer>
    </CreateCommunityPanelCtx.Provider>
  );
};
