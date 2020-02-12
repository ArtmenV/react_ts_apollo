import * as React from 'react';
import Modal from '../Modal';
import { Trans } from '@lingui/macro';
import {
  Row,
  Container,
  Actions,
  CounterChars,
  ContainerForm,
  Header
} from '../Modal/modal';
import { Heading } from 'rebass/styled-components';
import { Input, Textarea } from '@rebass/forms';
import { Button } from 'rebass/styled-components';
import { compose } from 'recompose';
import { withFormik, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alert from '../Alert';
import { graphql, OperationOption } from 'react-apollo';
import { UpdateCollectionMutationMutationVariables } from '../../../graphql/updateCollection.generated';
import { Collection } from '../../../graphql/types.generated';
import styled from '../../../themes/styled';
const {
  updateCollectionMutation
} = require('../../../graphql/updateCollection.graphql');

interface Props {
  toggleModal?: any;
  modalIsOpen?: boolean;
  collectionId?: string;
  collectionExternalId?: string;
  errors: any;
  touched: any;
  isSubmitting: boolean;
}

interface FormValues {
  name: string;
  summary: string;
  icon: string;
}

interface MyFormProps {
  collectionId: string;
  collectionExternalId: string;
  updateCollection: any;
  toggleModal: any;
  collection: Collection;
  collectionUpdated(): unknown;
}

const withUpdateCollection = graphql<{}>(updateCollectionMutation, {
  name: 'updateCollection'
  // TODO enforce proper types for OperationOption
} as OperationOption<{}, {}>);

const CreateCommunityModal = (
  props: Props & FormikProps<FormValues> & MyFormProps
) => {
  const { toggleModal, modalIsOpen, errors, touched, isSubmitting } = props;

  return (
    <Modal isOpen={modalIsOpen} toggleModal={toggleModal}>
      <Container>
        <Header>
          <Heading m={2}>
            <Trans>Edit the collection details</Trans>
          </Heading>
        </Header>
        <Form>
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
                      placeholder="The name of the collection..."
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <CounterChars>{80 - field.value.length}</CounterChars>
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
                      placeholder="What the collection is about..."
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <CounterChars>{500 - field.value.length}</CounterChars>
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
                name="icon"
                render={({ field }) => (
                  <Input
                    // placeholder="Type a url of a background image..."
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.icon && touched.icon && <Alert>{errors.icon}</Alert>}
            </ContainerForm>
          </Row>
          <Actions>
            <SubmitButton disabled={isSubmitting} type="submit">
              <Trans>Save</Trans>
            </SubmitButton>
            <Button variant="outline" onClick={toggleModal}>
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
    name: props.collection.name || '',
    summary: props.collection.summary || '',
    icon: props.collection.icon || ''
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .max(80)
      .required(),
    summary: Yup.string().max(500),
    icon: Yup.string().url()
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const variables: UpdateCollectionMutationMutationVariables = {
      collectionId: props.collectionId,
      collection: {
        name: values.name,
        preferredUsername: values.name,
        summary: values.summary,
        icon: values.icon
      }
    };
    return props
      .updateCollection({
        variables: variables
      })
      .then(res => {
        setSubmitting(false);
        props.collectionUpdated();
        props.toggleModal();
      })
      .catch(err => console.log(err));
  }
})(CreateCommunityModal);

export default compose(withUpdateCollection)(ModalWithFormik);

const SubmitButton = styled(Button)`
  margin-left: 8px;
  .--rtl & {
    margin-right: 8px;
    margin-left: 0px;
  }
`;
