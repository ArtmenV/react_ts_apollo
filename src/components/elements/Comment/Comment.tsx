import { Trans } from '@lingui/macro';
import { DateTime } from 'luxon';
import { clearFix } from 'polished';
import * as React from 'react';
import { MessageCircle, Star } from 'react-feather';
import { Box, Flex, Text } from 'rebass/styled-components';
import removeMd from 'remove-markdown';
import styled from '../../../themes/styled';
import Link from '../Link/Link';
import Talk from '../TalkModal';
import { useLikeMutationMutation } from '../../../graphql/like.generated';
import { useDeleteMutationMutation } from '../../../graphql/delete.generated';
import { BasicCommentFragment } from '../../../graphql/fragments/basicComment.generated';
import { Comment } from '../../../graphql/types.generated';
import MoreOptions from '../MoreOptions';

interface EventProps {
  comment: BasicCommentFragment | Comment;
  noAction?: boolean;
  noLink?: boolean;
}

const CommentWrapper: React.FC<EventProps> = ({
  comment,
  noAction,
  noLink
}) => {
  const { creator } = comment;
  const [like /* , likeResult */] = useLikeMutationMutation();
  const [undoLike /* , likeResult */] = useDeleteMutationMutation();
  const iLikeIt = !!comment.myLike;
  const [isOpen, onOpen] = React.useState(false);
  const toggleLike = React.useCallback(
    () => {
      const variables = { contextId: comment.id };
      (iLikeIt ? undoLike : like)({ variables });
    },
    [comment, iLikeIt]
  );

  return (
    //FIXME https://gitlab.com/moodlenet/meta/issues/185
    !comment.thread || !comment.likes ? null : (
      <FeedItem>
        {noLink ? null : (
          <NavigateToThread to={`/thread/${comment.thread.id}`} />
        )}
        <Member>
          <MemberItem mr={2}>
            <Img src={(creator && creator.icon) || ''} />
          </MemberItem>
          <MemberInfo>
            {typeof comment!.id == 'string' ? (
              <MoreOptionsContainer>
                {/* <MoreOptions contextId={comment.id} myFlag={comment.myFlag} /> */}
                <MoreOptions contextId={comment.id} myFlag="false" />
              </MoreOptionsContainer>
            ) : null}
            {creator ? (
              <Name>
                <Link to={'/user/' + creator.id}>
                  {creator.name}{' '}
                  {<Username>@{creator.displayUsername}</Username>}
                </Link>
                <Spacer mx={2}>·</Spacer>{' '}
                <Date>{DateTime.fromISO(comment.createdAt).toRelative()}</Date>
              </Name>
            ) : (
              <Name>
                <Trans>Deleted user</Trans>
              </Name>
            )}
            <>
              <Comment>
                {comment.content && comment.content.length > 320
                  ? removeMd(comment.content).replace(
                      /^([\s\S]{316}[^\s]*)[\s\S]*/,
                      '$1...'
                    )
                  : removeMd(comment.content)}
              </Comment>
            </>
            {noAction ? null : (
              <Actions mt={2}>
                <Items>
                  <ActionItem onClick={() => onOpen(true)}>
                    <ActionIcon>
                      <MessageCircle color="rgba(0,0,0,.4)" size="16" />
                    </ActionIcon>
                    <Text ml={2}>{/*TODO comment.replies.totalCount */}</Text>
                  </ActionItem>
                  <ActionItem ml={3} onClick={toggleLike}>
                    <ActionIcon>
                      <Star
                        color={iLikeIt ? '#ED7E22' : 'rgba(0,0,0,.4)'}
                        size="16"
                      />
                    </ActionIcon>
                    <Text ml={2}>{comment.likes.totalCount}</Text>
                  </ActionItem>
                </Items>
              </Actions>
            )}
          </MemberInfo>
        </Member>
        <Talk toggleModal={onOpen} modalIsOpen={isOpen} comment={comment} />
      </FeedItem>
    )
  );
};

export default CommentWrapper;

const NavigateToThread = styled(Link)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
`;

const Date = styled(Text)`
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
`;

const Items = styled(Flex)`
  flex: 1;
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

const Username = styled(Text)`
  color: ${props => props.theme.colors.gray};
  margin: 0 8px;
  font-weight: 500;
`;

const Spacer = styled(Text)`
  color: ${props => props.theme.colors.gray};
  margin-right: 8px;
  font-weight: 500;
`;

// const SubText = styled(Text)`
// font-size: 14px;
// color:  ${props => props.theme.colors.gray};
// > a {
//   text-decoration: none;
//   font-weight: 600
//   color: ${props => props.theme.colors.black} !important;
//   z-index: 9;
//   position: relative;

//   &:hover {
//     text-decoration: underline;
//   }
// }
// `;

const Name = styled(Text)`
  font-weight: 600;
  color: ${props => props.theme.colors.darkgray};
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 2px;
  a {
    font-weight: 800;
    display: flex;
    text-decoration: none;
    align-items: center;
    color: ${props => props.theme.colors.darkgray} !important;
    z-index: 9;
    position: relative;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Member = styled(Flex)`
  align-items: stretch;
`;

const MemberInfo = styled(Box)`
  margin-top: 4px;
  width: 100%;
`;

const Comment = styled.div`
  margin-top: 6px;
  word-break: break-all;
  & a {
    color: ${props => props.theme.colors.darkgray} !important;
    font-weight: 400 !important;
    font-size: 14px;
    text-decoration: none;
    line-height: 20px;
    z-index: 9;
    position: relative;
  }
`;

const MemberItem = styled(Box)`
  background-color: #d6dadc;
  border-radius: 50px;
  height: 48px;
  overflow: hidden;
  position: relative;
  width: 48px;
  user-select: none;
  z-index: 0;
  vertical-align: inherit;
  margin-right: 8px;
  min-width: 48px;
  .--rtl & {
    margin-right: 0px;
    margin-left: 8px;
  }
`;

const Img = styled.img`
  width: 48px;
  height: 48px;
  display: block;
  -webkit-appearance: none;
  line-height: 48px;
  text-indent: 4px;
  font-size: 13px;
  overflow: hidden;
  max-width: 48px;
  max-height: 48px;
  text-overflow: ellipsis;
  vertical-align: text-top;
  margin-right: 8px;
  .--rtl & {
    margin-right: 0px;
    margin-left: 8px;
  }
`;

const FeedItem = styled.div`
  min-height: 30px;
  position: relative;
  margin: 0;
  padding: 16px;
  word-wrap: break-word;
  font-size: 14px;
  ${clearFix()};
  transition: background 0.5s ease;
  margin-top: 0
  z-index: 10;
  position: relative;
  position: relative;
  border-bottom: 1px solid  ${props => props.theme.colors.lightgray};
  a {
    text-decoration: none;
    color: inherit;
  }
  &:hover {
    background: ${props => props.theme.colors.lighter};
  }

`;

const MoreOptionsContainer = styled.div`
  margin-left: 16px;
  position: absolute;
  right: 45px;
  z-index: 20;
  top: 12px;
`;
