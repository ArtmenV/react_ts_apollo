import * as APGQL from '../getActivityPreview.generated';
import { MaybeActivityPreviewData } from '../types';
import { useContext } from 'react';
import { ActivityPreviewCtx } from '../activityPreviewHOC';
import { useFormik } from 'formik';

export const useActivityReplyFormik = (activity: MaybeActivityPreviewData) => {
  const ctx = useContext(ActivityPreviewCtx);
  const [
    createThreadMut,
    createThreadMutStatus
  ] = APGQL.useActivityPreviewCreateThreadMutation();
  const [
    createReplyMut,
    createReplyMutStatus
  ] = APGQL.useActivityPreviewCreateReplyMutation();

  const replyFormik = useFormik<{ replyMessage: string }>({
    initialValues: { replyMessage: '' },
    onSubmit: ({ replyMessage }) => {
      //FIXME https://gitlab.com/moodlenet/meta/issues/185
      if (!activity || !activity.context) {
        return;
      }

      if (
        !activity ||
        'Like' === activity.context.__typename ||
        'Flag' === activity.context.__typename ||
        'Follow' === activity.context.__typename ||
        createReplyMutStatus.loading ||
        createThreadMutStatus.loading
      ) {
        return;
      } else if (activity.context.__typename === 'Comment') {
        const { thread, id } = activity.context;

        //FIXME https://gitlab.com/moodlenet/meta/issues/185
        if (!thread) {
          return;
        }

        return createReplyMut({
          variables: {
            threadId: thread.id,
            inReplyToId: id,
            comment: { content: replyMessage }
          },
          refetchQueries: ctx.refetchQueries
        });
      } else {
        return createThreadMut({
          variables: {
            contextId:
              activity.context.__typename == 'User'
                ? activity.context.userId
                : activity.context.id,
            comment: { content: replyMessage }
          },
          refetchQueries: ctx.refetchQueries
        });
      }
    }
  });
  return replyFormik;
};
