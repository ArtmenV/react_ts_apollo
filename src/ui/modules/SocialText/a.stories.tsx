import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SocialText from '.';
import { themeDeco } from 'ui/styleguide/storiesThemeDecorator';
import { Box } from 'rebass/styled-components';
import styled from 'ui/themes/styled';

const Wrapper = styled(Box)`
  border: 2px solid ${props => props.theme.colors.lightgray};
  border-radius: 4px;
`;

storiesOf('Modules/SocialText', module)
  .addDecorator(themeDeco())
  .add('Simple', () => {
    const submit = action('submit');
    return (
      <Wrapper border>
        <SocialText placeholder="type a message..." submit={submit} />
      </Wrapper>
    );
  });
