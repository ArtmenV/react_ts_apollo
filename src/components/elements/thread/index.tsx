import styled from '../../../themes/styled';
import React, { useState } from 'react';
import { SFC } from 'react';
import { Text, Box, Flex, Image } from 'rebass/styled-components';
import * as Feather from 'react-feather';
import { DateTime } from 'luxon';
import Talk from '../TalkModal';
import Link from '../Link/Link';
import { Comment } from '../../../graphql/types.generated';
import MoreOptions from '../MoreOptions';

import { useLikeMutationMutation } from '../../../graphql/like.generated';
import { useDeleteMutationMutation } from '../../../graphql/delete.generated';

const Wrapper = styled(Box)`
  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
  a {
    text-decoration: none;
    color: inherit !important;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Avatar = styled(Image)`
  width: 48px !important;
  height: 48px !important;
  border-radius: 100px;
  background: ${props => props.theme.colors.black};
`;

const Username = styled(Text)`
  color: ${props => props.theme.colors.gray};
  margin: 0 8px;
  font-weight: 500;
`;

const Spacer = styled(Text)`
  color: ${props => props.theme.colors.gray};
  margin-right: 8px;
  font-weight: 500;
  .--rtl & {
    margin-right: 0px;
    margin-left: 8px;
  }
`;

const Date = styled(Text)`
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
`;

const Message = styled(Text)`
  line-height: 30px;
  word-break: break-all;
`;

const Actions = styled(Flex)`
  z-index: 9;
  position: relative;
`;

const ActionItem = styled(Flex)`
  margin-right: 32px;
  align-items: center;
  color: ${props => props.theme.colors.gray};
  cursor: pointer;
  a {
    display: flex;
    align-items: center;
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

const Items = styled(Flex)`
  flex: 1;
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

const MoreOptionsContainer = styled.div`
  margin-left: 16px;
  position: absolute;
  right: 20px;
`;

interface Props {
  comment: Comment;
}

const Thread: SFC<Props> = ({ comment }) => {
  const [isOpen, onOpen] = useState(false);
  const [like /* , likeResult */] = useLikeMutationMutation();
  const [undoLike /* , likeResult */] = useDeleteMutationMutation();
  const iLikeIt = !!comment.myLike;
  const toggleLike = React.useCallback(
    () => {
      const variables = { contextId: comment.id };
      (iLikeIt ? undoLike : like)({ variables });
    },
    [comment, iLikeIt]
  );
  return (
    //FIXME https://gitlab.com/moodlenet/meta/issues/185
    !comment.creator || !comment.likes ? null : (
      <Wrapper px={3} py={3}>
        <Flex alignItems="center">
          <Avatar src={comment.creator.icon || ''} />
          <Flex flexDirection="column">
            <Flex>
              <Link to={'/user/' + comment.creator.id}>
                <Text fontWeight={800} mx={2} fontSize={1}>
                  {comment.creator.name || ''}
                </Text>
              </Link>
              <Spacer mx={2}>·</Spacer>{' '}
              <Date fontSize={1}>
                {DateTime.fromISO(comment.createdAt).toRelative()}
              </Date>
              {typeof comment!.id == 'number' ? (
                <MoreOptionsContainer>
                  {/* <MoreOptions contextId={comment.id} myFlag={comment.myFlag} /> */}
                  <MoreOptions contextId={comment.id} myFlag="false" />
                </MoreOptionsContainer>
              ) : null}
            </Flex>
            <Link to={'/user/' + comment.creator.id}>
              <Username mt={1} fontSize={1} mx={2}>
                @{comment.creator.name}
              </Username>
            </Link>
          </Flex>
        </Flex>

        <Message mt={2} fontSize={[3]}>
          {comment.content}
        </Message>

        <Actions mt={2}>
          <Items>
            <ActionItem onClick={() => onOpen(true)}>
              <ActionIcon>
                <Feather.MessageCircle color="rgba(0,0,0,.4)" size="16" />
              </ActionIcon>
              <Text ml={2}>{/*FIXME comment.replies.totalCount */}</Text>
            </ActionItem>
            <ActionItem ml={3} onClick={toggleLike}>
              <ActionIcon>
                <Feather.Star
                  color={iLikeIt ? '#ED7E22' : 'rgba(0,0,0,.4)'}
                  size="16"
                />
              </ActionIcon>
              <Text ml={2}>{comment.likes.totalCount}</Text>
            </ActionItem>
          </Items>
        </Actions>

        {/* <Actions alignItems="center" mt={3} py={3}>
        <Icon mr={5} className="tooltip" onClick={() => onOpen(true)}>
          <Feather.MessageCircle color={'rgba(0,0,0,.4)'} size="20" />
        </Icon>
        <Icon mr={5}>
          <Feather.Star color={'rgba(0,0,0,.4)'} size="20" />
        </Icon>
      </Actions> */}
        <Talk toggleModal={onOpen} modalIsOpen={isOpen} comment={comment} />
      </Wrapper>
    )
  );
};

export default Thread;
