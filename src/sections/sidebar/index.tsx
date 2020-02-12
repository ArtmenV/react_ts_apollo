import { Trans } from '@lingui/macro';
import { ellipsis } from 'polished';
import * as React from 'react';
import { Globe, MoreHorizontal } from 'react-feather';
import { SearchBox } from 'react-instantsearch-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Text } from 'rebass/styled-components';
import media from 'styled-media-query';
import Loader from '../../components/elements/Loader/Loader';
import styled from '../../themes/styled';
import Dropdown from './dropdown';
import { GetSidebarQueryQueryResult } from '../../graphql/getSidebar.generated';
import Empty from '../../components/elements/Empty';
import Avatar from 'ui/elements/Avatar';

const MnetLogo = require('./moodle-logo.png');
const SidebarComponent = styled(Flex)`
  flex-grow: 1;
  align-items: flex-end;
  z-index: 3;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  overflow-y: auto;
  ${media.lessThan('860px')`
  `};
`;

const InternalWrapper = styled(Box)<{ isOpen: boolean }>`
  transition: 'all 250ms ease';
  ${media.greaterThan('1281px')`
    width: 300px !important;
  `}
  ${media.lessThan('1280px')`
    width: 88px;
  `}
  ${media.lessThan('10240px')`
    width: 68px;
  `}
  ${media.lessThan('860px')`
    position: relative;
    left: ${props => (props.isOpen ? '0' : '-300px')};
    width: ${props => (props.isOpen ? '100%' : '0')};
  `}
`;

const SidebarFixed = styled(Box)`
  justify-content: space-between;
  height: 100%;
  position: fixed;
  top: 0px;
  display: flex;
  padding-left: 6px;
  width: 295px;
  ${media.lessThan('1280px')`
    width: auto;
  `} ${media.lessThan('860px')`
    position: relative;
    width: 100%
  `};
`;

const SidebarOverflow = styled(Box)`
  overflow-y: auto;
  flex: 1;
`;

const Header = styled(Box)`
  cursor: pointer;
  img {
    min-width: 36px;
    height: 36px;
    border-radius: 36px;
  }
  input {
    margin: 0 8px !important;
    border-radius: 100px;
    border-width: 1px;
    ${media.lessThan('1280px')`
      display: none;
    `};
  }
`;
const Nav = styled(Box)`
  // border-top: 4px solid ${props => props.theme.colors.lightgray};
  a {
    text-decoration: none;
  }
`;

const CommunityLink = styled(NavLink)`
  img {
    width: 36px;
    height: 36px;
  }
  &.active {
    > div {
      background: ${props => props.theme.colors.orange};
    }
    div {
      color: white !important;
    }
    position: relative;
  }
`;

const SidebarLink = styled(NavLink)`
  position: relative;
  color: inherit;
  img {
    width: 36px;
    height: 36px;
  }
  &.active {
    color: ${props => props.theme.colors.orange};
    position: relative;
    &:before {
      position: absolute;
      content: '';
      left: -10px;
      top: 24px;
      width: 8px;
      border-radius: 100px;
      height: 8px;
      display: block;
      background: ${props => props.theme.colors.orange};
    }
  }
  div {
    color: ${props => (props.isActive ? props.theme.colors.orange : 'inherit')};
  }
`;

const NavItem = styled(Flex)`
  border-radius: 4px;
  padding: 8px;
  &:hover {
    background: ${props => props.theme.colors.lightgray};
  }
  ${media.lessThan('1280px')`
  img {
    margin-right: 0;
  }
`};
`;

const ItemTitle = styled(Text)`
  a:focus,
  a:active {
    color: inherit;
  }
  ${ellipsis('220px')};
  ${media.lessThan('1280px')`
  display: none;
`};
`;

const Layer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 50px;
  z-index: 1;
  display: block;
`;

const Right = styled(Box)`
  color: ${props => props.theme.colors.gray};
  ${media.lessThan('1280px')`
    display: none;
  `};
`;

const ItemTitleDir = styled(ItemTitle)`
  margin-left: 8px;
  .--rtl & {
    margin-right: 8px;
    margin-left: 0px;
  }
`;

const Sbox = styled(Box)`
  ${media.lessThan('1280px')`
    display: none;
  `};
`;

// const HeaderProfile = styled(Flex)``

const HeaderName = styled(Text)`
  flex: 1;
  ${ellipsis('220px')};
  ${media.lessThan('1280px')`
  display: none;
`};
`;

interface Props {
  resp: GetSidebarQueryQueryResult;
  isOpen: boolean;
}
const Sidebar: React.FC<Props> = ({ resp, isOpen }) => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const closeMenu = React.useCallback(() => setMenuIsOpen(false), []);
  const openMenu = React.useCallback(() => setMenuIsOpen(true), []);
  const { data } = resp;
  return (
    <SidebarComponent>
      <InternalWrapper isOpen={isOpen}>
        <SidebarFixed>
          <SidebarOverflow pt={3}>
            {!data ? (
              resp.error ? (
                <Empty>
                  <Trans>Error loading the sidebar</Trans>
                </Empty>
              ) : resp.loading ? (
                <Loader />
              ) : null
            ) : !data.me ? null : (
              <>
                <Header alignItems={'center'}>
                  <Sbox ml={2} mb={3}>
                    <SearchBox />
                  </Sbox>
                  <NavItem alignItems="center" onClick={openMenu}>
                    <Avatar
                      initials={data.me.user.name!.substring(0, 2)}
                      src={data.me!.user!.icon!}
                      variant="avatar"
                      // name={props.data.me.user.name}
                    />
                    <HeaderName ml={2} variant="link">
                      {data.me.user.name}
                    </HeaderName>
                    <Right>
                      <MoreHorizontal size="20" />
                    </Right>
                  </NavItem>
                  {/* <Input placeholder="Search" /> */}
                  {menuIsOpen ? (
                    <>
                      <OutsideClickHandler onOutsideClick={closeMenu}>
                        <div onClick={closeMenu}>
                          <Dropdown />
                        </div>
                      </OutsideClickHandler>
                      <Layer />
                    </>
                  ) : null}
                  {/* <Input placeholder={"Search here"} /> */}
                </Header>
                <Nav pt={3}>
                  <SidebarLink exact to={'/discover'}>
                    <NavItem mb={3} alignItems={'center'}>
                      <Globe size={40} />
                      <ItemTitleDir variant="link">
                        <Trans>Discover</Trans>
                      </ItemTitleDir>
                    </NavItem>
                  </SidebarLink>
                  <SidebarLink exact to={'/'}>
                    <NavItem mb={3} alignItems={'center'}>
                      <Avatar src={MnetLogo} />
                      <ItemTitleDir variant="link">
                        <Trans>My MoodleNet</Trans>
                      </ItemTitleDir>
                    </NavItem>
                  </SidebarLink>
                </Nav>
                <Nav>
                  {/* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                  data.me.user.followedCommunities!.edges.map(
                    userJoinedCommunitiesEdge => {
                      if (!userJoinedCommunitiesEdge) {
                        return null;
                      }
                      const community =
                        userJoinedCommunitiesEdge.node.community;
                      return (
                        <CommunityLink
                          key={community.id}
                          to={'/communities/' + community.id}
                        >
                          <NavItem alignItems={'center'} mb={2}>
                            <Avatar
                              initials={community.name.substr(0, 2)}
                              src={community.icon!}
                            />
                            <ItemTitleDir variant="link">
                              {community.name}
                            </ItemTitleDir>
                          </NavItem>
                        </CommunityLink>
                      );
                    }
                  )}
                </Nav>
              </>
            )}
          </SidebarOverflow>
        </SidebarFixed>
      </InternalWrapper>
    </SidebarComponent>
  );
};

export default Sidebar;
