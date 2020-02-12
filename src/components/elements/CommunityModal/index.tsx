// create a new collection

import { Trans } from '@lingui/macro';
import { i18nMark } from '@lingui/react';
import { Field, Form, FormikProps, withFormik } from 'formik';
import * as React from 'react';
import { graphql, OperationOption } from 'react-apollo';
import * as Yup from 'yup';
import { LocaleContext } from '../../../context/global/localizationCtx';
import { compose } from 'recompose';
import Alert from '../../elements/Alert';
import { Heading } from 'rebass';
import { Button } from 'rebass';
import Modal from '../Modal';
import { Input, Textarea } from '@rebass/forms';
import {
  Actions,
  Container,
  ContainerForm,
  CounterChars,
  Header,
  Row
} from '../Modal/modal';
import styled from '../../../themes/styled';

const {
  createCollectionMutation
} = require('../../../graphql/createCollection.graphql');
const { getCommunityQuery } = require('../../../graphql/getCommunity.graphql');

const tt = {
  placeholders: {
    name: i18nMark('Choose a name for the collection'),
    summary: i18nMark(
      'Please describe what the collection is for and what kind of resources it is likely to contain...'
    ),
    icon: i18nMark('Enter the URL of an image to represent the collection')
  }
};

interface Props {
  toggleModal?: any;
  modalIsOpen?: boolean;
  communityId?: string;
  communityExternalId?: string;
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
  communityId: string;
  communityExternalId: string;
  createCollection: any;
  toggleModal: any;
}

const withCreateCollection = graphql<{}>(createCollectionMutation, {
  name: 'createCollection'
  // TODO enforce proper types for OperationOption
} as OperationOption<{}, {}>);

const CreateCommunityModal = (props: Props & FormikProps<FormValues>) => {
  const { toggleModal, modalIsOpen, errors, touched, isSubmitting } = props;
  const { i18n } = React.useContext(LocaleContext);
  return (
    <Modal isOpen={modalIsOpen} toggleModal={toggleModal}>
      <Container>
        <Header>
          <Heading m={2}>
            <Trans>Create a new collection</Trans>
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
                      placeholder={i18n._(tt.placeholders.name)}
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
                      placeholder={i18n._(tt.placeholders.summary)}
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
            <label>Image</label>
            <ContainerForm>
              <Field
                name="icon"
                render={({ field }) => (
                  <Input
                    placeholder={i18n._(tt.placeholders.icon)}
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
              <Trans>Create</Trans>
            </SubmitButton>
            <Button onClick={toggleModal}>
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
    name: '',
    summary: '',
    icon: ''
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .max(80)
      .required(),
    summary: Yup.string().max(500),
    icon: Yup.string().url()
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const variables = {
      communityId: Number(props.communityId),
      collection: {
        name: values.name,
        summary: values.summary,
        icon: values.icon,
        content: values.summary,
        preferredUsername: values.name.split(' ').join('_')
      }
    };
    return props
      .createCollection({
        variables: variables,
        update: (store, { data }) => {
          const community = store.readQuery({
            query: getCommunityQuery,
            variables: {
              context: props.communityId,
              limit: 15
            }
          });
          const newCollection = {
            node: {
              __typename: 'Collection',
              id: data.createCollection.id,
              localId: data.createCollection.localId,
              name: data.createCollection.name,
              summary: data.createCollection.summary,
              preferredUsername: data.createCollection.preferredUsername,
              icon: data.createCollection.icon,
              followed: data.createCollection.followed,
              followers: {
                totalCount: 1,
                __typename: 'CollectionFollowersConnection'
              },
              inbox: {
                totalCount: 0,
                edges: {
                  node: {
                    id: 1011,
                    __typename: 'Activity'
                  },
                  __typename: 'CollectionActivitiesEdge'
                },
                __typename: 'CollectionInboxConnection'
              },
              resources: {
                totalCount: 0,
                edges: {
                  node: {
                    id: 1010,
                    __typename: 'Resource'
                  },
                  __typename: 'CollectionResourcesEdge'
                },
                __typename: 'CollectionResourcesConnection'
              },
              threads: {
                totalCount: 0,
                __typename: 'CollectionThreadsConnection'
              }
            },
            __typename: 'CommunityCollectionsEdge'
          };
          community.community.collections.edges.unshift(newCollection);
          community.community.collections.totalCount++;
          store.writeQuery({
            query: getCommunityQuery,
            variables: {
              context: props.communityId
            },
            data: community
          });
        }
      })
      .then(res => {
        props.toggleModal();
        setSubmitting(false);
      })
      .catch(err => console.log(err));
  }
})(CreateCommunityModal);

export default compose(withCreateCollection)(ModalWithFormik);

const SubmitButton = styled(Button)`
  margin-left: 8px;
  .--rtl & {
    margin-right: 8px;
    margin-left: 0px;
  }
`;
