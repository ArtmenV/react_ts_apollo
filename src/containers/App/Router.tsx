import { CollectionPageHOC } from 'HOC/pages/collection/CollectionPageHOC';
import { CommunityPageHOC } from 'HOC/pages/community/CommunityPageHOC';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Flex } from 'rebass/styled-components';
import { SessionContext } from '../../context/global/sessionCtx';
import { CollectionsYours } from '../../pages/collections.all';
import MyCollections from '../../pages/collections.all/collectionsFollowed';
import { CommunitiesAll } from '../../pages/communities.all/CommunitiesAll';
import { CommunitiesYours } from '../../pages/communities.all/communitiesJoined';
import ConfirmAccount from '../../pages/Confirm';
import CreateNewPassword from '../../pages/CreateNewPassword';
import Discover from '../../pages/discover';
import Home from '../../pages/home';
import Login from '../../pages/login/Login';
import NotFound from '../../pages/not-found/NotFound';
import Profile from '../../pages/Profile';
import Reset from '../../pages/Reset';
import SearchComp from '../../pages/search/Search';
import Settings from '../../pages/settings';
import Signup from '../../pages/Signup';
import Thread from '../../pages/thread/component';
import User from '../../pages/User';
// import media from 'styled-media-query';

import {
  Inner,
  MainWrapper,
  WrapperDimension
} from '../../sections/layoutUtils';
import Sidebar from '../../sections/sidebar/sidebarHOC';
import SidebarNoLoggedWrapper from '../../sections/sidebar/sidebar_not_logged';
import styled from '../../themes/styled';
import MobileHeader from './mobileHeader';

const Main = styled(Flex)`
  height: 100%;
  font-family: 'Open Sans', sans-serif !important;
`;

const AppInner = styled.div`
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  z-index: 0;
  flex-basis: 0%;
  flex-grow: 1;
  display: flex;
  flex-shrink: 1;
`;

const PageContainer = styled(Flex)`
  min-height: 100vh;
  height: 100%;
  width: 100%;
  ponter-events: auto;
  flex-direction: row;
`;

const Content: React.FC<{ onOpen(): any }> = ({ onOpen }) => {
  const { me } = React.useContext(SessionContext);

  return (
    <>
      <MobileHeader onOpen={onOpen} />
      <Switch>
        <Route exact path="/" component={me ? Home : Login} />
        <Route exact path="/profile" component={me ? Profile : Login} />
        <Route
          exact
          path="/mycommunities"
          component={me ? CommunitiesYours : Login}
        />
        <Route exact path="/settings" component={me ? Settings : Login} />
        <Route
          exact
          path="/mycollections"
          component={me ? MyCollections : Login}
        />

        <Route exact path="/discover" component={Discover} />
        <Route
          exact
          path="/communities"
          render={route => {
            return <CommunitiesAll loggedin={!!me} />;
          }}
        />
        <Route
          exact
          path="/communities/:communityId/:tab?"
          render={route => {
            const communityId = route.match.params.communityId;
            return <CommunityPageHOC id={communityId} />;
          }}
        />
        <Route
          exact
          path="/thread/:id"
          render={route => {
            const threadId = route.match.params.id;
            return <Thread threadId={threadId} />;
          }}
        />
        <Route
          exact
          path="/collections/:id/:tab?"
          render={route => {
            const id = route.match.params.id;
            return <CollectionPageHOC collectionId={id} />;
          }}
        />

        <Route
          exact
          path="/user/:id"
          render={route => {
            const userId = route.match.params.id;
            return me && me.user.id === userId ? (
              <Redirect to="/profile" />
            ) : (
              <User userId={userId} />
            );
          }}
        />
        <Route path="/search" component={SearchComp} />
        <Route exact path="/collections" component={CollectionsYours} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export interface Props {
  location: any;
  history: any;
}
const App: React.FC<Props> = props => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const { me } = React.useContext(SessionContext);
  const onSidebarOpen = React.useCallback(
    () => {
      setSidebarOpen(!isSidebarOpen);
    },
    [isSidebarOpen]
  );
  return (
    <Flex alignItems={'center'}>
      <PageContainer>
        {me ? (
          <Sidebar isOpen={isSidebarOpen} />
        ) : location.pathname !== '/' ? (
          <SidebarNoLoggedWrapper isOpen={isSidebarOpen} />
        ) : null}
        <MainWrapper>
          <WrapperDimension
            isLogin={!me && location.pathname === '/' ? true : false}
          >
            <Inner>
              <Content onOpen={onSidebarOpen} />
            </Inner>
          </WrapperDimension>
        </MainWrapper>
      </PageContainer>
    </Flex>
  );
};

export default _ => {
  const { me } = React.useContext(SessionContext);

  return (
    <Main>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.1.1/themes/reset-min.css"
      />
      <AppInner>
        <Switch>
          <Route
            exact
            path="/confirm-email/:token"
            render={route =>
              me ? (
                <Redirect to="/" />
              ) : (
                <ConfirmAccount token={route.match.params.token} />
              )
            }
          />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/reset/:token" component={CreateNewPassword} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/" component={props => <App {...props} />} />
          <Route component={NotFound} />
        </Switch>
      </AppInner>
    </Main>
  );
};
