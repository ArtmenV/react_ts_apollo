import React from 'react';
import { SessionContext } from 'context/global/sessionCtx';
import { useDeleteMutationMutation } from 'graphql/delete.generated';
import { useFollowMutationMutation } from 'graphql/follow.generated';
import { SFC, useContext, useMemo } from 'react';
import HeroCollection, {
  Props as HeroProps,
  Status
} from 'ui/modules/HeroCollection';
import { Collection } from 'graphql/types.generated';
import { EditCollectionPanelHOC } from 'HOC/modules/EditCollectionPanel/editCollectionPanelHOC';
import { useHeroCollectionQuery } from './HeroCollection.generated';

export interface Props {
  collectionId: Collection['id'];
}
export const HeroCollectionHOC: SFC<Props> = ({ collectionId }) => {
  const session = useContext(SessionContext);
  const [joinMutation, joinMutationStatus] = useFollowMutationMutation();
  const [unjoinMutation, unjoinMutationStatus] = useDeleteMutationMutation();
  const collectionQuery = useHeroCollectionQuery({
    variables: { collectionId }
  });
  const heroProps = useMemo<HeroProps>(
    () => {
      if (
        collectionQuery.loading ||
        collectionQuery.error ||
        !collectionQuery.data ||
        !collectionQuery.data.collection
      ) {
        return {
          collection: {
            status: Status.Loading
          }
        };
      }
      const collection = collectionQuery.data.collection;
      const props: HeroProps = {
        collection: {
          status: Status.Loaded,
          //FIXME https://gitlab.com/moodlenet/meta/issues/185
          isMine: !!session.me && session.me.user.id === collection.creator!.id,
          following: !!collection.myFollow,
          icon: collection.icon || '',
          name: collection.name,
          fullName: collection.displayUsername,
          //FIXME https://gitlab.com/moodlenet/meta/issues/185
          summary: collection.summary || '',
          // FIXME Alec, not sure this is clean enuf pls doublecheck
          communityName: collection.community!.name,
          communityId: collection.community!.id,
          communityIcon: collection.community!.icon || '',
          toggleJoin: {
            toggle: () =>
              collection.myFollow
                ? unjoinMutation({
                    variables: { contextId: collection.myFollow.id }
                  }).then(() => collectionQuery.refetch())
                : joinMutation({
                    variables: { contextId: collection.id }
                  }).then(() => collectionQuery.refetch()),
            isSubmitting: collection.myFollow
              ? unjoinMutationStatus.loading
              : joinMutationStatus.loading
          },
          EditCollectionPanel: ({ done }) => (
            <EditCollectionPanelHOC done={done} collectionId={collection.id} />
          )
        }
      };
      return props;
    },
    [
      collectionQuery,
      session.me,
      joinMutation,
      joinMutationStatus,
      unjoinMutation,
      unjoinMutationStatus
    ]
  );
  return <HeroCollection {...heroProps} />;
};
