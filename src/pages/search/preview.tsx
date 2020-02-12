/**
 * The only true button.
 *
 * @visibleName The Best Button Ever 🐙
 * Avatar component.
 * @param children {JSX.Element} children of Avatar
 * @param size {"small"|"large"} size of avatar
 * @param marked {Boolean} whether blue dot should appear on avatar
 * @param className {String} additional class names of avatar
 * @param props {Object} avatar props

 */

import * as React from 'react';

import styled from '../../themes/styled';
import { Heading, Box, Flex, Text, Button } from 'rebass/styled-components';
// import { NavLink } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import Avatar from 'ui/elements/Avatar';
import { Hit } from './Hits';
import { useHit } from './lib';
import { SearchHostIndexAndMyFollowingsQuery } from './SearchData.generated';

const PlaceholderImg = require('../../components/elements/Icons/resourcePlaceholder.png');

// interface Props {
//   icon: string;
//   image?: string;
//   title: string;
//   summary: string;
//   url: string;
//   type: string;
//   coreIntegrationURL?: any;
// }
// icon={hit.icon || hit.image}
// title={hit.name}
// summary={hit.summary}
// url={hit.url || hit.canonicalUrl || ''}
// type={hit.index_type}
// coreIntegrationURL={
//   moodle_core_download_url
//     ? moodle_core_download_url +
//       `&sourceurl=` +
//       encodeURIComponent(hit.url) +
//       `&moodleneturl=` +
//       encodeURIComponent(hit.canonicalUrl||'') +
//       `&name=` +
//       encodeURIComponent(hit.name) +
//       `&description=` +
//       encodeURIComponent(hit.summary)
//     : null
// }

interface Props {
  hit: Hit;
  moodle_core_download_url: string;
  myInfo: SearchHostIndexAndMyFollowingsQuery;
}

const Resource: React.FC<Props> = ({
  hit,
  moodle_core_download_url,
  myInfo
}) => {
  const props = {
    icon: hit.icon || hit.image,
    title: hit.name,
    summary: hit.summary,
    url: hit.url || hit.canonicalUrl || '',
    type: hit.index_type,
    coreIntegrationURL: moodle_core_download_url
      ? moodle_core_download_url +
        `&sourceurl=` +
        encodeURIComponent(hit.url) +
        `&moodleneturl=` +
        encodeURIComponent(hit.canonicalUrl || '') +
        `&name=` +
        encodeURIComponent(hit.name) +
        `&description=` +
        encodeURIComponent(hit.summary)
      : null
  };
  const hitCtl = useHit(myInfo, hit);
  return (
    <Wrapper p={3}>
      <WrapperLink target="blank" href={props.url}>
        <Avatar size="m" src={props.icon || PlaceholderImg} />
        <Infos ml={3}>
          <Title>
            {props.title.length > 80
              ? props.title.replace(/^(.{76}[^\s]*).*/, '$1...')
              : props.title}
          </Title>
          <Text variant="text" mt={2} mb={3}>
            {props.summary && props.summary.length > 140
              ? props.summary.replace(/^([\s\S]{140}[^\s]*)[\s\S]*/, '$1...')
              : props.summary}
          </Text>

          <Type variant="suptitle">{props.type}</Type>
          {!props.coreIntegrationURL ? null : (
            <Actions>
              <a href={props.coreIntegrationURL} target="_top">
                <Button variant="outline">
                  <Trans>To Moodle!</Trans>
                </Button>
              </a>
            </Actions>
          )}
        </Infos>
      </WrapperLink>
      {hitCtl.isFollowable &&
        !hitCtl.isFollowing && (
          <Button variant="outline" onClick={hitCtl.follow}>
            <Trans>Follow</Trans>
          </Button>
        )}
      {hitCtl.isFollowing && (
        <Button variant="outline" onClick={hitCtl.unfollow}>
          <Trans>Unfollow</Trans>
        </Button>
      )}
    </Wrapper>
  );
};
const Type = styled(Text)`
  margin-top: 8px;
  background: ${props => props.theme.colors.lighter};
  display: inline-block;
  padding: 4px 16px;
  border-radius: 30px;
`;
const Actions = styled.div`
  width: 100px;
  text-align: right;
  & button {
    height: 25x;
    max-width: 80px;
    min-width: 80px;
    border-width: 1px !important;
    line-height: 25px;
    color: ${props => props.theme.colors.lightgray} svg {
      color: inherit !important;
    }
  }
`;

const WrapperLink = styled.a`
  display: flex;
  text-decoration: none;
  &:hover {
    text-decoration: none !important;
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

export default Resource;
