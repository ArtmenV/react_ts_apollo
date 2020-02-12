import { PureQueryOptions } from 'apollo-client';
import { useFormik } from 'formik';
import { Community } from 'graphql/types.generated';
import {
  ActivityPreviewCtx,
  ActivityPreviewHOC
} from 'HOC/modules/ActivityPreview/activityPreviewHOC';
import { getActivityActions } from 'HOC/modules/ActivityPreview/lib/getActivityActions';
import { getActivityActor } from 'HOC/modules/ActivityPreview/lib/getActivityActor';
import { CollectionPreviewHOC } from 'HOC/modules/CollectionPreview/CollectionPreviewHOC';
import {
  CreateCollectionPanelHOC,
  CreateCollectionPanelCtx
} from 'HOC/modules/CreateCollectionPanel/createCollectionPanelHOC';
import { HeroCommunityHOC } from 'HOC/modules/HeroCommunity/heroCommuityHOC';
import React, { SFC, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ActivityPreview,
  Props as ActivityPreviewProps,
  Status as ActivityPreviewStatus
} from 'ui/modules/ActivityPreview';
import * as UIP from 'ui/modules/ActivityPreview/preview';
import CommunityPage, { Props as CommunityProps } from 'ui/pages/community';
import * as CPGQL from './CommunityPage.generated';

export interface Props {
  id: Community['id'];
}
export const CommunityPageHOC: SFC<Props> = ({ id }) => {
  const history = useHistory();
  const communityQ = CPGQL.useCommunityPageQuery({ variables: { id } });
  useEffect(() => {
    communityQ.refetch();
  }, []);
  const [
    createThreadMut,
    createThreadMutStatus
  ] = CPGQL.useCommunityPageCreateThreadMutation();
  const newThreadFormik = useFormik<{ text: string }>({
    initialValues: { text: '' },
    onSubmit: ({ text }) => {
      if (
        !text ||
        createThreadMutStatus.loading ||
        !communityQ.data ||
        !communityQ.data.community
      ) {
        return;
      }
      return createThreadMut({
        variables: {
          contextId: communityQ.data.community.id,
          comment: { content: text }
        }
      }).then(res => {
        const newThreadId =
          res.data &&
          res.data.createThread &&
          res.data.createThread.thread &&
          res.data.createThread.thread.id;
        if (newThreadId) {
          history.push(`/thread/${newThreadId}`);
        }
      });
    }
  });
  const data = useMemo<CommunityProps | null>(
    () => {
      if (
        communityQ.error ||
        communityQ.loading ||
        !communityQ.data ||
        !communityQ.data.community ||
        !communityQ.data.community.outbox ||
        !communityQ.data.community.outbox.edges ||
        !communityQ.data.community.collections ||
        !communityQ.data.community.collections.edges ||
        !communityQ.data.community.threads ||
        !communityQ.data.community.threads.edges
      ) {
        return null;
      }
      const outboxEdges = communityQ.data.community.outbox.edges;
      const ActivityBoxes = outboxEdges
        .map(edge => {
          if (!edge) {
            return null;
          }
          const id = edge.node.id;
          return <ActivityPreviewHOC activityId={id} key={id} />;
        })
        .filter((_): _ is JSX.Element => !!_);

      const collectionEdges = communityQ.data.community.collections.edges;
      const CollectionBoxes = collectionEdges
        .map(edge => {
          if (!edge) {
            return null;
          }
          const id = edge.node.id;
          return <CollectionPreviewHOC id={id} key={id} />;
        })
        .filter((_): _ is JSX.Element => !!_);
      const refetchQueries = [
        {
          query: CPGQL.CommunityPageDocument,
          variables: { id }
        }
      ];

      const threadEdges = communityQ.data.community.threads.edges;
      const ThreadBoxes = threadEdges
        .map(edge => {
          if (!edge || !edge.node) {
            return null;
          }
          const thread = edge.node;

          return (
            <ThreadActivity
              thread={thread}
              key={thread.id}
              refetchQueries={refetchQueries}
            />
          );
        })
        .filter((_): _ is JSX.Element => !!_);

      const HeroCommunityBox = <HeroCommunityHOC communityId={id} />;
      const CreateCollectionPanel: CommunityProps['CreateCollectionPanel'] = ({
        done
      }) => (
        <CreateCollectionPanelCtx.Provider value={{ refetchQueries }}>
          <CreateCollectionPanelHOC done={done} communityId={id} />
        </CreateCollectionPanelCtx.Provider>
      );
      const myFollow = communityQ.data.community.myFollow;
      const props: CommunityProps = {
        CreateCollectionPanel,
        ActivityBoxes,
        CollectionBoxes,
        HeroCommunityBox,
        ThreadBoxes,
        basePath: `/communities/${id}`,
        newThreadFormik: myFollow ? newThreadFormik : null
      };
      return props;
    },
    [communityQ]
  );
  if (!data) {
    return null;
  }
  const communityPageProps = data;
  const apctx: ActivityPreviewCtx = {
    refetchQueries: [
      {
        query: CPGQL.CommunityPageDocument,
        variables: { id }
      }
    ]
  };
  return (
    <ActivityPreviewCtx.Provider value={apctx}>
      <CommunityPage {...communityPageProps} />
    </ActivityPreviewCtx.Provider>
  );
};

export const ThreadActivity: SFC<{
  thread: CPGQL.ComunityPageThreadFragment;
  refetchQueries?: Array<string | PureQueryOptions>;
}> = ({ thread, refetchQueries }) => {
  if (
    !thread.comments ||
    !thread.comments.edges.length ||
    !thread.comments.edges[0] ||
    !thread.comments.edges[0].node
  ) {
    return null;
  }

  const comment = thread.comments.edges[0].node;
  if (!comment.creator) {
    return null;
  }
  const [likeMut, likeMutStatus] = CPGQL.useCommunityPageThreadLikeMutation();
  const [
    unlikeMut,
    unlikeMutStatus
  ] = CPGQL.useCommunityPageThreadUnlikeMutation();
  const [
    createReplyMut,
    createReplyMutStatus
  ] = CPGQL.useCommunityPageThreadCreateReplyMutation();

  const replyThreadFormik = useFormik<{ replyMessage: string }>({
    initialValues: { replyMessage: '' },
    onSubmit: ({ replyMessage }) => {
      if (createReplyMutStatus.loading) {
        return;
      }
      return createReplyMut({
        variables: {
          threadId: thread.id,
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
      link: `/thread/${thread.id}`,
      verb: UIP.ContextVerb.Created
    },
    createdAt: comment.createdAt,
    status: ActivityPreviewStatus.Loaded,
    actions: getActivityActions(comment, replyThreadFormik, toggleLikeFormik),
    inReplyToCtx: null
  };

  return <ActivityPreview {...props} />;
};
