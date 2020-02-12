import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { themeDeco } from 'ui/styleguide/storiesThemeDecorator';
import { useFormik } from 'formik';
import EditCommunityPanel, { EditCommunityFormValues } from '.';

storiesOf('Modules/EditCommunity', module)
  .addDecorator(themeDeco())
  .add('Standard', () => {
    const formik = useFormik<EditCommunityFormValues>({
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
    return <EditCommunityPanel cancel={action('cancel')} formik={formik} />;
  });
