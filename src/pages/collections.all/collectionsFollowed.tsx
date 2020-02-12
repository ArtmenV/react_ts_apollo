import { Trans } from '@lingui/macro';
import * as React from 'react';
import { TabPanel, Tabs } from 'react-tabs';
import { SuperTab, SuperTabList } from '../../components/elements/SuperTab';
import { FollowingCollectionsComponent } from '../collections.followed';
import { Wrapper, WrapperCont } from '../communities.all/CommunitiesAll';
import { HomeBox, MainContainer } from '../../sections/layoutUtils';
import { WrapperPanel } from '../../sections/panel';

class ColloctionsFollowed extends React.Component<{}> {
  render() {
    return (
      <MainContainer>
        <HomeBox>
          <WrapperCont>
            <Wrapper>
              <Tabs>
                <SuperTabList>
                  <SuperTab>
                    <h5>
                      <Trans>Followed collections</Trans>
                    </h5>
                  </SuperTab>
                </SuperTabList>
                <TabPanel>
                  <FollowingCollectionsComponent />
                </TabPanel>
              </Tabs>
            </Wrapper>
          </WrapperCont>
        </HomeBox>
        <WrapperPanel />
      </MainContainer>
    );
  }
}

export default ColloctionsFollowed;
