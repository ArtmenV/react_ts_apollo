import * as React from 'react';
import { MessageCircle, Star } from 'react-feather';
import styled from '../../../themes/styled';
import { Box, Flex, Text } from 'rebass/styled-components';
import SocialText from 'ui/modules/SocialText';
import { i18nMark, Trans } from '@lingui/react';
import { LocaleContext } from '../../../context/global/localizationCtx';
import { FormikHook } from 'ui/@types/types';

export interface LikeActions {
  toggleLikeFormik: FormikHook<{}>;
  totalLikes: number | null;
  iLikeIt: boolean;
}
export interface ReplyActions {
  replyFormik: FormikHook<{ replyMessage: string }>;
}
export interface ActionProps {
  like: null | LikeActions;
  reply: null | ReplyActions /* ,
  follow?: {
    toggleFollowFormik: FormikHook<{}>
    following: boolean
    followers: number
  } */;
}

const tt = {
  placeholders: {
    name: i18nMark('Post a reply'),
    summary: i18nMark(
      'Please describe what the collection is for and what kind of resources it is likely to contain...'
    ),
    image: i18nMark('Enter the URL of an image to represent the collection')
  }
};

const ActionsWrapper: React.SFC<ActionProps> = ({ like, reply }) => {
  const [talkModalVisible, showTalkModal] = React.useState(false);
  const { i18n } = React.useContext(LocaleContext);
  return (
    <Actions mt={3}>
      {reply &&
        talkModalVisible && (
          <SocialText
            placeholder={i18n._(tt.placeholders.name)}
            defaultValue={''}
            submit={msg => {
              showTalkModal(false);
              reply.replyFormik.setValues({ replyMessage: msg });
              reply.replyFormik.submitForm();
            }}
          />
        )}
      <Box>
        <Items>
          <ActionItem onClick={() => showTalkModal(!talkModalVisible)}>
            <ActionIcon>
              <MessageCircle strokeWidth="1" color="rgba(0,0,0,.4)" size="20" />
            </ActionIcon>
            <Text
              ml={1}
              variant={'suptitle'}
              sx={{ textTransform: 'capitalize' }}
            >
              <Trans>Comment</Trans>
            </Text>
          </ActionItem>
          {like && (
            <ActionItem ml={4} onClick={like.toggleLikeFormik.submitForm}>
              <ActionIcon>
                <Star
                  color={like.iLikeIt ? '#ED7E22' : 'rgba(0,0,0,.4)'}
                  strokeWidth="1"
                  size="20"
                />
              </ActionIcon>
              <Text
                variant={'suptitle'}
                sx={{ textTransform: 'capitalize' }}
                ml={1}
              >
                {like.totalLikes + ' '} <Trans>Like</Trans>
              </Text>
            </ActionItem>
          )}
        </Items>
      </Box>
    </Actions>
  );
};

const Items = styled(Flex)`
  flex: 1;
`;

const Actions = styled(Box)`
  position: relative;
  z-index: 999999999999999999999999999999999999;
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
