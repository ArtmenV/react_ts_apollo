import React, { createContext, useContext } from 'react';
import { useFormik } from 'formik';
import { useCreateCollectionMutationMutation } from 'graphql/createCollection.generated';
import { useUploadIconMutation } from 'graphql/uploadIcon.generated';
import { useMemo, SFC } from 'react';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import {
  BasicCreateCollectionFormValues,
  CreateCollectionPanel
} from 'ui/modules/CreateCollectionPanel';
import { PureQueryOptions } from 'apollo-client';

export const validationSchema: Yup.ObjectSchema<
  BasicCreateCollectionFormValues
> = Yup.object<BasicCreateCollectionFormValues>({
  name: Yup.string()
    .min(2)
    .max(60)
    .required(),
  summary: Yup.string().max(500),
  icon: Yup.string().url()
});
export interface CreateCollectionPanelCtx {
  refetchQueries: Array<string | PureQueryOptions>;
}
export const CreateCollectionPanelCtx = createContext<CreateCollectionPanelCtx>(
  { refetchQueries: [] }
);

export const createCollectionFormInitialValues: BasicCreateCollectionFormValues = {
  name: '',
  summary: '',
  icon: '',
  files: []
};
export interface Props {
  communityId: string;
  done(): any;
}
export const CreateCollectionPanelHOC: SFC<Props> = ({
  communityId,
  done
}: Props) => {
  const ctx = useContext(CreateCollectionPanelCtx);

  const [create /* , result */] = useCreateCollectionMutationMutation();
  const [mutateIcon] = useUploadIconMutation();
  const history = useHistory();
  const initialValues = useMemo<BasicCreateCollectionFormValues>(
    () => createCollectionFormInitialValues,
    []
  );
  const formik = useFormik<BasicCreateCollectionFormValues>({
    enableReinitialize: true,
    onSubmit: vals => {
      const fileToUpload = vals!.files!.map(file => {
        return file;
      })[0];

      return create({
        variables: {
          communityId: communityId,
          collection: {
            preferredUsername: vals.name.split(' ').join('_'),
            name: vals.name,
            summary: vals.summary
          }
        },
        refetchQueries: fileToUpload ? [] : ctx.refetchQueries
      })
        .then(res => {
          const createdCollectionId = res.data!.createCollection!.id;
          if (fileToUpload) {
            mutateIcon({
              variables: {
                contextId: createdCollectionId,
                upload: fileToUpload
              },
              refetchQueries: ctx.refetchQueries
            })
              .then(() => {
                history.push(`/collections/${createdCollectionId}`);
              })
              .catch(err => console.log(err));
          }
        })
        .then(done)
        .catch(err => console.log(err));
    },
    validationSchema,
    initialValues
  });
  return <CreateCollectionPanel cancel={done} formik={formik} />;
};
