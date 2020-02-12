import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { useFormik } from 'formik';
import React from 'react';
import { themeDeco } from 'ui/styleguide/storiesThemeDecorator';
import { BasicCreateCollectionFormValues, CreateCollectionPanel } from '.';

storiesOf('Modules/CreateCollection', module)
  .addDecorator(themeDeco())
  .add('Standard', () => {
    const formik = useFormik<BasicCreateCollectionFormValues>({
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
    return <CreateCollectionPanel cancel={action('cancel')} formik={formik} />;
  });
