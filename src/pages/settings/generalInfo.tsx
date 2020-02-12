import * as React from 'react';
import { graphql, OperationOption, ApolloConsumer } from 'react-apollo';
import { compose } from 'recompose';
import { Trans } from '@lingui/macro';
import { Formik, FormikConfig, Form, Field } from 'formik';
import * as Yup from 'yup';
import media from 'styled-media-query';

import Alert from '../../components/elements/Alert';
import { Input, Textarea } from '@rebass/forms';
import styled from '../../themes/styled';
import { Heading, Button, Flex, Box } from 'rebass/styled-components';
const checkUsername = require('../../graphql/checkUsername.graphql');
const {
  updateProfileMutation
} = require('../../graphql/updateProfile.graphql');
import { SessionContext } from '../../context/global/sessionCtx';
// import { useUploadImageMutation } from '../../graphql/uploadImage.generated';

import {
  Row,
  CounterChars,
  ContainerForm
} from '../../components/elements/Modal/modal';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { LocaleContext } from '../../context/global/localizationCtx';
import ImageDropzoneModal from '../../components/elements/DropzoneModal/imageModal';

const withUpdateCommunity = graphql<{}>(updateProfileMutation, {
  name: 'updateProfile'
  // TODO enforce proper types for OperationOption
} as OperationOption<{}, {}>);

interface Props {
  errors: any;
  touched: any;
  isSubmitting: boolean;
  setFieldValue: any;
  profile: any;
  history: any;
  onSwitch: any;
  updateProfile: any;
}

interface FormValues {
  name: string;
  summary: string;
  image: any;
  icon: string;
  username: string;
  location: string;
}

// interface MyFormProps {
//   updateProfile: any;
//   profile: any;
//   history: any;
//   onSwitch: any;
// }

async function validateUsername(value, client, username) {
  // TODO use the same function in signup & edit profile
  let error;
  const format = /[^0-9a-zA-Z]/;
  if (value.length < 3) {
    error = 'Choose a username longer than 3 characters';
    return error;
  }
  if (value.length > 16) {
    error = 'Choose a username shorter than 16 characters';
    return error;
  }
  if (format.test(value)) {
    error = 'Only letters and numbers are allowed in a username';
    return error;
  }
  if (value === username) {
    return;
  } else {
    const { data } = await client.query({
      query: checkUsername,
      variables: { username: value }
    });
    if (!data.usernameAvailable) {
      error = 'That username has already been taken';
      return error;
    }
  }
}

const ExRow = styled(Row)`
  border-bottom: none;
  textarea {
    width: 100%;
    font-family: Open Sans;
    padding: 8px;
    font-size: 14px;
    border-radius: 4px;
  }
`;

const Actions = styled(Box)`
  margin: 20px;
  button {
    width: 100%;
    height: 40px;
    cursor: pointer;
    background: ${props => props.theme.colors.orange};
  }
`;
const Header = styled(Flex)`
  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
  svg {
    cursor: pointer;
  }
  ${media.greaterThan('1005px')`
display: none;
`};
`;

const ExRowUsername = styled(ExRow)`
  border-top: 1px solid ${props => props.theme.colors.lightgray};
  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
`;

const TabHeading = styled(Heading)`
  margin-left: 8px;
  .--rtl & {
    margin-right: 8px;
    margin-left: 0px;
  }
`;

const HeaderImg = styled.img`
  display: block;
  max-width: 100%;
  margin-bottom: 10px;
  max-height: 400px;
`;

const AvatarImg = styled.img`
  display: block;
  max-width: 100%;
  margin-bottom: 10px;
  max-height: 400px;
`;

const Component: React.FC<Props> = ({
  errors,
  touched,
  isSubmitting,
  // setFieldValue,
  profile,
  history,
  onSwitch,
  updateProfile
}) => {
  const initialValues = {
    name: profile.user.name || '',
    summary: profile.user.summary || '',
    location: profile.user.location || '',
    icon: profile.user.icon || '',
    username: profile.user.preferredUsername || '',
    image: profile.user.image || ''
  };

  // const { errors, touched, isSubmitting } = props;
  const [isUploadOpen, onUploadOpen] = React.useState(false);
  const [uploadType, setUploadType] = React.useState('icon');
  const [iconUrl, onIcon] = React.useState(initialValues.icon);
  const [imageUrl, onImage] = React.useState(initialValues.image);
  const localeCntx = React.useContext(LocaleContext);
  const { me } = React.useContext(SessionContext);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    summary: Yup.string(),
    icon: Yup.string(), //.url(),
    image: Yup.string().url(),
    location: Yup.string()
  });

  const handleSubmit = React.useCallback<FormikConfig<FormValues>['onSubmit']>(
    (values, { setSubmitting }) => {
      const variables = {
        profile: {
          name: values.name,
          image: values.image,
          summary: values.summary,
          location: values.location,
          icon: values.icon
        }
      };
      return updateProfile({
        variables: variables
      })
        .then(res => {
          setSubmitting(false);
          history.push('/profile');
          // alert("New settings are saved"); //TODO: nicer display of errors
        })
        .catch(err => alert(err));
    },
    []
  );

  return (
    <ApolloConsumer>
      {client => (
        <>
          <Header p={3} alignItems="center">
            {localeCntx.locale != 'ar_SA' ? (
              <ArrowLeft
                size={32}
                color="#f98012"
                onClick={() => onSwitch('sidebar')}
              />
            ) : (
              <ArrowRight
                size={32}
                color="#f98012"
                onClick={() => onSwitch('sidebar')}
              />
            )}
            <TabHeading>
              <Trans>General Information</Trans>
            </TabHeading>
          </Header>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            render={({ errors, touched, isSubmitting, setFieldValue }) => {
              return (
                <Form>
                  <ExRow>
                    <ContainerForm>
                      <label>
                        <Trans>Name</Trans>
                      </label>
                      <Field
                        name="name"
                        render={({ field }) => (
                          <>
                            <Input
                              // placeholder="The name of the community..."
                              name={field.name}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </>
                        )}
                      />
                      {errors.name &&
                        touched.name && <Alert>{errors.name}</Alert>}
                    </ContainerForm>
                  </ExRow>

                  {profile.user.preferredUsername ? (
                    <ExRowUsername>
                      <ContainerForm>
                        <label>
                          <Trans>Preferred username</Trans>
                        </label>
                        <Heading>@{profile.user.preferredUsername}</Heading>
                      </ContainerForm>
                    </ExRowUsername>
                  ) : (
                    <>
                      <ExRow>
                        <ContainerForm>
                          <label>
                            <Trans>Preferred username</Trans>
                          </label>
                          <Field
                            name="username"
                            validate={val =>
                              validateUsername(
                                val,
                                client,
                                profile.user.preferredUsername
                              )
                            }
                            render={({ field }) => (
                              <>
                                <Input
                                  // placeholder="The name of the community..."
                                  name={field.name}
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              </>
                            )}
                          />
                          {errors.username && <Alert>{errors.username}</Alert>}
                        </ContainerForm>
                      </ExRow>
                    </>
                  )}

                  <ExRow>
                    <ContainerForm>
                      <label>
                        <Trans>Location</Trans>
                      </label>
                      <Field
                        name="location"
                        render={({ field }) => (
                          <>
                            <Input
                              // placeholder="The name of the community..."
                              name={field.name}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </>
                        )}
                      />
                      {errors.location &&
                        touched.location && <Alert>{errors.location}</Alert>}
                    </ContainerForm>
                  </ExRow>
                  <ExRow big>
                    <ContainerForm>
                      <label>
                        <Trans>Description</Trans>
                      </label>
                      <Field
                        name="summary"
                        render={({ field }) => (
                          <>
                            <Textarea
                              // placeholder="What the community is about..."
                              name={field.name}
                              value={field.value}
                              onChange={field.onChange}
                            />
                            <CounterChars>
                              {240 - field.value.length}
                            </CounterChars>
                          </>
                        )}
                      />
                    </ContainerForm>
                  </ExRow>
                  <ExRow>
                    <ContainerForm>
                      <label>
                        <Trans>Avatar</Trans>
                      </label>
                      <AvatarImg src={iconUrl} />
                      <Field
                        name="icon"
                        render={({ field }) => (
                          <Button
                            type="button"
                            onClick={e => {
                              onUploadOpen(true);
                              setUploadType('icon');
                            }}
                          >
                            {iconUrl != '' ? (
                              <Trans>Change</Trans>
                            ) : (
                              <Trans>Upload</Trans>
                            )}
                          </Button>
                        )}
                      />
                      {errors.icon && <Alert>{errors.icon}</Alert>}
                    </ContainerForm>
                  </ExRow>
                  <ExRow>
                    <ContainerForm>
                      <label>
                        <Trans>Header image</Trans>
                      </label>
                      <HeaderImg src={imageUrl} />
                      <Field
                        name="image"
                        render={({ field }) => (
                          <Button
                            type="button"
                            onClick={e => {
                              onUploadOpen(true);
                              setUploadType('image');
                            }}
                          >
                            {imageUrl != '' ? (
                              <Trans>Change</Trans>
                            ) : (
                              <Trans>Upload</Trans>
                            )}
                          </Button>
                        )}
                      />
                      {errors.image &&
                        touched.image && <Alert>{errors.image}</Alert>}
                    </ContainerForm>
                  </ExRow>
                  {isUploadOpen === true ? (
                    <ImageDropzoneModal
                      contextId={me!.user.id}
                      toggleModal={onUploadOpen}
                      modalIsOpen={isUploadOpen}
                      uploadType={uploadType}
                      onIcon={onIcon}
                      onImage={onImage}
                    />
                  ) : null}
                  {/* <ExRow>
            <label>
              <Trans>Primary Language</Trans>
            </label>
            <LanguageSelect />
          </ExRow> */}
                  <Actions>
                    <Button
                      type="submit"
                      disabled={isSubmitting || Object.keys(errors).length > 0}
                      style={{ width: '100%' }}
                    >
                      <Trans>Save</Trans>
                    </Button>
                  </Actions>
                </Form>
              );
            }}
          />
        </>
      )}
    </ApolloConsumer>
  );
};

// const ModalWithFormik = withFormik<MyFormProps, FormValues>({
//   mapPropsToValues: props => ({
//     name: props.profile.user.name || '',
//     summary: props.profile.user.summary || '',
//     location: props.profile.user.location || '',
//     icon: props.profile.user.icon || '',
//     username: props.profile.user.preferredUsername || '',
//     image: props.profile.user.image || ''
//   }),
//   validationSchema: Yup.object().shape({
//     name: Yup.string().required(),
//     summary: Yup.string(),
//     icon: Yup.string().url(),
//     image: Yup.string().url(),
//     location: Yup.string()
//   }),
//   handleSubmit: (values, { props, setSubmitting }) => {
//     const variables = {
//       profile: {
//         name: values.name,
//         image: values.image,
//         summary: values.summary,
//         location: values.location,
//         icon: values.icon
//       }
//     };
//     return props
//       .updateProfile({
//         variables: variables
//       })
//       .then(res => {
//         setSubmitting(false);
//         props.history.push('/profile');
//         // alert("New settings are saved"); //TODO: nicer display of errors
//       })
//       .catch(err => alert(err));
//   }
// })(Component);

export default compose(withUpdateCommunity)(Component);
