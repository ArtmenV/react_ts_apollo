import {
  SearchHostIndexAndMyFollowingsQuery,
  SearchFollowedCollectionFragment,
  SearchFollowedCommunityFragment,
  useSearchFollowLocalMutation,
  useSearchFollowRemoteMutation,
  useSearchUnfollowMutation,
  SearchHostIndexAndMyFollowingsDocument
} from './SearchData.generated';
import { Hit } from './Hits';
import { useMemo, useCallback } from 'react';
import { GetSidebarQueryDocument } from 'graphql/getSidebar.generated';

type Q = SearchHostIndexAndMyFollowingsQuery;
export const useHit = (info: Q, hit: Hit) => {
  const [followLocal, followLocalResult] = useSearchFollowLocalMutation();
  const [followRemote, followRemoteResult] = useSearchFollowRemoteMutation();
  const [unfollowHit, unfollowResult] = useSearchUnfollowMutation();

  const mutating =
    followLocalResult.loading ||
    followRemoteResult.loading ||
    unfollowResult.loading;
  const followingCollections = useMemo(() => getFollowingCollections(info), [
    info
  ]);
  const followingCommunities = useMemo(() => getFollowingCommunities(info), [
    info
  ]);

  const isLocal = isHitLocal(hit, info);

  const followContextId =
    isLocal === null ? null : hitFollowContextId(hit, isLocal);
  const isFollowable = !!followContextId;

  const followingId = useMemo(
    () => hitFollowingId(hit, followingCommunities, followingCollections),
    [followingCollections, followingCommunities, hit]
  );
  const isFollowing = !!followingId;

  const follow = useCallback(
    () => {
      const followCtxId = followContextId;
      if (mutating || !followCtxId) {
        return;
      }
      if (isLocal) {
        followLocal({
          variables: { contextId: followCtxId },
          refetchQueries: [
            { query: GetSidebarQueryDocument },
            { query: SearchHostIndexAndMyFollowingsDocument }
          ]
        });
      } else {
        followRemote({
          variables: { url: followCtxId },
          refetchQueries: [
            { query: GetSidebarQueryDocument },
            { query: SearchHostIndexAndMyFollowingsDocument }
          ]
        });
      }
    },
    [followLocal, followRemote, isLocal, hit, followContextId]
  );

  const unfollow = useCallback(
    () => {
      if (mutating || !followingId) {
        return;
      }
      unfollowHit({
        variables: { contextId: followingId },
        refetchQueries: [
          { query: GetSidebarQueryDocument },
          { query: SearchHostIndexAndMyFollowingsDocument }
        ]
      });
    },
    [followLocal, followRemote, isLocal, hit, followingId]
  );

  return useMemo(
    () => {
      return {
        isFollowing,
        isFollowable,
        follow,
        unfollow,
        mutating,
        isLocal
      };
    },
    [isFollowing, isFollowable, follow, unfollow, mutating, isLocal]
  );
};
export const isHitLocal = (hit: Hit, info: Q) => {
  if (!info.instance) {
    return null;
  }
  return hit.index_instance === info.instance.hostname;
};

export const hitFollowContextId = (hit: Hit, isLocal: boolean) => {
  if (hit.index_type !== 'Community' && hit.index_type !== 'Collection') {
    return null;
  }

  if (isLocal) {
    return hit.index_instance_object_id;
  } else {
    return hit.canonicalUrl;
  }
};

export const hitFollowingId = (
  hit: Hit,
  followingCommunities: SearchFollowedCommunityFragment[],
  followingCollections: SearchFollowedCollectionFragment[]
) => {
  if (hit.index_type === 'Community') {
    const actor = followingCommunities.find(sfc => {
      return (
        sfc.community.canonicalUrl &&
        hit.canonicalUrl &&
        sfc.community.canonicalUrl === hit.canonicalUrl
      );
    });
    return actor && actor.follow.id;
  } else if (hit.index_type === 'Collection') {
    const actor = followingCollections.find(sfc => {
      return (
        sfc.collection.canonicalUrl &&
        hit.canonicalUrl &&
        sfc.collection.canonicalUrl === hit.canonicalUrl
      );
    });
    return actor && actor.follow.id;
  } else {
    return undefined;
  }
};
export const getFollowingCollections = (
  info: Q
): SearchFollowedCollectionFragment[] => {
  const followingCollectionsEdges =
    info.me &&
    info.me.user.followedCollections &&
    info.me.user.followedCollections.edges;
  if (!followingCollectionsEdges) {
    return [];
  }
  const followingCollections = followingCollectionsEdges
    .map(edge => edge && edge.node)
    .filter((node): node is SearchFollowedCollectionFragment => !!node);
  return followingCollections;
};

export const getFollowingCommunities = (
  info: Q
): SearchFollowedCommunityFragment[] => {
  const followingCommunitiesEdges =
    info.me &&
    info.me.user.followedCommunities &&
    info.me.user.followedCommunities.edges;
  if (!followingCommunitiesEdges) {
    return [];
  }
  const followingCommunities = followingCommunitiesEdges
    .map(edge => edge && edge.node)
    .filter((node): node is SearchFollowedCommunityFragment => !!node);
  return followingCommunities;
};
