import * as React from 'react';
import { MessageCircle, Star } from 'react-feather';
import styled from '../../../themes/styled';
import { Box, Flex, Text } from 'rebass/styled-components';
import SocialText from '../SocialText';
import { i18nMark } from '@lingui/react';
import { LocaleContext } from '../../../context/global/localizationCtx';

const tt = {
  placeholders: {
    name: i18nMark('Post a reply'),
    summary: i18nMark(
      'Please describe what the collection is for and what kind of resources it is likely to contain...'
    ),
    image: i18nMark('Enter the URL of an image to represent the collection')
  }
};

export interface Props {
  totalReplies: number;
  totalLikes: number;
  iLikeIt: boolean;
  toggleLike: () => unknown;
}
const ActionsWrapper = ({
  totalReplies,
  totalLikes,
  iLikeIt,
  toggleLike
}: Props) => {
  const [talkModalVisible, showTalkModal] = React.useState(false);
  const { i18n } = React.useContext(LocaleContext);
  return (
    <Actions mt={2}>
      <Items>
        {talkModalVisible && (
          <SocialText
            placeholder={i18n._(tt.placeholders.name)}
            name={'text'}
            defaultValue={''}
            submit={() => console.log()}
            onChange={() => console.log()}
          />
        )}
        <ActionItem onClick={() => showTalkModal(true)}>
          <ActionIcon>
            <MessageCircle color="rgba(0,0,0,.4)" size="16" />
          </ActionIcon>
          <Text ml={1}>{totalReplies}</Text>
        </ActionItem>
        <ActionItem ml={4} onClick={toggleLike}>
          <ActionIcon>
            <Star color={iLikeIt ? '#ED7E22' : 'rgba(0,0,0,.4)'} size="16" />
          </ActionIcon>
          <Text ml={1}>{totalLikes}</Text>
        </ActionItem>
      </Items>
    </Actions>
  );
};

const Items = styled(Flex)`
  flex: 1;
`;

const Actions = styled(Flex)`
  position: relative;
  z-index: 9999;
`;

const ActionItem = styled(Flex)`
  align-items: center;
  color: ${props => props.theme.colors.gray};
  cursor: pointer;
  a {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 9;
  }
  &:hover {
    div:first-of-type {
      background: #fffbf8;
      svg {
        color: ${props => props.theme.colors.orange};
      }
    }
    div:last-of-type {
      color: ${props => props.theme.colors.orange};
    }
  }
`;

const ActionIcon = styled(Box)`
  width: 30px;
  height: 30px;
  border-radius: 99999px;
  display: inline-flex;
  align-items: center;
  align-content: center;
  text-align: center;
  margin-left: -8px;
  svg {
    margin: 0 auto;
  }
`;

export default ActionsWrapper;
