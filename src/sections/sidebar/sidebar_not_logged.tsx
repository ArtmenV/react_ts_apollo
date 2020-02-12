import { Trans } from '@lingui/macro';
import { ellipsis } from 'polished';
import * as React from 'react';
import { Globe } from 'react-feather';
import { SearchBox } from 'react-instantsearch-dom';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Image, Text } from 'rebass/styled-components';
import media from 'styled-media-query';
import styled from '../../themes/styled';

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
  width: 290px;
  // width: 280px;
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
  a {
    text-decoration: none;
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

const Sbox = styled(Box)`
  ${media.lessThan('1280px')`
    display: none;
  `};
`;

const Sidebar: React.FC<{ isOpen: boolean }> = isOpen => (
  <SidebarComponent>
    <InternalWrapper isOpen={isOpen}>
      <SidebarFixed>
        <SidebarOverflow pt={3}>
          <Header alignItems={'center'}>
            <Sbox ml={2} mb={3}>
              <SearchBox />
            </Sbox>
          </Header>
          <Nav pt={3}>
            <SidebarLink exact to={'/'}>
              <NavItem mb={3} alignItems={'center'}>
                <Image mr={2} width={'40px'} src={MnetLogo} />
                <ItemTitle variant="link">
                  <Trans>Join MoodleNet</Trans>
                </ItemTitle>
              </NavItem>
            </SidebarLink>
            <SidebarLink exact to={'/discover'}>
              <NavItem mb={3} alignItems={'center'}>
                <Globe size={36} />
                <ItemTitle ml={2} variant="link">
                  <Trans>Discover</Trans>
                </ItemTitle>
              </NavItem>
            </SidebarLink>
          </Nav>
        </SidebarOverflow>
      </SidebarFixed>
    </InternalWrapper>
  </SidebarComponent>
);

export default Sidebar;
