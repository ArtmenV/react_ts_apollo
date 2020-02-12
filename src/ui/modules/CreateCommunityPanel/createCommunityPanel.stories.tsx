import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { useFormik } from 'formik';
import React from 'react';
import { themeDeco } from 'ui/styleguide/storiesThemeDecorator';
import { CreateCommunityPanel, BasicCreateCommunityFormValues } from '.';

storiesOf('Modules/CreateCommunity', module)
  .addDecorator(themeDeco())
  .add('Standard', () => {
    const formik = useFormik<BasicCreateCommunityFormValues>({
      initialValues: {
        icon: 'https://picsum.photos/800/30',
        name: 'name',
        summary: 'summary'
      },
      onSubmit: () => {
        action('submit')();
        return new Promise((resolve /* , reject */) => {
          setTimeout(resolve, 3000);
        });
      }
    });
    return (
      <CreateCommunityPanel cancel={action('close modal')} formik={formik} />
    );
  });
