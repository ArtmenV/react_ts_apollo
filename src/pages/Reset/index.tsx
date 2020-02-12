import * as React from 'react';
import { compose } from 'recompose';
import { graphql, OperationOption } from 'react-apollo';
import { Trans } from '@lingui/macro';
import styled from '../../themes/styled';
import { Button } from 'rebass/styled-components';
import { Input } from '@rebass/forms';
import { withFormik, FormikProps, Form, Field, FormikValues } from 'formik';
import * as Yup from 'yup';
const resetPasswordRequest = require('../../graphql/resetPasswordRequest.graphql');

import Alert from '../../components/elements/Alert';

const LoginWrapper = styled.div`
  display: grid;
  grid-column-gap: 16px;
  grid-template-columns: 1fr;
  grid-template-areas: 'form';
`;

const Container = styled.div`
  margin: 0 auto;
  width: 432px;
  margin-top: 60px;
  padding: 16px;
  & button {
    margin-top: 16px;
    width: 100%;
    color: #fff !important;
    text-transform: uppercase
      &:hover {
      background: #d67218 !important;
    }
  }
`;

const Logo = styled.div`
  background: url(https://i.imgur.com/YdflNQp.png);
  width: 159px;
  display: block;
  height: 30px;
  background-size: cover;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const FormWrapper = styled.div`
  grid-area: form;
`;

interface Props {
  errors: any;
  touched: any;
  isSubmitting: boolean;
}

interface FormValues {
  email: string;
}

interface MyFormProps {
  resetPassword: any;
  history: any;
}

/**
 * @param Component
 * @param data {Object} the user object from local cache
 * @param rest
 * @constructor
 */

const ResetPasswordPage = (props: Props & FormikProps<FormikValues>) => {
  return (
    <>
      <Container>
        <LoginWrapper>
          <FormWrapper>
            <Logo />
            <Form>
              <Field
                name="email"
                render={({ field }) => (
                  <Input
                    placeholder={'Type your email'}
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {props.errors.email &&
                props.touched.email && <Alert>{props.errors.email}</Alert>}
              <Button disabled={props.isSubmitting} variant="primary">
                <Trans>Reset the password</Trans>
              </Button>
            </Form>
          </FormWrapper>
        </LoginWrapper>
      </Container>
    </>
  );
};

const withResetEmail = graphql<{}>(resetPasswordRequest, {
  name: 'resetPassword'
  // TODO enforce proper types for OperationOption
} as OperationOption<{}, {}>);

const ModalWithFormik = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => ({
    email: ''
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email()
      .required()
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const variables = {
      email: values.email
    };
    return props
      .resetPassword({
        variables: variables
      })
      .then(res => {
        alert(
          'If you have correctly entered an email which exists in our database, you will receive an email. Please check your spam folder if necessary.'
        );
        props.history.push(`/`);
      })
      .catch(err => {
        setSubmitting(false);
        alert(err);
        console.log(err);
      });
  }
})(ResetPasswordPage);

export default compose(withResetEmail)(ModalWithFormik);
