import * as React from 'react';
import { compose } from 'recompose';
import { graphql, OperationOption } from 'react-apollo';
import { Trans } from '@lingui/macro';
import styled from '../../themes/styled';
// import { Helmet } from 'react-helmet';
import { Button } from 'rebass/styled-components';
import { Input } from '@rebass/forms';
import { withFormik, FormikProps, Form, Field, FormikValues } from 'formik';
import * as Yup from 'yup';
const resetPassword = require('../../graphql/resetPassword.graphql');

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
  history: any;
  match: any;
}

interface FormValues {
  password: string;
  confirm: string;
}

interface MyFormProps {
  resetPasswordMutation: any;
  history: any;
  match: any;
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
      {/* <Helmet>
        <title>Reset password</title>
      </Helmet> */}
      <Container>
        <LoginWrapper>
          <FormWrapper>
            <Logo />
            <Form>
              <Field
                name="password"
                render={({ field }) => (
                  <Input
                    placeholder={'Type your new password'}
                    name={field.name}
                    type="password"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {props.errors.password &&
                props.touched.password && (
                  <Alert>{props.errors.password}</Alert>
                )}

              <Field
                name="confirm"
                render={({ field }) => (
                  <Input
                    style={{ marginTop: '16px' }}
                    placeholder={'Confirm the new password'}
                    name={field.name}
                    type="password"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {props.errors.confirm &&
                props.touched.confirm && <Alert>{props.errors.confirm}</Alert>}

              <Button disabled={props.isSubmitting} type="submit">
                <Trans>Save the new password</Trans>
              </Button>
            </Form>
          </FormWrapper>
        </LoginWrapper>
      </Container>
    </>
  );
};

const withResetEmail = graphql<{}>(resetPassword, {
  name: 'resetPasswordMutation'
  // TODO enforce proper types for OperationOption
} as OperationOption<{}, {}>);

const ModalWithFormik = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => ({
    password: '',
    confirm: ''
  }),
  validationSchema: Yup.object().shape({
    password: Yup.string()
      .min(6)
      .required('Password is required'),
    confirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirm is required')
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const variables = {
      password: values.password,
      token: props.match.params.token
    };
    console.log(variables);
    return props
      .resetPasswordMutation({
        variables: variables
      })
      .then(res => {
        console.log(res);
        if (res.data.resetPassword === true) {
          alert('Your password is successfully updated');
          return props.history.push(`/`);
        } else {
          return setSubmitting(false);
        }
      })
      .catch(err => {
        setSubmitting(false);
        alert(err);
        console.log(err);
      });
  }
})(ResetPasswordPage);

export default compose(withResetEmail)(ModalWithFormik);
