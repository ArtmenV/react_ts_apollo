import { i18nMark } from '@lingui/react';
import * as React from 'react';
import { Box, Flex } from 'rebass/styled-components';
import { string } from 'yup';
import CommentCmp from '../Comment/Comment';
import styled from '../../../themes/styled';
import { SessionContext } from '../../../context/global/sessionCtx';
import Alert from '../Alert';
import Modal from '../Modal';
import SocialText from '../SocialText';
import { useCreateReplyMutationMutation } from '../../../graphql/createReply.generated';
import { BasicCommentFragment } from '../../../graphql/fragments/basicComment.generated';
import { Comment } from '../../../graphql/types.generated';
import { LocaleContext } from '../../../context/global/localizationCtx';

export const TextWrapper = styled(Flex)`
  padding: 16px;
  align-items: center;
`;

export const Avatar = styled(Box)`
  min-width: 48px !important;
  height: 48px;
  border-radius: 48px;
  background: ${props => props.theme.colors.orange};
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 8px;
  .--rtl & {
    margin-right: 0px;
    margin-left: 8px;
  }
`;

const tt = {
  placeholders: {
    name: i18nMark('Post a reply'),
    summary: i18nMark(
      'Please describe what the collection is for and what kind of resources it is likely to contain...'
    ),
    image: i18nMark('Enter the URL of an image to represent the collection')
  }
};

interface Props {
  toggleModal(_: boolean): unknown;
  modalIsOpen: boolean;
  comment: BasicCommentFragment | Comment;
}

export const TalkModal: React.FC<Props> = ({
  comment,
  modalIsOpen,
  toggleModal
}) => {
  const { i18n } = React.useContext(LocaleContext);
  const [reply /* ,replyResult */] = useCreateReplyMutationMutation();
  const session = React.useContext(SessionContext);
  const [text, setText] = React.useState('');
  const [error, setError] = React.useState('');
  const [touched, setTouched] = React.useState(false);
  const oninput = React.useCallback(
    async (_: React.SyntheticEvent<HTMLTextAreaElement>) => {
      const _text = _.currentTarget.value;
      setText(_text);
      setTouched(true);
      setError('');
      string()
        .required()
        .validate(_text)
        .catch(err => setError(err.message));
    },
    []
  );
  const submit = React.useCallback(
    () => {
      if (error) {
        return;
      }
      reply({
        variables: {
          inReplyToId: comment.id,
          //FIXME https://gitlab.com/moodlenet/meta/issues/185
          threadId: comment.thread!.id,
          comment: { content: text }
        }
      });
      toggleModal(false);
    },
    [error, text]
  );
  return (
    <Modal isOpen={modalIsOpen} toggleModal={() => toggleModal(false)}>
      <CommentCmp comment={comment} noLink noAction />
      <TextWrapper>
        <Avatar
          style={{
            backgroundImage: `url(${session.me ? session.me.user.icon : ''})`
          }}
        />
        <SocialText
          placeholder={i18n._(tt.placeholders.name)}
          name={'text'}
          defaultValue={text}
          submit={submit}
          onChange={oninput}
        />
      </TextWrapper>
      {error && touched && <Alert>{error}</Alert>}
    </Modal>
  );
};

export default TalkModal; // compose(withCreateCollection)(ModalWithFormik);
