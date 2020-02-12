// View a Community (with list of collections)

import { Trans } from '@lingui/macro';
import { CreateReplyMutationMutationOperation } from 'graphql/createReply.generated';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box } from 'rebass/styled-components';
import { useDynamicLinkOpResult } from 'util/apollo/dynamicLink';
import CollectionCard from '../../components/elements/Collection/Collection';
import Loader from '../../components/elements/Loader/Loader';
import '../../containers/App/basic.css';
import { useGetCommunityQueryQuery } from 'graphql/getCommunity.generated';
import { HomeBox, MainContainer } from '../../sections/layoutUtils';
import {
  Nav,
  NavItem,
  Panel,
  PanelTitle,
  WrapperPanel
} from '../../sections/panel';
import styled from '../../themes/styled';
import { Wrapper, WrapperCont } from '../communities.all/CommunitiesAll';
import CommunityPage from './Community';
import { HeroCommunityHOC } from 'HOC/modules/HeroCommunity/heroCommuityHOC';

interface Props {
  communityId: string;
  url: string;
  // data: Data;
  // editCommunity(): boolean;
  // isEditCommunityOpen: boolean;
  // showUsers(boolean): boolean;
  // isUsersOpen: boolean;
}

const CommunitiesFeatured: React.FC<Props> = ({ communityId, url }) => {
  const communityQuery = useGetCommunityQueryQuery({
    variables: { limit: 15, communityId }
  });
  useDynamicLinkOpResult<CreateReplyMutationMutationOperation>(
    'createReplyMutation',
    () => {
      communityQuery.refetch();
    },
    [communityQuery.refetch]
  );

  let collections;
  if (communityQuery.error || !communityQuery.data) {
    collections = (
      <span>
        <Trans>Error loading collections</Trans>
      </span>
    );
  } else if (communityQuery.loading) {
    collections = <Loader />;
  } else if (communityQuery.data.community) {
    /* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
    if (communityQuery.data.community.collections!.totalCount) {
      collections = (
        <Box m={2}>
          {/* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
          communityQuery.data.community.collections!.edges.map(
            (e, i) => e && <CollectionCard key={i} collection={e.node} />
          )}
        </Box>
      );
    } else {
      collections = (
        <OverviewCollection>
          <Trans>This community has no collections.</Trans>
        </OverviewCollection>
      );
    }
  }

  if (!communityQuery.data || !communityQuery.data.community) {
    if (communityQuery.loading) {
      return (
        <WrapperCont>
          <Wrapper>
            <Loader />
          </Wrapper>
        </WrapperCont>
      );
    } else {
      // TODO better handling of no community
      return (
        <WrapperCont>
          <Wrapper>
            <span>
              <Trans>
                {communityQuery.error
                  ? communityQuery.error.message
                  : 'Unknown error'}
              </Trans>
            </span>
          </Wrapper>
        </WrapperCont>
      );
    }
  }

  return (
    <MainContainer>
      <HomeBox>
        <WrapperCont>
          <Wrapper>
            <HeroCommunityHOC communityId={communityQuery.data.community.id} />
            <Switch>
              <Route
                path={url}
                exact
                render={props =>
                  communityQuery.data &&
                  communityQuery.data.community && (
                    <CommunityPage
                      collections={collections}
                      community={communityQuery.data.community}
                      id={communityQuery.data.community.id}
                      followed={!!communityQuery.data.community.myFollow}
                      fetchMore={communityQuery.fetchMore}
                      refetch={() => communityQuery.refetch()}
                    />
                  )
                }
              />
              {/* <Route
                  path={`/communities/${
                    community.id
                  }/collections/:collection`}
                  component={CollectionModal}
                /> */}
            </Switch>
          </Wrapper>
        </WrapperCont>
      </HomeBox>
      <WrapperPanel>
        <Panel>
          <PanelTitle fontSize={0} fontWeight={'bold'}>
            <Trans>Popular hashtags</Trans>
          </PanelTitle>
          <Nav>
            <NavItem mb={3} fontSize={1}>
              <Trans>#pedagogy</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#transition</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#english</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#template</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#assessment</Trans>
            </NavItem>
          </Nav>
        </Panel>

        <Panel>
          <PanelTitle fontSize={0} fontWeight={'bold'}>
            <Trans>Popular categories</Trans>
          </PanelTitle>
          <Nav>
            <NavItem mb={3} fontSize={1}>
              <Trans>Humanities</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>Behavioural science</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>English</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>Romana</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>Postgraduate</Trans>
            </NavItem>
          </Nav>
        </Panel>
      </WrapperPanel>
    </MainContainer>
  );
};

const OverviewCollection = styled.div`
  padding: 24px;
  text-align: center;
  font-weight: 600;
  color: #000000b5;
`;
export default CommunitiesFeatured;
// const withGetCollections = graphql<
//   {},
//   {
//     data: {
//       community: Community;
//     };
//   }
// >(getCommunityQuery, {
//   options: (props: Props) => ({
//     variables: {
//       limit: 15,
//       communityId: props.match.params.community
//     }
//   })
// }) as OperationOption<{}, {}>;

// export default compose(
//   withGetCollections,
//   withHandlers({
//     editCommunity: props => () =>
//       props.onEditCommunityOpen(!props.isEditCommunityOpen)
//   })
// )(CommunitiesFeatured);
