import * as React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Flex } from 'rebass/styled-components';
import media from 'styled-media-query';
import { Trans } from '@lingui/react';
import Modal from 'ui/modules/Modal';

import {
  Nav,
  NavItem,
  Panel,
  PanelTitle,
  WrapperPanel
} from 'ui/elements/Panel';
import styled from 'ui/themes/styled';
import Button from 'ui/elements/Button';

export interface Props {
  ActivityBoxes: JSX.Element[];
  ResourceBoxes: JSX.Element[];
  HeroCollectionBox: JSX.Element;
  ShareLinkModalPanel: React.ComponentType<{ done(): any }>;
  EditCollectionPanel: React.ComponentType<{ done(): any }>;
  UploadResourcePanel: React.ComponentType<{ done(): any }>;
  basePath: string;
}

export const Collection: React.FC<Props> = ({
  HeroCollectionBox,
  ShareLinkModalPanel,
  EditCollectionPanel,
  UploadResourcePanel,
  ActivityBoxes,
  ResourceBoxes,
  basePath
}) => {
  const [isOpenEditCollection, setOpenEditCollection] = React.useState(false);
  const [isShareLinkOpen, setOpenShareLink] = React.useState(false);
  const [isUploadOpen, setUploadOpen] = React.useState(false);
  return (
    <MainContainer>
      {isOpenEditCollection && (
        <Modal closeModal={() => setOpenShareLink(false)}>
          <EditCollectionPanel done={() => setOpenEditCollection(false)} />
        </Modal>
      )}
      {isShareLinkOpen && (
        <Modal closeModal={() => setOpenShareLink(false)}>
          <ShareLinkModalPanel done={() => setOpenShareLink(false)} />
        </Modal>
      )}
      <HomeBox>
        <WrapperCont>
          <Wrapper>
            {HeroCollectionBox}
            <Menu basePath={basePath} />
            <Switch>
              <Route exact path={`${basePath}/`}>
                {ActivityBoxes}
              </Route>
              <Route path={`${basePath}/resources`}>
                <>
                  <WrapButton px={3} pb={3} mb={2}>
                    <Button
                      mr={2}
                      onClick={() => setOpenShareLink(true)}
                      variant="outline"
                    >
                      <Trans>Share link</Trans>
                    </Button>
                    <Button
                      onClick={() => setUploadOpen(true)}
                      variant="outline"
                    >
                      <Trans>Add new resource</Trans>
                    </Button>
                  </WrapButton>
                  {isUploadOpen && (
                    <UploadResourcePanel done={() => setUploadOpen(false)} />
                  )}
                  {ResourceBoxes}
                </>
              </Route>
            </Switch>
          </Wrapper>
        </WrapperCont>
      </HomeBox>
      <WrapperPanel>
        <Panel>
          <PanelTitle fontSize={0} fontWeight={'bold'}>
            Popular hashtags
          </PanelTitle>
          <Nav>
            <NavItem mb={3} fontSize={1}>
              #pedagogy
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              #transition
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              #english
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              #template
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              #assessment
            </NavItem>
          </Nav>
        </Panel>
        <Panel>
          <PanelTitle fontSize={0} fontWeight={'bold'}>
            Popular categories
          </PanelTitle>
          <Nav>
            <NavItem mb={3} fontSize={1}>
              Humanities
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              Behavioural science
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              English
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              Romana
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              Postgraduate
            </NavItem>
          </Nav>
        </Panel>
      </WrapperPanel>
    </MainContainer>
  );
};
export default Collection;
// export interface RecentActivitiesProps {
//   activities: Activity[];
//   ActivityBox: ActivityBox;
// }

// const RecentActivities: React.SFC<RecentActivitiesProps> = ({
//   activities,
//   ActivityBox
// }) => {
//   return (
//     <>
//       {activities.map(activity => (
//         <ActivityBox activity={activity} key={activity.id} />
//       ))}
//     </>
//   );
// };

const Menu = ({ basePath }: { basePath: string }) => (
  <MenuWrapper p={3} pt={3}>
    <NavLink exact to={`${basePath}`}>
      Recent activities
    </NavLink>
    <NavLink to={`${basePath}/resources`}>Resources</NavLink>
  </MenuWrapper>
);

const WrapButton = styled(Flex)`
  // border-bottom: 3px solid ${props => props.theme.colors.lightgray};
  button {
    width: 100%;
    height: 50px;
  }
`;

const MenuWrapper = styled(Flex)`
  border-top: 3px solid ${props => props.theme.colors.lightgray};
  a {
    font-weight: 800;
    text-decoration: none;
    margin-right: 24px;
    color: ${props => props.theme.colors.gray};
    letterspacing: '1px';
    font-size: 16px;
    &.active {
      color: ${props => props.theme.colors.orange};
      position: relative;
      &:after {
        position: absolute;
        content: '';
        display: block;
        top: -19px;
        width: 100%;
        height: 3px;
        background: ${props => props.theme.colors.orange};
      }
    }
  }
`;

export const HomeBox = styled(Flex)`
  max-width: 600px;
  width: 100%;
  align-items: flex-start;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: auto;
  flex-direction: column;
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  z-index: 0;
  ${media.lessThan('1005px')`
    max-width: 100%;
  `};
  // ${media.lessThan('1280px')`
  // top: 60px;
  // `};
`;

export const MainContainer = styled(Flex)`
  align-items: stretch;
  flex-grow: 1;
  flex-direction: row;
  width: 100%;
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
