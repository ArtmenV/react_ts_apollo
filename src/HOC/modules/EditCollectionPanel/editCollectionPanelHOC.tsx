import React, { useMemo, SFC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  useCollectionEditPanelQuery,
  useUpdateCollectionMutation
} from './CollectionEdit.generated';
import { useUploadIconMutation } from 'graphql/uploadIcon.generated';
import {
  EditCollectionFormValues,
  EditCollectionPanel
} from 'ui/modules/EditCollectionPanel';
import { Collection } from 'graphql/types.generated';

export const validationSchema: Yup.ObjectSchema<
  EditCollectionFormValues
> = Yup.object<EditCollectionFormValues>({
  name: Yup.string()
    .min(2)
    .max(60)
    .required(),
  summary: Yup.string().max(500),
  icon: Yup.string() //.url()
});

export const editCollectionFormInitialValues: EditCollectionFormValues = {
  name: '',
  summary: '',
  icon: '',
  files: []
};
export interface Props {
  collectionId: Collection['id'];
  done(): any;
}
export const EditCollectionPanelHOC: SFC<Props> = ({
  done,
  collectionId
}: Props) => {
  // <<<<<<< HEAD
  //   const collectionQ = useCollectionEditPanelQuery({
  //     variables: { collectionId }
  //   });
  //   const [update /* , result */] = useUpdateCollectionMutation();
  //   const initialValues = useMemo<EditCollectionFormValues>(
  //     () =>
  //       collectionQ.data && collectionQ.data.collection
  //         ? {
  //             icon: collectionQ.data.collection.icon || '',
  //             name: collectionQ.data.collection.name,
  //             summary: collectionQ.data.collection.summary || ''
  //           }
  //         : editCollectionFormInitialValues,
  //     [collectionQ]
  //   );
  //   const formik = useFormik<EditCollectionFormValues>({
  //     enableReinitialize: true,
  //     onSubmit: vals =>
  //       update({
  //         variables: {
  //           collection: { ...vals, preferredUsername: vals.name },
  //           collectionId
  //         }
  //       }).then(done),
  // =======
  const collection = useCollectionEditPanelQuery({
    variables: { collectionId }
  });
  const [update /* , result */] = useUpdateCollectionMutation();
  const [mutateIcon] = useUploadIconMutation();
  const initialValues = useMemo<EditCollectionFormValues>(
    () =>
      collection.data && collection.data.collection
        ? {
            icon: collection.data.collection.icon || '',
            name: collection.data.collection.name,
            summary: collection.data.collection.summary || '',
            files: []
          }
        : editCollectionFormInitialValues,
    [collection]
  );

  const uploadIcon = file =>
    mutateIcon({
      variables: { contextId: collectionId, upload: file }
    })
      .then(res => {
        return (
          (res && res.data && res.data.uploadIcon && res.data.uploadIcon.url) ||
          ''
        );
      })
      .catch(err => console.log(err));

  const formik = useFormik<EditCollectionFormValues>({
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
                collection: {
                  icon: uploadedIcon || '',
                  name: vals.name,
                  summary: vals.summary,
                  preferredUsername: vals.name
                },
                collectionId
              }
            });
          })
          .then(done)
          .catch(err => console.log(err));
      } else {
        update({
          variables: {
            collection: {
              icon: vals.icon,
              name: vals.name,
              summary: vals.summary,
              preferredUsername: vals.name
            },
            collectionId
          }
        })
          .then(done)
          .catch(err => console.log(err));
      }
    },
    validationSchema,
    initialValues
  });
  return <EditCollectionPanel cancel={done} formik={formik} />;
};
