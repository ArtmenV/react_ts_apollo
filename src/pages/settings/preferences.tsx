import * as React from 'react';
import { ContainerForm, Row } from '../../components/elements/Modal/modal';
import LanguageSelect from '../../components/inputs/LanguageSelect/LanguageSelect';
import { Trans } from '@lingui/macro';
import { Box, Flex, Heading } from 'rebass/styled-components';
import { ArrowLeft, ArrowRight } from 'react-feather';
import media from 'styled-media-query';
import styled from '../../themes/styled';
import { LocaleContext } from '../../context/global/localizationCtx';

const Header = styled(Flex)`
  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
  svg {
    cursor: pointer;
  }
  ${media.greaterThan('1005px')`
display: none;
`};
`;

const TabHeading = styled(Heading)`
  margin-left: 8px;
  .--rtl & {
    margin-right: 8px;
    margin-left: 0px;
  }
`;

const Preferences = props => (
  <LocaleContext.Consumer>
    {value => (
      <Box>
        <Header p={3} alignItems="center">
          {value.locale != 'ar_SA' ? (
            <ArrowLeft
              size={32}
              color="#f98012"
              onClick={() => props.onSwitch('sidebar')}
            />
          ) : (
            <ArrowRight
              size={32}
              color="#f98012"
              onClick={() => props.onSwitch('sidebar')}
            />
          )}
          <TabHeading>
            <Trans>Preferences</Trans>
          </TabHeading>
        </Header>
        <Row>
          <ContainerForm>
            <label>
              <Trans>Select language</Trans>
            </label>
            <LanguageSelect />
          </ContainerForm>
        </Row>
      </Box>
    )}
  </LocaleContext.Consumer>
);

export default Preferences;
