import { PureQueryOptions } from 'apollo-client';
import { useFormik } from 'formik';
import { Thread as GQLThread } from 'graphql/types.generated';
import { ActivityPreviewCommentCtxExtendedFragment } from 'HOC/modules/ActivityPreview/getActivityPreview.generated';
import { getActivityActions } from 'HOC/modules/ActivityPreview/lib/getActivityActions';
import { getActivityActor } from 'HOC/modules/ActivityPreview/lib/getActivityActor';
import React, { SFC, useEffect, useMemo } from 'react';
import {
  ActivityPreview,
  BigActivityPreview,
  Props as ActivityPreviewProps,
  Status as ActivityPreviewStatus
} from 'ui/modules/ActivityPreview';
import * as UIP from 'ui/modules/ActivityPreview/preview';
import {
  CreateReplyMutationMutationOperation,
  useCreateReplyMutationMutation
} from '../../graphql/createReply.generated';
import {
  DeleteMutationMutationOperation,
  useDeleteMutationMutation
} from '../../graphql/delete.generated';
import {
  GetThreadDocument,
  useGetThreadQuery
} from '../../graphql/getThread.generated';
import {
  LikeMutationMutationOperation,
  useLikeMutationMutation
} from '../../graphql/like.generated';
import { useDynamicLinkOpResult } from '../../util/apollo/dynamicLink';
import Stateless from './stateless';
export interface Props {
  threadId: string;
}
export const Thread: React.FC<Props> = ({ threadId }) => {
  const threadQuery = useGetThreadQuery({ variables: { threadId } });
  useEffect(() => {
    threadQuery.refetch();
  }, []);
  useDynamicLinkOpResult<CreateReplyMutationMutationOperation>(
    'createReplyMutation',
    () => {
      threadQuery.refetch();
    },
    [threadQuery.refetch]
  );
  useDynamicLinkOpResult<LikeMutationMutationOperation>(
    'likeMutation',
    () => {
      threadQuery.refetch();
    },
    [threadQuery.refetch]
  );
  useDynamicLinkOpResult<DeleteMutationMutationOperation>(
    'deleteMutation',
    () => {
      threadQuery.refetch();
    },
    [threadQuery.refetch]
  );
  const ThreadBoxes = useMemo<JSX.Element[]>(
    () => {
      if (
        !(
          threadQuery.data &&
          threadQuery.data.thread &&
          threadQuery.data.thread.comments
        )
      ) {
        return [];
      }
      const thread = threadQuery.data.thread;
      const comments = threadQuery.data.thread.comments;
      return comments.edges
        .map(
          (edge, index) =>
            edge &&
            edge.node && (
              <CommentActivity
                root={index === 0}
                threadId={thread.id}
                comment={edge.node}
                key={edge.node.id}
              />
            )
        )
        .filter((_): _ is JSX.Element => !!_);
    },
    [threadQuery]
  );

  return <Stateless threadQuery={threadQuery} ThreadBoxes={ThreadBoxes} />;
};

export default Thread;

export const CommentActivity: SFC<{
  root: boolean;
  threadId: GQLThread['id'];
  comment: ActivityPreviewCommentCtxExtendedFragment;
}> = ({ threadId, comment, root }) => {
  if (!comment.creator) {
    return null;
  }
  const [likeMut, likeMutStatus] = useLikeMutationMutation();
  const [unlikeMut, unlikeMutStatus] = useDeleteMutationMutation();
  const [
    createReplyMut,
    createReplyMutStatus
  ] = useCreateReplyMutationMutation();
  const refetchQueries: PureQueryOptions[] = [
    {
      query: GetThreadDocument,
      variables: { threadId }
    }
  ];
  const replyThreadFormik = useFormik<{ replyMessage: string }>({
    initialValues: { replyMessage: '' },
    onSubmit: ({ replyMessage }) => {
      if (createReplyMutStatus.loading) {
        return;
      }
      return createReplyMut({
        variables: {
          threadId: threadId,
          inReplyToId: comment.id,
          comment: { content: replyMessage }
        },
        refetchQueries
      });
    }
  });
  const toggleLikeFormik = useFormik<{}>({
    initialValues: {},
    onSubmit: () => {
      if (likeMutStatus.loading || unlikeMutStatus.loading) {
        return;
      }
      const { myLike } = comment;
      if (myLike) {
        return unlikeMut({
          variables: { contextId: myLike.id },
          refetchQueries
        });
      } else {
        return likeMut({
          variables: {
            contextId: comment.id
          },
          refetchQueries
        });
      }
    }
  });

  const props: ActivityPreviewProps = {
    actor: getActivityActor(comment.creator),
    context: {
      type: UIP.ContextType.Comment,
      content: comment.content,
      link: `/thread/${threadId}`,
      verb: UIP.ContextVerb.Created
    },
    createdAt: comment.createdAt,
    status: ActivityPreviewStatus.Loaded,
    actions: getActivityActions(comment, replyThreadFormik, toggleLikeFormik),
    inReplyToCtx: null
  };
  return !root ? (
    <ActivityPreview {...props} />
  ) : (
    <BigActivityPreview {...props} />
  );
};
