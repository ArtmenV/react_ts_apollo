import * as React from 'react';
import { CreateCommunityMutationMutationOperation } from '../../graphql/createCommunity.generated';
import { DeleteMutationMutationOperation } from '../../graphql/delete.generated';
import { FollowMutationMutationOperation } from '../../graphql/follow.generated';
import { useGetSidebarQueryQuery } from '../../graphql/getSidebar.generated';
import { useDynamicLinkOpResult } from '../../util/apollo/dynamicLink';
import Sidebar from '../sidebar';

interface Props {
  isOpen: boolean;
}

export const SidebarWrapper: React.FC<Props> = ({ isOpen }) => {
  const resp = useGetSidebarQueryQuery();
  useDynamicLinkOpResult<DeleteMutationMutationOperation>(
    'deleteMutation',
    () => {
      resp.refetch();
    },
    [resp.refetch]
  );
  useDynamicLinkOpResult<CreateCommunityMutationMutationOperation>(
    'createCommunityMutation',
    () => {
      resp.refetch();
    },
    [resp.refetch]
  );
  useDynamicLinkOpResult<FollowMutationMutationOperation>(
    'followMutation',
    () => {
      resp.refetch();
    },
    [resp.refetch]
  );
  return <Sidebar resp={resp} isOpen={isOpen} />;
};

export default SidebarWrapper;
