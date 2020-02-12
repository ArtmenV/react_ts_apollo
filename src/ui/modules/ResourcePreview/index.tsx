import * as React from 'react';
import { Globe } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Heading, Text } from 'rebass/styled-components';
import Avatar from 'ui/elements/Avatar';
import styled from 'ui/themes/styled';
import { ellipsis } from 'polished';

export interface Props {
  id: string;
  icon: string;
  name: string;
  summary: string;
  link: string;
}

export const ResourcePreview: React.SFC<Props> = ({
  id,
  icon,
  name,
  summary,
  link
}) => {
  return (
    <WrapperLink to={'/collections/' + id}>
      <Wrapper p={3}>
        <Avatar size="m" src={icon} />
        <Infos ml={3}>
          <Title>{name}</Title>
          <Text variant="text" mt={2} mb={3}>
            {summary}
          </Text>
          <Actions>
            <ActionItem>
              <Globe size={20} color={'#8b98a2'} />
              <Text ml={2} variant="suptitle">
                {link}
              </Text>
            </ActionItem>
          </Actions>
        </Infos>
      </Wrapper>
    </WrapperLink>
  );
};

const WrapperLink = styled(NavLink)`
  text-decoration: none;
`;

const Actions = styled(Box)`
  ${ellipsis('360px')};
`;
const ActionItem = styled(Flex)`
  color: ${props => props.theme.colors.gray};
  text-transform: uppercase;
  align-items: center;
  & svg {
    vertical-align: sub;
    color: inherit !important;
    margin-right: 4px;
  }
`;

const Wrapper = styled(Flex)`
  cursor: pointer;
  position: relative;
  text-decoration: none;
  background: #fff;
  margin: 16px;
  margin-top: 0;
  border-radius: 6px;
  box-shadow: 0 4px 10px 0px rgba(0, 0, 0, 0.1);
  // border-bottom: 4px solid ${props => props.theme.colors.lighter};
  &:hover {
    border-radius: 4px;
    background: ${props => props.theme.colors.lighter};
  }
`;

const Infos = styled(Box)`
  flex: 1;
  position: relative;
  div {
    text-decoration: none;
  }
`;
const Title = styled(Heading)`
  color: ${props => props.theme.colors.darkgray};
  font-size: 20px;
  text-decoration: none;
`;
