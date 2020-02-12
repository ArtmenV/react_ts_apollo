import { Trans } from '@lingui/macro';
import * as React from 'react';
import { Heading } from 'rebass/styled-components';
import styled from '../../themes/styled';

const NotFound = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default () => {
  return (
    <NotFound>
      {/* <Helmet>
        <title>{APP_NAME} > Not found</title>
      </Helmet> */}
      <Heading>
        <Trans>Page not found</Trans>
      </Heading>
    </NotFound>
  );
};
