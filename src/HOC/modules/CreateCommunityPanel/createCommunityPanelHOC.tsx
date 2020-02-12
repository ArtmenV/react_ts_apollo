import React, { createContext, useContext } from 'react';
import { useFormik } from 'formik';
import { useCreateCommunityMutationMutation } from 'graphql/createCommunity.generated';
import { useUploadImageMutation } from 'graphql/uploadImage.generated';
import { useMemo, SFC } from 'react';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import {
  BasicCreateCommunityFormValues,
  CreateCommunityPanel
} from 'ui/modules/CreateCommunityPanel';
import { PureQueryOptions } from 'apollo-client';

export const validationSchema: Yup.ObjectSchema<
  BasicCreateCommunityFormValues
> = Yup.object<BasicCreateCommunityFormValues>({
  name: Yup.string()
    .min(2)
    .max(60)
    .required(),
  summary: Yup.string().max(500),
  icon: Yup.string().url()
});
export interface CreateCommunityPanelCtx {
  refetchQueries: Array<string | PureQueryOptions>;
}
export const CreateCommunityPanelCtx = createContext<CreateCommunityPanelCtx>({
  refetchQueries: []
});
export const createCommunityFormInitialValues: BasicCreateCommunityFormValues = {
  name: '',
  summary: '',
  icon: '',
  files: []
};
export interface Props {
  done(): any;
}
export const CreateCommunityPanelHOC: SFC<Props> = ({ done }: Props) => {
  const ctx = useContext(CreateCommunityPanelCtx);

  // const community = useGetCommunityForEditQuery({ variables: { communityId } });
  const [create /* , result */] = useCreateCommunityMutationMutation();
  const [mutateImage] = useUploadImageMutation();
  const history = useHistory();
  const initialValues = useMemo<BasicCreateCommunityFormValues>(
    () => createCommunityFormInitialValues,
    []
  );
  const formik = useFormik<BasicCreateCommunityFormValues>({
    enableReinitialize: true,
    onSubmit: vals => {
      const fileToUpload = vals!.files!.map(file => {
        return file;
      })[0];
      return create({
        variables: {
          community: {
            preferredUsername: vals.name.split(' ').join('_'),
            name: vals.name,
            summary: vals.summary
          }
        },
        refetchQueries: fileToUpload ? [] : ctx.refetchQueries
      })
        .then(res => {
          const createdCommunityId = res.data!.createCommunity!.id;

          if (fileToUpload) {
            mutateImage({
              variables: {
                contextId: createdCommunityId,
                upload: fileToUpload
              },
              refetchQueries: ctx.refetchQueries
            })
              .then(() => createdCommunityId)
              .catch(err => console.log(err));
          }
          return createdCommunityId;
        })
        .then(createdCommunityId => {
          history.push(`/communities/${createdCommunityId}`);
        })
        .catch(err => console.log(err));
    },
    validationSchema,
    initialValues
  });
  return <CreateCommunityPanel cancel={done} formik={formik} />;
};
