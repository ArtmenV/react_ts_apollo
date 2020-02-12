// Add a resource to collection - step 1

import { i18nMark } from '@lingui/react';
import { Field, Form, FormikProps, withFormik } from 'formik';
import { clearFix } from 'polished';
import * as React from 'react';
import { graphql, OperationOption } from 'react-apollo';
import { compose, withState } from 'recompose';
import * as Yup from 'yup';
import styled from '../../../themes/styled';
import { Search } from '../Icons';
import Loader from '../Loader/Loader';
import { Row } from '../Modal/modal';
import Fetched from './fetched';
import { Input } from '@rebass/forms';
import { LocaleContext } from '../../../context/global/localizationCtx';
const tt = {
  placeholders: {
    url: i18nMark('Enter the URL of the resource'),
    name: i18nMark('A name or title for the resource'),
    summary: i18nMark(
      'Please type or copy/paste a summary about the resource...'
    ),
    submit: i18nMark('Fetch the resource'),
    image: i18nMark('Enter the URL of an image to represent the resource')
  }
};

const FETCH_RESOURCE = require('../../../graphql/fetchResource.graphql');

interface Props {
  toggleModal?: any;
  modalIsOpen?: boolean;
  collectionId?: string;
  collectionExternalId?: string;
  errors: any;
  touched: any;
  isSubmitting: boolean;
  fetchResource: any;
  isFetched(boolean): boolean;
  fetched: boolean;
  name: string;
  summary: string;
  image: string;
  url: string;
  onName(string): string;
  onSummary(string): string;
  onImage(string): string;
  onUrl(string): string;
}

interface FormValues {
  fetchUrl: string;
}

interface MyFormProps {
  collectionId: string;
  collectionExternalId: string;
  toggleModal: any;
  fetchResource: any;
  isFetched(boolean): boolean;
  fetched: boolean;
  onName(string): string;
  onSummary(string): string;
  onImage(string): string;
  onUrl(string): string;
  name: string;
  summary: string;
  image: string;
  url: string;
}

const withFetchResource = graphql<{}>(FETCH_RESOURCE, {
  name: 'fetchResource'
  // TODO enforce proper types for OperationOption
} as OperationOption<{}, {}>);

const ShareLinkModal = (props: Props & FormikProps<FormValues>) => {
  const { i18n } = React.useContext(LocaleContext);

  return (
    <div>
      <Row>
        <ContainerForm>
          <Form>
            <Field
              name="fetchUrl"
              render={({ field }) => (
                <SearchInput
                  placeholder={i18n._(tt.placeholders.url)}
                  onChange={field.onChange}
                  name={field.name}
                  value={field.value}
                />
              )}
            />
            <Span disabled={props.isSubmitting} type="submit">
              <Search width={18} height={18} strokeWidth={2} color={'#333'} />
            </Span>
            {/* <LoaderButton loading={props.isSubmitting}  text={i18n._(tt.placeholders.submit)}  /> */}
          </Form>
        </ContainerForm>
      </Row>
      {props.isSubmitting ? (
        <WrapperLoader>
          <Loader />
        </WrapperLoader>
      ) : null}
      {props.fetched ? (
        <Fetched
          url={props.url}
          name={props.name}
          image={props.image}
          summary={props.summary}
          collectionId={props.collectionId}
          toggleModal={props.toggleModal}
          collectionExternalId={props.collectionExternalId}
          isFetched={props.isFetched}
          onUrl={props.onUrl}
        />
      ) : null}
    </div>
  );
};

const ModalWithFormik = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => ({
    fetchUrl: ''
  }),
  validationSchema: Yup.object().shape({
    fetchUrl: Yup.string().url()
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.isFetched(false);
    props.onName('');
    props.onSummary('');
    props.onImage('');
    props.onUrl(values.fetchUrl);
    return props
      .fetchResource({
        variables: {
          url: values.fetchUrl
        }
      })
      .then(res => {
        props.onName(res.data.fetchWebMetadata.title);
        props.onSummary(res.data.fetchWebMetadata.summary);
        props.onImage(res.data.fetchWebMetadata.image);
        props.onUrl(values.fetchUrl);
        props.isFetched(true);
        setSubmitting(false);
      })
      .catch(err => {
        props.onUrl(values.fetchUrl);
        props.isFetched(true);
        setSubmitting(false);
      });
  }
})(ShareLinkModal);

export default compose(
  withFetchResource,
  withState('fetched', 'isFetched', false),
  withState('name', 'onName', ''),
  withState('summary', 'onSummary', ''),
  withState('image', 'onImage', ''),
  withState('url', 'onUrl', '')
)(ModalWithFormik);

const WrapperLoader = styled.div`
  padding: 10px;
`;

const SearchInput = styled(Input)`
  height: 40px;
  background: white;
  border-radius: 2px;
  border: 1px solid ${props => props.theme.colors.lightgray};
`;

const Span = styled.button`
  position: absolute;
  right: 2px;
  top: 2px;
  border: 0;
  background: transparent;
  box-shadow: none;
  width: 40px;
  background: #fffffff0;
  height: 37px;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.colors.orange};
  }
  .--rtl & {
    left: 2px;
    right: auto;
  }
`;

const ContainerForm = styled.div`
  flex: 1;
  ${clearFix()};
  position: relative;
  & form {
    width: 100%;
  }
`;
