import ShareLinkModal from 'components/elements/CollectionModal';
import { useFormik } from 'formik';
import { Collection } from 'graphql/types.generated';
import {
  ActivityPreviewCtx,
  ActivityPreviewHOC
} from 'HOC/modules/ActivityPreview/activityPreviewHOC';
import { getActivityActions } from 'HOC/modules/ActivityPreview/lib/getActivityActions';
import { getActivityActor } from 'HOC/modules/ActivityPreview/lib/getActivityActor';
import UploadResourcePanelHOC from 'HOC/modules/AddResource/UploadResourceHOC';
import { EditCollectionPanelHOC } from 'HOC/modules/EditCollectionPanel/editCollectionPanelHOC';
import { HeroCollectionHOC } from 'HOC/modules/HeroCollection/HeroCollectionHOC';
import React, { SFC, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ActivityPreview,
  Props as ActivityPreviewProps,
  Status as ActivityPreviewStatus
} from 'ui/modules/ActivityPreview';
import * as UIP from 'ui/modules/ActivityPreview/preview';
import CollectionPage, {
  Props as CollectionPageProps
} from 'ui/pages/collection';
import {
  CollectionPageDocument,
  CollectionPageResourceFragment,
  useCollectionPageQuery,
  useCollectionPageResourceCreateThreadMutation,
  useCollectionPageResourceLikeMutation,
  useCollectionPageResourceUnlikeMutation
} from './CollectionPage.generated';

export interface Props {
  collectionId: Collection['id'];
}
export const CollectionPageHOC: SFC<Props> = ({ collectionId }) => {
  const collectionQ = useCollectionPageQuery({ variables: { collectionId } });
  useEffect(() => {
    collectionQ.refetch();
  }, []);

  const data = useMemo<CollectionPageProps | null>(
    () => {
      if (
        collectionQ.error ||
        collectionQ.loading ||
        !collectionQ.data ||
        !collectionQ.data.collection ||
        !collectionQ.data.collection.outbox ||
        !collectionQ.data.collection.outbox.edges ||
        !collectionQ.data.collection.resources ||
        !collectionQ.data.collection.resources.edges
      ) {
        return null;
      }

      const activityEdges = collectionQ.data.collection.outbox.edges;
      const ActivityBoxes = activityEdges
        .map(edge => {
          if (!edge) {
            return null;
          }
          const id = edge.node.id;
          return <ActivityPreviewHOC activityId={id} key={id} />;
        })
        .filter((_): _ is JSX.Element => !!_);
      const HeroCollectionBox = (
        <HeroCollectionHOC collectionId={collectionId} />
      );
      const ResourceBoxes = collectionQ.data.collection.resources.edges
        .map(edge => {
          if (!edge || !edge.node) {
            return null;
          }
          const resource = edge.node;
          return (
            <ResourceActivity
              resource={resource}
              key={resource.id}
              collectionId={collectionId}
            />
          );
        })
        .filter((_): _ is JSX.Element => !!_);
      const EditCollectionPanel: CollectionPageProps['EditCollectionPanel'] = ({
        done
      }) => <EditCollectionPanelHOC done={done} collectionId={collectionId} />;
      const UploadResourcePanel: CollectionPageProps['UploadResourcePanel'] = ({
        done
      }) => <UploadResourcePanelHOC done={done} collectionId={collectionId} />;
      const ShareLinkModalPanel: CollectionPageProps['ShareLinkModalPanel'] = ({
        done
      }) => {
        return (
          <ShareLinkModal
            toggleModal={done}
            modalIsOpen={true}
            collectionId={collectionId}
            collectionExternalId={collectionId}
          />
        );
      };
      const props: CollectionPageProps = {
        ActivityBoxes,
        ShareLinkModalPanel,
        HeroCollectionBox,
        ResourceBoxes,
        EditCollectionPanel,
        UploadResourcePanel,
        basePath: `/collections/${collectionId}`
      };
      return props;
    },
    [collectionQ]
  );
  if (!data) {
    return null;
  }
  const collectionPageProps = data;

  const apctx: ActivityPreviewCtx = {
    refetchQueries: [
      {
        query: CollectionPageDocument,
        variables: { collectionId }
      }
    ]
  };

  return (
    <ActivityPreviewCtx.Provider value={apctx}>
      <CollectionPage {...collectionPageProps} />
    </ActivityPreviewCtx.Provider>
  );
};

const ResourceActivity: SFC<{
  resource: CollectionPageResourceFragment;
  collectionId: Collection['id'];
}> = ({ resource, collectionId }) => {
  if (!resource.creator) {
    return null;
  }
  const history = useHistory();
  const [likeMut, likeMutStatus] = useCollectionPageResourceLikeMutation();
  const [
    unlikeMut,
    unlikeMutStatus
  ] = useCollectionPageResourceUnlikeMutation();
  const [
    createThreadMut,
    createThreadMutStatus
  ] = useCollectionPageResourceCreateThreadMutation();
  const refetchQueries = [
    {
      query: CollectionPageDocument,
      variables: { collectionId }
    }
  ];
  const commentResourceFormik = useFormik<{ replyMessage: string }>({
    initialValues: { replyMessage: '' },
    onSubmit: ({ replyMessage }) => {
      if (createThreadMutStatus.loading) {
        return;
      }
      return createThreadMut({
        variables: {
          comment: { content: replyMessage },
          contextId: resource.id
        } /* ,
        refetchQueries */
      }).then(resp => {
        if (
          !(
            resp.data &&
            resp.data.createThread &&
            resp.data.createThread.thread
          )
        ) {
          return;
        }
        const threadId = resp.data.createThread.thread.id;
        history.push(`/thread/${threadId}`);
      });
    }
  });
  const toggleLikeFormik = useFormik<{}>({
    initialValues: {},
    onSubmit: () => {
      if (likeMutStatus.loading || unlikeMutStatus.loading) {
        return;
      }
      const { myLike } = resource;
      if (myLike) {
        return unlikeMut({
          variables: { contextId: myLike.id },
          refetchQueries
        });
      } else {
        return likeMut({
          variables: {
            contextId: resource.id
          },
          refetchQueries
        });
      }
    }
  });

  const props: ActivityPreviewProps = {
    actor: getActivityActor(resource.creator),
    context: {
      type: UIP.ContextType.Resource,
      link: resource.collection ? `/collections/${resource.collection.id}` : '',
      verb: UIP.ContextVerb.Created,
      title: resource.name,
      icon: resource.icon || '',
      summary: resource.summary || '',
      resourceUrl: resource.url || resource.canonicalUrl || ''
    },
    createdAt: resource.createdAt,
    status: ActivityPreviewStatus.Loaded,
    actions: getActivityActions(
      resource,
      commentResourceFormik,
      toggleLikeFormik
    ),
    inReplyToCtx: null
  };

  return <ActivityPreview {...props} />;
};
