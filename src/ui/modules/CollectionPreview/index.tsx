import * as React from 'react';
import { FileText } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Heading, Text } from 'rebass/styled-components';
import Avatar from 'ui/elements/Avatar';
import styled from 'ui/themes/styled';

export interface Props {
  link: {
    url: string;
    external: boolean;
  };
  icon: string;
  name: string;
  summary: string;
  totalResources: number | null;
}

export const CollectionPreview: React.SFC<Props> = ({
  link,
  icon,
  name,
  summary,
  totalResources
}) => {
  return (
    <WrapperLink to={link.url}>
      <Wrapper p={3}>
        <Avatar size="m" src={icon} />
        <Infos ml={3}>
          <Title>
            {name.length > 80
              ? name.replace(/^(.{76}[^\s]*).*/, '$1...')
              : name}
          </Title>

          <Text variant="text" mt={2} mb={3}>
            {summary && summary.length > 140
              ? summary.replace(/^([\s\S]{140}[^\s]*)[\s\S]*/, '$1...')
              : summary}
          </Text>
          <Actions>
            <ActionItem>
              <FileText size={20} color={'#8b98a2'} />
              {totalResources && (
                <Text variant="suptitle">{totalResources} resources</Text>
              )}
            </ActionItem>
          </Actions>
        </Infos>
      </Wrapper>
    </WrapperLink>
  );
};

export const CollectionSmall: React.FC<{ icon: string; name: string }> = ({
  icon,
  name
}) => {
  return (
    <WrapperSmall py={1} mb={1} ml={3}>
      <Avatar size="m" variant="avatar" src={icon} />
      <Box>
        <TitleSmall variant="subhead" fontSize={1} my={3} fontWeight={600}>
          {name.length > 80 ? name.replace(/^(.{76}[^\s]*).*/, '$1...') : name}
        </TitleSmall>
      </Box>
    </WrapperSmall>
  );
};

const WrapperLink = styled(NavLink)`
  text-decoration: none;
`;

const WrapperSmall = styled(Box)`
  cursor: pointer;
  position: relative;
  text-align: center;
  > div {
    margin: 0 auto;
  }
`;

const Actions = styled.div`
  display: inline-block;
  position: absolute;
  bottom: 0px;
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
  word-break: break-all;
`;

const TitleSmall = styled(Text)`
  color: ${props => props.theme.colors.darkgray};
  text-align: center;
`;
