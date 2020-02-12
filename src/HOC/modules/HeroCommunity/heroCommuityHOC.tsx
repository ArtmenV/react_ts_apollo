import React from 'react';
import { SessionContext } from 'context/global/sessionCtx';
import { useDeleteMutationMutation } from 'graphql/delete.generated';
import { useFollowMutationMutation } from 'graphql/follow.generated';
import { SFC, useContext, useMemo } from 'react';
import HeroCommunity, {
  Props as HeroProps,
  Status
} from 'ui/modules/HeroCommunity';
import { useGetHeroCommunityQuery } from './getHeroCommunity.generated';
import { Community } from 'graphql/types.generated';
import { EditCommunityPanelHOC } from '../EditCommunityPanel/editCommunityPanelHOC';

export interface Props {
  communityId: Community['id'];
}
export const HeroCommunityHOC: SFC<Props> = ({ communityId }) => {
  const session = useContext(SessionContext);
  const [joinMutation, joinMutationStatus] = useFollowMutationMutation();
  const [unjoinMutation, unjoinMutationStatus] = useDeleteMutationMutation();
  const communityQuery = useGetHeroCommunityQuery({
    variables: { communityId }
  });
  const heroProps = useMemo<HeroProps>(
    () => {
      if (
        communityQuery.loading ||
        communityQuery.error ||
        !communityQuery.data ||
        !communityQuery.data.community
      ) {
        return {
          community: {
            status: Status.Loading
          }
        };
      }
      const community = communityQuery.data.community;
      const props: HeroProps = {
        community: {
          status: Status.Loaded,
          //FIXME https://gitlab.com/moodlenet/meta/issues/185
          canModify:
            !!session.me && session.me.user.id === community.creator!.id,
          following: !!community.myFollow,
          icon: community.icon || '',
          name: community.name,
          fullName: community.displayUsername,
          //FIXME https://gitlab.com/moodlenet/meta/issues/185
          totalMembers: community.followers!.totalCount,
          summary: community.summary || '',
          toggleJoin: {
            toggle: () =>
              community.myFollow
                ? unjoinMutation({
                    variables: { contextId: community.myFollow.id }
                  }).then(() => communityQuery.refetch())
                : joinMutation({ variables: { contextId: community.id } }).then(
                    () => communityQuery.refetch()
                  ),

            isSubmitting: community.myFollow
              ? unjoinMutationStatus.loading
              : joinMutationStatus.loading
          },
          EditCommunityPanel: ({ done }) => (
            <EditCommunityPanelHOC done={done} communityId={community.id} />
          )
        }
      };
      return props;
    },
    [
      communityQuery,
      session.me,
      joinMutation,
      joinMutationStatus,
      unjoinMutation,
      unjoinMutationStatus
    ]
  );
  console.log(heroProps);
  return <HeroCommunity {...heroProps} />;
};
