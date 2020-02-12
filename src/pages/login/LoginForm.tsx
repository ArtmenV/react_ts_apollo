import { i18nMark } from '@lingui/react';
import * as React from 'react';
import { Trans } from '@lingui/macro';
import { Input } from '@rebass/forms';
import styled from '../../themes/styled';
import { ValidationField, ValidationObject, ValidationType } from './types';
import Button from 'ui/elements/Button';
import { Box } from 'rebass/styled-components';

const LoginForm = styled.form`
  margin: 0;
  margin-bottom: 16px;
  input {
    height: 50px;
    background-color: transparent;
    border-radius: 4px;
    border-color: #dadada;
  }
`;

const Spacer = styled.div`
  width: 10px;
  height: 10px;
`;

type LoginFormProps = {
  onSubmit: Function;
  onInputChange: Function;
  authenticating: boolean;
  validation: ValidationObject[];
};

type LoginFormState = {
  email: string;
  password: string;
};

export default class extends React.Component<LoginFormProps, LoginFormState> {
  state = {
    email: '',
    password: ''
  };

  constructor(props) {
    super(props);
    this.getValidation = this.getValidation.bind(this);
    this.getValidationMessage = this.getValidationMessage.bind(this);
  }

  getValidation(field: ValidationField | null): ValidationType | null {
    const validation = this.props.validation.find(
      (validation: ValidationObject) => {
        return validation.field === field;
      }
    );
    if (validation) {
      return validation.type;
    }
    return null;
  }

  getValidationMessage(field: ValidationField | null): String {
    return this.props.validation.reduce(
      (message: string, validation: ValidationObject) => {
        if (validation.field === field) {
          if (message.length) {
            return (message += ', ' + validation.message);
          } else {
            return validation.message;
          }
        }
        return message;
      },
      ''
    );
  }

  render() {
    const { onInputChange, onSubmit } = this.props;

    return (
      <LoginForm
        onSubmit={evt => {
          evt.preventDefault();
          onSubmit(this.state);
        }}
      >
        <Box p={3}>
          <Input
            placeholder={i18nMark('Enter your email')}
            value={this.state.email}
            validation={this.getValidation(ValidationField.email)}
            onChange={(evt: any) => {
              this.setState({
                email: evt.target.value
              });
              onInputChange(ValidationField.email, evt.target.value);
            }}
          />
          <Spacer />
          <Input
            type="password"
            placeholder={i18nMark('Enter your password')}
            value={this.state.password}
            validation={this.getValidation(ValidationField.password)}
            onChange={(evt: any) => {
              this.setState({
                password: evt.target.value
              });
              onInputChange(ValidationField.password, evt.target.value);
            }}
          />
          <Button
            isSubmitting={this.props.authenticating}
            mt={3}
            style={{ width: '100%' }}
            variant="primary"
          >
            <Trans>Sign in</Trans>{' '}
          </Button>
        </Box>
      </LoginForm>
    );
  }
}
