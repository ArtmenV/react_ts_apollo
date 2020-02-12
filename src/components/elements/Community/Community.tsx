import React from 'react';
import { Link } from 'react-router-dom';
import styled from '../../../themes/styled';
import { Text, Box, Flex } from 'rebass/styled-components';
import { Layers, Users } from 'react-feather';

const PlaceholderImg = require('../Icons/communityPlaceholder.png');

interface Props {
  title: string;
  icon?: string;
  summary: string;
  id: string;
  followersCount: number;
  collectionsCount: number;
  followed: boolean;
  externalId: string;
  threadsCount: number;
}

const Community: React.FC<Props> = ({
  title,
  id,
  icon,
  summary,
  followersCount,
  collectionsCount,
  externalId
}) => (
  <Wrapper>
    <Link
      to={
        id
          ? `/communities/${id}`
          : `/communities/federate?url=${encodeURI(externalId)}`
      }
    >
      <WrapperImage>
        <Img
          style={{
            backgroundImage: `url(${icon || PlaceholderImg})`
          }}
        />
      </WrapperImage>
      <Text variant="heading" fontSize={3}>
        {title.length > 60 ? title.replace(/^(.{56}[^\s]*).*/, '$1...') : title}
      </Text>

      <Text variant="text">
        {summary.length > 160
          ? summary.replace(/^([\s\S]{156}[^\s]*)[\s\S]*/, '$1...')
          : summary}
      </Text>
      <Flex my={2} color={'rgba(0,0,0,.4)'}>
        <FlexDir alignSelf="center" alignItems="center">
          <FlexInnerDir>
            <Users width={18} height={18} strokeWidth={2} />
          </FlexInnerDir>
          <Text>{followersCount || 0}</Text>
        </FlexDir>
        <FlexDir alignSelf="center" alignItems="center">
          <FlexInnerDir>
            <Layers width={18} height={18} strokeWidth={2} />
          </FlexInnerDir>
          <Text>{collectionsCount || 0}</Text>
        </FlexDir>
      </Flex>
    </Link>
  </Wrapper>
);

export default Community;

const Wrapper = styled(Box)`
  padding: 10px;
  position: relative;
  max-height: 560px;
  overflow: hidden;
  z-index: 9;
  border-radius: 6px;
  padding-bottom: 0;
  &:hover {
    background: ${props => props.theme.colors.lighter};
    text-decoration: none;
  }
  & a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
`;
const WrapperImage = styled.div`
  position: relative;
  &:hover {
    & span {
      display: block;
    }
  }
`;
const Img = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center center;
  border-radius: 6px;
  background-repeat: no-repeat;
  margin-bottom: 8px;
  position: relative;
`;

const FlexDir = styled(Flex)`
  margin-right: 16px;
  .--rtl & {
    margin-left: 16px;
    margin-right: 0px;
  }
`;

const FlexInnerDir = styled(Flex)`
  margin-right: 8px;
  .--rtl & {
    margin-left: 8px;
    margin-right: 0px;
  }
`;
