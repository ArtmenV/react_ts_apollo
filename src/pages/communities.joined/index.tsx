import { Trans } from '@lingui/macro';
import { GetFollowedCommunitiesQueryQueryHookResult } from 'graphql/getFollowedCommunities.generated';
import * as React from 'react';
import { Box, Button, Flex } from 'rebass/styled-components';
import media from 'styled-media-query';
import CommunityCard from '../../components/elements/Community/Community';
import Loader from '../../components/elements/Loader/Loader';
import styled from '../../themes/styled';

interface Props {
  handleNewCommunity(): void;
  queryRes: GetFollowedCommunitiesQueryQueryHookResult;
}
export const CommunitiesJoined: React.SFC<Props> = ({
  handleNewCommunity,
  queryRes
}) => {
  const { data, loading, error } = queryRes;
  return (!data && !loading) || error ? (
    <span>
      <Trans>Error loading communities</Trans>
    </span>
  ) : loading || !data ? (
    <Loader />
  ) : (
    <>
      {/* <Helmet>
          <title>{APP_NAME} > Joined communities</title>
        </Helmet> */}
      <Box>
        <ButtonWrapper>
          <CreateCollection p={3} onClick={() => handleNewCommunity()} m={3}>
            <Trans>Create a new community</Trans>
          </CreateCollection>
        </ButtonWrapper>
        <List p={2}>
          {/* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
          data.me &&
            data.me.user.followedCommunities &&
            data.me.user.followedCommunities.edges.map(
              (community, i) =>
                community && (
                  <CommunityCard
                    key={i}
                    summary={community.node.community.summary || ''}
                    title={community.node.community.name || ''}
                    collectionsCount={
                      /* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                      community.node.community.collections!.totalCount
                    }
                    icon={community.node.community.icon || ''}
                    followed={!!community.node.community.myFollow}
                    id={community.node.community.id}
                    externalId={community.node.community.canonicalUrl || ''}
                    followersCount={
                      /* FIXME https://gitlab.com/moodlenet/meta/issues/185 */

                      community.node.community.followers!.totalCount
                    }
                    threadsCount={
                      /* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                      community.node.community.threads!.totalCount
                    }
                  />
                )
            )}
        </List>
        {/* <CommunitiesLoadMore
            me
            fetchMore={data.fetchMore}
            communities={data.me.user.followedCommunities}
          /> */}
      </Box>
    </>
  );
};

const ButtonWrapper = styled(Flex)`
  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
`;

const CreateCollection = styled(Button)`
  flex: 1;
  background: none;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
  border: 1px solid ${props => props.theme.colors.lightgray} !important;
  background: none;
  font-weight: 600;
  color: ${props => props.theme.colors.darkgray} !important;
  cursor: pointer;
  height: 50px;
  text-transform: uppercase;
  font-size: 14px !important;
  &:hover {
    background: ${props => props.theme.colors.lightgray};
  }
`;

const List = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  ${media.lessThan('medium')`
  grid-template-columns: 1fr;
  `};
`;
