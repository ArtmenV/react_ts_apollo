'use strict';
import { Trans } from '@lingui/macro';
import { i18nMark } from '@lingui/react';
import { Input, Textarea } from '@rebass/forms';
import { Field, Form, Formik, FormikConfig } from 'formik';
import React from 'react';
import { useHistory } from 'react-router';
import { Heading } from 'rebass/styled-components';
import * as Yup from 'yup';
import Alert from '../Alert';
import { Button } from 'rebass/styled-components';
import Modal from '../Modal';
import DropzoneArea from '../DropzoneModal';
import { useUploadIconMutation } from '../../../graphql/uploadIcon.generated';
import styled from '../../../themes/styled';
import {
  Actions,
  Container,
  ContainerForm,
  CounterChars,
  Header,
  Row
} from '../Modal/modal';
import {
  useCreateCommunityMutationMutation,
  CreateCommunityMutationMutationVariables
} from '../../../graphql/createCommunity.generated';
import { LocaleContext } from '../../../context/global/localizationCtx';

const tt = {
  placeholders: {
    name: i18nMark('Choose a name for the community'),
    summary: i18nMark(
      'Please describe who might be interested in this community and what kind of collections it is likely to contain...'
    ),
    icon: i18nMark('Enter the URL of an image to represent the community')
  }
};

interface Props {
  toggleModal?: () => unknown;
  modalIsOpen?: boolean;
}

interface FormValues {
  name: string;
  summary: string;
  icon: string;
  files: [];
  // content: string;
  preferredUsername: string;
}
const CreateCommunityModal = (
  props: Props /*  & FormikProps<FormValues> */
) => {
  const { i18n } = React.useContext(LocaleContext);
  const { toggleModal, modalIsOpen } = props;
  const history = useHistory();
  const [create /* , response */] = useCreateCommunityMutationMutation({});
  const [mutateIcon] = useUploadIconMutation();

  const initialValues = React.useMemo<FormValues>(
    () => ({
      name: '',
      summary: '',
      icon: '',
      files: [],
      // content: '',
      preferredUsername: ''
    }),
    []
  );

  const submit = React.useCallback<FormikConfig<FormValues>['onSubmit']>(
    (values, { setSubmitting }) => {
      const fileToUpload = values.files.map(file => {
        return file;
      });
      const variables: CreateCommunityMutationMutationVariables = {
        community: {
          name: values.name,
          summary: values.summary,
          // image: values.image,
          preferredUsername: values.name.split(' ').join('_')
        }
      };
      create({
        variables: variables
      })
        .then(res => {
          const createdCommunityId = res.data!.createCommunity!.id;
          if (fileToUpload[0]) {
            mutateIcon({
              variables: {
                contextId: createdCommunityId,
                upload: fileToUpload[0]
              }
            }).then(() => {
              setSubmitting(false);
              history.push(`/communities/${createdCommunityId}`);
            });
          } else {
            setSubmitting(false);
            history.push(`/communities/${createdCommunityId}`);
          }
          // setSubmitting(false);
          // {res.data && res.data.createCommunity && history.push(`/communities/${res.data.createCommunity.id}`);}
        })
        .catch(err => console.log(err));
    },
    []
  );
  return (
    <Modal isOpen={modalIsOpen} toggleModal={toggleModal} position="abs">
      <Container>
        <Header>
          <Heading m={2}>
            <Trans>Create a new community</Trans>
          </Heading>
        </Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submit}
          render={({ errors, touched, isSubmitting }) => {
            return (
              <Form>
                <Row>
                  <label>Name</label>
                  <ContainerForm>
                    <Field
                      name="name"
                      render={({ field }) => (
                        <>
                          <Input
                            placeholder={i18n._(tt.placeholders.name)}
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <CounterChars>{60 - field.value.length}</CounterChars>
                        </>
                      )}
                    />
                    {errors.name &&
                      touched.name && <Alert>{errors.name}</Alert>}
                  </ContainerForm>
                </Row>
                <Row big>
                  <label>
                    <Trans>Description</Trans>
                  </label>
                  <ContainerForm>
                    <Field
                      name="summary"
                      render={({ field }) => (
                        <>
                          <Textarea
                            placeholder={i18n._(tt.placeholders.summary)}
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <CounterChars>
                            {500 - field.value.length}
                          </CounterChars>
                          {errors.summary && <Alert>{errors.summary}</Alert>}
                        </>
                      )}
                    />
                  </ContainerForm>
                </Row>
                <Row>
                  <label>
                    <Trans>Image</Trans>
                  </label>
                  <ContainerForm>
                    <DropzoneArea initialUrl={initialValues.icon} />
                  </ContainerForm>
                </Row>
                <Actions>
                  <SubmitButton disabled={isSubmitting} type="submit">
                    <Trans>Create</Trans>
                  </SubmitButton>
                  <Button variant="outline" onClick={toggleModal}>
                    <Trans>Cancel</Trans>
                  </Button>
                </Actions>
              </Form>
            );
          }}
        />
      </Container>
    </Modal>
  );
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(60)
    .required(),
  summary: Yup.string().max(500)
  // image: Yup.string().url()
});

export default CreateCommunityModal;

const SubmitButton = styled(Button)`
  margin-left: 10px;
  .--rtl & {
    margin-right: 10px;
    margin-left: 0px;
  }
`;
