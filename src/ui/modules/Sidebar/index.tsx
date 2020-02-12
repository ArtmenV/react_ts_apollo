import { Trans } from '@lingui/macro';
import { ellipsis } from 'polished';
import * as React from 'react';
import { Globe, ChevronDown } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Text } from 'rebass/styled-components';
import media from 'styled-media-query';
// import Loader from "../../components/elements/Loader/Loader";
import styled from '../../themes/styled';
// import Dropdown from "./dropdown";
import Avatar from 'ui/elements/Avatar';
import { Dropdown } from './dropdown';
const MnetLogo = require('./moodle-logo.png');

export enum Status {
  Loading,
  Loaded
}

const SidebarComponent = styled(Flex)`
  width: 240px;
`;

const InternalWrapper = styled(Box)<{ isOpen: boolean }>`
  transition: 'all 250ms ease';
flex: 1;
// ${media.greaterThan('1281px')`
//width: 300px !important;
//`}
//${media.lessThan('1280px')`
//width: 88px;
//`}
//${media.lessThan('10240px')`
//width: 68px;
//`}
//${media.lessThan('860px')`
//position: relative;
//left: ${props => (props.isOpen ? '0' : '-300px')};
//width: ${props => (props.isOpen ? '100%' : '0')};
//`}
`;

const SidebarFixed = styled(Box)`
  justify-content: space-between;
  height: 100%;
  display: flex;
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
// ${media.lessThan('1280px')`
//display: none;
//`};
`;

const Right = styled(Box)`
color: ${props => props.theme.colors.gray};
//${media.lessThan('1280px')`
//display: none;
//`};
`;

const ItemTitleDir = styled(ItemTitle)`
  margin-left: 8px;
  .--rtl & {
    margin-right: 8px;
    margin-left: 0px;
  }
`;

const HeaderName = styled(Text)`
  flex: 1;
  ${ellipsis('220px')};
  //${media.lessThan('1280px')`
//display: none;
//`};
`;

interface CommunityPreview {
  link: {
    url: string;
    external: true;
  };
  name: string;
  icon: string;
}

interface SidebarLoaded {
  status: Status.Loaded;
  communities: CommunityPreview[];
  user: {
    icon: string;
    name: string;
  };
  isOpen: boolean;
  Search: React.ComponentType;
  logout(): void;
}

export interface SidebarLoading {
  status: Status.Loading;
}

export interface Props {
  sidebar: SidebarLoaded | SidebarLoading;
}

export const Sidebar: React.FC<Props> = ({ sidebar }) => {
  const [isMenuOpen, setMenuIsOpen] = React.useState(false);
  const openMenu = React.useCallback(() => setMenuIsOpen(true), []);
  return (
    <SidebarComponent>
      <InternalWrapper>
        <SidebarFixed>
          {sidebar.status === Status.Loading ? (
            <Text>Loading</Text>
          ) : (
            <SidebarOverflow>
              <>
                <Header alignItems={'center'}>
                  <sidebar.Search />
                  <NavItem
                    sx={{ position: 'relative' }}
                    alignItems="center"
                    onClick={openMenu}
                  >
                    <Avatar
                      size="s"
                      initials={sidebar.user.name.substring(0, 2)}
                      src={sidebar.user.icon}
                      variant="avatar"
                    />
                    <HeaderName ml={2} variant="link">
                      {sidebar.user.name}
                    </HeaderName>
                    <Right>
                      <ChevronDown size="20" />
                    </Right>
                    {isMenuOpen && <Dropdown logout={sidebar.logout} />}
                  </NavItem>
                </Header>
                <Nav>
                  <SidebarLink exact to={'/discover'}>
                    <NavItem alignItems={'center'}>
                      <Box>
                        <Globe size={36} />
                      </Box>
                      <ItemTitleDir variant="link">
                        <Trans>Discover</Trans>
                      </ItemTitleDir>
                    </NavItem>
                  </SidebarLink>
                  <SidebarLink exact to={'/'}>
                    <NavItem alignItems={'center'}>
                      <Avatar size="s" src={MnetLogo} />
                      <ItemTitleDir variant="link">
                        <Trans>My MoodleNet</Trans>
                      </ItemTitleDir>
                    </NavItem>
                  </SidebarLink>
                </Nav>
                <Nav>
                  {sidebar.communities.map((community: CommunityPreview, i) => (
                    <CommunityLink
                      key={community.link.url}
                      to={'/communities/' + community.link.url}
                    >
                      <NavItem alignItems={'center'} mb={2}>
                        <Avatar
                          size="s"
                          initials={community.name.substr(0, 2)}
                          src={community.icon}
                        />
                        <ItemTitleDir variant="link">
                          {community.name}
                        </ItemTitleDir>
                      </NavItem>
                    </CommunityLink>
                  ))}
                </Nav>
              </>
            </SidebarOverflow>
          )}
        </SidebarFixed>
      </InternalWrapper>
    </SidebarComponent>
  );
};

export default Sidebar;
