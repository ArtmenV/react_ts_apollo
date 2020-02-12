import React from 'react';
import { Flex } from 'rebass/styled-components';
import styled from 'ui/themes/styled';
export interface SidebarProps {
  SidebarBox: React.ComponentType;
}

export const WithSidebar: React.SFC<SidebarProps> = props => (
  <CenteredWrapper>
    <props.SidebarBox />
    <Flex ml={2}>{props.children}</Flex>
  </CenteredWrapper>
);

const CenteredWrapper = styled(Flex)`
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;
