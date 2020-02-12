import React from 'react';
import { useFormik } from 'formik';
import { useUpdateCommunityMutationMutation } from 'graphql/updateCommunity.generated';
import { useUploadIconMutation } from 'graphql/uploadIcon.generated';
import { useMemo, SFC } from 'react';
import * as Yup from 'yup';
import { useGetCommunityForEditQuery } from './getCommunityForEdit.generated';
import {
  EditCommunityFormValues,
  EditCommunityPanel
} from 'ui/modules/EditCommunityPanel';
import { Community } from 'graphql/types.generated';

export const validationSchema: Yup.ObjectSchema<
  EditCommunityFormValues
> = Yup.object<EditCommunityFormValues>({
  name: Yup.string()
    .min(2)
    .max(60)
    .required(),
  summary: Yup.string().max(500),
  icon: Yup.string() //.url()
});

export const editCommunityFormInitialValues: EditCommunityFormValues = {
  name: '',
  summary: '',
  icon: '',
  files: []
};
export interface Props {
  communityId: Community['id'];
  done(): any;
}
export const EditCommunityPanelHOC: SFC<Props> = ({
  done,
  communityId
}: Props) => {
  const community = useGetCommunityForEditQuery({ variables: { communityId } });
  const [update /* , result */] = useUpdateCommunityMutationMutation();
  const [mutateIcon] = useUploadIconMutation();
  const initialValues = useMemo<EditCommunityFormValues>(
    () =>
      community.data && community.data.community
        ? {
            icon: community.data.community.icon || '',
            name: community.data.community.name,
            summary: community.data.community.summary || '',
            files: []
          }
        : editCommunityFormInitialValues,
    [community]
  );

  const uploadIcon = file =>
    mutateIcon({
      variables: { contextId: communityId, upload: file }
    })
      .then(res => {
        return (
          (res && res.data && res.data.uploadIcon && res.data.uploadIcon.url) ||
          ''
        );
      })
      .catch(err => console.log(err));

  const formik = useFormik<EditCommunityFormValues>({
    enableReinitialize: true,
    onSubmit: vals => {
      const file = vals.files!.map(file => {
        return file;
      })[0];
      if (file) {
        uploadIcon(file)
          .then(uploadedIcon => {
            update({
              variables: {
                community: {
                  icon: uploadedIcon || '',
                  name: vals.name,
                  summary: vals.summary
                },
                communityId
              }
            });
          })
          .then(done)
          .catch(err => console.log(err));
      } else {
        update({
          variables: {
            community: {
              icon: vals.icon,
              name: vals.name,
              summary: vals.summary
            },
            communityId
          }
        })
          .then(done)
          .catch(err => console.log(err));
      }
    },
    validationSchema,
    initialValues
  });
  return <EditCommunityPanel cancel={done} formik={formik} />;
};
