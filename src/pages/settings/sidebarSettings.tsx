import * as React from 'react';
import { Box, Text, Flex } from 'rebass/styled-components';
import styled from '../../themes/styled';
import { Trans } from '@lingui/macro';

import media from 'styled-media-query';
import { ellipsis } from 'polished';
import { ChevronRight, ChevronLeft } from 'react-feather';
import { LocaleContext } from '../../context/global/localizationCtx';

const SidebarComponent = styled(Flex)`
  flex-grow: 1;
  z-index: 3;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0px;
  min-height: 0px;
  height: 100vh;
  min-width: 0px;
  padding: 0px;
  position: relative;
  overflow-y: auto;
  border-left: 1px solid ${props => props.theme.colors.lightgray};
  border-right: 1px solid ${props => props.theme.colors.lightgray};
`;

const InternalWrapper = styled(Box)``;

const SidebarFixed = styled(Box)`
  justify-content: space-between;
  height: 100%;
  display: flex;
  margin-top: 16px;
`;

const SidebarOverflow = styled(Box)`
  overflow-y: auto;
  width: 100%;
`;

const Nav = styled(Box)`
  border-top: 1px solid ${props => props.theme.colors.lightgray};
  a {
    text-decoration: none;
  }
`;

const NavItem = styled(Flex)`
  padding: 16px;
  cursor: pointer;
  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
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
  color: ${props => props.theme.colors.darkgray};
//   ${ellipsis('220px')} 
//   ${media.lessThan('1280px')`
//   display: none;
// `};
  margin-left: 8px;
  .--rtl & {
    margin-right: 8px;
    margin-left: 0px;
  }
`;

const Header = styled(Flex)`
  position: relative;
`;

const Title = styled(Text)`
  height: 48px;
  font-size: 20px;
  font-weight: 700;
  line-height: 48px;
  padding: 0 8px;
`;

const Sidebar = props => {
  return (
    <SidebarComponent>
      <InternalWrapper>
        <SidebarFixed>
          <SidebarOverflow>
            <Header alignItems={'center'}>
              <Title>
                <Trans>Settings</Trans>
              </Title>
            </Header>
            <LocaleContext.Consumer>
              {value => (
                <Nav mt={3}>
                  <NavItem
                    style={
                      props.switch === 'general'
                        ? { background: 'rgba(0,0,0,.1)' }
                        : { position: 'static' }
                    }
                    onClick={() => props.onSwitch('general')}
                    alignItems={'center'}
                  >
                    <ItemTitle ml={2} fontSize={2} fontWeight={600} width={1}>
                      <Trans>General Information</Trans>
                    </ItemTitle>
                    {value.locale != 'ar_SA' ? (
                      <ChevronRight size={24} />
                    ) : (
                      <ChevronLeft size={24} />
                    )}
                  </NavItem>
                  <NavItem
                    style={
                      props.switch === 'preferences'
                        ? { background: 'rgba(0,0,0,.1)' }
                        : { position: 'static' }
                    }
                    onClick={() => props.onSwitch('preferences')}
                    mb={3}
                    alignItems={'center'}
                  >
                    <ItemTitle ml={2} fontSize={2} fontWeight={600} width={1}>
                      <Trans>Preferences</Trans>
                    </ItemTitle>
                    {value.locale != 'ar_SA' ? (
                      <ChevronRight size={24} />
                    ) : (
                      <ChevronLeft size={24} />
                    )}
                  </NavItem>
                </Nav>
              )}
            </LocaleContext.Consumer>
          </SidebarOverflow>
        </SidebarFixed>
      </InternalWrapper>
    </SidebarComponent>
  );
};

export default Sidebar;
