import { Trans } from '@lingui/macro';
import { i18nMark } from '@lingui/react';
import { clearFix } from 'polished';
import * as React from 'react';
import { graphql } from 'react-apollo';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { compose, withHandlers, withState } from 'recompose';
import media from 'styled-media-query';
import Link from '../../components/elements/Link/Link';
import SignupModal from '../../components/elements/SignupModal';
import { SessionContext } from '../../context/global/sessionCtx';
import styled, { MoodleThemeInterface } from '../../themes/styled';
import LoginForm from './LoginForm';
import { ValidationField, ValidationObject, ValidationType } from './types';
import { Button, Box, Text, Image } from 'rebass/styled-components';
const { loginMutation } = require('../../graphql/login.graphql');
import { Panel, WrapperPanel } from '../../sections/panel';
const MnetLogin = require('./login.jpg');
import { INSTANCE_DESCRIPTION } from './../../constants';

const Background = styled(Image)`
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;
const Tagline = styled.h5`
  font-size: 16px;
  margin-top: 8px;
  margin-bottom: 40px;
  color: #000000a1;
  font-weight: 500;
`;

const Infos = styled(Box)``;

const Info = styled(Box)``;

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
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'header header' 'form image' 'footer footer';
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
`;

const Form = styled.div`
  background: #fff;
  border-radius: 4px;
  height: inherit;
  border: 1px solid #dddfe2;
  text-align: left;
  height: fit-content;
`;

const Right = styled(Box)`
  grid-area: image .extra {
    width: 100%;
    margin-right: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
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

const Browse = styled(Box)`
  background: #fff;
  a {
    text-decoration: none;
    color: ${props => props.theme.colors.darkgray};
  }
`;

const Or = styled.div`
  position: relative;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
  margin-top: 24px;
  &:before {
    position: absolute;
    content: '';
    width: calc(50% - 24px);
    left: 0;
    top: 8px;
    height: 1px;
    display: block;
    background: rgba(0, 0, 0, 0.45);
  }
  &:after {
    position: absolute;
    content: '';
    width: calc(50% - 24px);
    right: 0;
    top: 8px;
    height: 1px;
    display: block;
    background: rgba(0, 0, 0, 0.45);
  }
`;

const ResetPass = styled(Text)`
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
  a {
    font-size: 14px;
    color: inherit;
  }
`;

/**
 * @param Component
 * @param data {Object} the user object from local cache
 * @param rest
 * @constructor
 */
function RedirectIfAuthenticated({ component: Component, data, ...rest }) {
  const sessionCtx = React.useContext(SessionContext);

  return (
    <Route
      render={(props: RouteComponentProps & LoginProps) => {
        if (sessionCtx.me) {
          return <Redirect to="/" />;
        }
        return <Login data={data} {...props} {...rest} />;
      }}
    />
  );
}

interface LoginProps extends RouteComponentProps {
  // setLocalUser: Function;
  login: Function;
  data: object;
  theme: MoodleThemeInterface;
  handleSignup(): boolean;
  isOpen: boolean;
}

interface LoginState {
  redirectTo: string | null;
  authenticating: boolean;
  validation: ValidationObject[];
}

type CredentialsObject = {
  email: string;
  password: string;
};

class Login extends React.Component<LoginProps, LoginState> {
  state = {
    redirectTo: null,
    authenticating: false,
    validation: []
  };

  static validateCredentials(credentials: CredentialsObject) {
    const validation: ValidationObject[] = [];

    if (!credentials.email.length) {
      validation.push({
        field: ValidationField.email,
        type: ValidationType.error,
        message: i18nMark('The email field cannot be empty')
      } as ValidationObject);
    }
    if (!credentials.password.length) {
      validation.push({
        field: ValidationField.password,
        type: ValidationType.error,
        message: i18nMark('The password field cannot be empty')
      } as ValidationObject);
    }

    return validation;
  }

  constructor(props) {
    super(props);
    this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
    this.onLoginFormInputChange = this.onLoginFormInputChange.bind(this);
  }

  /**
   * Submit the login form credentials to authenticate the user.
   * @param credentials {Object}
   */
  async onLoginFormSubmit(credentials) {
    const validation = Login.validateCredentials(credentials);

    if (validation.length) {
      this.setState({ validation });
      return;
    }

    this.setState({ authenticating: true });
    let error = '';
    try {
      const resp = await this.props.login({
        variables: credentials
      });
      if (resp.errors) {
        error = resp.errors.map(err => err.message).join('\n');
      }
    } catch (err) {
      error = i18nMark(
        'Could not log in. Please check your credentials or use the link below to reset your password.'
      );
    }
    if (error) {
      this.setState({
        authenticating: false,
        validation: [
          {
            field: null,
            type: ValidationType.warning,
            message: error
          } as ValidationObject
        ]
      });
    }
  }

  /** Clear the validation messages for a field and also generic validations when its value changes. */
  onLoginFormInputChange(field: ValidationField) {
    this.setState({
      validation: this.state.validation.filter(
        (validation: ValidationObject) => {
          return validation.field !== field && validation.field !== null;
        }
      )
    });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo as any} />;
    }

    return (
      <>
        <Container>
          <LoginWrapper>
            <Header>
              <Logo />
              <Tagline>Share. Curate. Discuss.</Tagline>
            </Header>
            <FormWrapper>
              <Form>
                <LoginForm
                  validation={this.state.validation}
                  onSubmit={this.onLoginFormSubmit}
                  onInputChange={this.onLoginFormInputChange}
                  authenticating={this.state.authenticating}
                />
                <ResetPass variant="text" my={3} mt={2}>
                  <Link to="/reset">
                    <Trans>Trouble logging in?</Trans>
                  </Link>
                </ResetPass>
              </Form>
              <Or>
                <Trans>Or</Trans>
              </Or>
              <Browse mt={3} p={3}>
                <Text variant="heading" fontSize={3}>
                  <Trans>Browse this MoodleNet instance</Trans>
                </Text>
                <Text variant="text" mt={2}>
                  <Trans>
                    Preview what people are sharing, curating, and discussing!
                  </Trans>
                </Text>
                <Link to={'/discover'}>
                  <Button mt={3} variant="outline">
                    <Trans>Browse</Trans>
                  </Button>
                </Link>
              </Browse>
            </FormWrapper>
            <Right>
              <Link to="signup">
                <Button
                  mb={2}
                  style={{ width: '100%', height: '50px' }}
                  variant="outline"
                  // onClick={this.props.handleSignup}
                >
                  <Trans>Sign up</Trans>
                </Button>
              </Link>
              <WrapperPanel className="extra">
                <Panel>
                  <Background src={MnetLogin} />
                  <Infos p={3}>
                    <Info>
                      <Text variant="suptitle">
                        <Trans>Instance description</Trans>
                      </Text>
                      <Text mt={2} variant="text">
                        <Trans>{INSTANCE_DESCRIPTION}</Trans>
                      </Text>
                    </Info>
                  </Infos>
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

          <SignupModal
            toggleModal={this.props.handleSignup}
            modalIsOpen={this.props.isOpen}
          />
        </Container>
      </>
    );
  }
}
const withLogin = graphql(loginMutation, {
  name: 'login'
});

export default compose(
  withLogin,
  withState('isOpen', 'onOpen', false),
  withHandlers({
    handleSignup: props => () => props.onOpen(!props.isOpen)
  })
)(RedirectIfAuthenticated);
