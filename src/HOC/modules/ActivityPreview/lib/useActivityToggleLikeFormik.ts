import * as APGQL from '../getActivityPreview.generated';
import { MaybeActivityPreviewData } from '../types';
import { useContext } from 'react';
import { ActivityPreviewCtx } from '../activityPreviewHOC';
import { useFormik } from 'formik';

export const useActivityToggleLikeFormik = (
  activity: MaybeActivityPreviewData
) => {
  const ctx = useContext(ActivityPreviewCtx);
  const [likeMut, likeMutStatus] = APGQL.useActivityPreviewLikeMutation();
  const [unlikeMut, unlikeMutStatus] = APGQL.useActivityPreviewUnlikeMutation();
  const toggleLikeFormik = useFormik<{}>({
    initialValues: {},
    onSubmit: () => {
      //FIXME https://gitlab.com/moodlenet/meta/issues/185
      if (!activity || !activity.context) {
        return;
      }

      if (
        !activity ||
        'Community' === activity.context.__typename ||
        'Like' === activity.context.__typename ||
        'Flag' === activity.context.__typename ||
        'Follow' === activity.context.__typename ||
        likeMutStatus.loading ||
        unlikeMutStatus.loading
      ) {
        return;
      } else {
        const { myLike } = activity.context;
        if (myLike) {
          return unlikeMut({
            variables: { contextId: myLike.id },
            refetchQueries: ctx.refetchQueries
          });
        } else {
          return likeMut({
            variables: {
              contextId:
                activity.context.__typename === 'User'
                  ? activity.context.userId
                  : activity.context.id
            },
            refetchQueries: ctx.refetchQueries
          });
        }
      }
    }
  });

  return toggleLikeFormik;
};
