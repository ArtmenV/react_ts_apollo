import React, { useState } from 'react';
import { SFC } from 'react';
import { Trans } from '@lingui/macro';
import { Tabs, TabPanel } from 'react-tabs';
import styled from '../../themes/styled';
import { SuperTab, SuperTabList } from '../../components/elements/SuperTab';
import ResourceCard from '../../components/elements/Resource/Resource';
// import { Resource } from '../../components/elements/Icons';
import Link from '../../components/elements/Link/Link';
import media from 'styled-media-query';
import { Button, Flex, Box } from 'rebass/styled-components';
import {
  Footer,
  WrapperTab,
  OverlayTab
} from '../communities.community/Community';
import CollectionModal from '../../components/elements/CollectionModal';
import UploadResourcePanelHOC from '../../HOC/modules/AddResource/UploadResourceHOC';

import { BasicCollectionFragment } from '../../graphql/fragments/basicCollection.generated';
import { BasicResourcesEdgesFragment } from '../../graphql/fragments/basicResourcesEdges.generated';
// import CollectionsLoadMore from 'src/components/elements/Loadmore/followingCollections';

interface Props {
  collection: BasicCollectionFragment;
  community_name: string;
  resources: BasicResourcesEdgesFragment;
  fetchMore: any;
  type: string;
  addNewResource: any;
}

const CommunityPage: SFC<Props> = ({
  collection,
  community_name,
  resources
}) => {
  const [isOpen, onOpen] = useState(false);
  const [isUploadOpen, onUploadOpen] = useState(false);
  return (
    <WrapperTab>
      <OverlayTab>
        <Tabs defaultIndex={1}>
          <SuperTabList>
            <SuperTab>
              <h5>
                <Trans>Resources</Trans>
              </h5>
            </SuperTab>
          </SuperTabList>

          <TabPanel>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap'
              }}
            >
              <Wrapper>
                {collection.community &&
                  !collection.community.myFollow && (
                    <Footer>
                      <Trans>Join the community</Trans>{' '}
                      <Link to={'/communities/' + collection.community.id}>
                        {community_name}
                      </Link>{' '}
                      <Trans>to add a resource</Trans>
                    </Footer>
                  )}
                <CollectionList>
                  {collection.community && collection.community.myFollow ? (
                    isOpen ? (
                      <ButtonWrapper>
                        <Button m={3} onClick={() => onOpen(false)}>
                          <Trans>Cancel</Trans>
                        </Button>
                      </ButtonWrapper>
                    ) : (
                      <ButtonWrapper>
                        <Button m={3} onClick={() => onOpen(true)}>
                          <Trans>Share a link</Trans>
                        </Button>
                      </ButtonWrapper>
                    )
                  ) : null}
                  {isOpen && (
                    <CollectionModal
                      toggleModal={() => onOpen(false)}
                      modalIsOpen={isOpen}
                      cancel={isOpen}
                      collectionId={collection.id}
                      collectionExternalId={collection.id}
                    />
                  )}
                  {collection.community && collection.community.myFollow ? (
                    isUploadOpen ? (
                      <ButtonWrapper>
                        <Button m={3} onClick={() => onUploadOpen(false)}>
                          <Trans>Cancel</Trans>
                        </Button>
                      </ButtonWrapper>
                    ) : (
                      <ButtonWrapper>
                        <Button m={3} onClick={() => onUploadOpen(true)}>
                          <Trans>Upload a file</Trans>
                        </Button>
                      </ButtonWrapper>
                    )
                  ) : null}

                  {isUploadOpen && (
                    <UploadResourcePanelHOC
                      done={() => onUploadOpen(false)}
                      collectionId={collection.id}
                    />
                  )}
                  {resources.totalCount > 0 ? (
                    resources.edges.map(
                      (edge, i) =>
                        edge && (
                          <ResourceCard
                            key={i}
                            icon={edge.node.icon}
                            title={edge.node.name}
                            summary={edge.node.summary}
                            url={edge.node.url}
                            id={edge.node.id}
                            myFlag={edge.node.myFlag}
                          />
                        )
                    )
                  ) : (
                    <Empty>
                      <Trans>This collection is empty.</Trans>
                    </Empty>
                  )}
                </CollectionList>
              </Wrapper>
            </div>
          </TabPanel>
        </Tabs>
      </OverlayTab>
    </WrapperTab>
  );
};

const Empty = styled(Box)`
  padding: 24px;
  text-align: center;
  font-weight: 600;
  color: #000000b5;
`;
const ButtonWrapper = styled(Flex)`
  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
  button {
    flex: 1;
    border: 1px solid ${props => props.theme.colors.lightgray} !important;
    background: none;
    font-weight: 600;
    color: ${props => props.theme.colors.darkgray} !important;
    cursor: pointer;
    height: 50px;
    text-transform: uppercase;
    font-size: 14px;
    &:hover {
      background: ${props => props.theme.colors.lightgray};
    }
  }
`;
const Wrapper = styled.div`
  flex: 1;
`;

const CollectionList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  padding-top: 0;
  ${media.lessThan('medium')`
grid-template-columns: 1fr;
`};
`;

export default CommunityPage;
