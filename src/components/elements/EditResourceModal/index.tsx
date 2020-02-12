import * as React from 'react';
import Modal from '../Modal';
import { Trans } from '@lingui/macro';
import { Button, Heading } from 'rebass/styled-components';
import { Input, Textarea } from '@rebass/forms';
import { compose } from 'recompose';
import { withFormik, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alert from '../Alert';
import { graphql, OperationOption } from 'react-apollo';
import styled from '../../../themes/styled';

const {
  updateResourceMutation
} = require('../../../graphql/updateResource.graphql');
import {
  Row,
  Container,
  Actions,
  CounterChars,
  ContainerForm,
  Header
} from '../Modal/modal';
import { UpdateResourceMutationMutationVariables } from '../../../graphql/updateResource.generated';

interface Props {
  toggleModal?: any;
  modalIsOpen?: boolean;
  collectionId?: string;
  collectionExternalId?: string;
  errors: any;
  touched: any;
  isSubmitting: boolean;
  url: string;
  name: string;
  summary: string;
  image: string;
  id: string;
}

interface FormValues {
  name: string;
  summary: string;
  image: string;
  url: string;
}

interface MyFormProps {
  collectionId: string;
  collectionExternalId: string;
  updateResource: any;
  toggleModal: any;
  url: string;
  name: string;
  summary: string;
  image: string;
  id: string;
}

const withUpdateResource = graphql<{}>(updateResourceMutation, {
  name: 'updateResource'
  // TODO enforce proper types for OperationOption
} as OperationOption<{}, {}>);

const CreateCommunityModal = (props: Props & FormikProps<FormValues>) => {
  const { toggleModal, modalIsOpen, errors, touched, isSubmitting } = props;
  return (
    <Modal isOpen={modalIsOpen} toggleModal={toggleModal}>
      <Container>
        <Header>
          <Heading m={2}>
            <Trans>Edit the resource details</Trans>
          </Heading>
        </Header>
        <Form>
          <Row>
            <label>
              <Trans>Link</Trans>
            </label>
            <ContainerForm>
              <Field
                name="url"
                render={({ field }) => (
                  <Input
                    // placeholder="The url of the resource..."
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.url && touched.url && <Alert>{errors.url}</Alert>}
            </ContainerForm>
          </Row>
          <Row>
            <label>
              <Trans>Name</Trans>
            </label>
            <ContainerForm>
              <Field
                name="name"
                render={({ field }) => (
                  <>
                    <Input
                      // placeholder="The name of the resoruce..."
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <CounterChars>{90 - field.value.length}</CounterChars>
                  </>
                )}
              />
              {errors.name && touched.name && <Alert>{errors.name}</Alert>}
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
                      // placeholder="What the resource is about..."
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <CounterChars>{1000 - field.value.length}</CounterChars>
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
              <Field
                name="image"
                render={({ field }) => (
                  <Input
                    // placeholder="Type a url of a background image..."
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.image && touched.image && <Alert>{errors.image}</Alert>}
            </ContainerForm>
          </Row>
          <Actions>
            <SubmitButton disabled={isSubmitting} type="submit">
              <Trans>Save</Trans>
            </SubmitButton>
            <Button onClick={toggleModal} secondary>
              <Trans>Cancel</Trans>
            </Button>
          </Actions>
        </Form>
      </Container>
    </Modal>
  );
};

const ModalWithFormik = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => ({
    url: props.url || '',
    name: props.name || '',
    summary: props.summary || '',
    image: props.image || ''
  }),
  validationSchema: Yup.object().shape({
    url: Yup.string()
      .url()
      .required(),
    name: Yup.string()
      .max(90)
      .required(),
    summary: Yup.string().max(1000),
    image: Yup.string().url()
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const variables: UpdateResourceMutationMutationVariables = {
      resourceId: props.id,
      resource: {
        name: values.name,
        summary: values.summary,
        icon: values.image,
        url: values.url
      }
    };
    return props
      .updateResource({
        variables: variables
      })
      .then(res => {
        setSubmitting(false);
        props.toggleModal();
      })
      .catch(err => console.log(err));
  }
})(CreateCommunityModal);

export default compose(withUpdateResource)(ModalWithFormik);

const SubmitButton = styled(Button)`
  margin-left: 10px;
  .--rtl & {
    margin-right: 10px;
    margin-left: 0px;
  }
`;
