import * as React from 'react';
import Modal from '../Modal';
import { Trans } from '@lingui/macro';
import { Heading, Button } from 'rebass/styled-components';
import { Input, Textarea } from '@rebass/forms';
import { compose } from 'recompose';
import { withFormik, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alert from '../Alert';
import {
  Row,
  Container,
  Actions,
  CounterChars,
  ContainerForm,
  Header
} from '../Modal/modal';

import { graphql, OperationOption } from 'react-apollo';
import { UpdateCommunityMutationMutationVariables } from '../../../graphql/updateCommunity.generated';
import { Community } from '../../../graphql/types.generated';
const {
  updateCommunityMutation
} = require('../../../graphql/updateCommunity.graphql');

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
  image: string;
}

interface MyFormProps {
  communityId: string;
  collectionExternalId: string;
  updateCommunity: any;
  toggleModal: any;
  community: Community;
}

const withUpdateCommunity = graphql<{}>(updateCommunityMutation, {
  name: 'updateCommunity'
  // TODO enforce proper types for OperationOption
} as OperationOption<{}, {}>);

const CreateCommunityModal = (props: Props & FormikProps<FormValues>) => {
  const { toggleModal, modalIsOpen, errors, touched, isSubmitting } = props;
  return (
    <Modal isOpen={modalIsOpen} toggleModal={toggleModal} position="abs">
      <Container>
        <Header>
          <Heading m={2}>
            <Trans>Edit the community details</Trans>
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
                      // placeholder="The name of the community..."
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <CounterChars>{60 - field.value.length}</CounterChars>
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
                      // placeholder="What the community is about..."
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
            <Button disabled={isSubmitting} type="submit" variant="primary">
              <Trans>Save</Trans>
            </Button>
            <Button onClick={toggleModal} mr={2} variant="outline">
              <Trans>Cancel</Trans>
            </Button>
          </Actions>
        </Form>
      </Container>
    </Modal>
  );
};

const ModalWithFormik = withFormik<
  MyFormProps & { communityUpdated(): unknown },
  FormValues
>({
  mapPropsToValues: props => ({
    name: props.community.name || '',
    summary: props.community.summary || '',
    image: props.community.icon || ''
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    summary: Yup.string(),
    image: Yup.string().url()
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const variables: UpdateCommunityMutationMutationVariables = {
      communityId: props.communityId,
      community: {
        name: values.name,
        summary: values.summary,
        image: values.image,
        icon: values.image
      }
    };
    return props
      .updateCommunity({
        variables: variables
      })
      .then(res => {
        setSubmitting(false);
        props.toggleModal();
        props.communityUpdated();
      })
      .catch(err => console.log(err));
  }
})(CreateCommunityModal);

export default compose(withUpdateCommunity)(ModalWithFormik);
