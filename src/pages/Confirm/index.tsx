import * as React from 'react';
import { Box } from 'rebass/styled-components';
import { useConfirmEmailMutationMutation } from '../../graphql/confirmEmail.generated';
import styled from '../../themes/styled';

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
  token: string;
}

/**
 * @param Component
 * @param data {Object} the user object from local cache
 * @param rest
 * @constructor
 */

const Confirm = (props: Props) => {
  const [confirm, result] = useConfirmEmailMutationMutation();
  React.useEffect(
    () => {
      confirm({ variables: { token: props.token } });
    },
    [props.token]
  );
  return (
    <>
      <Container>
        <LoginWrapper>
          <FormWrapper>
            <Logo />
            <Box>
              {result.error && (
                <div>Error in email confirmation: {result.error.message}</div>
              )}
            </Box>
          </FormWrapper>
        </LoginWrapper>
      </Container>
    </>
  );
};

export default Confirm;
