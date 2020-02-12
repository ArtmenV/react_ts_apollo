import { Trans } from '@lingui/macro';
import { i18nMark } from '@lingui/react';
import * as React from 'react';
import { Textarea } from '@rebass/forms';
import { Button, Heading, Flex } from 'rebass/styled-components';
import { string } from 'yup';
import { LocaleContext } from '../../../context/global/localizationCtx';
// import { useCreateCommunityFlagMutation } from '../../../graphql/createCommunityFlag.generated';
// import { useCreateCollectionFlagMutation } from '../../../graphql/createCollectionFlag.generated';
// import { useCreateResourceFlagMutation } from '../../../graphql/createResourceFlag.generated';
// import { useCreateCommentFlagMutation } from '../../../graphql/createCommentFlag.generated';
import { useCreateFlagMutationMutation } from '../../../graphql/createFlag.generated';
// import { useResolveFlagMutationMutation } from '../../../graphql/resolveFlag.generated';
import { useDeleteMutationMutation } from '../../../graphql/delete.generated';

import styled from '../../../themes/styled';
import Alert from '../../elements/Alert';
import Modal from '../Modal';
import { Actions, Container, Header } from '../Modal/modal';

const TextWrapper = styled(Flex)`
  padding: 16px;
  align-items: center;
`;

const tt = {
  placeholders: {
    name: i18nMark('Flag'),
    flag: i18nMark('Please describe the reason for flagging the item')
  }
};

interface Props {
  contextId: string;
  closeModal(_: boolean): unknown;
  flagItem(_: boolean): unknown;
  modalIsOpen: boolean;
  myFlag?: any;
  isFlagged: boolean;
  // flag: string;
}

const FlagModal: React.FC<Props> = ({
  contextId,
  myFlag,
  modalIsOpen,
  flagItem,
  isFlagged,
  closeModal
}) => {
  const { i18n } = React.useContext(LocaleContext);
  const [flag] = useCreateFlagMutationMutation();
  // const [undoflag] = useResolveFlagMutationMutation();
  const [undoflag] = useDeleteMutationMutation();
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
      flag({
        variables: {
          contextId: contextId!,
          message: text!
        }
      });
      flagItem(true);
      closeModal(false);
    },
    [error, text]
  );

  const undoflagItem = React.useCallback(
    () => {
      console.log('unflag ' + myFlag!.id);
      if (error) {
        return;
      }
      undoflag({
        variables: {
          contextId: myFlag!.id!
        }
      });
      flagItem(false);
      closeModal(false);
    },
    [error, text]
  );

  return (
    <Modal
      isOpen={modalIsOpen}
      toggleModal={closeModal}
      myFlag={myFlag}
      flagItem={flagItem}
      // flagFor={flagFor}
      contextId={contextId}
    >
      {/* <Container> */}
      {/* <Form> */}
      {!isFlagged ? (
        <Container>
          <Header>
            <Heading m={2}>
              <Trans>Flag</Trans>
            </Heading>
          </Header>
          <TextWrapper>
            <Textarea
              placeholder={i18n._(tt.placeholders.flag)}
              name={'text'}
              onChange={oninput}
            />
            {error && touched && <Alert>{error}</Alert>}
          </TextWrapper>
          <Actions>
            <Button
              variant="primary"
              onClick={submit}
              style={{ marginLeft: '10px' }}
            >
              <Trans>Send</Trans>
            </Button>
            <Button variant="outline" onClick={closeModal}>
              <Trans>Cancel</Trans>
            </Button>
          </Actions>
        </Container>
      ) : (
        <Container>
          <Header>
            <Heading m={2}>
              <Trans>Unflag</Trans>
            </Heading>
          </Header>
          <TextWrapper>
            <p>You have already flagged this item.</p>
            {error && touched && <Alert>{error}</Alert>}
          </TextWrapper>
          <Actions>
            <Button
              variant="primary"
              onClick={undoflagItem}
              style={{ marginLeft: '10px' }}
            >
              <Trans>Unflag</Trans>
            </Button>
            <Button variant="outline" onClick={closeModal}>
              <Trans>Cancel</Trans>
            </Button>
          </Actions>
        </Container>
      )}
    </Modal>
  );
};

export default FlagModal;
