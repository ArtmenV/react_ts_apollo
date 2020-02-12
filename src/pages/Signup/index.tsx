import { Trans } from '@lingui/macro';
import { i18nMark } from '@lingui/react';
import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import * as Yup from 'yup';
import Alert from '../../components/elements/Alert';
import { Input } from '@rebass/forms';
import { Box, Text, Button, Flex } from 'rebass/styled-components';
import { useCreateUserMutationMutation } from '../../graphql/createUser.generated';
const checkUsername = require('../../graphql/checkUsername.graphql');
import Markdown from 'markdown-to-jsx';
// import axios from 'axios';
import styled from '../../themes/styled';
import media from 'styled-media-query';
import { clearFix } from 'polished';
import { Panel, WrapperPanel } from '../../sections/panel';
import useAxios from 'axios-hooks';

import { INVITE_ONLY_TEXT } from './../../constants';
import { AlertCircle, Eye } from 'react-feather';
import { LocaleContext } from '../../context/global/localizationCtx';

// var terms_users = { data: '' };
// var terms_cookies = { data: '' };
// var terms_indexing = { data: '' };

// async function getTerms() {
//   try {
//     terms_users = await axios.get('https://moodle.net/terms/users.md');
//     terms_cookies = await axios.get('https://moodle.net/terms/cookies.md');
//     terms_indexing = await axios.get('https://moodle.net/terms/indexing.md');
//     // console.log(terms);
//   } catch (error) {
//     console.error(error);
//   }
// }

let tt = {
  login: i18nMark('Sign in'),
  placeholders: {
    email: i18nMark('eg. mary@moodlers.org'),
    preferredUsername: i18nMark('eg. moodlerMary'),
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

const Tagline = styled.h5`
  font-size: 16px;
  margin-top: 8px;
  margin-bottom: 40px;
  color: #000000a1;
  font-weight: 500;
`;

const Logo = styled.div`
  background: url(https://i.imgur.com/YdflNQp.png);
  width: 159px;
  display: inline-block;
  height: 30px;
  background-size: cover;
`;

const LoginWrapper = styled.div`
  display: grid;
  grid-column-gap: 16px;
  grid-template-columns: 1fr;
  grid-template-areas: 'header' 'image' 'form' 'footer';
  ${media.lessThan('medium')`
    grid-template-columns: 1fr;
    grid-template-areas: 'header' 'image' 'form' 'footer';
    padding: 16px
  `};
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 900px;
  margin-top: 60px;
`;

const Header = styled.div`
  grid-area: header;
  text-align: center;
`;

const FormWrapper = styled.div`
  grid-area: form;
  margin: 0;
  margin-bottom: 16px;
  input {
    height: 50px;
    background-color: transparent;
    border-radius: 4px;
    border-color: #dadada;
  }
`;

const FormWrapper2 = styled(Form)`
  background: #fff;
  border-radius: 4px;
  height: inherit;
  border: 1px solid #dddfe2;
  text-align: left;
  height: fit-content;
  padding: 16px;
`;

const Right = styled(Box)`
  margin-top: -16px !important;
  grid-area: image;
  .extra {
    width: 100%;
    margin-right: 0;
  }
`;

const Footer = styled.div`
grid-area: footer
margin-top: 100px;
border-top: 1px solid rgba(0,0,0,.2);
padding-top: 24px;
& ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  flex: 1;
  ${clearFix()}
  & li {
    float: left;
    margin-right: 16px;
    font-size: 13px;
    & a {
      color: rgba(0,0,0,.45);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
`;

const Aware = styled(Flex)<{ green: boolean }>`
  background: ${props => (props.green ? '#546d4f' : props.theme.colors.orange)};
  border-radius: 4px;
  align-items: center;
  div {
    color: white;
  }
`;

const SignupModal = (props: Props) => {
  const { i18n } = React.useContext(LocaleContext);
  const [createUser, createUserResp] = useCreateUserMutationMutation();
  const [terms_users] = useAxios('https://moodle.net/terms/users.md', {
    useCache: true
  });
  const [terms_cookies] = useAxios('https://moodle.net/terms/cookies.md', {
    useCache: true
  });
  const [terms_indexing] = useAxios('https://moodle.net/terms/indexing.md', {
    useCache: true
  });

  return (
    <Container>
      {createUserResp.data && createUserResp.data.createUser ? (
        <Box mt={3}>
          <p>
            <Trans>Welcome</Trans>{' '}
            {createUserResp.data.createUser.user.preferredUsername}
          </p>
          <p>
            <Trans>
              Please confirm your email clicking on the link we sent you at
            </Trans>
          </p>
          <Alert color="darkorange">
            {createUserResp.data.createUser.email}
          </Alert>
        </Box>
      ) : (
        <ApolloConsumer>
          {client => (
            <LoginWrapper>
              <Header>
                <Logo />
                <Tagline>Share. Curate. Discuss.</Tagline>
              </Header>
              <FormWrapper>
                <Formik
                  onSubmit={(values, { setSubmitting }) => {
                    const variables = {
                      user: {
                        email: values.email,
                        name: values.name,
                        password: values.password,
                        preferredUsername: values.username,
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
                  render={({ errors, touched, isSubmitting }) => {
                    return (
                      <FormWrapper2>
                        <Box>
                          <label>
                            <Trans>Email</Trans>
                          </label>
                          <>
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
                          </>
                        </Box>
                        <Box mt={3}>
                          <label>
                            <Trans>Display Name</Trans>
                          </label>
                          <>
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
                          </>
                        </Box>
                        <Box mt={3}>
                          <label>
                            <Trans>Preferred username</Trans>
                          </label>
                          <>
                            <Field
                              name="username"
                              validate={val => validateUsername(val, client)}
                              render={({ field }) => (
                                <>
                                  <Input
                                    placeholder={i18n._(
                                      tt.placeholders.preferredUsername
                                    )}
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                  />
                                </>
                              )}
                            />
                            {/* {errors.username &&
                    touched.username && <Alert>{errors.username}</Alert>} */}
                            {errors.username && (
                              <Alert>{errors.username}</Alert>
                            )}
                          </>
                        </Box>
                        <Box mt={3}>
                          <label>
                            <Trans>Password</Trans>
                          </label>
                          <>
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
                              touched.password && (
                                <Alert>{errors.password}</Alert>
                              )}
                          </>
                        </Box>
                        <Box mt={3}>
                          <label>
                            <Trans>Confirm password</Trans>
                          </label>
                          <>
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
                          </>
                        </Box>
                        <Box mt={3}>
                          <Button type="submit">
                            <Trans>Signup</Trans>
                          </Button>
                        </Box>
                        {createUserResp.loading && (
                          <Box mt={3}>
                            <Alert color="green">
                              <Trans>Sending request</Trans>
                            </Alert>
                          </Box>
                        )}
                        {(createUserResp.data &&
                          !createUserResp.data.createUser) ||
                        createUserResp.error ? (
                          <Box mt={3}>
                            <Alert>
                              <Trans>
                                Something went wrong with registration
                              </Trans>
                              {createUserResp.error ? (
                                <p>{createUserResp.error.message}</p>
                              ) : (
                                <Trans>Unknown error</Trans>
                              )}
                            </Alert>
                          </Box>
                        ) : null}
                      </FormWrapper2>
                    );
                  }}
                  initialValues={initialFormValues}
                  validationSchema={validationSchema}
                />
              </FormWrapper>
              <Right>
                <Aware p={3}>
                  <Box mr={2}>
                    <AlertCircle size="20" color="white" />
                  </Box>
                  <Text variant="suptitle">{INVITE_ONLY_TEXT}</Text>
                </Aware>
                <Aware green mt={3} p={3}>
                  <Box mr={2}>
                    <Eye size="20" color="white" />
                  </Box>
                  <Text variant="suptitle">
                    {' '}
                    Please read the following. By signing up your are consenting
                    to these agreements.
                  </Text>
                </Aware>
                <WrapperPanel className="extra">
                  <Panel>
                    <Box p={3}>
                      {terms_users.loading ? (
                        'loading'
                      ) : (
                        <Markdown>{terms_users.data}</Markdown>
                      )}
                    </Box>
                    <Box p={3}>
                      {terms_cookies.loading ? (
                        'loading'
                      ) : (
                        <Markdown>{terms_cookies.data}</Markdown>
                      )}
                    </Box>
                    <Box p={3}>
                      {terms_indexing.loading ? (
                        'loading'
                      ) : (
                        <Markdown>{terms_indexing.data}</Markdown>
                      )}
                    </Box>
                  </Panel>
                </WrapperPanel>
              </Right>
              <Footer>
                <ul>
                  <li>
                    <a href="https://moodle.net" target="blank">
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://moodle.net/terms/users/index.html"
                      target="blank"
                    >
                      Code of Conduct
                    </a>
                  </li>
                  <li>
                    <a href="https://gitlab.com/moodlenet" target="blank">
                      Open source
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://changemap.co/moodle/moodlenet/"
                      target="blank"
                    >
                      Feedback
                    </a>
                  </li>
                  <li>
                    <a href="https://moodle.com/privacy-notice" target="blank">
                      Privacy notice
                    </a>
                  </li>
                </ul>
              </Footer>
            </LoginWrapper>
          )}
        </ApolloConsumer>
      )}
    </Container>
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
