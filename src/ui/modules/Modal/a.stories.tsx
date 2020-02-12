import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Modal from '.';
import { themeDeco } from 'ui/styleguide/storiesThemeDecorator';

storiesOf('Modules/Modal', module)
  .addDecorator(themeDeco())
  .add('Simple', () => (
    <Modal closeModal={action('close modal')}>Hello Modal</Modal>
  ));
