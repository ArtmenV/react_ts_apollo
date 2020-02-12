'use strict';
import { Trans } from '@lingui/macro';
import { i18nMark } from '@lingui/react';
import { Input, Textarea } from '@rebass/forms';
import { Field, Form, Formik, FormikConfig } from 'formik';
import React from 'react';
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
  useUpdateCommunityMutationMutation,
  UpdateCommunityMutationMutationVariables
} from '../../../graphql/updateCommunity.generated';

const ModalWithUpload = styled(Modal)`
  position: absolute;
`;

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
  communityId: string;
  community: any;
  communityUpdated: any;
}

interface FormValues {
  name: string;
  summary: string;
  icon: string;
  files: [];
}

const EditCommunityModal = (props: Props) => {
  const {
    toggleModal,
    modalIsOpen,
    communityId,
    community,
    communityUpdated
  } = props;

  const [update /* , response */] = useUpdateCommunityMutationMutation({});
  const [mutateIcon] = useUploadIconMutation();

  const initialValues = React.useMemo<FormValues>(
    () => ({
      name: community.name || '',
      summary: community.summary || '',
      icon: community.icon || '',
      files: []
    }),
    []
  );

  const submit = React.useCallback<FormikConfig<FormValues>['onSubmit']>(
    (values, { setSubmitting }) => {
      const variables: UpdateCommunityMutationMutationVariables = {
        communityId: communityId,
        community: {
          name: values.name,
          summary: values.summary
        }
      };
      update({
        variables: variables
      })
        .then(res => {
          setSubmitting(false);
          const fileToUpload = values.files.map(file => {
            return file;
          });
          if (fileToUpload[0]) {
            mutateIcon({
              variables: { contextId: communityId, upload: fileToUpload[0] }
            }).then(res => {
              toggleModal && toggleModal();
              communityUpdated();
            });
          } else {
            toggleModal && toggleModal();
            communityUpdated();
          }
          // .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    },
    [toggleModal, communityUpdated]
  );
  return (
    <ModalWithUpload
      isOpen={modalIsOpen}
      toggleModal={toggleModal}
      position="abs"
    >
      <Container>
        <Header>
          <Heading m={2}>
            <Trans>Edit the community details</Trans>
          </Heading>
        </Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submit}
          render={({
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue
          }) => {
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
                            placeholder={tt.placeholders.name}
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
                            placeholder={tt.placeholders.summary}
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <CounterChars>
                            {500 - field.value.length}
                          </CounterChars>
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
                    {/* {errors.image &&
                      touched.image && <Alert>{errors.image}</Alert>} */}
                  </ContainerForm>
                </Row>
                <Actions>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    style={{ marginLeft: '10px' }}
                  >
                    <Trans>Save</Trans>
                  </Button>
                  <Button variant="outline" onClick={toggleModal}>
                    <Trans>Cancel</Trans>
                  </Button>
                </Actions>
              </Form>
            );
          }}
        />
      </Container>
    </ModalWithUpload>
  );
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(60)
    .required(),
  summary: Yup.string().max(500)
  // image: Yup.string().url()
});

export default EditCommunityModal;
