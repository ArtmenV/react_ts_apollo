// Add a resource to collection - step 2

import { Trans } from '@lingui/macro';
import { i18nMark } from '@lingui/react';
import { Field, Form, FormikProps, withFormik } from 'formik';
import gql from 'graphql-tag';
import * as React from 'react';
import { graphql, OperationOption } from 'react-apollo';
import { compose } from 'recompose';
import * as Yup from 'yup';
import styled from '../../../themes/styled';
import { Input, Textarea } from '@rebass/forms';
import Alert from '../Alert';
import { Button } from 'rebass/styled-components';
import { Actions, ContainerForm, CounterChars, Row } from '../Modal/modal';
import ResourceCard from '../Resource/Resource';
import { CreateResourceMutationMutationVariables } from '../../../graphql/createResource.generated';
import { LocaleContext } from '../../../context/global/localizationCtx';

const {
  createResourceMutation
} = require('../../../graphql/createResource.graphql');

const withCreateResource = graphql<{}>(createResourceMutation, {
  name: 'createResource'
  // TODO enforce proper types for OperationOption
} as OperationOption<{}, {}>);

interface Props {
  toggleModal?: any;
  modalIsOpen?: boolean;
  collectionId?: string;
  collectionExternalId?: string;
  errors: any;
  touched: any;
  isSubmitting: boolean;
  name: string;
  summary: string;
  image: string;
  onUrl(string): string;
  url: string;
  isFetched(boolean): boolean;
}

interface FormValues {
  name: string;
  summary: string;
  image: string;
  url: string;
  // file: File;
}

interface MyFormProps {
  collectionId: string;
  collectionExternalId: string;
  createResource: any;
  toggleModal: any;
  name: string;
  summary: string;
  image: string;
  url: string;
  onUrl(string): string;
  isFetched(boolean): boolean;
}
const tt = {
  placeholders: {
    url: i18nMark('Enter the URL of the resource'),
    name: i18nMark('A name or title for the resource'),
    summary: i18nMark(
      'Please type or copy/paste a summary about the resource...'
    ),
    submit: i18nMark('Add'),
    image: i18nMark('Enter the URL of an image to represent the resource'),
    noFilesSelected: i18nMark('No files selected')
  }
};

const Preview = styled.div`
  padding: 8px;
  padding-bottom: 1px;
  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
`;

const SearchInput = styled(Input)`
  height: 40px;
  background: white;
  border-radius: 2px;
  border: 1px solid ${props => props.theme.colors.lightgray};
`;

const SubmitButton = styled(Button)`
  margin-left: 8px;
  .--rtl & {
    margin-right: 8px;
    margin-left: 0px;
  }
`;

const Fetched = (props: Props & FormikProps<FormValues>) => {
  const { i18n } = React.useContext(LocaleContext);
  return (
    <>
      <Preview>
        <ResourceCard
          icon={props.values.image}
          title={props.values.name}
          summary={props.values.summary}
          url={props.values.url}
          preview
        />
      </Preview>
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
                  placeholder={i18n._(tt.placeholders.url)}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {props.errors.url &&
              props.touched.url && <Alert>{props.errors.url}</Alert>}
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
                  <SearchInput
                    placeholder={i18n._(tt.placeholders.name)}
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <CounterChars>{90 - field.value.length}</CounterChars>
                </>
              )}
            />
            {props.errors.name &&
              props.touched.name && <Alert>{props.errors.name}</Alert>}
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
                  placeholder={i18n._(tt.placeholders.image)}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {props.errors.image &&
              props.touched.image && <Alert>{props.errors.image}</Alert>}
          </ContainerForm>
        </Row>
        <Actions>
          <SubmitButton
            loading={props.isSubmitting}
            disabled={props.isSubmitting}
            text={i18n._(tt.placeholders.submit)}
            onClick={props.handleSubmit}
            variant="primary"
          >
            <Trans>Publish</Trans>
          </SubmitButton>
          <Button
            onClick={e => {
              e.preventDefault();
              props.toggleModal();
            }}
            variant="outline"
          >
            <Trans>Cancel</Trans>
          </Button>
        </Actions>
      </Form>
    </>
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
    url: Yup.string().url(),
    name: Yup.string()
      .max(90)
      .required(),
    summary: Yup.string().max(1000),
    image: Yup.string().url()
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const variables: CreateResourceMutationMutationVariables = {
      collectionId: props.collectionId,
      resource: {
        name: values.name,
        summary: values.summary,
        icon: values.image,
        url: values.url
      }
    };
    return props
      .createResource({
        variables: variables,
        update: (proxy, { data: { createResource } }) => {
          const fragment = gql`
            fragment Res on Collection {
              id
              icon
              name
              summary
              resources {
                totalCount
                edges {
                  node {
                    id
                    name
                    summary
                    url
                    icon
                  }
                }
              }
            }
          `;
          const collection = proxy.readFragment({
            id: `Collection:${props.collectionExternalId}`,
            fragment: fragment,
            fragmentName: 'Res'
          });
          collection.resources.edges.push({
            __typename: 'CollectionFollowersEdge',
            node: createResource
          });
          collection.resources.totalCount++;
          proxy.writeFragment({
            id: `Collection:${props.collectionExternalId}`,
            fragment: fragment,
            fragmentName: 'Res',
            data: collection
          });
        }
      })
      .then(res => {
        setSubmitting(false);
        props.isFetched(false);
        props.onUrl(' ');
        props.toggleModal();
      })
      .catch(err => {
        props.onUrl(' ');
      });
  }
})(Fetched);

export default compose(withCreateResource)(ModalWithFormik);
