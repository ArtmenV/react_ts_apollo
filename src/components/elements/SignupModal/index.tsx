import { Trans } from '@lingui/macro';
import { i18nMark } from '@lingui/react';
import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import * as Yup from 'yup';
import Alert from '../Alert';
import { Input } from '@rebass/forms';
import { Heading, Button } from 'rebass/styled-components';
import Modal from '../Modal';
import { Row, Container, Actions, ContainerForm, Header } from '../Modal/modal';
import { useCreateUserMutationMutation } from '../../../graphql/createUser.generated';
const checkUsername = require('../../../graphql/checkUsername.graphql');
import Markdown from 'markdown-to-jsx';
import axios from 'axios';

import { INVITE_ONLY_TEXT } from './../../../constants';
import { LocaleContext } from '../../../context/global/localizationCtx';

var terms_users = { data: '' };
var terms_cookies = { data: '' };
var terms_indexing = { data: '' };

async function getTerms() {
  try {
    terms_users = await axios.get('https://moodle.net/terms/users.md');
    terms_cookies = await axios.get('https://moodle.net/terms/cookies.md');
    terms_indexing = await axios.get('https://moodle.net/terms/indexing.md');
    // console.log(terms);
  } catch (error) {
    console.error(error);
  }
}

let tt = {
  login: i18nMark('Sign in'),
  placeholders: {
    email: i18nMark('eg. mary@moodlers.org'),
    name: i18nMark('eg. Moodler Mary'),
    password: i18nMark('Choose your password'),
    passwordConfirm: i18nMark('Confirm your password')
  }
};

interface Props {
  toggleModal?: any;
  modalIsOpen?: boolean;
}

interface FormValues {
  name: string;
  email: string;
  password: string;
  username: string;
  passwordConfirm: string;
}

async function validateUsername(value, client) {
  // TODO use the same function in signup & edit profile
  let error;
  const format = /[^0-9a-zA-Z]/;
  if (value.length < 3) {
    error = 'Choose a username longer than 3 characters';
    return error;
  }
  if (value.length > 16) {
    error = 'Choose a username shorter than 16 characters';
    return error;
  }
  if (format.test(value)) {
    error = 'Only letters and numbers are allowed in a username';
    return error;
  } else {
    const { data } = await client.query({
      query: checkUsername,
      variables: { username: value }
    });
    if (!data.usernameAvailable) {
      error = 'That username has already been taken';
      return error;
    }
  }
}

const SignupModal = (props: Props) => {
  const { i18n } = React.useContext(LocaleContext);
  const { toggleModal, modalIsOpen } = props;
  const [createUser /*, createUserResp*/] = useCreateUserMutationMutation();
  getTerms();
  return (
    <ApolloConsumer>
      {client => (
        <Modal isOpen={modalIsOpen} toggleModal={toggleModal}>
          <Container>
            <Header>
              <Heading m={2}>
                <Trans>Create a new account</Trans>
              </Heading>
            </Header>
            <Formik
              render={({ errors, touched, isSubmitting }) => {
                return (
                  <Form>
                    <Row>{INVITE_ONLY_TEXT}</Row>
                    <Row>
                      Please read the following. By signing up your are
                      consenting to these agreements.
                    </Row>
                    <Row>
                      <Markdown>{terms_users.data}</Markdown>
                    </Row>
                    <Row>
                      <Markdown>{terms_cookies.data}</Markdown>
                    </Row>
                    <Row>
                      <Markdown>{terms_indexing.data}</Markdown>
                    </Row>
                    <Row>
                      <label>
                        <Trans>Email</Trans>
                      </label>
                      <ContainerForm>
                        <Field
                          name="email"
                          render={({ field }) => (
                            <Input
                              placeholder={i18n._(tt.placeholders.email)}
                              name={field.name}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        {errors.email &&
                          touched.email && <Alert>{errors.email}</Alert>}
                      </ContainerForm>
                    </Row>
                    <Row>
                      <label>
                        <Trans>Display Name</Trans>
                      </label>
                      <ContainerForm>
                        <Field
                          name="name"
                          render={({ field }) => (
                            <Input
                              placeholder={i18n._(tt.placeholders.name)}
                              name={field.name}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        {errors.name &&
                          touched.name && <Alert>{errors.name}</Alert>}
                      </ContainerForm>
                    </Row>
                    <Row>
                      <label>
                        <Trans>Preferred username</Trans>
                      </label>
                      <ContainerForm>
                        <Field
                          name="username"
                          validate={val => validateUsername(val, client)}
                          render={({ field }) => (
                            <>
                              <Input
                                // placeholder="The name of the community..."
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                              />
                            </>
                          )}
                        />
                        {/* {errors.username &&
                touched.username && <Alert>{errors.username}</Alert>} */}
                        {errors.username && <Alert>{errors.username}</Alert>}
                      </ContainerForm>
                    </Row>
                    <Row>
                      <label>
                        <Trans>Password</Trans>
                      </label>
                      <ContainerForm>
                        <Field
                          name="password"
                          render={({ field }) => (
                            <Input
                              placeholder={i18n._(tt.placeholders.password)}
                              type="password"
                              name={field.name}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        {errors.password &&
                          touched.password && <Alert>{errors.password}</Alert>}
                      </ContainerForm>
                    </Row>
                    <Row>
                      <label>
                        <Trans>Confirm password</Trans>
                      </label>
                      <ContainerForm>
                        <Field
                          name="passwordConfirm"
                          render={({ field }) => (
                            <Input
                              placeholder={i18n._(
                                tt.placeholders.passwordConfirm
                              )}
                              type="password"
                              name={field.name}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        {errors.passwordConfirm &&
                          touched.passwordConfirm && (
                            <Alert>{errors.passwordConfirm}</Alert>
                          )}
                      </ContainerForm>
                    </Row>
                    <Actions>
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        style={{ marginLeft: '10px' }}
                      >
                        <Trans>Sign Up</Trans>
                      </Button>
                      <Button onClick={toggleModal} variant="outline">
                        <Trans>Cancel</Trans>
                      </Button>
                    </Actions>
                  </Form>
                );
              }}
              onSubmit={(values, { setSubmitting }) => {
                const variables = {
                  user: {
                    email: values.email,
                    name: values.name,
                    password: values.password,
                    preferredUsername: values.username,
                    isPublic: true,
                    wantsEmailDigest: false,
                    wantsNotifications: false
                  }
                };
                return createUser({
                  variables: variables
                })
                  .then(res => {
                    setSubmitting(false);
                  })
                  .catch(err => {
                    setSubmitting(false);
                    alert(err);
                    console.log(err);
                  });
              }}
              initialValues={initialFormValues}
              validationSchema={validationSchema}
            />
          </Container>
        </Modal>
      )}
    </ApolloConsumer>
  );
};

const initialFormValues: FormValues = {
  name: '',
  email: '',
  username: '',
  password: '',
  passwordConfirm: ''
};
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Please enter your name or nickname'),
  email: Yup.string()
    .email()
    .required('Please enter your email'),
  password: Yup.string()
    .min(6)
    .required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required')
});

export default SignupModal;
